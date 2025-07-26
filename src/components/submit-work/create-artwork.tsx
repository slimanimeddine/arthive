"use client";

import { classNames } from "@/lib/utils";
import useArtworkStore from "@/stores/artwork-store";
import FirstStep from "./first-step";
import FourthStep from "./fourth-step";
import SecondStep from "./second-step";
import ThirdStep from "./third-step";

export default function CreateArtwork() {
  const { step, setStep, isStepValid } = useArtworkStore();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <FourthStep />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    setStep(Math.max(step - 1, 1));
  };

  const handleNext = () => {
    setStep(Math.min(step + 1, 4));
  };

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-gray-100 p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Create Artwork</h1>
      {renderStep()}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className={classNames(
            "rounded-md px-4 py-2 text-white transition-colors",
            step === 1
              ? "cursor-not-allowed bg-gray-400"
              : "bg-gray-500 hover:bg-gray-600",
          )}
          disabled={step === 1} // Disable "Back" on the first step
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className={classNames(
            "rounded-md px-4 py-2 text-white transition-colors",
            isStepValid()
              ? "bg-indigo-500 hover:bg-indigo-600"
              : "cursor-not-allowed bg-gray-400",
          )}
          disabled={!isStepValid()} // Disable "Next" if the current step is not valid
        >
          {step === 4 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
