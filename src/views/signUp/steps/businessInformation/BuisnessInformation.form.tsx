import React from 'react';
import styles from './BusinessInformation.module.scss';
import { Form, Input, Select } from 'antd';
import { useInterfaceStore } from '@/state/interface';

const BuisnessInformation = () => {
  const [form] = Form.useForm();
  const { signUpUserFormValues, setCurrentForm } = useInterfaceStore(
    (state) => state
  );

  React.useEffect(() => {
    form.setFieldsValue(signUpUserFormValues.businessInfo);
    setCurrentForm(form);
  }, []);

  return (
    <Form
      form={form}
      className={styles.form}
      initialValues={{ sex: 'male' }}
      layout="vertical"
    >
      <div className={styles.group}>
        <Form.Item
          name="name"
          label="Business Name"
          rules={[
            {
              required: true,
              message: 'Please enter your Business Name',
            },
          ]}
          tooltip="This is the name of your business, as it appears on your business license."
        >
          <Input className={styles.input} placeholder="Business Name" />
        </Form.Item>
      </div>

      <div className={styles.group}>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please enter your address',
            },
          ]}
        >
          <Input className={styles.input} placeholder="XXX main st" />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: 'Please enter your city',
            },
          ]}
        >
          <Input className={styles.input} placeholder="City" />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[
            {
              required: true,
              message: 'Please enter your state',
            },
          ]}
        >
          <Input className={styles.input} placeholder="State" />
        </Form.Item>
        <Form.Item
          name="zipcode"
          label="Zip"
          rules={[
            {
              required: true,
              message: 'Please enter your zip',
            },
          ]}
        >
          <Input className={styles.input} placeholder="Zip" />
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item
          name="email"
          label="Business Email"
          rules={[
            {
              required: true,
              message: 'Please enter your business email address',
            },
          ]}
        >
          <Input
            className={styles.input}
            placeholder="example@yourbusiness.com"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Business Phone Number"
          rules={[
            {
              required: true,
              message: 'Please enter your phone number',
            },
          ]}
        >
          <Input className={styles.input} placeholder="XXX-XXX-XXXX" />
        </Form.Item>
      </div>

      <div className={styles.group}>
        <Form.Item
          name={'ein'}
          label={'EIN'}
          rules={[
            {
              required: true,
              message: 'Please enter your EIN',
            },
          ]}
          tooltip="This is the EIN or TIN of your business, as it appears on your business license, this is your Tax ID."
        >
          <Input className={styles.input} placeholder="EIN" />
        </Form.Item>
        <Form.Item
          name={'expectedMonthlyRevenue'}
          label={'Expected Monthly Revenue'}
          rules={[]}
          tooltip="Expected monthly revenue from your business, Gross Revenue. This is the total amount of money your business makes before any expenses are deducted."
          initialValue={'0-10k'}
        >
          <Select
            placeholder="Select"
            className={styles.select}
            options={[
              { value: '0-10k', label: '0-10k' },
              { value: '10k-50k', label: '10k-50k' },
              { value: '50k-100k', label: '50k-100k' },
              { value: '100k-500k', label: '100k-500k' },
              { value: '500k-1M', label: '500k-1M' },
              { value: '1M+', label: '1M+' },
            ]}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default BuisnessInformation;
