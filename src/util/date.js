import moment from 'moment';
import {
    DATE_FORMAT,
    QUICKSIGHT_DATE_FORMAT
} from '../store/constants/date';

export const formatDateForInput = (pickedDate) => {
    if (pickedDate) {
        return moment(pickedDate).format(DATE_FORMAT);
    }
    return null;
};

export const getFiscalDay = (fiscalYear) => {
    let day = "01";
    if(fiscalYear) {
        const arr = fiscalYear.split("/");
        if(arr.length > 0) {
            day = arr[1];
        }
    }
    return day;
}

export const getFiscalMonth = (fiscalYear) => {
    let month = "01";
    if(fiscalYear) {
        const arr = fiscalYear.split("/");
        if(arr.length > 0) {
            month = arr[0];
        }
    }
    return month;
}

const getRelativeDate = (range, fiscalYear) => {
    switch (range) {
        case 'ThisMonth':
            return getThisMonth()
        case 'LastMonth':
            return getLastMonth()
        case 'Yesterday':
            return getYesterday()
        case 'Last7Days':
            return getLast7Days()
        case 'Last30Days':
            return getLast30Days()
        case 'Last90Days':
            return getLast90Days()
        case 'Last12Months':
            return getLast12Months()
        case 'ThisQuarter':
            return getThisQuarter()
        case 'LastQuarter':
            return getLastQuarter()
        case 'ThisYear':
            return getThisYear()
        case 'LastYear':
            return getLastYear()
        case 'ThisFiscalYear':
            return getThisFiscalYear(fiscalYear)
        case 'LastFiscalYear':
            return getLastFiscalYear(fiscalYear)
        default:
            return getThisMonth();
    }
};

const formatDate = (momentDate) => {
    return momentDate.format(QUICKSIGHT_DATE_FORMAT);
};

const getThisMonth = () => {
    const currentMonth = moment().month();
    return {
        startdate: formatDate(moment().month(currentMonth).startOf('month')),
        enddate: formatDate(moment().month(currentMonth).endOf('month')),
    }
};

const getLastMonth = () => {
    const currentMonth = moment().month();
    return {
        startdate: formatDate(moment().month(currentMonth - 1).startOf('month')),
        enddate: formatDate(moment().month(currentMonth - 1).endOf('month')),
    }
};

const getYesterday = () => {
    return {
        startdate: formatDate(moment().subtract(1, 'day')),
        enddate: formatDate(moment().subtract(1, 'day')),
    }
};

const getLast7Days = () => {
    return {
        startdate: formatDate(moment().subtract(6, 'days')),
        enddate: formatDate(moment()),
    }
};

const getLast30Days = () => {
    return {
        startdate: formatDate(moment().subtract(29, 'days')),
        enddate: formatDate(moment()),
    }
};

const getLast90Days = () => {
    return {
        startdate: formatDate(moment().subtract(89, 'days')),
        enddate: formatDate(moment()),
    }
};

const getLast12Months = () => {
    const currentMonth = moment().month();
    return {
        startdate: formatDate(moment().subtract(11, 'months')),
        enddate: formatDate(moment().month(currentMonth).endOf('month')),
    }
};

const getThisQuarter = () => {
    const currentQuarter = moment().quarter();
    return {
        startdate: formatDate(moment().quarter(currentQuarter).startOf('quarter')),
        enddate: formatDate(moment().quarter(currentQuarter).endOf('quarter')),
    }
};

const getLastQuarter = () => {
    const currentQuarter = moment().quarter();
    return {
        startdate: formatDate(moment().quarter(currentQuarter - 1).startOf('quarter')),
        enddate: formatDate(moment().quarter(currentQuarter - 1).endOf('quarter')),
    }
};

const getThisYear = () => {
    const currentYear = moment().year();
    return {
        startdate: formatDate(moment().year(currentYear).startOf('year')),
        enddate: formatDate(moment().year(currentYear).endOf('year')),
    }
};

const getLastYear = () => {
    const currentYear = moment().year();
    return {
        startdate: formatDate(moment().year(currentYear - 1).startOf('year')),
        enddate: formatDate(moment().year(currentYear - 1).endOf('year')),
    }
};

export const getStartDate = (range, fiscalYear) => {
    const { startdate } = getRelativeDate(range, fiscalYear);
    return startdate;
};

export const getEndDate = (range, fiscalYear) => {
    const { enddate } = getRelativeDate(range, fiscalYear);
    return enddate;
};

export const getThisFiscalYear = (fiscalYear) => {
    const day = getFiscalDay(fiscalYear);
    const month = getFiscalMonth(fiscalYear);
    const currentYear = moment().year();
    const startdate = moment(`${month}/${day}/${currentYear}`, "MM/DD/YYYY");
    return {
        startdate: formatDate(startdate),
        enddate: formatDate(startdate.year(currentYear + 1).subtract(1, 'day')),
    }
}

export const getLastFiscalYear = (fiscalYear) => {
    const day = getFiscalDay(fiscalYear);
    const month = getFiscalMonth(fiscalYear);
    const currentYear = moment().year();
    const startdate = moment(`${month}/${day}/${currentYear - 1}`, "MM/DD/YYYY");
    return {
        startdate: formatDate(startdate),
        enddate: formatDate(startdate.year(currentYear).subtract(1, 'day')),
    }
}