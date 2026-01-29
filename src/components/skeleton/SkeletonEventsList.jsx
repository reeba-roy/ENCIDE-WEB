const SkeletonEventsList = () => {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl h-full flex flex-col overflow-hidden">
      <div className="p-5 border-b border-neutral-800 flex items-center justify-between flex-none bg-neutral-900/50 backdrop-blur-md z-10">
        <div className="h-6 w-32 bg-neutral-800 rounded-md animate-pulse" />
      </div>
      <div className="p-5 flex-1 overflow-hidden">
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="p-3 rounded-xl bg-neutral-900/30 border border-neutral-800 flex items-start justify-between gap-3"
            >
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-3/5 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-12 bg-neutral-800/50 rounded-full animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-16 bg-neutral-800/50 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-neutral-800/50 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-neutral-800/50 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-800/50 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SkeletonEventsList;
