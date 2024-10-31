import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";

interface VideoStatus {
  status: string;
  download_url?: string;
  hosted_url?: string;
}

export const useCheckVideoStatus = (videoId: string) => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (): Promise<VideoStatus> => {
      const response = await fetch(`/api/ai-video?videoId=${videoId}`);
      if (!response.ok) {
        throw new Error("Failed to check video status");
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data.status !== "ready") {
        toast({
          title: "Video Status",
          description: `Current status: ${data.status}`,
          duration: 3000,
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to check video status",
        variant: "destructive",
      });
    },
  });
};
