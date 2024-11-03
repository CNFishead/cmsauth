import styles from './VerifySteps.module.scss';
import { FaEnvelope, FaUserCheck } from 'react-icons/fa';

const VerifySteps = () => {
  const steps = [
    {
      title: 'Verify Email',
      icon: <FaEnvelope />,
      description:
        'In order to gain access to your account, we require that you verify your email address by confirming that it is valid and belongs to you.',
    },
    {
      title: 'Pyre Verification',
      icon: <FaUserCheck />,
      description: `We will verify your business information to ensure that you are a 
      legitimate business owner. This is to protect our users and ensure that all businesses 
      on our platform are legitimate and trustworthy. In doing so, a representative from Pyre will
      reach out to you to verify your business information. and walk you through the next steps of 
      the verification process.`,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {steps.map((step, index) => {
          return (
            <div className={styles.step} key={index}>
              <div className={styles.top}>
                <div className={styles.titleContainer}>
                  <div className={styles.iconNumber}>{index + 1}</div>

                  <div className={styles.title}>{step.title}</div>
                </div>

                <div className={styles.icon}>{step.icon}</div>
              </div>

              <div className={styles.description}>{step.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerifySteps;
