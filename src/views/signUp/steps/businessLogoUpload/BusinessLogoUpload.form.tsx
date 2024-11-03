import React from 'react';
import styles from './BusinessLogoUpload.module.scss';
import { Form, Image, Input } from 'antd';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import { useInterfaceStore } from '@/state/interface';

const BusinessLogoUpload = () => {
  const [form] = Form.useForm();
  const { signUpUserFormValues, setCurrentForm } = useInterfaceStore(
    (state) => state
  );

  React.useEffect(() => {
    form.setFieldsValue(signUpUserFormValues);
    setCurrentForm(form);
  }, []);

  return (
    <Form form={form} layout="vertical">
      <div className={styles.group}>
        {/* image container */}
        <PhotoUpload
          form={form}
          action={
            process.env.NODE_ENV === 'production'
              ? 'https://api.pyreprocessing.com/api/v1/upload/auth-upload'
              : 'http://localhost:5000/api/v1/upload/auth-upload'
          }
          aspectRatio={16 / 9}
          default={signUpUserFormValues.businessInfo.businessLogoUrl}
          name="logoUrl"
          label="Business Logo"
          tooltip="This is the logo of your business, as it appears on your business license."
        />
      </div>
      <div className={styles.group}>
        <Form.Item
          name="missionStatement"
          label="Mission Statement"
          tooltip="This mission statement will appear on your business profile page, its a way for customers to identify with your values"
        >
          <Input.TextArea
            className={styles.input}
            placeholder="Enter your mission statement here"
            rows={4}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default BusinessLogoUpload;
