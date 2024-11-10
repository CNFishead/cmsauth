import styles from './VerifySteps.module.scss';
import { FaEnvelope, FaUserCheck } from 'react-icons/fa';

const VerifySteps = () => {
  const steps = [
    {
      title: 'Verify Email',
      icon: <FaEnvelope />,
      description: `In order to gain access to your account, we require that you verify your email address by confirming that it is valid and belongs to you. An Email has already
        been sent to your inbox with a link to verify your email address.`,
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
