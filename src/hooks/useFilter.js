import { useState } from 'react';
import { getValueByPath } from '../utils/table';

const filterByColumn = (arr, filter) =>
    arr.filter(item => {
        const value = getValueByPath(filter.key, item);
        if (!value) {
            return !filter.value;
        }
        return (
            value
                .toString()
                .toLowerCase()
                .indexOf(filter.value.toString().toLowerCase()) > -1
        );
    });

const applyFilters = (arr, filters) => {
    if (!filters || filters.length === 0) return arr;
    return filters.reduce((acc, curr) => {
        return filterByColumn(acc, curr);
    }, arr);
};

const useFilters = ({
    columns,
    defaultFilters,
    filterDataCallback,
    updateFiltersCallback
}) => {
    defaultFilters = Array.isArray(defaultFilters) ? defaultFilters : [];
    const initialFilters = columns.filter(c => c.hasFiltering).map(c => {
        const defaultFilter = defaultFilters.find(
            filter => filter.key === c.key
        );
        return {
            key: c.key,
            value: defaultFilter ? defaultFilter.value : ''
        };
    });

    const [filters, setFilters] = useState(initialFilters);

    return {
        filters,
        updateFilter: ({ key, value }) => {
            const oldFilter = filters.find(f => f.key === key);
            const updatedFilters = [
                ...filters.filter(f => f.key !== key),
                { ...oldFilter, value }
            ];

            setFilters(updatedFilters);
            updateFiltersCallback && updateFiltersCallback(updatedFilters);
        },
        filterData: data => {
            const filteredData = applyFilters(data, filters);
            if (filterDataCallback) filterDataCallback(filteredData);
            return filteredData;
        }
    };
};

export default useFilters;
