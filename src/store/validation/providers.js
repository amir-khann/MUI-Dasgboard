import * as yup from 'yup';
import { ZIPCODE_REGEX, US_PHONE_FORMAT_REGEX } from '../constants/pages';

export const providerValidationSchema = yup.object().shape({
    legal_entity_name: yup.string().required("Required field"),
    legal_entity_address_1: yup.string().required("Required field"),
    sys_us_state_id: yup.string().required("Required field"),
    legal_entity_zip: yup.string().required("Required field")
        .matches(
            ZIPCODE_REGEX,
            "Invalid zip code"
        ),
    legal_entity_phone: yup.string().required("Required field")
        .matches(
            US_PHONE_FORMAT_REGEX,
            "Invalid phone number"
        ),
});

export const contactValidationSchema = yup.object().shape({
    associate_first_name: yup.string().required("Required field"),
    associate_email: yup.string().email("Invalid Email").required("Required field"),
    associate_phone: yup.string().required("Required field").matches(
        US_PHONE_FORMAT_REGEX,
        "Invalid phone number"
    ),
    associate_notes: yup.string().required("Required field"),
    sys_provider_associate_type_id: yup.string().required("Required field"),
});

export const addContactMappingValidationSchema = yup.object().shape({
    key: yup.string().required("Required field"),
    cfg_contact_detail_type_id: yup.string().required("Required field"),
});