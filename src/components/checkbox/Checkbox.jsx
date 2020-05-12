import React from 'react';
import PropType from 'prop-types';
import classnames from 'classnames';

import styles from './checkbox.module.scss';

const Checkbox = ({
    value,
    onChange,
    checked,
    disabled,
    className,
    children
}) => {
    const id = `checkbox_${value || ''}`;

    return (
        <div
            className={classnames(className, styles.CheckboxContainer)}
            onClick={e => e.stopPropagation()}
        >
            <div className={styles.Checkbox}>
                <input
                    id={id}
                    name={id}
                    type="checkbox"
                    value={value}
                    className={styles.CheckboxInput}
                    onChange={onChange}
                    checked={checked}
                    disabled={disabled}
                />
                <div className={styles.CheckboxMark} />
            </div>
            {children && (
                <div className={styles.CheckboxContent}>{children}</div>
            )}
        </div>
    );
};

Checkbox.propType = {
    value: PropType.oneOf([PropType.string, PropType.number]).isRequired,
    className: PropType.string,
    children: PropType.oneOf([PropType.array, PropType.object]),
    onChange: PropType.func,
    checked: PropType.bool,
    disabled: PropType.bool
};

Checkbox.defaultProps = {
    disabled: false
};

export default Checkbox;