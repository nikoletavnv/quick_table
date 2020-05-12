import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Checkbox from '../checkbox/Checkbox';
import { COLUMN_TYPE } from './constants';
import { SingleArrowIcon } from '../image';

import { getValueByPath, formatDate } from '../../utils/table';

import styles from './table.module.scss';
import Confirmation from '../confirmation/Confirmation';

const TableRow = props => {
    const {
        columns,
        data,
        id,
        onRowSelect,
        isRowSelected,
        navigateTo,
        renderExtraInfo
    } = props;

    const [openExtraInfo, setOpenExtraInfo] = useState(false);
    const [openConfirmationPrompt, setOpenConfirmationPrompt] = useState(false);

    const toggleExtraInfo = () => setOpenExtraInfo(!openExtraInfo);
    const toggleConfirmation = e => {
        e.stopPropagation();
        setOpenConfirmationPrompt(!openConfirmationPrompt);
    };

    const confirmationColumn = columns.find(
        c => c.type === COLUMN_TYPE.CONFIRMATION
    );

    const confirmationKey = confirmationColumn
        ? getValueByPath(confirmationColumn.confirmation.key, data)
        : null;

    useEffect(
        () => {
            if (confirmationKey) {
                setOpenConfirmationPrompt(false);
            }
        },
        [confirmationKey]
    );

    const rowId = data ? data[id] : '';

    const renderTableCell = ({ type, value, data, ...rest }) => {
        switch (type) {
            case COLUMN_TYPE.DATE:
                return formatDate(value);
            case COLUMN_TYPE.LINK:
                return <a href={rest.to} target='_blank' rel='noopener noreferrer'>{value}</a>;
            case COLUMN_TYPE.BUTTON:
            case COLUMN_TYPE.CONFIRMATION: {
                const buttonText = rest.getText(data);

                let buttonOnClick = null;
                let buttonDisabled = false;

                if (type === COLUMN_TYPE.CONFIRMATION) {
                    buttonOnClick = toggleConfirmation;
                    buttonDisabled =
                        rest.confirmation.disabled &&
                        rest.confirmation.disabled(data);
                } else {
                    buttonOnClick = () => rest.onAction && rest.onAction(data);
                }

                return (
                    <button 
                        onClick={buttonOnClick}
                        disabled={buttonDisabled}
                    >
                        {buttonText}
                    </button>
                );
            }
            default:
                return value;
        }
    };

    const renderRowDetails = () => {
        const confirmation = confirmationColumn
            ? confirmationColumn.confirmation
            : null;
        const colSpan = columns.length + (onRowSelect ? 1 : 0);

        return !renderExtraInfo && !confirmation ? null : (
            <tr key={`${rowId}-extra`} className={styles.RowExtra}>
                <td colSpan={colSpan}>
                    {/* {openConfirmationPrompt &&
                        confirmation && (
                            <Confirmation
                                className={styles.ConfirmSection}
                                key={`${rowId}-${getValueByPath(
                                    confirmation.key,
                                    data
                                )}`}
                                confirmInputName={confirmation.confirmInputName}
                                confirmMessage={confirmation.getMessage(data)}
                                statusMessage={data['statusMessage']}
                                statusClass={data['statusClass']}
                                onConfirm={confirmation.onAction(data)}
                                onToggle={toggleConfirmation}
                                shown={openConfirmationPrompt}
                                disableButtons={data['loading']}
                            />
                        )} */}
                    {openExtraInfo &&
                        renderExtraInfo && (
                            <div className={styles.ExtraInfo}>
                                {renderExtraInfo(data)}
                            </div>
                        )}
                </td>
            </tr>
        );
    };

    const renderExpandIndicator = () => {
        if (!renderExtraInfo) return null;
        const indicatorClassName = openExtraInfo
            ? styles.Expanded
            : styles.Collapsed;
        return (
            <SingleArrowIcon
                className={classnames([styles.Icon, indicatorClassName])}
            />
        );
    };

    return (
        <React.Fragment key={rowId}>
            <tr
                key={`${rowId}-main`}
                className={classnames([styles.Row])}
                onClick={navigateTo || toggleExtraInfo}
            >
                {onRowSelect && (
                    <td
                        key={`${rowId}-column-checkbox`}
                        className={styles.Checkbox}
                    >
                        <Checkbox
                            value={rowId}
                            onChange={() => onRowSelect(rowId)}
                            checked={isRowSelected(rowId)}
                        />
                    </td>
                )}
                {columns.map((c, index) => (
                    <td key={`${rowId}-column-${index}`}>
                        {index === 0 ? renderExpandIndicator() : null}
                        {!!c.render
                            ? c.render(getValueByPath(c.key, data), data)
                            : renderTableCell({
                                  ...c,
                                  value: getValueByPath(c.key, data),
                                  data
                              })}
                    </td>
                ))}
            </tr>
            {renderRowDetails()}
        </React.Fragment>
    );
};

TableRow.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            type: PropTypes.oneOf(Object.keys(COLUMN_TYPE)).isRequired,
            displayName: PropTypes.string,
            hasSorting: PropTypes.bool,
            hasFiltering: PropTypes.bool
        })
    ).isRequired,
    id: PropTypes.string,
    data: PropTypes.object,
    onRowSelect: PropTypes.func,
    isRowSelected: PropTypes.func,
    navigateTo: PropTypes.func,
    renderExtraInfo: PropTypes.func
};

export default TableRow;
