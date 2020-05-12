import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './table.module.scss';

const Filter = React.forwardRef(
    ({ value, updateFilter, onKeyDown, onClose }, ref) => {
        useEffect(() => {
            if (ref && ref.current) {
                ref.current.focus();
            }
        });
        return (
            <div className={styles.Filter}>
                <input
                    ref={ref}
                    type="search"
                    value={value}
                    onKeyDown={onKeyDown}
                    onChange={e => updateFilter(e.target.value)}
                    maxLength={128}
                />
                <svg
                    className={classnames([styles.IconBig])}
                    onClick={onClose}
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        );
    }
);

Filter.propTypes = {
    value: PropTypes.string,
    updateFilter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onClose: PropTypes.func
};

export default Filter;
