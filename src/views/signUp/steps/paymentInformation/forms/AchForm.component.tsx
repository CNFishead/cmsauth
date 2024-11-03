import axios from '@/utils/axios';
import {
  Form,
  Input,
  Radio,
  Select,
  Button,
  InputNumber,
  Checkbox,
} from 'antd';
import styles from './PaymentForm.module.scss';
import { useInterfaceStore } from '@/state/interface';
import { useEffect } from 'react';
import phoneNumber from '@/utils/phoneNumber';
import { states } from '@/utils/states';
import { countries } from '@/utils/countries';
import { getDiscounts, getPrice } from '@/utils/getPrice';
import { useAllFeatures } from '@/state/serverState/features';

const AchForm = () => {
  const [form] = Form.useForm();

  const {
    signUpPaymentFormValues,
    currentSignUpStep,
    setCurrentForm,
    features,
  } = useInterfaceStore((state) => state);

  const { data: featuresData } = useAllFeatures();

  useEffect(() => {
    form.setFieldsValue(signUpPaymentFormValues);
    setCurrentForm(form);
  }, [currentSignUpStep]);

  return (
    <Form form={form} className={styles.form} layout="vertical">
      <div className={styles.group}>
        <Form.Item
          name="checkname"
          label="Account Holder Name"
          tooltip="The name of the person or business that appears on the check."
          rules={[
            {
              required: true,
              message: 'Please input your Account Holder Name',
            },
          ]}
        >
          <Input
            placeholder={'Full name of the account holder'}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item
          name="checkaccount"
          label="Account Number"
          tooltip="The account number is a 9-digit number located on the bottom left of your check."
          rules={[
            { required: true, message: 'Please input card expiration date' },
          ]}
        >
          <Input placeholder={'xxxxxxxxx'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="checkaba"
          label="Routing Number"
          rules={[
            {
              required: true,
              message: 'Please input the routing number!',
            },
          ]}
          tooltip="The routing number is a 9-digit number located on the bottom left of your check."
        >
          <Input placeholder={'xxxxxxxxx'} className={styles.input} />
        </Form.Item>
      </div>

      <div className={styles.group}>
        <Form.Item
          name="billingEmail"
          label="Billing Email"
          rules={[{ required: true, message: 'Please input billing email' }]}
        >
          <Input type="email" placeholder={'Email'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Billing Phone #"
          rules={[
            {
              required: true,
              message: 'Please input billing phone number',
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            controls={false}
            formatter={(value: any) => phoneNumber(value)}
            parser={(value: any) => value.replace(/[^\d]/g, '')}
            placeholder={'Phone Number'}
            className={styles.input}
          />
        </Form.Item>
      </div>
      <Form.Item
        name="address"
        label="Billing Address"
        rules={[{ required: true, message: 'Please input billing address' }]}
      >
        <Input placeholder={'Address'} className={styles.input} />
      </Form.Item>
      <Form.Item name="address2" label="Billing Address 2">
        <Input placeholder={'Address 2'} className={styles.input} />
      </Form.Item>
      <div className={styles.group}>
        <Form.Item
          name="country"
          label="Country"
          rules={[
            { required: true, message: 'Please input your billing country' },
          ]}
          initialValue={countries[0]}
        >
          <select placeholder="Select a country" className={styles.input}>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[
            { required: true, message: 'Please input your billing state' },
          ]}
          initialValue={states[0].abbreviation}
        >
          <select placeholder="Select a state" className={styles.input}>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.abbreviation}
              </option>
            ))}
          </select>
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item
          name="zip"
          label="Zip"
          rules={[
            { required: true, message: 'Please input your billing zip code' },
          ]}
        >
          <Input placeholder={'Zip Code'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[
            { required: true, message: 'Please input your billing city' },
          ]}
        >
          <Input placeholder={'City'} className={styles.input} />
        </Form.Item>
      </div>
      <Form.Item
        name="didAgreePayment"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error('You need to agree to a recurring payment.')
                  ),
          },
        ]}
      >
        <Checkbox>
          I agree to a recurring payment of{' '}
          <strong>
            $
            {getPrice(features.concat(getDiscounts(features, featuresData)), {
              noCredits: true,
            })}
          </strong>{' '}
          to the bank account provided above on{' '}
          <strong>{new Date(Date.now() + 6.048e8 * 2).toDateString()}</strong>
        </Checkbox>
      </Form.Item>

      <Form.Item
        name="didAgreeTerms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error('You need to agree to the terms and conditions.')
                  ),
          },
        ]}
      >
        <Checkbox>
          I agree to the{' '}
          <a
            target="_blank"
            href="https://pyreprocessing.com/terms-of-use"
            className={styles.link}
          >
            <strong>Terms of Conditions</strong>
          </a>
        </Checkbox>
      </Form.Item>
    </Form>
  );
};

export default AchForm;
