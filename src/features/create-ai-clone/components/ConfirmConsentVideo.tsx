"use client";
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfirmConsentVideo } from "../hooks/useConfirmConsentVideo";

interface ConfirmConsentVideoProps {
  videoUrl: string;
  onConfirm: () => void;
  onRecordAgain: () => void;
}

const ConfirmConsentVideo: React.FC<ConfirmConsentVideoProps> = ({
  videoUrl,
  onConfirm,
  onRecordAgain,
}) => {
  const { requirements, allChecked, handleCheckboxChange } =
    useConfirmConsentVideo();

  return (
    <CardContent className="space-y-6">
      <div className="relative aspect-video">
        <video
          controls
          src={videoUrl}
          className="w-full rounded-lg border shadow-sm"
          preload="metadata"
          playsInline
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Confirm Video Requirements</h3>
        </div>

        <div className="grid gap-2 rounded-lg border p-4 bg-muted/50">
          {Object.entries(requirements).map(([key, checked]) => (
            <div
              key={key}
              onClick={() =>
                handleCheckboxChange(key as keyof typeof requirements)
              }
              className={cn(
                "flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer hover:bg-primary/10",
                checked && "bg-primary/5"
              )}
            >
              <Checkbox
                id={key}
                checked={checked}
                onCheckedChange={() =>
                  handleCheckboxChange(key as keyof typeof requirements)
                }
                onClick={(e) => e.stopPropagation()}
              />
              <div className="space-y-1">
                <p className="text-sm">
                  {key === "clearVoice" &&
                    "Voice is clear and free from background noise"}
                  {key === "headInFocus" &&
                    "Head and upper body are clearly visible and in focus"}
                  {key === "noHandsBlocking" &&
                    "Face is not blocked by hands or accessories"}
                  {key === "clothesNotBlending" &&
                    "Clothing contrasts well with the background"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <Button onClick={onRecordAgain} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Record Again
        </Button>
        <Button onClick={onConfirm} disabled={!allChecked} className="gap-2">
          Confirm
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  );
};

export default ConfirmConsentVideo;
