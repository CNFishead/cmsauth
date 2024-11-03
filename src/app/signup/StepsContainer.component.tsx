"use client";
import React from "react";
import { Steps } from "antd";
import styles from "./StepsContainer.module.scss";
import { useInterfaceStore } from "@/state/interface";

const StepsContainer = () => {
  const { currentSignUpStep, steps } = useInterfaceStore((state) => state);

  return (
    <div className={styles.stepsContainer}>
      <Steps
        className={styles.steps}
        current={currentSignUpStep}
        items={
          Object.values(steps)
            .filter((s) => !s.isHiddenOnSteps)
            .map((step) => {
              return {
                title: (
                  <div className={styles.step}>
                    {/* {step.icon} */}
                    <span>{step.title || ""}</span>
                  </div>
                ),
                // icon: step.icon,
                // status: step.id === currentSignUpStep ? 'process' : '',
              };
            }) as any
        }
        size="small"
      />
    </div>
  );
};

export default StepsContainer;
