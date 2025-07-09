"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import Particles from "@/components/particles";

const NotFoundPage = () => {
  const [activeBackground, setActiveBackground] = useState(0);
  const backgrounds = [
    "linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)",
    "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
    "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {backgrounds.map((bg, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeBackground === index ? 1 : 0,
              transition: { duration: 1.5 },
            }}
            style={{ background: bg }}
          />
        ))}
        <Particles className="absolute inset-0 opacity-30" />
      </div>

      {/* Floating shapes decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 40 - 20],
              rotate: [0, Math.random() * 360],
              transition: {
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl text-center"
      >
        <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
          {/* Glowing accent */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-8xl sm:text-9xl font-bold text-white mb-4">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
              Page Not Found
            </h2>
            <p className="text-white/80 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full py-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Return Home
              </Button>
            </Link>
            <Link href="/docs" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full py-6 rounded-xl bg-white/5 border-white/20 hover:bg-white/10 text-white font-medium transition-all duration-300"
              >
                <Compass className="w-5 h-5 mr-2" />
                Browse Docs
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-sm text-white/50"
          >
            <p>Still lost? Contact our support team for help.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
