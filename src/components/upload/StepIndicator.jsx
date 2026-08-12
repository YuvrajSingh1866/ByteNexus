import React from "react";

/**
 * StepIndicator
 * Renders the 4-step Creator Studio progress rail.
 *
 * Props:
 *  - steps: [{ id, label }]
 *  - currentStep: number (1-indexed, which step is currently active)
 */
export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isDone = stepNumber < currentStep;
        const isDisabled = stepNumber > currentStep;

        return (
          <React.Fragment key={step.id}>
            <div
              className={`step-item${isActive ? " step-item--active" : ""}${
                isDone ? " step-item--done" : ""
              }${isDisabled ? " step-item--disabled" : ""}`}
            >
              <span className="step-item__circle">
                {isDone ? "✓" : stepNumber}
              </span>
              <span className="step-item__label">{step.label}</span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`step-connector${
                  stepNumber < currentStep ? " step-connector--done" : ""
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
