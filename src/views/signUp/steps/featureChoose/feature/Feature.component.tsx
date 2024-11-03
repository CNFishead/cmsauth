import { Badge, Button, Modal, message } from 'antd';
import styles from './Feature.module.scss';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useAllFeatures } from '@/state/serverState/features';
import { useInterfaceStore } from '@/state/interface';

type Props = {
  feature: {
    _id: string;
    name: string;
    description: string;
    price: number;
    reliesOn?: string;
  };
  isSelected?: boolean;
  isDiscount?: boolean;
};

const Feature = (props: Props) => {
  const { data: featuresData } = useAllFeatures();
  const { features, selectFeature, removeFeature } = useInterfaceStore();

  const reliesOnFeatureIsSelected = () => {
    var add = false;
    if (Boolean(props.feature.reliesOn)) {
      features.forEach((f: any) => {
        if (props.feature.reliesOn == f._id) add = true;
      });
    } else return true;
    return add;
  };

  const addFeatureToCart = () => {
    if (props.isSelected) removeFeature(props.feature);
    else {
      if (reliesOnFeatureIsSelected()) selectFeature(props.feature);
      else {
        Modal.error({
          title: 'Feature not available',
          content: `You must add the ${
            featuresData.allFeatures.find(
              (f: any) => f._id == props.feature.reliesOn
            ).name
          } feature before adding the ${props.feature.name} feature.`,
        });
      }
    }
  };
  return (
    <>
      <div
        className={`${styles.container} ${styles.available} ${
          props.isDiscount && styles.discount
        } ${props.isSelected && styles.selected}`}
      >
        <div className={styles.header}>
          {props.isSelected && <AiFillCheckCircle className={styles.icon} />}
          <div className={styles.details}>
            <h1 className={styles.title}>{props.feature.name} </h1>
            <p className={styles.description}>{props.feature.description}</p>
          </div>
        </div>
        <div className={styles.options}>
          <h1 className={styles.price}>
            {!props.isDiscount
              ? `+$${props.feature.price}`
              : `$${props.feature.price}`}
          </h1>
          {!props.isDiscount && (
            <Button type="dashed" onClick={addFeatureToCart}>
              {!props.isSelected ? 'Add to Cart' : 'Remove From Cart'}
            </Button>
          )}
        </div>
        {props.feature.reliesOn && (
          <Badge className={styles.reliesOnBadge}>
            This feature relies on the{' '}
            {
              featuresData.allFeatures.find(
                (f: any) => f._id == props.feature.reliesOn
              ).name
            }{' '}
            feature.
          </Badge>
        )}
      </div>
    </>
  );
};

export default Feature;
