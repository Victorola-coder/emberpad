"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "./ui";
import ProgressUpdateModal from "./ProgressUpdateModal";
import CommentModal from "./CommentModal";
import ShareModal from "./ShareModal";
import {
  Target,
  Calendar,
  Users,
  TrendingUp,
  MoreVertical,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";

interface GoalCardProps {
  goal: {
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
  };
  onUpdateProgress?: (goalId: string, progress: number) => void;
  onSendReminder?: (goalId: string, userId: string) => void;
  showActions?: boolean;
  isOwnGoal?: boolean;
  currentUserId?: string;
}

export default function GoalCard({
  goal,
  onUpdateProgress,
  onSendReminder,
  showActions = true,
  isOwnGoal = false,
  currentUserId,
}: GoalCardProps) {
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleProgressUpdate = async (progress: number) => {
    if (onUpdateProgress) {
      await onUpdateProgress(goal.id, progress);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      health: "from-success-400 to-success-600",
      career: "from-ocean-400 to-ocean-600",
      learning: "from-ember-400 to-ember-600",
      personal: "from-sunshine-400 to-sunshine-600",
      finance: "from-warning-400 to-warning-600",
      creative: "from-danger-400 to-danger-600",
    };
    return (
      colors[category as keyof typeof colors] || "from-ember-400 to-ember-600"
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "text-success-400",
      completed: "text-success-500",
      paused: "text-warning-500",
      cancelled: "text-danger-500",
    };
    return colors[status as keyof typeof colors] || "text-ember-400";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="relative overflow-hidden hover:shadow-xl hover:shadow-ember-500/10 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-r ${getCategoryColor(
                goal.category
              )} flex items-center justify-center`}
            >
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-white text-lg group-hover:text-ember-400 transition-colors">
                {goal.title}
              </h3>
              <p className="text-dark-400 text-sm">by {goal.user.name}</p>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSendReminder?.(goal.id, goal.user.id)}
                className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                title="Send reminder"
              >
                <Heart className="w-4 h-4 text-dark-400 hover:text-ember-400" />
              </button>
              <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-dark-400" />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        {goal.description && (
          <p className="text-dark-300 mb-4 leading-relaxed">
            {goal.description}
          </p>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-dark-400">Progress</span>
            <span className="text-sm font-medium text-white">
              {goal.progress}%
            </span>
          </div>
          <div
            className="w-full bg-dark-700 rounded-full h-2 cursor-pointer hover:bg-dark-600 transition-colors"
            onClick={() => isOwnGoal && setShowProgressModal(true)}
            title={isOwnGoal ? "Click to update progress" : ""}
          >
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(
                goal.category
              )}`}
              initial={{ width: 0 }}
              animate={{ width: `${goal.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          {isOwnGoal && (
            <p className="text-xs text-dark-400 mt-1">
              Click progress bar to update
            </p>
          )}
        </div>

        {/* Status and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span
              className={`text-sm font-medium ${getStatusColor(goal.status)}`}
            >
              {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
            </span>
            {goal.targetDate && (
              <div className="flex items-center gap-1 text-dark-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(goal.targetDate)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-dark-400">
            <Users className="w-4 h-4" />
            <span className="text-sm capitalize">{goal.privacy}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center gap-1.5 sm:gap-2 pt-4 border-t border-dark-700">
            {isOwnGoal && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowProgressModal(true)}
                className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-ember-500/10 hover:bg-ember-500/20 text-ember-400 rounded-lg transition-colors text-xs sm:text-sm font-medium flex-1 sm:flex-initial"
              >
                <TrendingUp className="w-4 h-4 flex-shrink-0" />
                <span className="hidden xs:inline sm:inline">Update</span>
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCommentModal(true)}
              className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg transition-colors text-xs sm:text-sm font-medium flex-1 sm:flex-initial"
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Comment</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowShareModal(true)}
              className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg transition-colors text-xs sm:text-sm font-medium flex-1 sm:flex-initial"
            >
              <Share className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Share</span>
            </motion.button>
          </div>
        )}
      </Card>

      {/* Modals */}
      <ProgressUpdateModal
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
        goalTitle={goal.title}
        currentProgress={goal.progress}
        onUpdate={handleProgressUpdate}
      />

      <CommentModal
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        goalTitle={goal.title}
        goalId={goal.id}
        userId={currentUserId || ""}
        goalOwnerId={goal.user.id}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        goalTitle={goal.title}
        goalId={goal.id}
      />
    </motion.div>
  );
}
