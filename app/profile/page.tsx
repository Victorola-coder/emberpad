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

export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "goals" | "following" | "followers"
  >("goals");

  useEffect(() => {
    if (user) {
      // Mock data - replace with API calls
      setTimeout(() => {
        setGoals([
          {
            id: "1",
            title: "Learn React",
            description: "Master React development and build amazing apps",
            category: "learning",
            targetDate: "2024-03-15",
            privacy: "public",
            status: "active",
            progress: 65,
            user: { id: user.id, name: user.name, avatar: user.avatar },
            createdAt: "2024-01-15",
          },
          {
            id: "2",
            title: "Run 5K",
            description: "Complete a 5K run without stopping",
            category: "health",
            targetDate: "2024-02-28",
            privacy: "public",
            status: "active",
            progress: 40,
            user: { id: user.id, name: user.name, avatar: user.avatar },
            createdAt: "2024-01-10",
          },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [user]);

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
          <Card className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-white mb-2">
                    {user.name}
                  </h1>
                  <p className="text-dark-300 mb-2">{user.email}</p>
                  {user.bio && <p className="text-dark-400">{user.bio}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/profile/edit">
                  <Button variant="secondary" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    logout();
                    window.location.href = "/auth/login";
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-white mb-1">
                  {goals.length}
                </div>
                <div className="text-dark-400 text-sm">Active Goals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-white mb-1">
                  {Math.round(
                    goals.reduce((acc, goal) => acc + goal.progress, 0) /
                      goals.length
                  ) || 0}
                  %
                </div>
                <div className="text-dark-400 text-sm">Avg Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-white mb-1">
                  24
                </div>
                <div className="text-dark-400 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-white mb-1">
                  156
                </div>
                <div className="text-dark-400 text-sm">Followers</div>
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
          <div className="flex items-center gap-1 bg-dark-800 p-1 rounded-xl w-fit">
            {[
              { id: "goals", label: "My Goals", icon: Target },
              { id: "following", label: "Following", icon: Users },
              { id: "followers", label: "Followers", icon: Heart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-ember-500 text-white"
                    : "text-dark-400 hover:text-white hover:bg-dark-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-64 bg-dark-800 rounded-2xl animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    No goals yet
                  </h3>
                  <p className="text-dark-400 mb-6">
                    Start your journey by creating your first goal
                  </p>
                  <Button variant="primary">
                    <Target className="w-5 h-5 mr-2" />
                    Create Your First Goal
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "following" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-white">
                        User {i}
                      </h3>
                      <p className="text-dark-400 text-sm">@user{i}</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Following
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "followers" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-ocean-400 to-ocean-600 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-white">
                        Follower {i}
                      </h3>
                      <p className="text-dark-400 text-sm">@follower{i}</p>
                    </div>
                    <Button variant="primary" size="sm">
                      Follow Back
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
