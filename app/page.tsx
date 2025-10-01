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
        "Create and manage your goals with beautiful progress visualization",
      color: "from-ember-400 to-ember-600",
    },
    {
      icon: Users,
      title: "Social Accountability",
      description:
        "Share goals with friends and get support from your community",
      color: "from-ocean-400 to-ocean-600",
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description:
        "Send and receive gentle nudges to stay on track with your goals",
      color: "from-sunshine-400 to-sunshine-600",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description:
        "Track your journey with detailed insights and achievement streaks",
      color: "from-success-400 to-success-600",
    },
  ];

  const stats = [
    { number: "10K+", label: "Goals Achieved" },
    { number: "5K+", label: "Active Users" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support" },
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

              <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-6 leading-tight">
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
                className="text-xl md:text-2xl text-dark-300 max-w-3xl mx-auto leading-relaxed"
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
        <div className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Why Choose <span className="text-ember-400">Emberpad</span>?
              </h2>
              <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                Built for the modern goal-setter who believes in the power of
                community accountability
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <div className="relative p-8 h-full bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-dark-700/50 rounded-2xl hover:border-ember-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-ember-500/10">
                    {/* Subtle background glow effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />

                    <motion.div
                      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      whileHover={{ rotate: 5 }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-heading font-semibold text-white mb-4 group-hover:text-ember-400 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-dark-300 leading-relaxed group-hover:text-dark-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="py-24 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative p-12 bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-dark-700/50 rounded-3xl hover:border-ember-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-ember-500/20">
              {/* Animated background gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-ember-500/5 via-ocean-500/5 to-sunshine-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                className="relative mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                  Ready to Transform Your Goals?
                </h2>
                <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of people who are already achieving more with
                  the power of social accountability
                </p>
              </motion.div>

              <motion.div
                className="relative flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/auth/signup">
                  <Button
                    variant="primary"
                    size="lg"
                    className="group relative overflow-hidden"
                  >
                    <motion.span
                      className="flex items-center gap-2 relative z-10"
                      whileHover={{ x: 5 }}
                    >
                      Start Your Journey
                      <CheckCircle className="w-5 h-5" />
                    </motion.span>
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button variant="secondary" size="lg" className="group">
                    <motion.span
                      className="flex items-center gap-2"
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
        <footer className="py-12 px-4 border-t border-dark-700">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Star className="w-5 h-5 text-ember-400" />
              <span className="text-2xl font-heading font-bold text-white">
                Emberpad
              </span>
            </motion.div>

            <motion.p
              className="text-dark-400 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Built with Next.js, Tailwind CSS, and TypeScript
            </motion.p>

            <motion.p
              className="text-dark-500 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Emberpad. All rights reserved.
            </motion.p>
          </div>
        </footer>
      </div>
    </Animation>
  );
}
