"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Modal, Button } from "./ui";
import {
  Share,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Check,
} from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalTitle: string;
  goalId: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  goalTitle,
  goalId,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Set share URL after component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/goal/${goalId}`);
    }
  }, [goalId]);

  const shareText = `Check out my goal: ${goalTitle} on Emberpad!`;

  const handleCopy = async () => {
    if (!shareUrl) {
      alert("Share link not ready yet. Please try again.");
      return;
    }

    try {
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        // Fallback for older browsers or HTTP contexts
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand("copy");
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Fallback copy failed:", err);
          alert("Failed to copy link. Please copy manually: " + shareUrl);
        } finally {
          document.body.removeChild(textArea);
        }
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Failed to copy:", error);
      // Show the URL so user can copy manually
      prompt("Copy this link:", shareUrl);
    }
  };

  const handleShare = (platform: string) => {
    let url = "";

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "email":
        url = `mailto:?subject=${encodeURIComponent(
          goalTitle
        )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Goal">
      <div className="space-y-4 sm:space-y-6">
        {/* Goal Info */}
        <div className="flex items-center gap-3 p-4 bg-dark-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-ember-400 to-ember-600 flex items-center justify-center">
            <Share className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-dark-400">Sharing</p>
            <h3 className="font-medium text-white">{goalTitle}</h3>
          </div>
        </div>

        {/* Copy Link */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Share Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl || "Loading..."}
              readOnly
              className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500 text-sm sm:text-base"
              onClick={(e: React.MouseEvent<HTMLInputElement>) => e.currentTarget.select()}
            />
            <Button
              onClick={handleCopy}
              variant={copied ? "primary" : "secondary"}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Share on Social Media
          </label>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-3 p-4 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 rounded-xl text-[#1DA1F2] transition-all"
            >
              <Twitter className="w-5 h-5" />
              <span className="font-medium">Twitter</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-3 p-4 bg-[#4267B2]/10 hover:bg-[#4267B2]/20 border border-[#4267B2]/30 rounded-xl text-[#4267B2] transition-all"
            >
              <Facebook className="w-5 h-5" />
              <span className="font-medium">Facebook</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleShare("linkedin")}
              className="flex items-center gap-3 p-4 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border border-[#0077B5]/30 rounded-xl text-[#0077B5] transition-all"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleShare("email")}
              className="flex items-center gap-3 p-4 bg-ember-500/10 hover:bg-ember-500/20 border border-ember-500/30 rounded-xl text-ember-400 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Email</span>
            </motion.button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-700">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

