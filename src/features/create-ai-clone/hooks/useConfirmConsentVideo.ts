import { useState } from "react";

interface ConsentRequirements {
  clearVoice: boolean;
  headInFocus: boolean;
  noHandsBlocking: boolean;
  clothesNotBlending: boolean;
}

export function useConfirmConsentVideo() {
  const [requirements, setRequirements] = useState<ConsentRequirements>({
    clearVoice: false,
    headInFocus: false,
    noHandsBlocking: false,
    clothesNotBlending: false,
  });

  const allChecked = Object.values(requirements).every(Boolean);

  const handleCheckboxChange = (requirement: keyof ConsentRequirements) => {
    setRequirements((prev) => ({ ...prev, [requirement]: !prev[requirement] }));
  };

  return {
    requirements,
    allChecked,
    handleCheckboxChange,
  };
}
