"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card } from "../components/ui";
import GoalCard from "../components/GoalCard";
import CreateGoalModal from "../components/CreateGoalModal";
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
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }
  }, [user]);

  // Mock data for now - replace with API calls
  useEffect(() => {
    if (!user) return;

    // Simulate API call
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
          user: { id: "1", name: "John Doe", avatar: "" },
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
          user: { id: "2", name: "Jane Smith", avatar: "" },
          createdAt: "2024-01-10",
        },
        {
          id: "3",
          title: "Read 12 Books",
          description: "Read one book per month this year",
          category: "personal",
          targetDate: "2024-12-31",
          privacy: "friends",
          status: "active",
          progress: 25,
          user: { id: "3", name: "Mike Johnson", avatar: "" },
          createdAt: "2024-01-05",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [user]);

  const handleUpdateProgress = (goalId: string, progress: number) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === goalId ? { ...goal, progress } : goal))
    );
  };

  const handleSendReminder = (goalId: string, userId: string) => {
    console.log("Send reminder to user:", userId, "for goal:", goalId);
    // Implement reminder logic
  };

  const handleCreateGoal = (goalData: any) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goalData.title,
      description: goalData.description,
      category: goalData.category,
      targetDate: goalData.targetDate,
      privacy: goalData.privacy,
      status: "active",
      progress: 0,
      user: { id: "1", name: "You", avatar: "" },
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) => [newGoal, ...prev]);
  };

  const filteredGoals = goals.filter((goal) => {
    if (filter === "all") return true;
    if (filter === "my-goals") return goal.user.id === "1"; // Current user
    return goal.category === filter;
  });

  if (loading) {
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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-8">
      <div className="max-w-6xl mx-auto">
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

        {/* Goals Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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
              />
            </motion.div>
          ))}
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
      </div>
    </div>
  );
}
