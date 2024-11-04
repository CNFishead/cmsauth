import { FormInstance } from "antd";

export const validateForm = async (form: FormInstance) => {
  return form 
    .validateFields() 
    .then((values: any) => {
      return true;
    })
    .catch((err: any) => {
      return false;
    });
};
