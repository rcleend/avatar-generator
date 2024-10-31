import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useCheckVideoStatus } from "../hooks/useCheckVideoStatus";

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
      <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
        {isLoading || (status && status !== "ready" && status !== "failed") ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">
                {status ? `Processing: ${status}` : "Checking status..."}
              </span>
            </div>
          </div>
        ) : status === "failed" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="text-center space-y-2">
              <p className="text-destructive font-medium">
                Video generation failed
              </p>
              <p className="text-sm text-muted-foreground">
                Please try generating the video again
              </p>
            </div>
          </div>
        ) : (
          <video
            src={downloadUrl}
            controls
            className="w-full h-full"
            autoPlay
            playsInline
          />
        )}
      </div>

      <Button
        onClick={handleDownload}
        disabled={!downloadUrl || status !== "ready"}
        variant="outline"
        size="lg"
        className="w-full"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Video
      </Button>
    </CardContent>
  );
};

export default DownloadVideo;
