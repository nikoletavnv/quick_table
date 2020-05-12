import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import TableActions from './TableActions';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

import { useFilters, useSort, SORT_ORDER } from '../../hooks';

import styles from './table.module.scss';
import { LAYOUT } from './constants';

const Table = props => {
    const {
        columns,
        data,
        id,
        initialSortColumn,
        initialSortOrder,
        isSelectable,
        actions,
        title,
        layout,
        footer,
        threeStepSort,
        className,
        navigationTarget,
        selectedIDs,
        toggleSingleSelection,
        toggleMultipleSelection,
        renderExtraInfo,
        presetFilters,
        presetSortingCriteria,
        updatePresetFilters,
        updatePresetSortingCriteria
    } = props;

    /* ------ Sorting ------ */
    const { sortColumn, sortOrder, sortByColumn, sortData } = useSort({
        initialSortColumn: presetSortingCriteria.column || initialSortColumn,
        initialSortOrder: presetSortingCriteria.order || initialSortOrder,
        threeStepSort: threeStepSort,
        updateSortingCriteriaCallback: updatePresetSortingCriteria
    });
    /* --------------------- */

    /* ------ Filtering ------ */
    const filterDataCallback = filteredData => {
        const filteredDataIDs = filteredData.map(item => item[id]);
        const visibleSelections = selectedIDs.filter(
            id => filteredDataIDs.indexOf(id) !== -1
        );
        if (
            selectedIDs.length !== 0 &&
            visibleSelections.length < selectedIDs.length
        ) {
            toggleMultipleSelection(visibleSelections);
        }
    };
    const { filters, filterData, updateFilter } = useFilters({
        columns,
        defaultFilters: presetFilters,
        filterDataCallback: isSelectable ? filterDataCallback : null,
        updateFiltersCallback: updatePresetFilters
    });

    /*------------------------ */

    /* ------ Selection ------ */
    const filteredIDs = filterData(data).map(item => item[id]);
    const disableTableActions = selectedIDs.length === 0;

    const areAllItemsChecked =
        filteredIDs.length !== 0 &&
        filteredIDs.length === selectedIDs.length &&
        selectedIDs.every(id => filteredIDs.indexOf(id) !== -1);

    const isRowSelected = id => selectedIDs.find(i => i === id) !== undefined;
    const toggleAllItemsChecked = e =>
        toggleMultipleSelection(e.target.checked ? filteredIDs : []);
    const onRowSelect = id => toggleSingleSelection(id);
    /* ----------------------*/

    const columnsCount = columns.length + (!!isSelectable ? 1 : 0);
    const result = sortData(filterData(data));

    let headerClassName;
    if (title && title.length > 0) {
        if (actions && actions.length) {
            headerClassName = styles.LargeTopPosition;
        } else {
            headerClassName = styles.SmallTopPosition;
        }
    } else {
        if (actions && actions.length > 0) {
            headerClassName = styles.MediumTopPosition;
        } else {
            headerClassName = null;
        }
    }

    return (
        <div className={styles.TableWrapper}>
            <div className={styles.Caption}>
                {title && <div className={styles.Title}>{title}</div>}
                {actions && (
                    <TableActions
                        actions={actions}
                        disableActions={
                            isSelectable ? disableTableActions : false
                        }
                    />
                )}
            </div>
            <table
                className={classnames([styles.Table, className])}
                cellPadding="1"
                style={{ tableLayout: `${layout}` }}
            >
                <TableHeader
                    className={headerClassName}
                    columns={columns}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    sortByColumn={sortByColumn}
                    updateFilter={updateFilter}
                    filters={filters}
                    onToggleSelect={isSelectable ? toggleAllItemsChecked : null}
                    isSelected={isSelectable ? areAllItemsChecked : false}
                />
                <tbody className={styles.Data}>
                    {result.length === 0 ? (
                        <tr>
                            <td colSpan={columnsCount} className={styles.Empty}>
                                No data.
                            </td>
                        </tr>
                    ) : (
                        result.map(row => (
                            <TableRow
                                key={row[id]}
                                data={row}
                                id={id}
                                columns={columns}
                                onRowSelect={isSelectable ? onRowSelect : null}
                                isRowSelected={
                                    isSelectable ? isRowSelected : null
                                }
                                navigateTo={
                                    navigationTarget
                                        ? navigationTarget(row[id])
                                        : null
                                }
                                renderExtraInfo={renderExtraInfo}
                            />
                        ))
                    )}
                </tbody>
                {footer && (
                    <tfoot>
                        <tr>
                            <td
                                colSpan={columnsCount}
                                className={styles.Footer}
                            >
                                {footer}
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    id: PropTypes.string,
    title: PropTypes.string,
    layout: PropTypes.oneOf([LAYOUT.FIXED, LAYOUT.AUTO]),
    footer: PropTypes.string,
    className: PropTypes.string,
    threeStepSort: PropTypes.bool,
    initialSortColumn: PropTypes.string,
    initialSortOrder: PropTypes.string,
    isSelectable: PropTypes.bool,
    selectedIDs: PropTypes.array,
    actions: PropTypes.array,
    navigationTarget: PropTypes.func,
    toggleSingleSelection: PropTypes.func,
    toggleMultipleSelection: PropTypes.func,
    renderExtraInfo: PropTypes.func,
    presetFilters: PropTypes.array,
    presetSortingCriteria: PropTypes.object,
    updatePresetFilters: PropTypes.func,
    updatePresetSortingCriteria: PropTypes.func
};

Table.defaultProps = {
    initialSortOrder: SORT_ORDER.ASCENDING,
    isSelectable: false,
    threeStepSort: false,
    id: 'id',
    layout: LAYOUT.FIXED,
    selectedIDs: [],
    presetFilters: [],
    presetSortingCriteria: {}
};

export default Table;
