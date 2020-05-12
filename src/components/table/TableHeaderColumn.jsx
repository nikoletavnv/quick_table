import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Filter from './Filter';
import { SingleArrowIcon, DoubleArrowIcon, FilterIcon } from '../image';
import { useToggle, SORT_ORDER, ENTER, ESCAPE } from '../../hooks';

import styles from './table.module.scss';

const TableHeaderColumn = props => {
    const {
        column,
        index,
        updateFilter,
        sortByColumn,
        sortColumn,
        sortOrder,
        filter
    } = props;

    const { setOpen, isOpen, visibleElementRef, toggledElementRef } = useToggle(
        false,
        column.hasFiltering
    );

    const filterRef = column.hasFiltering ? React.createRef() : null;

    const onKeyDown = event => {
        if (!filter) return;
        if (event.key === ENTER || event.key === ESCAPE) {
            setOpen(false);
        }
    };

    const renderFilter = () => {
        if (!filter) return;

        const filterIcon = (
            <FilterIcon
                title={filter.value}
                mode={!!filter.value ? 'full' : 'empty'}
                className={classnames([
                    styles.IconSmall,
                    !!filter.value ? styles.FullFilter : null
                ])}
            />
        );

        const filterInput = (
            <Filter
                ref={filterRef}
                value={filter.value}
                onKeyDown={onKeyDown}
                onClose={() => setOpen(false)}
                updateFilter={value =>
                    updateFilter({
                        key: filter.key,
                        value: typeof value === 'string' ? value : filter.value
                    })
                }
            />
        );

        return (
            <span className={styles.FilterContainer}>
                <span
                    ref={visibleElementRef}
                    id={`${column.key}-${index}-icon`}
                >
                    {filterIcon}
                </span>
                <span
                    ref={toggledElementRef}
                    id={`${column.key}-${index}-content`}
                >
                    {isOpen ? filterInput : null}
                </span>
            </span>
        );
    };

    const onSort = () => {
        if (!column.hasSorting) return;
        sortByColumn(column.key);
    };

    const renderSortIcon = () => {
        if (!column.hasSorting) return;
        if (column.key === sortColumn) {
            return (
                <span>
                    <SingleArrowIcon
                        onClick={onSort}
                        className={classnames(styles.Icon, styles[sortOrder])}
                    />
                </span>
            );
        }
        return (
            <span>
                <DoubleArrowIcon onClick={onSort} className={styles.Icon} />
            </span>
        );
    };

    return (
        <th
            key={`column-${column.key}-${index}`}
            width={!!column.width ? column.width : 'auto'}
        >
            <div className={styles.Column}>
                <span
                    className={column.hasSorting ? styles.Action : null}
                    onClick={column.hasSorting ? onSort : null}
                >
                    {column.displayName || column.key}
                </span>
                {renderSortIcon()}
                {renderFilter()}
            </div>
        </th>
    );
};

TableHeaderColumn.propTypes = {
    column: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    sortColumn: PropTypes.string,
    sortByColumn: PropTypes.func,
    sortOrder: PropTypes.oneOf(Object.values(SORT_ORDER)),
    updateFilter: PropTypes.func,
    filter: PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
    })
};

export default TableHeaderColumn;
