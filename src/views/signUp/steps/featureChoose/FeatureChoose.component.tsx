import styles from './FeatureChoose.module.scss';
import { useAllFeatures } from '@/state/serverState/features';
import { getDiscounts, getPrice } from '@/utils/getPrice';
import { Skeleton } from 'antd';
import React from 'react';

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
        {featuresData
          ?.filter((feature: any) => {
            // return only features that dont have a reliesOn feature or if they do, that reliesOn feature is selected
            if (feature.reliesOn) {
              return features.some((f) => f._id === feature.reliesOn);
            }
            return true;
          })
          .map((feature: any) => {
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
            /
            {features.some((f) => f._id === '672e251f4738ac9c1cf8ed6a')
              ? 'year'
              : 'month'}
          </h1>
        </div>
        {/* <p className={styles.subText}> */}
        {
          // if features includes the early adopters feature, then show the amount of payment after the introductory discount
          features.some((f) => f._id === '672e251f4738ac9c1cf8ed6a') && (
            <p className={styles.subText}>
              Introductory discount: 20% off for the first year, then
              $239.88/year
            </p>
          )
        }
        {/* </p> */}
        <p className={styles.freeTrialText}>(After 14 day Free Trial)</p>
      </div>
    </div>
  );
};

export default FeaturesView;
