import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TodoSkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="md:p-4 my-2">
          <div className="flex justify-between items-center mx-4">
            <div className="flex gap-6 mr-2 items-center w-full">
              <Skeleton className="h-5 w-5 rounded-sm" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col gap-1">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default TodoSkeleton;
