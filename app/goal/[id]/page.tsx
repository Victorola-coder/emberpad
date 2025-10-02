"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "../../components/ui";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import {
  Target,
  Calendar,
  Users,
  TrendingUp,
  Heart,
  MessageCircle,
  Share,
  ArrowLeft,
  User,
  Lock,
  Globe,
  UserPlus,
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

export default function GoalPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  // Resolve params (Next.js 15 async params)
  useEffect(() => {
    Promise.resolve(params).then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    const fetchGoal = async () => {
      if (!resolvedParams) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers: HeadersInit = {};
        
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`/api/goals/${resolvedParams.id}`, {
          headers,
        });

        if (response.ok) {
          const data = await response.json();
          setGoal(data.goal);
        } else if (response.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching goal:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [resolvedParams]);

  const getCategoryColor = (category: string) => {
    const colors = {
      health: "from-success-400 to-success-600",
      career: "from-ocean-400 to-ocean-600",
      learning: "from-ember-400 to-ember-600",
      personal: "from-sunshine-400 to-sunshine-600",
      finance: "from-warning-400 to-warning-600",
      creative: "from-danger-400 to-danger-600",
    };
    return colors[category as keyof typeof colors] || "from-ember-400 to-ember-600";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleAction = (action: string) => {
    if (!user) {
      if (confirm(`You need to sign in to ${action}. Would you like to sign in now?`)) {
        window.location.href = "/auth/login";
      }
      return;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-8">
        <div className="animate-pulse space-y-8 max-w-2xl w-full">
          <div className="h-8 bg-dark-700 rounded w-1/2"></div>
          <div className="h-64 bg-dark-800 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (notFound || !goal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-8">
        <Card className="p-8 sm:p-12 text-center max-w-md">
          <Target className="w-16 h-16 text-dark-400 mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-white mb-2">
            Goal Not Found
          </h1>
          <p className="text-dark-400 mb-6">
            This goal doesn't exist or has been deleted.
          </p>
          <Link href="/explore">
            <Button variant="primary">Explore Public Goals</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isOwner = user?.id === goal.user.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Simple Header */}
      <div className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-white">Emberpad</span>
            </Link>
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="secondary" size="sm">Dashboard</Button>
                  </Link>
                  <Link href="/explore">
                    <Button variant="secondary" size="sm">Explore</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="secondary" size="sm">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="primary" size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-dark-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        {/* Goal Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getCategoryColor(
                    goal.category
                  )} flex items-center justify-center flex-shrink-0`}
                >
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                    {goal.title}
                  </h1>
                  <div className="flex items-center gap-2 text-dark-400">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                      {goal.user.avatar ? (
                        <img
                          src={goal.user.avatar}
                          alt={goal.user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm">by {goal.user.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {goal.description && (
              <p className="text-dark-300 mb-6 leading-relaxed text-base sm:text-lg">
                {goal.description}
              </p>
            )}

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-dark-400">Progress</span>
                <span className="text-2xl font-heading font-bold text-white">
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-4">
                <motion.div
                  className={`h-4 rounded-full bg-gradient-to-r ${getCategoryColor(
                    goal.category
                  )}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-dark-900/50 rounded-xl">
              <div>
                <p className="text-xs text-dark-400 mb-1">Category</p>
                <p className="text-sm font-medium text-white capitalize">{goal.category}</p>
              </div>
              <div>
                <p className="text-xs text-dark-400 mb-1">Status</p>
                <p className="text-sm font-medium text-success-400 capitalize">{goal.status}</p>
              </div>
              {goal.targetDate && (
                <div>
                  <p className="text-xs text-dark-400 mb-1">Target Date</p>
                  <p className="text-sm font-medium text-white">{formatDate(goal.targetDate)}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-dark-400 mb-1">Privacy</p>
                <div className="flex items-center gap-1">
                  {goal.privacy === "public" ? (
                    <Globe className="w-3 h-3 text-white" />
                  ) : goal.privacy === "friends" ? (
                    <Users className="w-3 h-3 text-white" />
                  ) : (
                    <Lock className="w-3 h-3 text-white" />
                  )}
                  <p className="text-sm font-medium text-white capitalize">{goal.privacy}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-6 border-t border-dark-700">
              {!user ? (
                <>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => window.location.href = "/auth/signup"}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up to Interact
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => window.location.href = "/auth/login"}
                  >
                    Sign In
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => {
                      handleAction("send encouragement");
                      // Will be handled by the prompt
                    }}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Send Encouragement
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleAction("comment")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comment
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleAction("share")}
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </>
              )}
            </div>
          </Card>

          {/* CTA for non-logged in users */}
          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-ember-500/10 to-ocean-500/10 border-ember-500/20">
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3">
                  Start Your Own Goal Journey
                </h2>
                <p className="text-dark-300 mb-6 text-sm sm:text-base">
                  Join Emberpad to track your goals, connect with others, and achieve more together
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/auth/signup">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Explore More Goals
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

