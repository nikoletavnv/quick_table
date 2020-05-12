import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './table.module.scss';

const TableActions = ({ actions, disableActions }) => {
    const renderActionItem = ({ disabled, title, action, actionHexCode }) => {
        const actionClassnames = classnames(
            styles.ActionItem,
            disabled ? styles.Disabled : styles.Active
        );

        const onClick = () => {
            !disabled && action();
        };

        return (
            <div className={actionClassnames} onClick={onClick} key={title}>
                <span>{actionHexCode || <>&#43;</>}</span>
                <span>{title}</span>
            </div>
        );
    };

    return actions ? (
        <div className={styles.Actions}>
            <div>Actions:</div>
            {actions.map(a =>
                renderActionItem({
                    disabled: a.disabled || disableActions,
                    title: a.title,
                    actionHexCode: a.actionHexCode,
                    action: () => a.onAction(a.component, a.title, a.props)
                })
            )}
        </div>
    ) : null;
};

TableActions.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
            disabled: PropTypes.bool,
            onAction: PropTypes.func,
            actionHexCode: PropTypes.object,
            permission: PropTypes.string,
            props: PropTypes.object
        })
    ),
    disableActions: PropTypes.bool
};

export default TableActions;
