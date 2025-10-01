"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card } from "../components/ui";
import GoalCard from "../components/GoalCard";
import Header from "../components/Header";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Edit,
  Settings,
  Target,
  TrendingUp,
  Users,
  Calendar,
  Heart,
  MessageCircle,
  Share,
  LogOut,
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  targetDate?: string;
  privacy: string;
  status: string;
  progress: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface FollowUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState<FollowUser[]>([]);
  const [followers, setFollowers] = useState<FollowUser[]>([]);
  const [followingLoading, setFollowingLoading] = useState(false);
  const [followersLoading, setFollowersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "goals" | "following" | "followers"
  >("goals");

  // Fetch user's goals
  useEffect(() => {
    const fetchGoals = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/goals?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGoals(data.goals || []);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchGoals();
    }
  }, [user]);

  // Fetch following
  useEffect(() => {
    const fetchFollowing = async () => {
      if (!user || activeTab !== "following") return;

      try {
        setFollowingLoading(true);
        const response = await fetch(`/api/follow?userId=${user.id}&type=following`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFollowing(data.follows?.map((f: any) => f.following) || []);
        }
      } catch (error) {
        console.error("Error fetching following:", error);
      } finally {
        setFollowingLoading(false);
      }
    };

    fetchFollowing();
  }, [user, activeTab]);

  // Fetch followers
  useEffect(() => {
    const fetchFollowers = async () => {
      if (!user || activeTab !== "followers") return;

      try {
        setFollowersLoading(true);
        const response = await fetch(`/api/follow?userId=${user.id}&type=followers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFollowers(data.follows?.map((f: any) => f.follower) || []);
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      } finally {
        setFollowersLoading(false);
      }
    };

    fetchFollowers();
  }, [user, activeTab]);

  const handleUpdateProgress = async (goalId: string, progress: number) => {
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ progress }),
      });

      if (response.ok) {
        const data = await response.json();
        setGoals((prev) =>
          prev.map((goal) =>
            goal.id === goalId ? { ...goal, ...data.goal } : goal
          )
        );
        alert("Progress updated successfully!");
      } else {
        alert("Failed to update progress");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      alert("Error updating progress");
    }
  };

  const handleSendReminder = (goalId: string, userId: string) => {
    // Not needed on profile page (own goals)
    console.log("Send reminder:", goalId, userId);
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-dark-700 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  // Show message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-white mb-4">
            Please sign in to view your profile
          </h1>
          <Button
            variant="primary"
            onClick={() => (window.location.href = "/auth/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center flex-shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-white mb-1 sm:mb-2 truncate">
                    {user.name}
                  </h1>
                  <p className="text-dark-300 mb-1 sm:mb-2 text-sm sm:text-base truncate">{user.email}</p>
                  {user.bio && <p className="text-dark-400 text-xs sm:text-sm line-clamp-2">{user.bio}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Link href="/profile/edit" className="flex-1 sm:flex-initial">
                  <Button variant="secondary" size="sm" className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2">
                    <Edit className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Edit</span>
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-2"
                  onClick={() => {
                    logout();
                    window.location.href = "/auth/login";
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Logout</span>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-heading font-bold text-white mb-1">
                  {goals.length}
                </div>
                <div className="text-dark-400 text-xs sm:text-sm">Active Goals</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-heading font-bold text-white mb-1">
                  {Math.round(
                    goals.reduce((acc, goal) => acc + goal.progress, 0) /
                      goals.length
                  ) || 0}
                  %
                </div>
                <div className="text-dark-400 text-xs sm:text-sm">Avg Progress</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-heading font-bold text-white mb-1">
                  {following.length}
                </div>
                <div className="text-dark-400 text-xs sm:text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-heading font-bold text-white mb-1">
                  {followers.length}
                </div>
                <div className="text-dark-400 text-xs sm:text-sm">Followers</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-1 bg-dark-800 p-1 rounded-xl w-full sm:w-fit">
            {[
              { id: "goals", label: "My Goals", icon: Target },
              { id: "following", label: "Following", icon: Users },
              { id: "followers", label: "Followers", icon: Heart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all flex-1 sm:flex-initial ${
                  activeTab === tab.id
                    ? "bg-ember-500 text-white"
                    : "text-dark-400 hover:text-white hover:bg-dark-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-xs sm:text-sm truncate">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
            {activeTab === "goals" && (
            <div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-64 bg-dark-800 rounded-2xl animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GoalCard
                        goal={goal}
                        onUpdateProgress={handleUpdateProgress}
                        onSendReminder={handleSendReminder}
                        showActions={true}
                        isOwnGoal={true}
                        currentUserId={user?.id}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && goals.length === 0 && (
                <Card className="p-8 sm:p-12 lg:p-16 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                    <Target className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-white mb-2">
                    No goals yet
                  </h3>
                  <p className="text-dark-400 text-sm sm:text-base mb-4 sm:mb-6">
                    Start your journey by creating your first goal
                  </p>
                  <Button variant="primary" onClick={() => window.location.href = "/dashboard"}>
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Create Your First Goal
                  </Button>
                </Card>
              )}
            </div>
          )}

          {activeTab === "following" && (
            <div>
              {followingLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-dark-800 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : following.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {following.map((followedUser) => (
                    <Card key={followedUser.id} className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center flex-shrink-0">
                          {followedUser.avatar ? (
                            <img
                              src={followedUser.avatar}
                              alt={followedUser.name}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-semibold text-white text-sm sm:text-base truncate">
                            {followedUser.name}
                          </h3>
                          <p className="text-dark-400 text-xs sm:text-sm truncate">{followedUser.email}</p>
                          {followedUser.bio && (
                            <p className="text-dark-300 text-xs mt-1 line-clamp-1">{followedUser.bio}</p>
                          )}
                        </div>
                        <Button variant="secondary" size="sm" className="flex-shrink-0 text-xs sm:text-sm">
                          Following
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 sm:p-12 text-center">
                  <Users className="w-12 h-12 sm:w-16 sm:h-16 text-dark-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-heading font-semibold text-white mb-2">
                    Not following anyone yet
                  </h3>
                  <p className="text-dark-400 text-sm sm:text-base mb-6">
                    Find and follow people to see their goals
                  </p>
                  <Button variant="primary" onClick={() => window.location.href = "/explore"}>
                    Explore Goals
                  </Button>
                </Card>
              )}
            </div>
          )}

          {activeTab === "followers" && (
            <div>
              {followersLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-dark-800 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : followers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {followers.map((follower) => (
                    <Card key={follower.id} className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-ocean-400 to-ocean-600 flex items-center justify-center flex-shrink-0">
                          {follower.avatar ? (
                            <img
                              src={follower.avatar}
                              alt={follower.name}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-semibold text-white text-sm sm:text-base truncate">
                            {follower.name}
                          </h3>
                          <p className="text-dark-400 text-xs sm:text-sm truncate">{follower.email}</p>
                          {follower.bio && (
                            <p className="text-dark-300 text-xs mt-1 line-clamp-1">{follower.bio}</p>
                          )}
                        </div>
                        <Button variant="primary" size="sm" className="flex-shrink-0 text-xs sm:text-sm">
                          Follow Back
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 sm:p-12 text-center">
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-dark-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-heading font-semibold text-white mb-2">
                    No followers yet
                  </h3>
                  <p className="text-dark-400 text-sm sm:text-base mb-6">
                    Create public goals and engage with the community to get followers
                  </p>
                  <Button variant="primary" onClick={() => window.location.href = "/explore"}>
                    Explore Goals
                  </Button>
                </Card>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
