import moment from 'moment';
import { SORT_ORDER } from '../hooks';

const DATE_FORMAT = 'MM/DD/YYYY';

export const getValueByPath = (path, obj) => {
    if (!path || !obj) return;
    return path.split('.').reduce((acc, curr) => {
        if (!acc) return;
        acc = acc[curr];
        return acc;
    }, obj);
};

export const customSort = (
    arr,
    sortCriteria,
    sortOrder = SORT_ORDER.DESCENDING
) => {
    if (sortOrder === SORT_ORDER.NONE) return arr;
    return [...arr].sort((a, b) => {
        const x =
            sortOrder === SORT_ORDER.DESCENDING
                ? getValueByPath(sortCriteria, b)
                : getValueByPath(sortCriteria, a);
        const y =
            sortOrder === SORT_ORDER.DESCENDING
                ? getValueByPath(sortCriteria, a)
                : getValueByPath(sortCriteria, b);

        if (x === null || x === undefined) {
            return 1;
        }

        if (y === null || y === undefined) {
            return -1;
        }

        if (x < y) {
            return -1;
        }

        if (x > y) {
            return 1;
        }

        return 0;
    });
};

export const debounce = (fn, delay) => {
    let timeout;

    return function() {
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, delay);
    };
};

export const formatDate = isoString => { 
    const date = moment.utc(isoString);
    
    if(!date.isValid()){ 
        return '';
    }

    return date.format(DATE_FORMAT)
}
