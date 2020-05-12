import React from 'react';

const SingleArrowIcon = ({ className, onClick }) => (
    <svg className={className} onClick={onClick} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
        />
    </svg>
);

export default SingleArrowIcon;
