"use client";

import { useState } from "react";
import { Button, Card } from "./components/ui";
import { motion } from "framer-motion";
import { Animation } from "./components/global";
import Link from "next/link";
import {
  Target,
  Users,
  Bell,
  TrendingUp,
  Heart,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Target,
      title: "Goal Tracking",
      description:
        "Create and manage your goals with beautiful progress visualization and custom categories",
      color: "from-ember-400 to-ember-600",
    },
    {
      icon: Users,
      title: "Social Accountability",
      description:
        "Follow friends, share goals, and build a supportive community that keeps you motivated",
      color: "from-ocean-400 to-ocean-600",
    },
    {
      icon: Bell,
      title: "Encouragement System",
      description:
        "Send and receive comments, reminders, and encouragement to stay on track",
      color: "from-sunshine-400 to-sunshine-600",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description:
        "Visual progress bars, real-time updates, and milestone celebrations",
      color: "from-success-400 to-success-600",
    },
    {
      icon: Heart,
      title: "Community Feed",
      description:
        "Discover inspiring goals from the community and connect with like-minded achievers",
      color: "from-danger-400 to-danger-600",
    },
    {
      icon: Zap,
      title: "Privacy Controls",
      description:
        "Choose who sees your goals - public, friends only, or keep them private",
      color: "from-warning-400 to-warning-600",
    },
  ];

  const stats = [
    { number: "100%", label: "Free Forever" },
    { number: "Real-time", label: "Updates" },
    { number: "Secure", label: "Your Data" },
    { number: "24/7", label: "Access" },
  ];

  const benefits = [
    {
      title: "Turn Goals into Habits",
      description: "Regular updates and community support help transform your goals into lasting habits",
      icon: CheckCircle,
    },
    {
      title: "Never Give Up",
      description: "Get encouragement from your network when you need it most",
      icon: Heart,
    },
    {
      title: "Celebrate Progress",
      description: "Share your wins, no matter how small, and inspire others along the way",
      icon: Star,
    },
  ];

  return (
    <Animation>
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center px-4">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-ember-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ocean-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-ember-500/10 border border-ember-500/20 rounded-full text-ember-400 text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Sparkles className="w-4 h-4" />
                Where Goals Become Commitments
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight">
                <motion.span
                  className="bg-gradient-to-r from-ember-400 via-ember-500 to-ember-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Emberpad
                </motion.span>
              </h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-dark-300 max-w-3xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Transform your personal goals into social commitments. Track
                progress, get reminders from friends, and achieve more together.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link href="/auth/signup">
                <Button
                  variant="primary"
                  size="lg"
                  className="group relative overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.span
                    className="flex items-center gap-2"
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Button>
              </Link>

              <Link href="/auth/login">
                <Button variant="secondary" size="lg" className="group">
                  <motion.span
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sign In
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Heart className="w-5 h-5" />
                    </motion.div>
                  </motion.span>
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                >
                  <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-dark-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 sm:py-20 lg:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 sm:mb-6">
                Why Choose <span className="text-ember-400">Emberpad</span>?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto px-4">
                Built for the modern goal-setter who believes in the power of
                community accountability
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative p-6 sm:p-8 h-full bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-dark-700/50 rounded-2xl hover:border-ember-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-ember-500/10">
                    {/* Subtle background glow effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />

                    <motion.div
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      whileHover={{ rotate: 5 }}
                    >
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </motion.div>

                    <h3 className="text-lg sm:text-xl font-heading font-semibold text-white mb-3 sm:mb-4 group-hover:text-ember-400 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-sm sm:text-base text-dark-300 leading-relaxed group-hover:text-dark-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 sm:py-20 lg:py-24 px-4 bg-dark-900/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 sm:mb-6">
                How <span className="text-ember-400">Emberpad</span> Helps You
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto px-4">
                Achieve more with the power of community and consistency
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 sm:mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-dark-300 leading-relaxed px-4">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 sm:py-20 lg:py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 sm:mb-6">
                How It Works
              </h2>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              {[
                { step: 1, title: "Create Your Goal", description: "Set a clear, achievable goal with a target date and choose your privacy level", icon: Target },
                { step: 2, title: "Track Progress", description: "Update your progress regularly and watch your momentum build", icon: TrendingUp },
                { step: 3, title: "Get Support", description: "Share with friends, receive encouragement, and stay motivated together", icon: Users },
                { step: 4, title: "Achieve More", description: "Reach your goals faster with accountability and community backing you up", icon: CheckCircle },
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-4 sm:gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center font-heading font-bold text-lg sm:text-2xl text-white">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-dark-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="py-16 sm:py-20 lg:py-24 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-dark-700/50 rounded-2xl sm:rounded-3xl hover:border-ember-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-ember-500/20">
              {/* Animated background gradient */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-ember-500/5 via-ocean-500/5 to-sunshine-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                className="relative mb-6 sm:mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 sm:mb-6">
                  Ready to Transform Your Goals?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-dark-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Join the community and start achieving more with social accountability
                </p>
              </motion.div>

              <motion.div
                className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="group relative overflow-hidden w-full sm:w-auto"
                  >
                    <motion.span
                      className="flex items-center justify-center gap-2 relative z-10"
                      whileHover={{ x: 5 }}
                    >
                      Start Your Journey
                      <CheckCircle className="w-5 h-5" />
                    </motion.span>
                  </Button>
                </Link>

                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="group w-full sm:w-auto">
                    <motion.span
                      className="flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      Go to Dashboard
                      <Zap className="w-5 h-5" />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="py-8 sm:py-12 px-4 border-t border-dark-700">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-heading font-bold text-white">
                  Emberpad
                </span>
              </motion.div>

              {/* Links */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 sm:gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/auth/login" className="text-dark-300 hover:text-white transition-colors text-sm sm:text-base">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="text-dark-300 hover:text-white transition-colors text-sm sm:text-base">
                  Sign Up
                </Link>
                <Link href="/explore" className="text-dark-300 hover:text-white transition-colors text-sm sm:text-base">
                  Explore
                </Link>
                <Link href="/dashboard" className="text-dark-300 hover:text-white transition-colors text-sm sm:text-base">
                  Dashboard
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="text-center pt-6 sm:pt-8 border-t border-dark-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-dark-400 mb-2 text-sm sm:text-base">
                Built for the community, by goal achievers
              </p>
              <p className="text-dark-500 text-xs sm:text-sm">
                © {new Date().getFullYear()} Emberpad. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </Animation>
  );
}
