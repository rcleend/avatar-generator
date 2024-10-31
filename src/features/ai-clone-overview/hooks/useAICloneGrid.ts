import { useState, useMemo } from "react";
import { Replica } from "@/types/replica";

export const useAICloneGrid = (clones: Replica[]) => {
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

  return {
    displayedClones,
    loadedVideos,
    displayCount,
    handleLoadMore,
    handleVideoLoaded,
  };
};
