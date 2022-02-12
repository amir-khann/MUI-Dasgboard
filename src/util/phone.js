export const unpackExtension = (phone) => {
    const phoneWithExtension = phone.split('|');
    if (phoneWithExtension.length > 1) {
        return {
            phone: phoneWithExtension[0],
            ext: phoneWithExtension[1],
        };
    }
    return {
        phone: phoneWithExtension[0],
        ext: '',
    };
}

export const packExtension = (phone, ext) => {

    if (!ext) {
        return `${phone}`;
    }

    return `${phone}|${ext}`
}

export const getPhone = (phone) => {
    const phoneWithExtension = phone.split('|');
    return phoneWithExtension[0];
}

export const getExtension = (phone) => {
    const phoneWithExtension = phone.split('|');
    if (phoneWithExtension.length > 1) {
        return phoneWithExtension[1];
    }
    return '';
}

export const unpackUSFormat = (phone) => {
    return phone.replace(/[^\d]/g, "");
}