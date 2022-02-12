import * as yup from 'yup';

export const contactDataTypeValidationSchema = yup.object().shape({
    key: yup.string().required("Required field"),
});