import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Replica } from "@/types/replica";

interface AICloneGridProps {
  clones: Replica[];
}

const AICloneGrid: React.FC<AICloneGridProps> = ({ clones }) => {
  const [displayCount, setDisplayCount] = useState(() =>
    Math.min(11, clones.length)
  );
  const [loadedVideos, setLoadedVideos] = useState<Record<string, boolean>>({});

  const displayedClones = useMemo(() => {
    const reversedClones = [...clones].reverse();
    return reversedClones.slice(0, displayCount);
  }, [clones, displayCount]);

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 16, clones.length));
  };

  const handleVideoLoaded = (replicaId: string) => {
    setLoadedVideos((prev) => ({ ...prev, [replicaId]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link href="/ai-video/create" className="block">
          <Card
            className={cn(
              "group relative aspect-video flex items-center justify-center",
              "border-2 border-dashed hover:border-primary/50 transition-colors"
            )}
          >
            <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </Card>
        </Link>

        {displayedClones.map((clone) => (
          <Link
            key={clone.replica_id}
            href={`/ai-video/edit/${clone.replica_id}`}
          >
            <Card className="group relative aspect-video overflow-hidden">
              {clone.thumbnail_video_url ? (
                <>
                  {!loadedVideos[clone.replica_id] && (
                    <div className="absolute inset-0">
                      <Skeleton className="w-full h-full" />
                    </div>
                  )}
                  <video
                    src={clone.thumbnail_video_url}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    muted
                    loop
                    playsInline
                    onLoadedData={() => handleVideoLoaded(clone.replica_id)}
                    onMouseEnter={(e) => {
                      const playPromise = e.currentTarget.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(() => {
                          // Auto-play was prevented or interrupted, ignoring
                        });
                      }
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget;
                      if (video.readyState >= 2) {
                        video.pause();
                        video.currentTime = 0;
                      }
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">
                    {clone.replica_name}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-medium">
                  {clone.replica_name}
                </p>
                <p className="text-white/80 text-xs">
                  {clone.training_progress}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {displayCount < clones.length && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="w-full max-w-xs"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default AICloneGrid;
