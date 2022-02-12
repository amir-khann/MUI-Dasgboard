import { useEffect } from 'react';
import { useFormikContext } from 'formik';


const keyify = (obj, prefix = '') =>
    Object.keys(obj).reduce((res, el) => {
        if (Array.isArray(obj[el])) {
            return res;
        } else if (typeof obj[el] === 'object' && obj[el] !== null) {
            return [...res, ...keyify(obj[el], prefix + el + '.')];
        } else {
            return [...res, prefix + el];
        }
    }, []);

export const ErrorFocus = () => {
    const { errors, isSubmitting, isValidating } = useFormikContext();

    useEffect(() => {
        let keys = Object.keys(errors);

        if (keys.length > 0 && isSubmitting && !isValidating) {
            let selector;
            if (keys[0] === 'buckets') {
                if (errors.buckets.length > 0) {
                    for (let i = 0; i < errors.buckets.length; i++) {
                        let bucketEffor = errors.buckets[i];
                        if (bucketEffor) {
                            const bucketKeys = keyify(errors.buckets[i]);
                            if (bucketKeys && bucketKeys.length > 0) {
                                selector = `[name="${'buckets.' + i + '.' + bucketKeys[0]}"]`;
                            }
                            break;
                        }
                    }
                }
            }
            else {
                selector = `[name="${keys[0]}"]`;
            }

            const errorElement = document.querySelector(selector);
            if (errorElement) {
                errorElement.focus();
            }
        }


    }, [errors, isSubmitting, isValidating]);

    return null;
};
