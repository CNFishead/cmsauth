import styles from './FeatureChoose.module.scss';
import { useAllFeatures } from '@/state/serverState/features';
import { getDiscounts, getPrice } from '@/utils/getPrice';
import { Button, Empty, message, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Feature from './feature/Feature.component';
import { useInterfaceStore } from '@/state/interface';

type Props = {};

const FeaturesView = (props: Props) => {
  const { data: featuresData, isLoading } = useAllFeatures();

  const { features } = useInterfaceStore();

  if (isLoading) return <Skeleton active />;

  return (
    <div className={styles.container}>
      <div className={styles.features}>
        {featuresData?.map((feature: any) => {
          return (
            <Feature
              feature={feature}
              key={feature._id}
              isSelected={features.includes(feature)}
            />
          );
        })}
        {getDiscounts(features, featuresData).map((feature) => {
          return <Feature feature={feature} key={feature._id} isDiscount />;
        })}
      </div>
      <div className={styles.pricingContainer}>
        <div className={styles.price}>
          <h1 className={styles.total}>Total:</h1>
          <h1 className={styles.totalPrice}>
            $
            {getPrice(features.concat(getDiscounts(features, featuresData)), {
              noCredits: true,
            })}
            /Month
          </h1>
        </div>
        <p className={styles.subText}>Not including any applicable taxes, if any.</p>
        <p className={styles.freeTrialText}>(After 14 day Free Trial)</p>
      </div>
    </div>
  );
};

export default FeaturesView;
