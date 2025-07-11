"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart2,
  Bell,
  Calendar,
  Clock,
  Mail,
  Plus,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Particles from "@/components/particles";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [activeBackground, setActiveBackground] = useState(0);
  const session = useSession();
  const backgrounds = [
    "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
    "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
    "linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)",
  ];

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      progress: 80,
      deadline: "2023-05-15",
      team: 4,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Mobile App",
      progress: 45,
      deadline: "2023-06-30",
      team: 6,
      status: "In Progress",
    },
    {
      id: 3,
      name: "Marketing Campaign",
      progress: 30,
      deadline: "2023-07-10",
      team: 3,
      status: "Planning",
    },
    {
      id: 4,
      name: "API Integration",
      progress: 95,
      deadline: "2023-04-28",
      team: 2,
      status: "Almost Done",
    },
  ]);

  // Messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alex Johnson",
      preview: "About the design system...",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      sender: "Maria Garcia",
      preview: "Meeting notes attached...",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      sender: "Sam Wilson",
      preview: "Budget approval needed...",
      time: "Mar 15",
      unread: false,
    },
  ]);

  console.log(setMessages);
  console.log(setProjects);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Calendar functions
  const daysInMonth = (month: Date) => {
    return new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: Date) => {
    return new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  };

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);
    const days = [];

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`prev-${i}`} className="size-8"></div>);
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const hasEvent = i % 5 === 0; // Simulate events

      days.push(
        <button
          key={`day-${i}`}
          onClick={() => setSelectedDate(date)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors ${
            isSelected
              ? "bg-blue-500 text-white"
              : "hover:bg-white/10 text-white/90"
          }`}
        >
          {i}
          {hasEvent && !isSelected && (
            <span className="absolute bottom-1 h-1 w-1 rounded-full bg-blue-400"></span>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <>
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
                transition: { duration: 2 },
              }}
              style={{ background: bg }}
            />
          ))}
          <Particles className="absolute inset-0 opacity-10" />
        </div>

        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 p-4 hidden md:block mt-14">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col"
          >
            <div className="mb-8 p-2">
              <h2 className="text-xl font-bold text-white">Dashboard</h2>
            </div>

            <nav className="flex-1 space-y-1">
              {[
                {
                  name: "Overview",
                  icon: <BarChart2 className="h-5 w-5" />,
                  current: true,
                },
                { name: "Projects", icon: <Activity className="h-5 w-5" /> },
                { name: "Calendar", icon: <Calendar className="h-5 w-5" /> },
                { name: "Team", icon: <Users className="h-5 w-5" /> },
                {
                  name: "Messages",
                  icon: <Mail className="h-5 w-5" />,
                  badge: 3,
                },
                { name: "Settings", icon: <Settings className="h-5 w-5" /> },
              ].map((item) => (
                <motion.div key={item.name} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      item.current
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {session.data?.user?.name}
                  </p>
                  <p className="text-xs text-white/60">Admin</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          {/* Header */}
          <header className="sticky top-0 z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Mobile menu button would go here */}
                <div className="flex md:hidden items-center">
                  <button className="text-white/70 hover:text-white mr-4">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <h1 className="text-lg font-semibold text-white">
                    Dashboard
                  </h1>
                </div>

                <div className="flex-1 flex justify-between items-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="hidden md:block text-white"
                  >
                    <h1 className="text-xl font-semibold">
                      Dashboard Overview
                    </h1>
                  </motion.div>

                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-white/50" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20"
                      />
                    </div>

                    <button className="relative text-white/70 hover:text-white">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {[
                {
                  name: "Total Projects",
                  value: "12",
                  icon: <Activity className="h-6 w-6" />,
                  change: "+2",
                },
                {
                  name: "Active Tasks",
                  value: "28",
                  icon: <Clock className="h-6 w-6" />,
                  change: "+5",
                },
                {
                  name: "Team Members",
                  value: "8",
                  icon: <Users className="h-6 w-6" />,
                  change: "+1",
                },
                {
                  name: "Upcoming Deadlines",
                  value: "3",
                  icon: <Calendar className="h-6 w-6" />,
                  change: "",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">
                        {stat.name}
                      </p>
                      <p className="text-2xl font-semibold text-white mt-1">
                        {stat.value}
                      </p>
                      {stat.change && (
                        <p className="text-sm text-green-400 mt-1">
                          {stat.change} from last week
                        </p>
                      )}
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Projects and Calendar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Projects */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                      Your Projects
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View all
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div key={project.id} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">
                            {project.name}
                          </h3>
                          <div className="flex items-center space-x-3">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                project.status === "In Progress"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : project.status === "Planning"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              {project.status}
                            </span>
                            <span className="text-sm text-white/60">
                              {new Date(project.deadline).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 1 }}
                              className={`h-full ${
                                project.progress < 30
                                  ? "bg-red-500"
                                  : project.progress < 70
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              } rounded-full`}
                            />
                          </div>
                          <span className="text-sm font-medium text-white">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {[...Array(project.team)].map((_, i) => (
                              <div
                                key={i}
                                className="h-8 w-8 rounded-full bg-blue-500/20 border-2 border-white/10 flex items-center justify-center text-xs text-white"
                              >
                                {i + 1}
                              </div>
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/60 hover:text-white"
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Calendar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                      Calendar
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() - 1
                            )
                          )
                        }
                        className="p-1 text-white/70 hover:text-white"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <span className="text-sm font-medium text-white">
                        {currentMonth.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() + 1
                            )
                          )
                        }
                        className="p-1 text-white/70 hover:text-white"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-sm text-white/60"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendarDays()}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-white mb-2">
                      Events for{" "}
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <div className="space-y-2">
                      {selectedDate.getDate() % 3 === 0 && (
                        <div className="flex items-start p-2 rounded-lg bg-blue-500/20">
                          <div className="h-2 w-2 rounded-full bg-blue-400 mt-1.5 mr-2"></div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              Team Meeting
                            </p>
                            <p className="text-xs text-white/60">
                              10:00 AM - 11:30 AM
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedDate.getDate() % 5 === 0 && (
                        <div className="flex items-start p-2 rounded-lg bg-purple-500/20">
                          <div className="h-2 w-2 rounded-full bg-purple-400 mt-1.5 mr-2"></div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              Project Deadline
                            </p>
                            <p className="text-xs text-white/60">End of day</p>
                          </div>
                        </div>
                      )}
                      {selectedDate.getDate() % 7 === 0 && (
                        <div className="flex items-start p-2 rounded-lg bg-green-500/20">
                          <div className="h-2 w-2 rounded-full bg-green-400 mt-1.5 mr-2"></div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              Client Call
                            </p>
                            <p className="text-xs text-white/60">
                              2:00 PM - 3:00 PM
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity and Messages */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Recent Activity
                  </h2>

                  <div className="space-y-6">
                    {[
                      {
                        id: 1,
                        user: "Alex Johnson",
                        action: "completed the website redesign",
                        time: "2h ago",
                      },
                      {
                        id: 2,
                        user: "Maria Garcia",
                        action: "uploaded new assets",
                        time: "4h ago",
                      },
                      {
                        id: 3,
                        user: "Sam Wilson",
                        action: "commented on mobile app project",
                        time: "1d ago",
                      },
                      {
                        id: 4,
                        user: "Taylor Smith",
                        action: "approved the budget",
                        time: "1d ago",
                      },
                    ].map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <User className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-white">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.action}
                          </p>
                          <p className="text-xs text-white/50 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Messages */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                      Messages
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View all
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          message.unread ? "bg-blue-500/10" : "hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                            <User className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h4
                                className={`text-sm font-medium truncate ${
                                  message.unread
                                    ? "text-white"
                                    : "text-white/90"
                                }`}
                              >
                                {message.sender}
                              </h4>
                              <span className="text-xs text-white/50 ml-2 whitespace-nowrap">
                                {message.time}
                              </span>
                            </div>
                            <p
                              className={`text-sm truncate ${
                                message.unread ? "text-white" : "text-white/60"
                              }`}
                            >
                              {message.preview}
                            </p>
                          </div>
                          {message.unread && (
                            <span className="ml-2 h-2 w-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
