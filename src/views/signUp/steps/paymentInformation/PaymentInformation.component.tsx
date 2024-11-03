import { AiOutlineBank, AiOutlineCreditCard } from 'react-icons/ai';
import styles from './PaymentInformation.module.scss';
import { Button, Card } from 'antd';
import { useInterfaceStore } from '@/state/interface';

import CardForm from './forms/CardForm.component';
import { AnimatePresence, motion } from 'framer-motion';
import AchForm from './forms/AchForm.component';

const PaymentInformationForm = () => {
  const { paymentMethod, setPaymentMethod } = useInterfaceStore(
    (state) => state
  );
  const getForm = () => {
    switch (paymentMethod) {
      case 'ach':
        return (
          <>
            <div className={styles.paymentHeader}>
              <AiOutlineBank />
              Bank Account (ACH)
            </div>
            <AchForm />
          </>
        );
      case 'card':
        return (
          <div>
            <div className={styles.paymentHeader}>
              <AiOutlineCreditCard />
              Credit/Debit Card
            </div>
            <CardForm />
          </div>
        );
      default:
        return (
          <div>
            <h1 className={styles.header}>Select your payment method</h1>
            <Button
              className={styles.paymentMethodButton}
              onClick={() => setPaymentMethod('ach')}
            >
              <AiOutlineBank />
              <span>Bank Account (ACH)</span>
            </Button>
            <Button
              className={styles.paymentMethodButton}
              onClick={() => setPaymentMethod('card')}
            >
              <AiOutlineCreditCard />
              <span>Credit/Debit Card</span>
            </Button>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <AnimatePresence initial={true} mode="wait">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.3,
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
          key={paymentMethod}
        >
          {getForm()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PaymentInformationForm;

// async function checkCouponCode() {
//   try {
//     const { data } = await axios.post(`/coupon/check`, { code });
//     if (data.success === true) {
//       // alert the user that the username is taken
//       setCouponCodeValid(true);
//       setDiscount(data.coupon.discount);
//       dispatch(
//         setAlert(
//           `You received a ${data.coupon.discount.toFixed(2)}% discount`,
//           'success'
//         )
//       );
//     } else {
//       setCouponCodeValid(false);
//       setDiscount(0);
//     }
//   } catch (err) {
//     setCouponCodeValid(false);
//     setDiscount(0);
//   }
// }
