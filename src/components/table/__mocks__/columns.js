
import React from 'react';
import { COLUMN_TYPE } from '../constants';

const columns = [
    {
        type: COLUMN_TYPE.TEXT,
        displayName: 'Column 1',
        key: 'col1',
        hasSorting: true,
        hasFiltering: true
    },
    {
        type: COLUMN_TYPE.TEXT,
        displayName: 'Column 2',
        key: 'col2',
        hasSorting: false,
        hasFiltering: false
    },
    {
        type: COLUMN_TYPE.DATE,
        displayName: 'Modified',
        key: 'date',
        hasSorting: true,
        hasFiltering: false
    },
    {
        type: COLUMN_TYPE.LINK,
        displayName: 'Link',
        key: 'url',
        hasSorting: true,
        hasFiltering: true
    },
    {
        type: COLUMN_TYPE.BUTTON,
        displayName: 'Action',
        key: 'col2',
        getText: () => 'Submit',
        hasFiltering: false,
        hasSorting: false
    },
    {
        type: COLUMN_TYPE.TEXT,
        displayName: 'Custom',
        key: 'url',
        hasFiltering: false, 
        hasSorting: false,
        render: (url, rowData) => (<p>{rowData.col1}-->{rowData.col2}</p>)
    }
];

export default columns;
