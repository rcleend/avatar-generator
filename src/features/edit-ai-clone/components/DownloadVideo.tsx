import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useCheckVideoStatus } from "../hooks/useCheckVideoStatus";
import { cn } from "@/lib/utils";

interface DownloadVideoProps {
  videoId: string;
}

const DownloadVideo: React.FC<DownloadVideoProps> = ({ videoId }) => {
  const { status, downloadUrl, isLoading } = useCheckVideoStatus(videoId);

  const handleDownload = () => {
    if (!downloadUrl) return;
    window.open(downloadUrl, "_blank");
  };

  return (
    <CardContent className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-4">
        {isLoading || (status && status !== "ready" && status !== "failed") ? (
          <>
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">
                {status ? `Status: ${status}` : "Checking status..."}
              </span>
            </div>
          </>
        ) : status === "failed" ? (
          <div className="text-center space-y-2">
            <p className="text-destructive font-medium">
              Video generation failed
            </p>
            <p className="text-sm text-muted-foreground">
              Please try generating the video again
            </p>
          </div>
        ) : (
          <Button
            onClick={handleDownload}
            disabled={!downloadUrl}
            variant="outline"
            size="lg"
            className={cn(
              "w-full max-w-md",
              status === "ready" &&
                "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Video
          </Button>
        )}
      </div>
    </CardContent>
  );
};

export default DownloadVideo;
