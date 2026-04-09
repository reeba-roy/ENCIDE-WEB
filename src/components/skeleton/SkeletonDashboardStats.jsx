const SkeletonDashboardStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 shimmer"
        >
          <div className="flex items-center gap-3">
            {/* Icon Skeleton */}
            <div className="w-10 h-10 rounded-xl bg-neutral-800 animate-pulse shrink-0" />
            <div className="space-y-2 flex-1">
              {/* Value Skeleton */}
              <div className="h-6 w-12 bg-neutral-800 rounded animate-pulse" />
              {/* Label Skeleton */}
              <div className="h-3 w-24 bg-neutral-800/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SkeletonDashboardStats;
