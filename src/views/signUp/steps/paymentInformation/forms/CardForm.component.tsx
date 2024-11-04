import { Form, Input, InputNumber, Checkbox, Select } from "antd";
import styles from "@/styles/Form.module.scss";
import { useInterfaceStore } from "@/state/interface";
import { useEffect } from "react";
import phoneNumber from "@/utils/phoneNumber";
import { states } from "@/utils/states";
import { countries } from "@/utils/countries";
import { getDiscounts, getPrice } from "@/utils/getPrice";
import { useAllFeatures } from "@/state/serverState/features";

const CardForm = () => {
  const [form] = Form.useForm();

  const { signUpPaymentFormValues, currentSignUpStep, setCurrentForm, features } = useInterfaceStore((state) => state);

  const { data: featuresData } = useAllFeatures();

  useEffect(() => {
    form.setFieldsValue(signUpPaymentFormValues);
    setCurrentForm(form);
  }, [currentSignUpStep]);

  return (
    <Form form={form} className={styles.form} layout="vertical"
      initialValues={{
        ccnumber: "4111111111111111",
        ccexp: "10/25",
        cvv: "999",
        first_name: "John",
        last_name: "Doe",
        billingEmail: "johns@test.com",
        billingPhone: "111-111-1111",
        address: "123 main st",
        address2: "",
        country: countries[0],
        billingState: states[0].abbreviation,
        zip: "234445",
        city: "timbuktu",
        didAgreePayment: false,
        didAgreeTerms: false,
      }}
    >
      <div className={styles.group}>
        <Form.Item
          name="ccnumber"
          label="Card Number"
          rules={[{ required: true, message: "Please input your card number" }]}
        >
          <Input placeholder={"Your card number"} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="ccexp"
          label="Expiration Date"
          rules={[{ required: true, message: "Please input card expiration date" }]}
        >
          <Input placeholder={"MM/YY"} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="cvv"
          label="Card CVV #"
          rules={[
            {
              required: true,
              message: "Please input the CVV card number!",
            },
          ]}
          tooltip="The CVV # is the 3 digits number on the back of your card."
        >
          <Input placeholder={"CVV"} className={styles.input} />
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item
          name="first_name"
          label="First Name on Card"
          rules={[
            {
              required: true,
              message: "Please input the first Name on the card ",
            },
          ]}
        >
          <Input placeholder={"First Name"} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name on Card"
          rules={[
            {
              required: true,
              message: "Please input the Last Name on the card ",
            },
          ]}
        >
          <Input placeholder={"Last Name"} className={styles.input} />
        </Form.Item>
      </div>
      <div className={styles.group}>
        <Form.Item
          name="billingEmail"
          label="Billing Email"
          rules={[{ required: true, message: "Please input billing email" }]}
        >
          <Input type="email" placeholder={"Email"} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="billingPhone"
          label="Billing Phone #"
          rules={[
            {
              required: true,
              message: "Please input billing phone number",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            controls={false}
            formatter={(value: any) => phoneNumber(value)}
            parser={(value: any) => value.replace(/[^\d]/g, "")}
            placeholder={"Phone Number"}
            className={styles.input}
          />
        </Form.Item>
      </div>
      <Form.Item
        name="address"
        label="Billing Address"
        rules={[{ required: true, message: "Please input billing address" }]}
      >
        <Input placeholder={"Address"} className={styles.input} />
      </Form.Item>
      <Form.Item name="address2" label="Billing Address 2">
        <Input placeholder={"Billing Address 2"} className={styles.input} />
      </Form.Item>
      <div className={styles.group}>
        <Form.Item
          name="country"
          label="Billing Country"
          rules={[{ required: true, message: "Please input billing country!" }]}
        >
          <Select placeholder="Select a country" className={styles.input}>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="billingState"
          label="Billing State"
          rules={[{ required: true, message: "Please input billing state!" }]}
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
          label="Billing Zip Code"
          rules={[{ required: true, message: "Please input your billing zip code" }]}
        >
          <Input placeholder={"Billing Zip Code"} className={styles.input} />
        </Form.Item>
        <Form.Item
          name="city"
          label="Billing City"
          rules={[{ required: true, message: "Please input your billing city" }]}
        >
          <Input placeholder={"Billing City"} className={styles.input} />
        </Form.Item>
      </div>

      <Form.Item
        name="didAgreePayment"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error("You need to agree to a recurring payment.")),
          },
        ]}
      >
        <Checkbox>
          I agree to a recurring payment of{" "}
          <strong>
            $
            {getPrice(features.concat(getDiscounts(features, featuresData)), {
              noCredits: true,
            })}
          </strong>{" "}
          to the credit card provided above on <strong>{new Date(Date.now() + 6.048e8 * 2).toDateString()}</strong>
        </Checkbox>
      </Form.Item>

      <Form.Item
        name="didAgreeTerms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error("You need to agree to the terms and conditions.")),
          },
        ]}
      >
        <Checkbox>
          I agree to the{" "}
          <a target="_blank" href="https://pyreprocessing.com/terms-of-use" className={styles.link}>
            <strong>Terms of Conditions</strong>
          </a>
        </Checkbox>
      </Form.Item>
    </Form>
  );
};

export default CardForm;
