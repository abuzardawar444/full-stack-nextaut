"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between z-100">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center space-x-2"
      >
        <Link href="/" className="text-xl font-bold text-white">
          MyApp
        </Link>
      </motion.div>

      <div className="flex items-center space-x-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex space-x-6"
        >
          <Link
            href="/features"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Documentation
          </Link>
        </motion.div>

        {session ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              >
                Dashboard
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex space-x-2"
          >
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Sign Up
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
