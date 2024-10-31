import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EditVideoScriptProps {
  replicaDetails: any;
  onGenerateVideo: (script: string) => void;
  isGenerating: boolean;
}

const EditVideoScript: React.FC<EditVideoScriptProps> = ({
  replicaDetails,
  onGenerateVideo,
  isGenerating,
}) => {
  const [script, setScript] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateVideo(script);
  };

  return (
    <CardContent className="space-y-6">
      <div className="space-y-4">
        <video
          src={replicaDetails.thumbnail_video_url}
          controls
          className="w-full rounded-lg border aspect-video"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">New Video Script</h2>
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Enter your script here..."
            className="min-h-[200px]"
          />
        </div>

        <Button type="submit" disabled={isGenerating || !script}>
          {isGenerating ? "Generating..." : "Generate Video"}
        </Button>
      </form>
    </CardContent>
  );
};

export default EditVideoScript;
