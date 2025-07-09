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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert, Rocket, Sparkles, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "@/components/particles";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeBackground, setActiveBackground] = useState(0);
  const [hoveredProvider, setHoveredProvider] = useState<string | null>(null);
  const router = useRouter();

  const backgrounds = [
    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully!", {
          icon: <Rocket className="text-primary" />,
          description: "You can now sign in with your credentials",
        });
        router.push("/sign-in");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      setError("Network error - please try again");
    } finally {
      setPending(false);
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
        className="w-full max-w-md px-4"
      >
        <Card className="relative overflow-hidden border-none shadow-2xl bg-white/10 backdrop-blur-lg">
          {/* Glowing accent */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          <CardHeader className="relative z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Join Us Today!
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CardDescription className="text-center text-sm text-white/80 mt-2">
                Start your journey with just a few details
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
              {[
                {
                  name: "name",
                  placeholder: "Full Name",
                  type: "text",
                  icon: <UserPlus className="w-4 h-4 mr-2" />,
                },
                {
                  name: "email",
                  placeholder: "Email Address",
                  type: "email",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  ),
                },
                {
                  name: "password",
                  placeholder: "Password",
                  type: "password",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  ),
                },
                {
                  name: "confirmPassword",
                  placeholder: "Confirm Password",
                  type: "password",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  ),
                },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="relative">
                    <Input
                      type={field.type}
                      disabled={pending}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={(e) =>
                        setForm({ ...form, [field.name]: e.target.value })
                      }
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                      {field.icon}
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 relative overflow-hidden group"
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
                        Creating account...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Sign Up
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
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
                      0.9 +
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
              transition={{ delay: 1.2 }}
              className="text-center mt-6 text-white/70 text-sm"
            >
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-white font-medium hover:text-blue-300 transition-colors duration-300 underline underline-offset-4 decoration-blue-400"
              >
                Sign In
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
