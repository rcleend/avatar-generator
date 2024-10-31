import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface VideoStatus {
  status: string;
  download_url?: string;
  hosted_url?: string;
}

export const useCheckVideoStatus = (videoId: string) => {
  const { toast } = useToast();
  const enabled = Boolean(videoId);

  const { data, error, isLoading } = useQuery({
    queryKey: ["videoStatus", videoId],
    queryFn: async (): Promise<VideoStatus> => {
      const response = await fetch(`/api/ai-video?videoId=${videoId}`);
      if (!response.ok) {
        throw new Error("Failed to check video status");
      }
      return response.json();
    },
    enabled,
    refetchInterval: (query) => {
      if (!query.state.data || query.state.data.status === "failed")
        return false;
      return query.state.data.status !== "ready" ? 3000 : false;
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to check video status",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return {
    status: data?.status,
    downloadUrl: data?.download_url,
    isLoading,
    error,
  };
};
