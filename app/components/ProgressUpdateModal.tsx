"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Button } from "./ui";
import { TrendingUp, Target } from "lucide-react";

interface ProgressUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalTitle: string;
  currentProgress: number;
  onUpdate: (progress: number) => void;
}

export default function ProgressUpdateModal({
  isOpen,
  onClose,
  goalTitle,
  currentProgress,
  onUpdate,
}: ProgressUpdateModalProps) {
  const [progress, setProgress] = useState(currentProgress);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onUpdate(progress);
      onClose();
    } catch (error) {
      console.error("Error updating progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const progressSteps = [0, 25, 50, 75, 100];
  const milestones = [
    { progress: 25, label: "Getting Started", emoji: "🌱" },
    { progress: 50, label: "Halfway There", emoji: "🚀" },
    { progress: 75, label: "Almost Done", emoji: "⚡" },
    { progress: 100, label: "Completed!", emoji: "🎉" },
  ];

  const currentMilestone =
    milestones.find((m) => m.progress === progress) || milestones[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Progress">
      <div className="space-y-6">
        {/* Goal Info */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-white mb-2">
            {goalTitle}
          </h3>
          <p className="text-dark-400">How much progress have you made?</p>
        </div>

        {/* Progress Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">Progress</span>
            <span className="text-sm font-bold text-ember-400">
              {progress}%
            </span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${progress}%, #334155 ${progress}%, #334155 100%)`,
              }}
            />
            <div className="flex justify-between mt-2 text-xs text-dark-400">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Quick Progress Buttons */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white">Quick Select</p>
          <div className="grid grid-cols-5 gap-2">
            {progressSteps.map((step) => (
              <button
                key={step}
                onClick={() => setProgress(step)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  progress === step
                    ? "bg-ember-500 text-white"
                    : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                }`}
              >
                {step}%
              </button>
            ))}
          </div>
        </div>

        {/* Milestone Display */}
        {progress > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-ember-500/10 to-ember-600/10 border border-ember-500/20 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentMilestone.emoji}</span>
              <div>
                <p className="font-medium text-white">
                  {currentMilestone.label}
                </p>
                <p className="text-sm text-ember-300">{progress}% complete</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-700">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={progress === currentProgress}
          >
            Update Progress
          </Button>
        </div>
      </div>
    </Modal>
  );
}
