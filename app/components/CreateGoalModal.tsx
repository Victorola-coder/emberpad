"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Button, Input, TextArea, Select } from "./ui";
import { Target, Calendar, Users, Lock } from "lucide-react";

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goal: GoalData) => void;
}

interface GoalData {
  title: string;
  description: string;
  category: string;
  targetDate: string;
  privacy: string;
}

const categories = [
  { label: "Health & Fitness", value: "health" },
  { label: "Career & Work", value: "career" },
  { label: "Learning & Education", value: "learning" },
  { label: "Personal Development", value: "personal" },
  { label: "Finance & Money", value: "finance" },
  { label: "Creative & Hobbies", value: "creative" },
];

const privacyOptions = [
  { label: "Public - Everyone can see", value: "public" },
  { label: "Friends - Only followers", value: "friends" },
  { label: "Private - Only you", value: "private" },
];

export default function CreateGoalModal({ isOpen, onClose, onSubmit }: CreateGoalModalProps) {
  const [formData, setFormData] = useState<GoalData>({
    title: "",
    description: "",
    category: "personal",
    targetDate: "",
    privacy: "public",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      setFormData({
        title: "",
        description: "",
        category: "personal",
        targetDate: "",
        privacy: "public",
      });
      onClose();
    } catch (error) {
      console.error("Error creating goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof GoalData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Goal">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Goal Title */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Goal Title *
          </label>
          <Input
            placeholder="What do you want to achieve?"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Description
          </label>
          <TextArea
            placeholder="Describe your goal in detail..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            name="description"
          />
        </div>

        {/* Category and Target Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Category *
            </label>
            <Select
              options={categories}
              value={formData.category}
              onChange={(value) => handleChange("category", value)}
              placeholder="Select category"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Target Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="date"
                value={formData.targetDate}
                onChange={(e) => handleChange("targetDate", e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500"
              />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Privacy *
          </label>
          <Select
            options={privacyOptions}
            value={formData.privacy}
            onChange={(value) => handleChange("privacy", value)}
            placeholder="Select privacy"
          />
        </div>

        {/* Preview Card */}
        <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
          <h4 className="text-sm font-medium text-white mb-3">Preview</h4>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${
              formData.category === 'health' ? 'from-success-400 to-success-600' :
              formData.category === 'career' ? 'from-ocean-400 to-ocean-600' :
              formData.category === 'learning' ? 'from-ember-400 to-ember-600' :
              formData.category === 'personal' ? 'from-sunshine-400 to-sunshine-600' :
              formData.category === 'finance' ? 'from-warning-400 to-warning-600' :
              'from-danger-400 to-danger-600'
            } flex items-center justify-center`}>
              <Target className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-white">
                {formData.title || "Your goal title"}
              </h5>
              {formData.description && (
                <p className="text-dark-400 text-sm mt-1">
                  {formData.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-2 text-xs text-dark-400">
                <span className="capitalize">{formData.category}</span>
                {formData.targetDate && (
                  <span>{new Date(formData.targetDate).toLocaleDateString()}</span>
                )}
                <div className="flex items-center gap-1">
                  {formData.privacy === 'public' ? (
                    <Users className="w-3 h-3" />
                  ) : formData.privacy === 'friends' ? (
                    <Users className="w-3 h-3" />
                  ) : (
                    <Lock className="w-3 h-3" />
                  )}
                  <span className="capitalize">{formData.privacy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!formData.title.trim()}
          >
            Create Goal
          </Button>
        </div>
      </form>
    </Modal>
  );
}
