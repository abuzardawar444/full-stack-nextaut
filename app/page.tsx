"use client";
import { SessionProvider } from "next-auth/react";
import { motion } from "framer-motion";
import { Sparkles, Shield, BarChart2, Settings, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Particles from "@/components/particles";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [activeBackground, setActiveBackground] = useState(0);
  const backgrounds = [
    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const features = [
    {
      icon: <BarChart2 className="size-8" />,
      title: "Advanced Analytics",
      description: "Track your performance with real-time data visualization",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Enterprise-grade security protecting your data",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration Tools",
      description: "Work seamlessly with your team members",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Customization",
      description: "Tailor the platform to your specific needs",
    },
  ];

  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
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
          {[...Array(20)].map((_, i) => (
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

        {/* Header */}

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
            >
              <Sparkles className="w-5 h-5 mr-2 text-white" />
              <span className="text-sm font-medium text-white">
                Welcome back!
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Your Dashboard
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
              Manage your account, access personalized features, and explore
              tools tailored to your needs.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mb-16"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 w-full sm:w-64 text-left"
                >
                  <div className="bg-blue-500/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
                Get Started
              </Button>
              <Button className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-sm text-white/50 backdrop-blur-md bg-white/5 border-t border-white/10">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </SessionProvider>
  );
};

export default HomePage;
