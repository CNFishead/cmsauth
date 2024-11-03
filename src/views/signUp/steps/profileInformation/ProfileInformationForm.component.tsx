import axios from '@/utils/axios';
import { Form, Input, Radio, Select, Button, InputNumber } from 'antd';
import styles from './ProfileInformationForm.module.scss';
import { useInterfaceStore } from '@/state/interface';
import { useEffect } from 'react';
import phoneNumber from '@/utils/phoneNumber';
import { states } from '@/utils/states';

const ProfileInformationForm = () => {
  const [form] = Form.useForm();
  const {
    setSignUpProfileFormValues,
    signUpProfileFormValues,
    setSignUpErrorDetected,
  } = useInterfaceStore((state) => state);

  useEffect(() => {
    form.setFieldsValue(signUpProfileFormValues);
  }, []);

  const onChange = () => {
    setSignUpProfileFormValues(form.getFieldsValue());

    form
      .validateFields()
      .then((values) => {
        setSignUpErrorDetected(false);
      })
      .catch((err) => {
        setSignUpErrorDetected(true);
      });
  };

  return (
    <Form
      form={form}
      onChange={onChange}
      className={styles.form}
      layout="vertical"
    >
      <h1 className={styles.header}>Public Profile Information</h1>

      <div className={styles.group}>
        <Form.Item name="organizationName" label="Organization Name">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name="publicPhoneNumber" label="Phone Number">
          <InputNumber
            className={styles.input}
            style={{ width: '100%' }}
            controls={false}
            formatter={(value: any) => phoneNumber(value)}
            parser={(value: any) => value.replace(/[^\d]/g, '')}
          />
        </Form.Item>
      </div>
      <Form.Item
        name="bio"
        label="Bio"
        help="Write a short bio to introduce your organization or yourself. This will appear on your public profile."
      >
        <Input.TextArea className={styles.input} />
      </Form.Item>
      <br />
      <h1 className={styles.header}>Location Information</h1>

      <div className={styles.group}>
        <Form.Item name="address" label="Address">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name="address2" label="Address 2">
          <Input className={styles.input} />
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item name="city" label="City">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
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
        <Form.Item name="zipCode" label="Zip Code">
          <Input className={styles.input} />
        </Form.Item>
      </div>
      <br />

      <h1 className={styles.header}>Social Information</h1>

      <div className={styles.group}>
        <Form.Item name="facebook" label="Facebook">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name="instagram" label="Instagram">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name="youtube" label="Youtube">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name="website" label="Website">
          <Input className={styles.input} />
        </Form.Item>
      </div>
    </Form>
  );
};

export default ProfileInformationForm;
