import { Button, Form, Input, message, Select } from 'antd';
import styles from './PaymentForm.module.scss';
import formStyles from '@/styles/Form.module.scss';
import { useInterfaceStore } from '@/state/interface';
import { useEffect, useState } from 'react';
import { states } from '@/data/states';
import { countries } from '@/data/countries';

const AchForm = () => {
  const [form] = Form.useForm();
  const [country, setCountry] = useState(countries[0]);
  const {
    signUpPaymentFormValues,
    setCurrentForm,
    setSignUpPaymentFormValues,
    // disableForm,
  } = useInterfaceStore((state) => state);

  const onFinish = async (values: any) => {
    const isValid = await form.validateFields();
    if (!isValid) {
      message.error('Please fill out all required fields');
      return;
    }
    setSignUpPaymentFormValues(values);
  };

  useEffect(() => {
    form.setFieldsValue(signUpPaymentFormValues);
    setCurrentForm(form);
  }, []);
  console.log(signUpPaymentFormValues);

  return (
    <Form
      form={form}
      className={styles.form}
      layout="vertical"
      onFinish={onFinish}
      // disabled={disableForm}
      initialValues={{
        achDetails: {
          // checkname: 'John Doe',
          // checkaccount: '24413815',
          // checkaba: '490000018',
          // account_type: 'checking',
          // account_holder_type: 'personal',
        },
        // address1: '123 Main St',
        // address2: 'Apt 4',
        // zip: '12345',
        // city: 'New York',
        // state: 'NY',
      }}
    >
      <div className={styles.group}>
        <Form.Item
          name={['achDetails', 'checkname']}
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
          name={['achDetails', 'checkaccount']}
          label="Account Number"
          tooltip="The account number is a 9-digit number located on the bottom left of your check."
          rules={[
            { required: true, message: 'Please input card expiration date' },
          ]}
        >
          <Input
            placeholder={
              signUpPaymentFormValues?.achDetails?.checkaccount
                ? signUpPaymentFormValues?.achDetails?.checkaccount
                : 'xxxxxxxx'
            }
            className={styles.input}
          />
        </Form.Item>
        <Form.Item
          name={['achDetails', 'checkaba']}
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
          name={['achDetails', 'account_type']}
          label="Account Type"
          rules={[]}
        >
          <Select
            placeholder="Select an account type"
            className={styles.input}
            defaultValue={'checking'}
          >
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['achDetails', 'account_holder_type']}
          label="Account Holder Type"
          rules={[]}
        >
          <Select
            defaultValue={'personal'}
            placeholder="Select an account holder type"
            className={styles.input}
          >
            <option value="personal">Personal</option>
            <option value="business">Business</option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        name="address1"
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
          <Select placeholder="Select a country" className={styles.input}>
            {countries.map((country) => (
              <option
                onSelect={() => setCountry(country)}
                key={country}
                value={country}
              >
                {country}
              </option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[
            { required: true, message: 'Please input your billing state' },
          ]}
          initialValue={states[0].abbreviation}
        >
          <Select placeholder="Select a state" className={styles.input}>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.abbreviation}
              </option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item
          name="zip"
          label="Zip"
          rules={[
            { required: true, message: 'Please input customer zip code' },
          ]}
        >
          <Input placeholder={'Zip Code'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input customer city' }]}
        >
          <Input placeholder={'City'} className={styles.input} />
        </Form.Item>
      </div>
      {/* {!disableForm && ( */}
      {true && (
        <div className={formStyles.form__buttonContainer}>
          {/* save button */}
          <Button
            type="primary"
            onClick={() => onFinish(form.getFieldsValue())}
            className={styles.submitButton}
          >
            Save
          </Button>
        </div>
      )}
    </Form>
  );
};

export default AchForm;
