"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Shield,
  BarChart,
  Code,
  Server,
  Zap,
  Globe,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Particles from "@/components/particles";

const FeaturesPage = () => {
  const [activeBackground, setActiveBackground] = useState(0);
  const backgrounds = [
    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Optimized for maximum performance with near-instant load times",
      highlight: false,
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "End-to-end encryption and regular security audits",
      highlight: true,
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Real-time data visualization and custom reporting",
      highlight: false,
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Developer Friendly",
      description: "Comprehensive API and detailed documentation",
      highlight: false,
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "99.9% Uptime",
      description: "Distributed infrastructure with automatic failover",
      highlight: false,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automation Tools",
      description: "Streamline workflows with powerful automation",
      highlight: true,
    },
    {
      icon: <Globe className="size-8" />,
      title: "Global Infrastructure",
      description: "Data centers in 12 regions worldwide",
      highlight: false,
    },
    {
      icon: <Users className="size-8" />,
      title: "Team Collaboration",
      description: "Built-in tools for seamless teamwork",
      highlight: false,
    },
  ];

  return (
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

      {/* Header */}
      {/* <header className="w-full p-4 backdrop-blur-md bg-white/5 border-b border-white/10">
        <Navbar />
      </header> */}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-24">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
          >
            <Rocket className="w-5 h-5 mr-2 text-white" />
            <span className="text-sm font-medium text-white">
              Powerful Features
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Everything You Need
            </span>
          </h1>

          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our platform provides all the tools you need to succeed in
            today&apos;s fast-paced digital world. Explore the features that set
            us apart.
          </p>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className={`rounded-2xl p-8 backdrop-blur-sm border ${
                feature.highlight
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/30 shadow-lg shadow-blue-500/10"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div
                className={`p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 ${
                  feature.highlight
                    ? "bg-white text-blue-600"
                    : "bg-blue-500/20 text-white"
                }`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/80 mb-8">
              Join thousands of satisfied customers using our platform to power
              their business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="py-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                Get Started for Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="py-6 rounded-xl bg-white/5 border-white/20 hover:bg-white/10 text-white font-medium transition-all duration-300"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-white/50 backdrop-blur-md bg-white/5 border-t border-white/10">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;
