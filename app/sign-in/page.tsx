"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert, Rocket, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "@/components/particles";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [activeBackground, setActiveBackground] = useState(0);
  const [hoveredProvider, setHoveredProvider] = useState<string | null>(null);

  const backgrounds = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
    "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/");
      toast.success("Welcome back!", {
        icon: <Rocket className="text-primary" />,
      });
    } else if (res?.status === 401) {
      setError("Invalid Credentials");
      setPending(false);
    } else {
      setError("Something went wrong");
    }
  };

  const handleProvider = (provider: "github" | "google" | "discord") => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
        <Particles className="absolute inset-0 opacity-70" />
      </div>

      {/* Floating stars decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
              transition: {
                duration: Math.random() * 5 + 3,
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
        className="w-full max-w-md px-4"
      >
        <Card className="relative overflow-hidden border-none shadow-2xl bg-white/10 backdrop-blur-lg">
          {/* Glowing accent */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          <CardHeader className="relative z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Welcome Back!
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CardDescription className="text-center text-sm text-white/80 mt-2">
                Ready to continue your journey?
              </CardDescription>
            </motion.div>
          </CardHeader>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500 mx-6 mb-4">
                  <TriangleAlert className="flex-shrink-0" />
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <CardContent className="relative z-10 px-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  type="email"
                  disabled={pending}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Input
                  type="password"
                  disabled={pending}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 relative overflow-hidden group"
                  size="lg"
                  disabled={pending}
                >
                  <span className="relative z-10 flex items-center">
                    {pending ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Continue
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center my-6"
            >
              <Separator className="flex-1 bg-white/20" />
              <span className="px-4 text-white/50 text-sm">OR</span>
              <Separator className="flex-1 bg-white/20" />
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { provider: "google", icon: <FcGoogle className="w-5 h-5" /> },
                {
                  provider: "github",
                  icon: <FaGithub className="w-5 h-5 text-gray-800" />,
                },
                {
                  provider: "discord",
                  icon: <FaDiscord className="w-5 h-5 text-indigo-500" />,
                },
              ].map(({ provider, icon }) => (
                <motion.div
                  key={provider}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay:
                      0.8 +
                      0.1 * ["google", "github", "discord"].indexOf(provider),
                  }}
                  whileHover={{ y: -3 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className={`w-full rounded-xl bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300 ${
                      hoveredProvider === provider ? "shadow-lg scale-105" : ""
                    }`}
                    onMouseEnter={() => setHoveredProvider(provider)}
                    onMouseLeave={() => setHoveredProvider(null)}
                    onClick={() =>
                      handleProvider(
                        provider as "github" | "google" | "discord"
                      )
                    }
                  >
                    <span className="flex items-center justify-center">
                      {icon}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center mt-6 text-white/70 text-sm"
            >
              New here?{" "}
              <Link
                href="/sign-up"
                className="text-white font-medium hover:text-purple-300 transition-colors duration-300 underline underline-offset-4 decoration-purple-400"
              >
                Create an account
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignIn;
