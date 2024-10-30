import { Step } from "@/components/step-dialog";
import RecordTrainingVideo from "../components/RecordTrainingVideo";
import ConfirmConsentVideo from "../components/ConfirmConsentVideo";

export const STEPS: Step[] = [
  {
    id: "record",
    title: "Record Training Video",
    description:
      "Record a video used to train the AI. Make sure to follow instructions in the recording script.",
    component: RecordTrainingVideo,
  },
  {
    id: "confirm",
    title: "Confirm Recording",
    description: "Review and confirm your consent video",
    component: ConfirmConsentVideo,
  },
];
