import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useCheckVideoStatus } from "../hooks/useCheckVideoStatus";

interface DownloadVideoProps {
  videoId: string;
}

const DownloadVideo: React.FC<DownloadVideoProps> = ({ videoId }) => {
  const { mutate: checkStatus, isPending } = useCheckVideoStatus(videoId);

  const handleDownload = () => {
    checkStatus();
  };

  return (
    <CardContent className="space-y-6">
      <div className="flex justify-center">
        <Button
          onClick={handleDownload}
          disabled={isPending}
          variant="outline"
          size="lg"
          className="w-full max-w-md"
        >
          <Download className="w-4 h-4 mr-2" />
          {isPending ? "Checking Status..." : "Download Video"}
        </Button>
      </div>
    </CardContent>
  );
};

export default DownloadVideo;
