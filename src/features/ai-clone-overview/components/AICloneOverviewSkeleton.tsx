import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AICloneOverviewSkeleton = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl">AI Clones</CardTitle>
            <CardDescription>
              Create and manage your AI video clones
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Skeleton Cards */}
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} className="relative aspect-video overflow-hidden">
              <Skeleton className="w-full h-full" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AICloneOverviewSkeleton;
