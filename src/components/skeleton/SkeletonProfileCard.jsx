const SkeletonProfileCard = () => {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden h-full">
      <div className="h-24 bg-neutral-800/50 animate-pulse" />
      <div className="px-6 pb-6 -mt-12 text-center">
        <div className="w-24 h-24 mx-auto rounded-full border-4 border-neutral-950 bg-neutral-800 animate-pulse mb-3 relative z-10" />
        <div className="h-6 w-48 bg-neutral-800 rounded mx-auto mb-2 animate-pulse" />
        <div className="h-4 w-32 bg-neutral-800/50 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-8 w-32 bg-neutral-800 rounded-lg mx-auto animate-pulse" />
      </div>
      <div className="h-px bg-neutral-800 mx-6 mb-6" />
      <div className="px-6 pb-6 space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 animate-pulse shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-16 bg-neutral-800/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonProfileCard;
