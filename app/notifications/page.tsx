"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "../components/ui";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import {
  Bell,
  MessageCircle,
  Heart,
  Calendar,
  User,
  Trash2,
} from "lucide-react";

interface Reminder {
  id: string;
  message: string;
  type: string;
  sentAt: string;
  readAt: string | null;
  goal: {
    id: string;
    title: string;
    progress: number;
  };
  fromUser: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export default function NotificationsPage() {
  const { user, loading: authLoading } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/auth/login";
      return;
    }
  }, [user, authLoading]);

  useEffect(() => {
    const fetchReminders = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/reminders?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReminders(data.reminders || []);
        }
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReminders();
    }
  }, [user]);

  const getReminderIcon = (type: string) => {
    switch (type) {
      case "encouragement":
        return <Heart className="w-5 h-5" />;
      case "checkin":
        return <MessageCircle className="w-5 h-5" />;
      case "deadline":
        return <Calendar className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getReminderColor = (type: string) => {
    switch (type) {
      case "encouragement":
        return "from-ember-400 to-ember-600";
      case "checkin":
        return "from-ocean-400 to-ocean-600";
      case "deadline":
        return "from-warning-400 to-warning-600";
      default:
        return "from-dark-500 to-dark-600";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <Header />
        <div className="max-w-4xl mx-auto p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-dark-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-white">
              Notifications & Comments
            </h1>
          </div>
          <p className="text-dark-300">
            See all comments and reminders from your network
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-white">
                  {reminders.length}
                </p>
                <p className="text-dark-400 text-sm">Total Messages</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-ocean-400 to-ocean-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-white">
                  {reminders.filter((r) => r.type === "checkin").length}
                </p>
                <p className="text-dark-400 text-sm">Comments</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-success-400 to-success-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-white">
                  {reminders.filter((r) => r.type === "encouragement").length}
                </p>
                <p className="text-dark-400 text-sm">Encouragements</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Reminders List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {reminders.length > 0 ? (
            reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getReminderColor(
                        reminder.type
                      )} flex items-center justify-center flex-shrink-0`}
                    >
                      {getReminderIcon(reminder.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <p className="text-sm text-dark-400">
                            From{" "}
                            <span className="text-white font-medium">
                              {reminder.fromUser.name}
                            </span>
                          </p>
                          <p className="text-sm text-dark-400">
                            On goal:{" "}
                            <span className="text-ember-400">
                              {reminder.goal.title}
                            </span>
                          </p>
                        </div>
                        <span className="text-xs text-dark-500 whitespace-nowrap">
                          {formatDate(reminder.sentAt)}
                        </span>
                      </div>

                      <p className="text-white text-lg leading-relaxed mb-3">
                        {reminder.message}
                      </p>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            reminder.type === "encouragement"
                              ? "bg-ember-500/10 text-ember-400"
                              : reminder.type === "checkin"
                              ? "bg-ocean-500/10 text-ocean-400"
                              : "bg-warning-500/10 text-warning-400"
                          }`}
                        >
                          {reminder.type.charAt(0).toUpperCase() +
                            reminder.type.slice(1)}
                        </span>
                        <span className="text-xs text-dark-500">
                          Goal Progress: {reminder.goal.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="p-12 text-center">
              <Bell className="w-16 h-16 text-dark-400 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-white mb-2">
                No notifications yet
              </h3>
              <p className="text-dark-400">
                When people comment on your goals or send you reminders, they'll
                appear here
              </p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}

