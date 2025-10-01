"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "./ui";
import GoalCard from "./GoalCard";
import { Users, TrendingUp, Heart, MessageCircle } from "lucide-react";

interface SocialFeedProps {
  userId: string;
}

interface FeedGoal {
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

export default function SocialFeed({ userId }: SocialFeedProps) {
  const [goals, setGoals] = useState<FeedGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "trending" | "recent">("all");

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/feed?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGoals(data.goals || []);
        }
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFeed();
    }
  }, [userId]);

  const handleSendReminder = async (goalId: string, toUserId: string) => {
    try {
      const response = await fetch("/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          goalId,
          fromUserId: userId,
          toUserId,
          message: "Keep up the great work on your goal!",
          type: "encouragement",
        }),
      });

      if (response.ok) {
        // Show success message
        alert("Reminder sent successfully!");
      } else {
        alert("Failed to send reminder");
      }
    } catch (error) {
      console.error("Error sending reminder:", error);
      alert("Error sending reminder");
    }
  };

  const filteredGoals = goals.filter((goal) => {
    if (filter === "all") return true;
    if (filter === "trending") return goal.progress > 50;
    if (filter === "recent") {
      const goalDate = new Date(goal.createdAt);
      const now = new Date();
      const diffDays =
        (now.getTime() - goalDate.getTime()) / (1000 * 3600 * 24);
      return diffDays <= 7;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-dark-800 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">
            For You
          </h2>
          <p className="text-dark-400">Goals from people you follow</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-dark-800 p-1 rounded-xl w-fit">
        {[
          { id: "all", label: "All Goals", icon: Users },
          { id: "trending", label: "Trending", icon: TrendingUp },
          { id: "recent", label: "Recent", icon: Heart },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              filter === tab.id
                ? "bg-ember-500 text-white"
                : "text-dark-400 hover:text-white hover:bg-dark-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Goals Grid */}
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
                isOwnGoal={goal.user.id === userId}
                currentUserId={userId}
                showActions={true}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Users className="w-16 h-16 text-dark-400 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-semibold text-white mb-2">
            No goals to show
          </h3>
          <p className="text-dark-400 mb-6">
            {goals.length === 0
              ? "Follow some people to see their goals in your feed"
              : `No ${filter} goals found`}
          </p>
          {goals.length === 0 && (
            <Button variant="primary" onClick={() => window.location.href = "/explore"}>
              Explore Public Goals
            </Button>
          )}
        </div>
      )}

      {/* Feed Stats */}
      {goals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-1">
              {goals.length}
            </h3>
            <p className="text-dark-400">Total Goals</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-success-400 to-success-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-1">
              {Math.round(
                goals.reduce((acc, goal) => acc + goal.progress, 0) /
                  goals.length
              ) || 0}
              %
            </h3>
            <p className="text-dark-400">Avg Progress</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-ocean-400 to-ocean-600 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-1">
              {goals.filter((goal) => goal.progress > 75).length}
            </h3>
            <p className="text-dark-400">Almost Complete</p>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
