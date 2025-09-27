import { Form, Input, InputNumber, Select } from "antd";
import styles from "@/styles/Form.module.scss";
import { useInterfaceStore } from "@/state/interface";
import { useEffect } from "react";
import phoneNumber from "@/utils/phoneNumber";
import axios from "@/utils/axios";

const UserInformationForm = () => {
  const [form] = Form.useForm();
  const { signUpUserFormValues, setCurrentForm } = useInterfaceStore((state) => state);

  useEffect(() => {
    form.setFieldsValue(signUpUserFormValues.userInfo);
    setCurrentForm(form);
  }, []);

  return (
    <Form
      className={styles.form}
      initialValues={{
        // firstName: "John",
        // lastName: "Doe",
        // email: "cnfishead@gmail.com",
        // username: "cnfishead",
        // password: "Password10",
        // confirmPassword: "Password10",
        // phoneNumber: "123-456-7890",
        sex: "male",
      }}
      layout="vertical"
      form={form}
    >
      <div className={styles.group}>
        <Form.Item
          name="firstName"
          label="First Name"
          initialValue=""
          rules={[
            {
              required: true,
              message: "Please enter your first name",
            },
            // trim
            {
              validator(_, value) {
                if (value.trim() === "") {
                  return Promise.reject("First name cannot be empty");
                }
                return Promise.resolve();
              },
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
              message: "Please enter your last name",
            },
            {
              validator(_, value) {
                if (value.trim() === "") {
                  return Promise.reject("Last name cannot be empty");
                }
                return Promise.resolve();
              },
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
            type: "email",
            message: "Please enter a valid email address",
          },
          () => ({
            async validator(_, value) {
              if (value === "") return;
              // url encode the value
              const urlEncodedValue = encodeURIComponent(value);
              const { data } = await axios.get(`/auth/${urlEncodedValue || " "}/email`);
              if (data.exists === true) {
                return Promise.reject("Email already exists, please use another email");
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input className={styles.input} placeholder="Enter your email address" />
      </Form.Item>

      <div className={styles.group}>
        <Form.Item
          name="password"
          label="Password"
          initialValue=""
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            {
              // trim
              validator(_, value) {
                if (value.trim() === "") {
                  return Promise.reject("Password cannot be empty");
                }
                return Promise.resolve();
              },
            },
            {
              min: 10,
            },
          ]}
        >
          <Input.Password className={styles.input} placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          initialValue=""
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            {
              min: 10,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match");
              },
            }),
          ]}
        >
          <Input.Password className={styles.input} placeholder="Confirm your password" />
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
              message: "Please confirm your password",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            controls={false}
            formatter={(value: any) => {
              const phoneNumber = value.replace(/[^\d]/g, "");
              const phoneNumberLength = phoneNumber.length;
              if (phoneNumberLength < 4) {
                return phoneNumber;
              } else if (phoneNumberLength < 7) {
                return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
              }
              return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
            }}
            parser={(value: any) => value.replace(/[^\d]/g, "")}
            placeholder="Enter Phone Number"
          />
        </Form.Item>

        <Form.Item name="sex" label="Sex">
          <Select className={styles.input} placeholder="Select your sex">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default UserInformationForm;
