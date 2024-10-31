import { Step } from "@/components/step-dialog";
import DownloadVideo from "../components/DownloadVideo";
import EditVideoScript from "../components/EditVideoScript";

export const STEPS: Step[] = [
  {
    id: "edit",
    title: "Edit Video Script",
    description:
      "Review your original video and write a script for the new one",
    component: EditVideoScript,
  },
  {
    id: "download",
    title: "Download Generated Video",
    description: "Your video has been generated and is ready for download",
    component: DownloadVideo,
  },
];
