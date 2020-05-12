import { useState } from 'react';

import { SORT_ORDER } from './constants';
import { customSort } from '../utils/table';

const useSort = ({
    initialSortColumn,
    initialSortOrder,
    threeStepSort,
    updateSortingCriteriaCallback
}) => {
    const [sortColumn, setSortColumn] = useState(initialSortColumn);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);

    const sortByColumn = column => {
        const newSortOrder =
            sortColumn === column ? toggleSortOrder() : initialSortOrder;
        const newSortColumn =
            newSortOrder === SORT_ORDER.NONE ? initialSortColumn : column;
        setSortOrder(newSortOrder);
        setSortColumn(newSortColumn);

        updateSortingCriteriaCallback &&
            updateSortingCriteriaCallback({
                column: newSortColumn,
                order: newSortOrder
            });
    };

    const toggleSortOrder = () => {
        if (!threeStepSort) {
            return sortOrder === SORT_ORDER.ASCENDING
                ? SORT_ORDER.DESCENDING
                : SORT_ORDER.ASCENDING;
        }

        if (initialSortOrder === SORT_ORDER.ASCENDING) {
            switch (sortOrder) {
                case SORT_ORDER.ASCENDING:
                    return SORT_ORDER.DESCENDING;
                case SORT_ORDER.DESCENDING:
                    return SORT_ORDER.NONE;
                default:
                    return initialSortOrder;
            }
        } else {
            switch (sortOrder) {
                case SORT_ORDER.DESCENDING:
                    return SORT_ORDER.ASCENDING;
                case SORT_ORDER.ASCENDING:
                    return SORT_ORDER.NONE;
                default:
                    return initialSortOrder;
            }
        }
    };

    return {
        sortColumn,
        sortOrder,
        sortByColumn,
        sortData: data => customSort(data, sortColumn, sortOrder)
    };
};

export default useSort;
