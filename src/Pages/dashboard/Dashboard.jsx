import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import DashboardStats from "../../components/dashboard/DashboardStats";
import ProfileCard from "../../components/dashboard/ProfileCard";
import QuickActions from "../../components/dashboard/QuickActions";
import EventsList from "../../components/dashboard/EventsList";
import { AuthContext } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../lib/getUserDetails";
import SkeletonProfileCard from "../../components/skeleton/SkeletonProfileCard";
import { getRegisteredEvents } from "../../lib/getRegisterdEvents";
import SkeletonEventsList from "../../components/skeleton/SkeletonEventsList";
import SkeletonDashboardStats from "../../components/skeleton/SkeletonDashboardStats";

const Dashboard = ({ onLoad }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user-data"],
    queryFn: () => getUserDetails(user.uid),
    enabled: !!user?.uid,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const { data: allEvents, isPending } = useQuery({
    queryKey: ["registerd-events"],
    queryFn: () => getRegisteredEvents(userData.events),
    enabled: !!userData?.events,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden font-sans selection:bg-violet-500/30 font-display">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <LayoutDashboard className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
          </motion.div>
        </div>
        {/* Stats Overview */}
        <div className="mb-8">
          {!isPending ? (
            <DashboardStats
              upcomingCount={
                allEvents?.filter((e) => e.is_over === false).length
              }
              completedCount={allEvents?.filter((e) => e.is_over).length}
              totalEvents={allEvents?.length}
            />
          ) : (
            <SkeletonDashboardStats />
          )}
        </div>
        <div className="grid lg:grid-cols-3 gap-6 relative">
          <div className="space-y-6">
            {!isLoading && userData ? (
              <ProfileCard user={userData} />
            ) : (
              <SkeletonProfileCard />
            )}
            <QuickActions />
          </div>
          <div className="lg:col-span-2 relative">
            <div className="lg:absolute lg:inset-0 flex flex-col gap-6">
              <div className="flex-1 min-h-0">
                {!isPending ? (
                  <EventsList
                    events={allEvents?.filter((e) => e.is_over === false)}
                    title="Upcoming Events"
                    emptyMessage="No upcoming events."
                    isUpcomming={true}
                  />
                ) : (
                  <SkeletonEventsList />
                )}
              </div>
              <div className="flex-1 min-h-0">
                {!isPending ? (
                  <EventsList
                    events={allEvents?.filter((e) => e.is_over)}
                    title="Completed Events"
                    emptyMessage="No completed events yet."
                  />
                ) : (
                  <SkeletonEventsList />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
