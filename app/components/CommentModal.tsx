"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Button } from "./ui";
import { MessageCircle, Send } from "lucide-react";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalTitle: string;
  goalId: string;
  userId: string;
  goalOwnerId: string;
}

export default function CommentModal({
  isOpen,
  onClose,
  goalTitle,
  goalId,
  userId,
  goalOwnerId,
}: CommentModalProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please enter a comment");
      return;
    }

    setLoading(true);

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
          toUserId: goalOwnerId,
          message: comment,
          type: "checkin",
        }),
      });

      if (response.ok) {
        alert("Comment sent successfully to the goal owner!");
        setComment("");
        onClose();
      } else {
        const data = await response.json();
        alert(`Failed to send comment: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sending comment:", error);
      alert("Error sending comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Comment">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Goal Info */}
        <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-dark-400">Commenting on</p>
            <h3 className="font-medium text-white">{goalTitle}</h3>
          </div>
        </div>

        {/* Comment Input */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Your Comment
          </label>
          <textarea
            placeholder="Share your thoughts, encouragement, or advice..."
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            name="comment"
            rows={4}
            className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500 resize-none"
            maxLength={500}
            required
          />
          <p className="text-xs text-dark-400 mt-2">
            {comment.length}/500 characters
          </p>
        </div>

        {/* Quick Suggestions */}
        <div>
          <p className="text-sm text-dark-400 mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Keep it up! 💪",
              "You got this! 🎯",
              "Great progress! 🌟",
              "Stay focused! ✨",
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setComment(suggestion)}
                className="px-3 py-1 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
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
            disabled={!comment.trim() || loading}
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Comment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

