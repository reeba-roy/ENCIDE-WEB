import { motion } from "framer-motion";

const SkeletonModel = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-neutral-900 border border-red-500/20 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl overflow-hidden"
      >
        {/* Close Button Skeleton */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-800 animate-pulse" />
        <div className="relative z-10">
          {/* Icon Skeleton */}
          <div className="w-12 h-12 rounded-xl bg-neutral-800 animate-pulse mb-6 border border-neutral-700/50" />
          {/* Title Skeleton */}
          <div className="h-8 w-3/4 bg-neutral-800 rounded-lg animate-pulse mb-3" />
          {/* Paragraph Skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-neutral-800 rounded animate-pulse" />
          </div>
          {/* Info Box Skeleton */}
          <div className="bg-neutral-800/30 rounded-xl p-4 mb-8 border border-neutral-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-neutral-700 animate-pulse" />
              <div className="h-4 w-1/2 bg-neutral-700 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-neutral-700 animate-pulse" />
              <div className="h-4 w-2/3 bg-neutral-700 rounded animate-pulse" />
            </div>
          </div>
          {/* Buttons Skeleton */}
          <div className="flex gap-3">
            <div className="flex-1 h-11 rounded-lg bg-neutral-800 animate-pulse" />
            <div className="flex-1 h-11 rounded-lg bg-neutral-800 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default SkeletonModel;
