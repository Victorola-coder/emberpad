"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card } from "../components/ui";
import GoalCard from "../components/GoalCard";
import CreateGoalModal from "../components/CreateGoalModal";
import UserSearchModal from "../components/UserSearchModal";
import SocialFeed from "../components/SocialFeed";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import {
  Plus,
  Target,
  TrendingUp,
  Users,
  Bell,
  Search,
  Filter,
  Grid,
  List,
  Home,
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

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"my-goals" | "social-feed">(
    "my-goals"
  );

  // Redirect to login if not authenticated
  useEffect(() => {
    // Only redirect if auth loading is complete and user is still null
    if (!authLoading && !user) {
      window.location.href = "/auth/login";
      return;
    }
  }, [user, authLoading]);

  // Fetch user's goals from API
  useEffect(() => {
    if (!user) return;

    const fetchGoals = async () => {
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
        } else {
          console.error("Failed to fetch goals");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
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
        // Update the goal in the list with the response from the server
        setGoals((prev) =>
          prev.map((goal) =>
            goal.id === goalId ? { ...goal, ...data.goal } : goal
          )
        );
        alert("Progress updated successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to update progress: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      alert("Error updating progress. Please try again.");
    }
  };

  const handleSendReminder = async (goalId: string, toUserId: string) => {
    if (!user) return;

    try {
      const response = await fetch("/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          goalId,
          fromUserId: user.id,
          toUserId,
          message: "Keep pushing! You're doing great on your goal! 💪",
          type: "encouragement",
        }),
      });

      if (response.ok) {
        alert("Encouragement sent successfully!");
      } else {
        const data = await response.json();
        alert(`Failed to send encouragement: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sending reminder:", error);
      alert("Error sending encouragement. Please try again.");
    }
  };

  const handleCreateGoal = async (goalData: any) => {
    try {
      // Prepare payload with proper formatting
      const payload: any = {
        title: goalData.title,
        category: goalData.category,
        privacy: goalData.privacy,
        userId: user?.id,
      };

      // Only include optional fields if they have values
      if (goalData.description?.trim()) {
        payload.description = goalData.description;
      }

      // Convert date to ISO datetime format
      if (goalData.targetDate) {
        payload.targetDate = new Date(goalData.targetDate).toISOString();
      }

      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setGoals((prev) => [data.goal, ...prev]);
        setIsCreateModalOpen(false);
        alert("Goal created successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to create goal:", errorData);
        alert(`Failed to create goal: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      alert("Error creating goal. Please try again.");
    }
  };

  const filteredGoals = goals.filter((goal) => {
    if (filter === "all") return true;
    if (filter === "my-goals") return goal.user.id === user?.id;
    return goal.category === filter;
  });

  // Show loading while authenticating or fetching goals
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-dark-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-dark-800 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-heading font-bold text-white mb-2">
                Your Goals Dashboard
              </h1>
              <p className="text-dark-300">
                Track your progress and stay motivated with your community
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => setIsUserSearchOpen(true)}
                className="flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Find People
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="group"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Goal
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-white">
                    {goals.length}
                  </p>
                  <p className="text-dark-400 text-sm">Active Goals</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-success-400 to-success-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-white">
                    {Math.round(
                      goals.reduce((acc, goal) => acc + goal.progress, 0) /
                        goals.length
                    )}
                    %
                  </p>
                  <p className="text-dark-400 text-sm">Avg Progress</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-ocean-400 to-ocean-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-white">
                    24
                  </p>
                  <p className="text-dark-400 text-sm">Following</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sunshine-400 to-sunshine-600 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-white">
                    3
                  </p>
                  <p className="text-dark-400 text-sm">Reminders</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-1 bg-dark-800 p-1 rounded-xl w-fit">
            {[
              { id: "my-goals", label: "My Goals", icon: Target },
              { id: "social-feed", label: "For You", icon: Users },
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

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search goals..."
                className="bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500"
            >
              <option value="all">All Goals</option>
              <option value="my-goals">My Goals</option>
              <option value="health">Health</option>
              <option value="career">Career</option>
              <option value="learning">Learning</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-ember-500 text-white"
                  : "bg-dark-700 text-dark-400 hover:bg-dark-600"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-ember-500 text-white"
                  : "bg-dark-700 text-dark-400 hover:bg-dark-600"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === "my-goals" ? (
            /* My Goals Content */
            filteredGoals.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredGoals.map((goal, index) => (
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
                      isOwnGoal={goal.user.id === user?.id}
                      currentUserId={user?.id}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Target className="w-16 h-16 text-dark-400 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold text-white mb-2">
                  No goals found
                </h3>
                <p className="text-dark-400 mb-6">
                  {filter === "all"
                    ? "Create your first goal to get started"
                    : `No goals found in the ${filter} category`}
                </p>
                <Button
                  variant="primary"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Create Goal
                </Button>
              </div>
            )
          ) : (
            /* Social Feed Content */
            <SocialFeed userId={user?.id || ""} />
          )}
        </motion.div>

        {filteredGoals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              No goals found
            </h3>
            <p className="text-dark-400 mb-6">
              {filter === "my-goals"
                ? "You haven't created any goals yet. Start your journey!"
                : "No goals match your current filter."}
            </p>
            <Button
              variant="primary"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Goal
            </Button>
          </motion.div>
        )}

        {/* Create Goal Modal */}
        <CreateGoalModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateGoal}
        />

        {/* User Search Modal */}
        <UserSearchModal
          isOpen={isUserSearchOpen}
          onClose={() => setIsUserSearchOpen(false)}
          currentUserId={user?.id}
        />
      </div>
    </div>
  );
}
