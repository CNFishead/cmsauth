import { useInterfaceStore } from '@/state/interface';
import styles from './ShoppingCart.module.scss';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getDiscounts, getPrice } from '@/utils/getPrice';
import { Button, FloatButton } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useAllFeatures } from '@/state/serverState/features';
import { useState } from 'react';
type Props = {};

const ShoppingCart = (props: Props) => {
  // const { data: featuresData } = useAllFeatures();
  const { features, setCurrentSignUpStep } = useInterfaceStore(
    (state) => state
  );

  const [isOpen, setIsOpen] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {features.length > 0 && (
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.container} ${isOpen ? styles.open : ''}`}
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
          exit={{ y: 200 }}
        >
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                className={`${styles.top} `}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
              >
                <h1 className={styles.title}>Chosen Features</h1>
                {features.map((feature) => (
                  <div className={styles.feature}>
                    <p className={styles.featureName}>{feature.name}</p>
                    <p className={styles.featurePrice}>${feature.price}</p>
                  </div>
                ))}

                {getDiscounts(
                  features,
                  // TODO: Uncomment this if you add features -> featuresData
                  []
                ).map((feature) => (
                  <div className={styles.feature}>
                    <p className={styles.featureName}>{feature.name}</p>
                    <p className={styles.featurePrice}>${feature.price}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            className={styles.bottom}
            whileHover={{
              y: 5,
            }}
            whileTap={{
              y: 10,
            }}
          >
            <div className={styles.info}>
              <Button
                className={styles.button}
                type="primary"
                onClick={() => {
                  setCurrentSignUpStep(1);
                }}
              >
                Change Features
              </Button>

              <h1 className={styles.price}>
                Total:{' '}
                <span>
                  ${' '}
                  {getPrice(
                    features.concat(
                      getDiscounts(
                        features,
                        // TODO: uncomment when features added -> featuresData
                        []
                      )
                    ),
                    {
                      noCredits: true,
                    }
                  )}
                  /Month{' '}
                  <p className={styles.freeTrialText}>
                    (After 14 day Free Trial)
                  </p>
                </span>
              </h1>
              {/* <p className={styles.features}>{features.length} Features</p> */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
