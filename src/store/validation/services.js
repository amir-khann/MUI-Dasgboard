import * as yup from 'yup';

export const addServiceValidationSchema = yup.object().shape({
    name: yup.string().required("Required field"),
    sys_service_type_id: yup.string().required("Required field"),
});

export const addConnectionValidationSchema = yup.object().shape({
    method: yup.string().required("Required field"),
    contact_uri: yup.string().required("Required field"),
    auth_type_id: yup.string().required("Required field"),
    feilds: yup.array().of(
        yup.object().shape({
            key: yup.string().required("Required field"),
            value: yup.string().required("Required field"),
        })
    ),
});

export const addServiceOptionValidationSchema = yup.object().shape({
    key: yup.string().required("Required field"),
    default_value: yup.string().required("Required field"),
});

export const addServiceContactMappingValidationSchema = yup.object().shape({
    key: yup.string().required("Required field"),
    cfg_contact_detail_type_id: yup.string().required("Required field"),
});