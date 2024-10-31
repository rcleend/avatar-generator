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
  console.log(status, downloadUrl, isLoading);

  const handleDownload = () => {
    if (!downloadUrl) return;
    window.open(downloadUrl, "_blank");
  };

  const renderContent = () => {
    if (isLoading || (status && status !== "ready" && status !== "failed")) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] gap-4">
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">
              {status ? `Processing: ${status}` : "Checking status..."}
            </span>
          </div>
          <div className="w-full max-w-2xl aspect-video rounded-lg bg-muted/50 animate-pulse" />
        </div>
      );
    }

    if (status === "failed") {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] gap-4">
          <div className="text-center space-y-2">
            <p className="text-destructive font-medium">
              Video generation failed
            </p>
            <p className="text-sm text-muted-foreground">
              Please try generating the video again
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
          <video
            src={downloadUrl}
            controls
            className="w-full h-full"
            autoPlay
            playsInline
          />
        </div>
        <Button
          onClick={handleDownload}
          disabled={!downloadUrl}
          variant="outline"
          size="lg"
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Video
        </Button>
      </div>
    );
  };

  return <CardContent className="space-y-6">{renderContent()}</CardContent>;
};

export default DownloadVideo;
