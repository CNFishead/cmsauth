import { Form, Input, Button, message, Select } from 'antd';
import styles from '@/styles/Form.module.scss';
import { useInterfaceStore } from '@/state/interface';
import { useEffect, useState } from 'react';
import { states } from '@/data/states';
import { countries } from '@/data/countries';

const CardForm = () => {
  const [form] = Form.useForm();
  const [country, setCountry] = useState(countries[0]);
  const {
    signUpPaymentFormValues,
    // currentSignUpStep,
    setCurrentForm,
    setSignUpPaymentFormValues,
    // features,
  } = useInterfaceStore((state) => state);

  // const { data: featuresData } = useAllFeatures();

  const onFinish = async (values: any) => {
    // set the payment form values
    // validate form
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

  return (
    <Form
      form={form}
      className={styles.form}
      layout="vertical"
      initialValues={{
        // first_name: 'John',
        // last_name: 'Doe',
        // creditCardDetails: {
          // ccnumber: '4111111111111111',
          // ccexp: '10/25',
          // cvv: '123',
        // },
        // address1: '123 Main St',
        // address2: 'Apt 4',
        // zip: '12345',
        // city: 'New York',
      }}
    >
      <div className={styles.group}>
        <Form.Item
          name={['creditCardDetails', 'ccnumber']}
          label="Card Number"
          rules={[{ required: true, message: 'Please input your card number' }]}
        >
          <Input
            placeholder={'Customer card number'}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item
          name={['creditCardDetails', 'ccexp']}
          label="Expiration Date"
          rules={[
            { required: true, message: 'Please input card expiration date' },
          ]}
        >
          <Input placeholder={'MM/YY'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name={['creditCardDetails', 'cvv']}
          label="Card CVV #"
          rules={[]}
          tooltip="The CVV # is the 3 digits number on the back of your card."
        >
          <Input placeholder={'CVV'} className={styles.input} />
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item
          name="first_name"
          label="First Name on Card"
          rules={[
            {
              required: true,
              message: 'Please input the first Name on the card ',
            },
          ]}
        >
          <Input placeholder={'First Name'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name on Card"
          rules={[
            {
              required: true,
              message: 'Please input the Last Name on the card ',
            },
          ]}
        >
          <Input placeholder={'Last Name'} className={styles.input} />
        </Form.Item>
      </div>
      <Form.Item
        name="address1"
        label="Address"
        rules={[{ required: true, message: 'Please input address' }]}
      >
        <Input placeholder={'Address'} className={styles.input} />
      </Form.Item>
      <Form.Item name="address2" label="Address 2">
        <Input placeholder={'Address 2'} className={styles.input} />
      </Form.Item>
      <div className={styles.group}>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Please input country!' }]}
          initialValue={countries[0]}
        >
          <Select placeholder="Select a country" className={styles.input}>
            {countries.map((country: any) => (
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
        {
          // if the country is the US, show the state field
          country === 'United States of America (the)' && (
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please input state!' }]}
              initialValue={states[0].abbreviation}
            >
              <Select placeholder="Select a state" className={styles.input}>
                {states.map((state: any) => (
                  <option key={state.abbreviation} value={state.abbreviation}>
                    {state.abbreviation}
                  </option>
                ))}
              </Select>
            </Form.Item>
          )
        }
      </div>
      <div className={styles.group}>
        <Form.Item
          name="zip"
          label="Zip Code"
          rules={[{ required: true, message: 'Please input your zip code' }]}
        >
          <Input placeholder={'Customer Zip Code'} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input your city' }]}
        >
          <Input placeholder={'Customer City'} className={styles.input} />
        </Form.Item>
      </div> 
    </Form>
  );
};

export default CardForm;
