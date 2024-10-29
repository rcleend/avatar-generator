import { Step } from "@/components/step-dialog";
import RecordConsentVideo from "../components/RecordConsentVideo";
import ConfirmConsentVideo from "../components/ConfirmConsentVideo";

export const STEPS: Step[] = [
  {
    id: "record",
    title: "Record Consent Video",
    description: "Record a short video giving consent for AI training",
    component: RecordConsentVideo,
  },
  {
    id: "confirm",
    title: "Confirm Recording",
    description: "Review and confirm your consent video",
    component: ConfirmConsentVideo,
  },
];
