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
              ? `${process.env.NEXT_PUBLIC_API_URL}/upload/cloudinary`
              : 'http://localhost:5000/api/v1/upload/cloudinary'
          }
          aspectRatio={16 / 9}
          default={signUpUserFormValues?.ministryInfo?.ministryImageUrl}
          name="ministryImageUrl"
          label="Business Logo"
          tooltip="This is the logo of your business, as it appears on your business license."
          bodyData={{
            folder: `images`,
            username: signUpUserFormValues?.userInfo?.username,
          }}
        />
      </div>
    </Form>
  );
};

export default BusinessLogoUpload;
