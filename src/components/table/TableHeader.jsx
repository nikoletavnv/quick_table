import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import TableHeaderColumn from './TableHeaderColumn';
import { COLUMN_TYPE } from './constants';
import Checkbox from '../checkbox/Checkbox';
import { SORT_ORDER } from '../../hooks';

import styles from './table.module.scss';

const TableHeader = ({
    columns,
    sortByColumn,
    sortColumn,
    sortOrder,
    isSelected,
    onToggleSelect,
    updateFilter,
    filters,
    className
}) => {
    return (
        <thead>
            <tr className={classnames([styles.Header, className])}>
                {onToggleSelect && (
                    <th className={styles.Checkbox} key="header-checkbox">
                        <Checkbox
                            onChange={onToggleSelect}
                            checked={isSelected}
                        />
                    </th>
                )}
                {Array.isArray(columns)
                    ? columns.map((column, index) => {
                          const columnFilter = Array.isArray(filters)
                              ? filters.find(f => f.key === column.key)
                              : null;
                          return (
                              <TableHeaderColumn
                                  key={index}
                                  column={column}
                                  index={index}
                                  sortByColumn={sortByColumn}
                                  sortOrder={sortOrder}
                                  sortColumn={sortColumn}
                                  updateFilter={
                                      columnFilter ? updateFilter : null
                                  }
                                  filter={columnFilter}
                              />
                          );
                      })
                    : null}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            type: PropTypes.oneOf(Object.keys(COLUMN_TYPE)).isRequired,
            displayName: PropTypes.string,
            hasSorting: PropTypes.bool,
            hasFiltering: PropTypes.bool
        })
    ),
    sortColumn: PropTypes.string,
    sortByColumn: PropTypes.func,
    sortOrder: PropTypes.oneOf(Object.values(SORT_ORDER)),
    isSelected: PropTypes.bool,
    onToggleSelect: PropTypes.func,
    updateFilter: PropTypes.func,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string
        })
    ),
    className: PropTypes.string
};

export default TableHeader;
