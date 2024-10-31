"use client";
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CompleteScreen: React.FC = () => {
  const router = useRouter();

  return (
    <CardContent className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="rounded-full bg-primary/10 p-3">
        <CheckCircle2 className="w-12 h-12 text-primary" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Upload Successful</h3>
        <p className="text-muted-foreground">
          Your video has been successfully uploaded and is being processed. You
          can now return to the overview.
        </p>
      </div>

      <Button
        onClick={() => router.push("/ai-video")}
        className="min-w-[200px]"
      >
        Return to Overview
      </Button>
    </CardContent>
  );
};

export default CompleteScreen;
