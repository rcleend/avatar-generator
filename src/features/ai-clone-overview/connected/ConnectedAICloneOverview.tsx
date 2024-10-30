"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AICloneGrid from "../components/AICloneGrid";
import { useQuery } from "@tanstack/react-query";

interface ConnectedAICloneOverviewProps {
  initialClones: any[];
}

const ConnectedAICloneOverview: React.FC<ConnectedAICloneOverviewProps> = ({
  initialClones,
}) => {
  const { data } = useQuery({
    queryKey: ["clones"],
    queryFn: () => ({ data: initialClones }),
    initialData: { data: initialClones },
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl">AI Clones</CardTitle>
            <CardDescription>
              Create and manage your AI video clones
            </CardDescription>
          </CardHeader>
        </Card>
        <AICloneGrid clones={data?.data || []} />
      </div>
    </div>
  );
};

export default ConnectedAICloneOverview;