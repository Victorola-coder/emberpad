"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card } from "../components/ui";
import GoalCard from "../components/GoalCard";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import {
  Globe,
  TrendingUp,
  Users,
  Filter,
  Search,
  Target,
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

export default function ExplorePage() {
  const { user, loading: authLoading } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "trending" | "recent">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/auth/login";
      return;
    }
  }, [user, authLoading]);

  // Fetch all public goals
  useEffect(() => {
    const fetchPublicGoals = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/goals/public", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGoals(data.goals || []);
        } else {
          console.error("Failed to fetch public goals");
        }
      } catch (error) {
        console.error("Error fetching public goals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPublicGoals();
    }
  }, [user]);

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
          message: "Keep up the great work on your goal!",
          type: "encouragement",
        }),
      });

      if (response.ok) {
        alert("Reminder sent successfully!");
      } else {
        alert("Failed to send reminder");
      }
    } catch (error) {
      console.error("Error sending reminder:", error);
      alert("Error sending reminder");
    }
  };

  // Filter goals
  const filteredGoals = goals
    .filter((goal) => {
      // Apply filter type
      if (filter === "trending") return goal.progress > 50;
      if (filter === "recent") {
        const goalDate = new Date(goal.createdAt);
        const now = new Date();
        const diffDays = (now.getTime() - goalDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 7;
      }
      return true;
    })
    .filter((goal) => {
      // Apply category filter
      if (categoryFilter === "all") return true;
      return goal.category === categoryFilter;
    })
    .filter((goal) => {
      // Apply search query
      if (!searchQuery.trim()) return true;
      return (
        goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <Header />
        <div className="max-w-6xl mx-auto p-8">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white">
                  Explore Goals
                </h1>
              </div>
              <p className="text-dark-300 text-sm sm:text-base">
                Discover and get inspired by public goals from the community
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <Card className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-heading font-bold text-white truncate">
                    {goals.length}
                  </p>
                  <p className="text-dark-400 text-xs sm:text-sm">Public Goals</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-success-400 to-success-600 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-heading font-bold text-white truncate">
                    {Math.round(
                      goals.reduce((acc, goal) => acc + goal.progress, 0) /
                        goals.length
                    ) || 0}
                    %
                  </p>
                  <p className="text-dark-400 text-xs sm:text-sm">Avg Progress</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-ocean-400 to-ocean-600 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-heading font-bold text-white truncate">
                    {new Set(goals.map((g) => g.user.id)).size}
                  </p>
                  <p className="text-dark-400 text-xs sm:text-sm">Active Users</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search goals by title, description, or user..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500"
          />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-dark-800 p-1 rounded-xl w-full sm:w-auto">
              {[
                { id: "all", label: "All", icon: Globe },
                { id: "trending", label: "Trending", icon: TrendingUp },
                { id: "recent", label: "Recent", icon: Target },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1 sm:flex-initial justify-center ${
                    filter === tab.id
                      ? "bg-ember-500 text-white"
                      : "text-dark-400 hover:text-white hover:bg-dark-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500"
            >
              <option value="all">All Categories</option>
              <option value="health">Health & Fitness</option>
              <option value="career">Career & Work</option>
              <option value="learning">Learning & Education</option>
              <option value="personal">Personal Development</option>
              <option value="finance">Finance & Money</option>
              <option value="creative">Creative & Hobbies</option>
            </select>
          </div>
        </motion.div>

        {/* Goals Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredGoals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GoalCard
                    goal={goal}
                    onSendReminder={handleSendReminder}
                    isOwnGoal={goal.user.id === user?.id}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Globe className="w-16 h-16 text-dark-400 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-white mb-2">
                No goals found
              </h3>
              <p className="text-dark-400 mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "No public goals match your filters"}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

