import { Skeleton } from "@shinhanqna/ui";

export default function PostLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-7 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
