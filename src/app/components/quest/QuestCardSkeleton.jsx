export default function QuestCardSkeleton() {
  return (
    <div className="glass-card p-6 animate-pulse">
      {/* Icon + Title Skeleton */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-slate-700 rounded-lg" />
        <div className="flex-1">
          <div className="h-6 bg-slate-700 rounded w-3/4" />
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-700 rounded w-5/6" />
        <div className="h-4 bg-slate-700 rounded w-4/6" />
      </div>

      {/* Tags Skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 w-16 bg-slate-700 rounded" />
        <div className="h-6 w-20 bg-slate-700 rounded" />
        <div className="h-6 w-14 bg-slate-700 rounded" />
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-slate-700 rounded" />
        <div className="h-4 w-16 bg-slate-700 rounded" />
      </div>
    </div>
  );
}