import axios from '@/utils/axios';
import { Form, Input, Radio, Select, Button, InputNumber } from 'antd';
import styles from '@/styles/Form.module.scss';
import { useInterfaceStore } from '@/state/interface';
import { useEffect } from 'react';
import phoneNumber from '@/utils/phoneNumber';
import { states } from '@/utils/states';

const ProfileInformationForm = () => {
  const [form] = Form.useForm();
  const { signUpProfileFormValues, setCurrentForm } = useInterfaceStore(
    (state) => state
  );

  useEffect(() => {
    form.setFieldsValue({ ...signUpProfileFormValues.ministryInfo });
    setCurrentForm(form);
  }, []);

  return (
    <Form
      className={styles.form}
      layout="vertical"
      initialValues={{
        // name: 'Test Ministry',
        // bio: 'a reall good ministry biography',
        // address: '123 main st',
        // address2: '',
        // city: 'Kansas City',
        // state: 'KS',
        // zipCode: '234564',
      }}
      form={form}
    > 
      <div className={styles.group}>
        <Form.Item
          name={'name'}
          label="Ministry Name"
          rules={[{ required: true }]}
        >
          <Input className={styles.input} />
        </Form.Item>
      </div>
      <Form.Item name={'bio'} label="Mission Statement">
        <Input.TextArea className={styles.input} />
      </Form.Item>
      <br />
      <h1 className={styles.header}>Location Information</h1>

      <div className={styles.group}>
        <Form.Item
          name={'address'}
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name={'address2'} label="Address 2">
          <Input className={styles.input} />
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item name={'city'} label="City" rules={[{ required: true }]}>
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item name={'state'} label="State" rules={[{ required: true }]}>
          <Select
            placeholder="Select a state"
            className={styles.input}
            showSearch
            filterOption={(input: any, option: any) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {states.map((state) => (
              <Select.Option
                key={state.abbreviation}
                value={state.abbreviation}
              >
                {state.abbreviation}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={'zipCode'}
          label="Zip Code"
          rules={[{ required: true }]}
        >
          <Input className={styles.input} />
        </Form.Item>
      </div> 
    </Form>
  );
};

export default ProfileInformationForm;
