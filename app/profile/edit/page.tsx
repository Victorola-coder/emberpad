"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card, Input } from "../../components/ui";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { User, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/auth/login";
      return;
    }

    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Update local storage
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Profile updated successfully!");
        window.location.href = "/profile";
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <Header />
        <div className="max-w-2xl mx-auto p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-dark-700 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-dark-800 rounded"></div>
              <div className="h-32 bg-dark-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Header />
      <div className="max-w-2xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white">
              Edit Profile
            </h1>
          </div>
          <p className="text-dark-300 text-sm sm:text-base">Update your personal information</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Bio
                </label>
                <textarea
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  name="bio"
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500 resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-dark-400 mt-2">
                  {formData.bio.length}/500 characters
                </p>
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Avatar URL
                </label>
                <Input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatar}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({ ...prev, avatar: e.target.value }))
                  }
                />
                <p className="text-xs text-dark-400 mt-2">
                  Enter a URL to your profile picture
                </p>
              </div>

              {/* Preview */}
              <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                <h3 className="text-sm font-medium text-white mb-4">Preview</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      {formData.name || "Your Name"}
                    </h4>
                    <p className="text-dark-400 text-sm">{user?.email}</p>
                    {formData.bio && (
                      <p className="text-dark-300 text-sm mt-1">{formData.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-700">
                <Link href="/profile">
                  <Button type="button" variant="secondary" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

