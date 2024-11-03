export const validateForm = async (form: any) => {
  return form
    .validateFields()
    .then((values: any) => {
      return true;
    })
    .catch((err: any) => {
      return false;
    });
};
