import { Form, Input, InputNumber } from 'antd';
import styles from './UserInformationForm.module.scss';
import { useInterfaceStore } from '@/state/interface';
import { useEffect } from 'react';
import phoneNumber from '@/utils/phoneNumber';

const UserInformationForm = () => {
  const [form] = Form.useForm();
  const { signUpUserFormValues, setCurrentForm } = useInterfaceStore(
    (state) => state
  );

  useEffect(() => {
    form.setFieldsValue(signUpUserFormValues.userInfo);
    setCurrentForm(form);
  }, []);

  const onChange = () => {};

  return (
    <Form
      form={form}
      onChange={onChange}
      className={styles.form}
      initialValues={{ sex: 'male' }}
      layout="vertical"
    >
      <div className={styles.group}>
        <Form.Item
          name="firstName"
          label="First Name"
          initialValue=""
          rules={[
            {
              required: true,
              message: 'Please enter your first name',
            },
          ]}
        >
          <Input className={styles.input} placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          initialValue=""
          rules={[
            {
              required: true,
              message: 'Please enter your last name',
            },
          ]}
        >
          <Input className={styles.input} placeholder="Enter your last name" />
        </Form.Item>
      </div>

      <Form.Item
        name="email"
        label="Email"
        initialValue=""
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please enter a valid email address',
          },
        ]}
      >
        <Input
          className={styles.input}
          placeholder="Enter your email address"
        />
      </Form.Item>

      <div className={styles.group}>
        <Form.Item
          name="password"
          label="Password"
          initialValue=""
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },

            {
              min: 10,
            },
          ]}
        >
          <Input 
            className={styles.input}
            placeholder="Enter your password"
            type="password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          initialValue=""
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password',
            },
            {
              min: 10,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match');
              },
            }),
          ]}
        >
          <Input
            className={styles.input}
            placeholder="Confirm your password"
            type="password"
          />
        </Form.Item>
      </div>

      <div className={styles.group}>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          initialValue=""
          rules={[
            {
              required: true,
              message: 'Please enter your phone number',
            },
          ]}
        >
          <InputNumber
            className={styles.input}
            formatter={(value: any) => phoneNumber(value)}
            parser={(value: any) => value.replace(/[^\d]/g, '')}
            controls={false}
            placeholder="Enter your phone number"
          />
        </Form.Item>

        <Form.Item name="sex" label="Sex">
          <select className={styles.input} placeholder="Select your sex">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default UserInformationForm;
