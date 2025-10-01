"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Modal, Button, Input } from "./ui";
import { Search, UserPlus, Users, User } from "lucide-react";

interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
  onFollow?: (userId: string) => void;
  onUnfollow?: (userId: string) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  isFollowing?: boolean;
}

export default function UserSearchModal({
  isOpen,
  onClose,
  currentUserId,
  onFollow,
  onUnfollow,
}: UserSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `/api/users?q=${encodeURIComponent(query)}&currentUserId=${currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentUserId) {
        searchUsers(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, currentUserId]);

  const handleFollow = async (followingId: string) => {
    if (!currentUserId) {
      alert("Please log in to follow users");
      return;
    }

    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          followerId: currentUserId,
          followingId,
        }),
      });

      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === followingId ? { ...user, isFollowing: true } : user
          )
        );
        if (onFollow) onFollow(followingId);
        alert("Successfully followed user!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to follow user");
      }
    } catch (error) {
      console.error("Error following user:", error);
      alert("Error following user");
    }
  };

  const handleUnfollow = async (followingId: string) => {
    if (!currentUserId) {
      alert("Please log in to unfollow users");
      return;
    }

    try {
      const response = await fetch(
        `/api/follow?followerId=${currentUserId}&followingId=${followingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === followingId ? { ...user, isFollowing: false } : user
          )
        );
        if (onUnfollow) onUnfollow(followingId);
        alert("Successfully unfollowed user!");
      } else {
        alert("Failed to unfollow user");
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      alert("Error unfollowing user");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Find People to Follow">
      <div className="space-y-4 sm:space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Search Results */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ember-500"></div>
            </div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-dark-800 rounded-xl border border-dark-700 hover:border-dark-600 transition-colors"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center flex-shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white text-sm sm:text-base truncate">{user.name}</h3>
                  <p className="text-xs sm:text-sm text-dark-400 truncate">{user.email}</p>
                  {user.bio && (
                    <p className="text-xs sm:text-sm text-dark-300 mt-1 line-clamp-1">{user.bio}</p>
                  )}
                </div>

                <Button
                  variant={user.isFollowing ? "secondary" : "primary"}
                  size="sm"
                  onClick={() =>
                    user.isFollowing
                      ? handleUnfollow(user.id)
                      : handleFollow(user.id)
                  }
                  className="flex items-center gap-1 sm:gap-2 flex-shrink-0"
                >
                  {user.isFollowing ? (
                    <>
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span className="hidden sm:inline">Follow</span>
                    </>
                  )}
                </Button>
              </motion.div>
            ))
          ) : searchQuery ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-dark-400 mx-auto mb-4" />
              <p className="text-dark-400">No users found</p>
              <p className="text-sm text-dark-500">
                Try searching with a different name or email
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-dark-400 mx-auto mb-4" />
              <p className="text-dark-400">Search for people to follow</p>
              <p className="text-sm text-dark-500">
                Enter a name or email to find users
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-700">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
