import React from "react";
import moment from 'moment';
import { DATE_FORMAT } from '../../store/constants/date';


export const createStringDataField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => (typeof value === 'string' && value) ? value : '',
        options
    };
}

export const createBooleanDataField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => {
            if (typeof value === 'boolean') {
                if (value) {
                    return 'Active';
                } else {
                    return 'In Active'
                }
            }
            return '';
        },
        options
    };
}

export const createDateField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => (typeof value === 'string' && value) ? moment(value, 'YYYY-MM-DDHH:mm:ss').format(DATE_FORMAT) : '',
        options
    };
}

export const createBucketNameField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => (value) ? <ul className = "mb-0 pl-4"> {value.map((item , index) => { return (<li key = {index}>{item.name}</li> ) })} </ul> : '',
        options
    };
}

export const createOrderDataField = (id, label, options = {}) => {
    return {
        id,
        label,
        renderString: (value) => (value !== 99999) ? value : '-',
        options
    };
}