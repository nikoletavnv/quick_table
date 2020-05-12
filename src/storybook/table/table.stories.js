import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Table from './Table';
import { COLUMN_TYPE } from './constants';
import { SORT_ORDER } from '../../hooks';

import columns from '../../components/table/__mocks__/columns';
import data from '../../components/table/__mocks__/data';

export default { title: 'Table' };

let store = new Store({ selectedIDs: [] });

const actions = [
    {
        title: 'Action 1',
        component: <h1>Delete Component</h1>,
        disabled: false
    },
    {
        title: 'Send Notifications',
        disabled: true,
        actionHexCode: <>&nbsp;</>
    }
];

const toggleSingle = id => {
    const selectedIDs = store.get('selectedIDs');

    if (selectedIDs.indexOf(id) > -1) {
        store.set({
            selectedIDs: selectedIDs.filter(current => current !== id)
        });
    } else {
        store.set({ selectedIDs: selectedIDs.concat(id) });
    }
};

const toggleMultiple = IDs => {
    store.set({ selectedIDs: IDs.length > 0 ? IDs : [] });
};

export const withTitle = () => {
    const mockColumns = columns;
    const mockData = data;
    return (
        <Table
            data={mockData}
            columns={mockColumns}
            title="This is the title!"
        />
    );
};

export const withInitialSort = () => {
    const mockColumns = columns;
    const mockData = data;
    return (
        <Router>
            <Table
                data={mockData}
                columns={mockColumns}
                initialSortColumn="serialNumber"
            />
        </Router>
    );
};

export const withFooter = () => {
    const mockColumns = columns;
    const mockData = data;
    return (
        <Table data={mockData} columns={mockColumns} footer="Table footer" />
    );
};

export const withActions = () => {
    const mockColumns = columns;
    const mockData = data;

    return (
        <State store={store}>
            <Table
                id="id"
                data={mockData}
                columns={mockColumns}
                actions={actions}
                isSelectable
                selectedIDs={store.get('selectedIDs')}
                toggleSingleSelection={toggleSingle}
                toggleMultipleSelection={toggleMultiple}
            />
        </State>
    );
};

export const withItemLink = () => {
    const mockColumns = columns;
    const mockData = data;

    return (
        <Router>
            <Switch>
                <Route
                    render={() => (
                        <Table
                            id="id"
                            data={mockData}
                            columns={mockColumns}
                            navigationTarget={id => () => {
                                window.location = `test/${id}`}}
                        />
                    )}
                />
            </Switch>
        </Router>
    );
};

export const withConfirmation = () => {
    const mockData = [
        {
            instrumentId: 'Fluent~826192.780',
            type: 'Fluent',
            serialNumber: '826192',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'NEW',
                updateTime: '2019-10-08T11:41:29.488Z'
            },
            history: [
                { status: 'NEW', receivedTime: '2019-10-08T11:41:30.643Z' }
            ]
        },
        {
            instrumentId: 'FluentNovo~826193.780',
            type: 'FluentNovo',
            serialNumber: '826193',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'NEW',
                updateTime: '2019-09-27T13:36:24.91Z'
            },
            history: []
        },
        {
            instrumentId: 'LUNA~826193.780',
            type: 'LUNA',
            serialNumber: '826193',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'NEW',
                updateTime: '2019-09-11T14:50:47.072Z'
            },
            history: []
        },
        {
            instrumentId: 'LUNA~828191.780',
            type: 'LUNA',
            serialNumber: '828191',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'CANCELLED',
                updateTime: '2019-09-27T13:37:20.597Z'
            },
            history: []
        },
        {
            instrumentId: 'FluentNovo~18050010.780',
            type: 'FluentNovo',
            serialNumber: '18050010',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'CANCELLED',
                updateTime: '2019-09-27T13:37:19.149Z'
            },
            history: []
        }
    ];

    const mockColumns = [
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Type',
            key: 'type',
            hasSorting: true,
            hasFiltering: true
        },
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Size',
            key: 'size',
            hasSorting: true,
            hasFiltering: true,
            width: 80
        },
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Serial Number',
            key: 'serialNumber',
            hasSorting: true,
            hasFiltering: true
        },
        {
            type: COLUMN_TYPE.DATE,
            displayName: 'Status Updated At',
            key: 'notificationStatus.updateTime',
            hasSorting: true,
            hasFiltering: true,
            width: 200
        },
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Status',
            key: 'notificationStatus.status',
            hasSorting: true,
            hasFiltering: false,
            width: 160
        },
        {
            type: COLUMN_TYPE.CONFIRMATION,
            displayName: 'Action',
            key: 'instrumentId',
            hasSorting: false,
            hasFiltering: false,
            getText: () => 'Cancel',
            width: 90,
            confirmation: {
                key: 'notificationStatus.status',
                onAction: data => alert(data.instrumentId),
                message: 'The question goes here?'
            }
        }
    ];

    return (
        <State store={store}>
            <Table id="instrumentId" data={mockData} columns={mockColumns} />
        </State>
    );
};

export const withExtraInfo = () => {
    const mockData = [
        {
            instrumentId: 'Fluent~826192.780',
            type: 'Fluent',
            serialNumber: '826192',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'NEW',
                updateTime: '2019-10-08T11:41:29.488Z'
            },
            history: [
                { status: 'NEW', receivedTime: '2019-10-08T11:41:30.643Z' }
            ]
        },
        {
            instrumentId: 'FluentNovo~826193.780',
            type: 'FluentNovo',
            serialNumber: '826193',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'NEW',
                updateTime: '2019-09-27T13:36:24.91Z'
            },
            history: []
        },
        {
            instrumentId: 'LUNA~826193.780',
            type: 'LUNA',
            serialNumber: '826193',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'NEW',
                updateTime: '2019-09-11T14:50:47.072Z'
            },
            history: []
        },
        {
            instrumentId: 'LUNA~828191.780',
            type: 'LUNA',
            serialNumber: '828191',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'CANCELLED',
                updateTime: '2019-09-27T13:37:20.597Z'
            },
            history: []
        },
        {
            instrumentId: 'FluentNovo~18050010.780',
            type: 'FluentNovo',
            serialNumber: '18050010',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'CANCELLED',
                updateTime: '2019-09-27T13:37:19.149Z'
            },
            history: []
        }
    ];

    const mockColumns = [
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Type',
            key: 'type',
            hasSorting: true,
            hasFiltering: true
        },
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Size',
            key: 'size',
            hasSorting: true,
            hasFiltering: true,
            width: 80
        },
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Serial Number',
            key: 'serialNumber',
            hasSorting: true,
            hasFiltering: true
        },
        {
            type: COLUMN_TYPE.DATE,
            displayName: 'Status Updated At',
            key: 'notificationStatus.updateTime',
            hasSorting: true,
            hasFiltering: true,
            width: 200
        },
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Status',
            key: 'notificationStatus.status',
            hasSorting: true,
            hasFiltering: false,
            width: 160
        }
    ];

    const renderExtraInfo = rowData => {
        return (
            <div>
                This is extra info for instrument with id '
                {rowData.instrumentId}'
            </div>
        );
    };

    return (
        <State store={store}>
            <Table
                id="instrumentId"
                data={mockData}
                columns={mockColumns}
                initialSortColumn="notificationStatus.updateTime"
                initialSortOrder={SORT_ORDER.ASCENDING}
                renderExtraInfo={renderExtraInfo}
            />
        </State>
    );
};

export const withAll = () => {
    const mockData = [
        {
            instrumentId: 'Fluent~826192.780',
            type: 'Fluent',
            serialNumber: '826192',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'NEW',
                updateTime: '2019-10-08T11:41:29.488Z'
            },
            history: [
                { status: 'NEW', receivedTime: '2019-10-08T11:41:30.643Z' }
            ]
        },
        {
            instrumentId: 'FluentNovo~826193.780',
            type: 'FluentNovo',
            serialNumber: '826193',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'NEW',
                updateTime: '2019-09-27T13:36:24.91Z'
            },
            history: []
        },
        {
            instrumentId: 'LUNA~826193.780',
            type: 'LUNA',
            serialNumber: '826193',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'NEW',
                updateTime: '2019-09-11T14:50:47.072Z'
            },
            history: []
        },
        {
            instrumentId: 'LUNA~828191.780',
            type: 'LUNA',
            serialNumber: '828191',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'CANCELLED',
                updateTime: '2019-09-27T13:37:20.597Z'
            },
            history: []
        },
        {
            instrumentId: 'FluentNovo~18050010.780',
            type: 'FluentNovo',
            serialNumber: '18050010',
            size: 780,
            notificationStatus: {
                id: '5d7909c66770881918ae17c2',
                status: 'CANCELLED',
                updateTime: '2019-09-27T13:37:19.149Z'
            },
            history: []
        }
    ];

    const mockColumns = [
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Type',
            key: 'type',
            hasSorting: true,
            hasFiltering: true
        },
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Size',
            key: 'size',
            hasSorting: true,
            hasFiltering: true,
            width: 80
        },
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Serial Number',
            key: 'serialNumber',
            hasSorting: true,
            hasFiltering: true
        },
        {
            type: COLUMN_TYPE.DATE,
            displayName: 'Status Updated At',
            key: 'notificationStatus.updateTime',
            hasSorting: true,
            hasFiltering: true,
            width: 200
        },
        {
            type: COLUMN_TYPE.TEXT,
            displayName: 'Status',
            key: 'notificationStatus.status',
            hasSorting: true,
            hasFiltering: false,
            width: 160
        },
        {
            type: COLUMN_TYPE.CONFIRMATION,
            displayName: 'Action',
            key: 'instrumentId',
            hasSorting: false,
            hasFiltering: false,
            getText: () => 'Cancel',
            width: 90,
            confirmation: {
                key: 'notificationStatus.status',
                onAction: data => alert(data.instrumentId),
                message: 'The question goes here?'
            }
        }
    ];

    const renderExtraInfo = rowData => {
        return (
            <div>
                This is extra info for instrument with id '
                {rowData.instrumentId}'
            </div>
        );
    };

    return (
        <State store={store}>
            <Table
                title="The table for something"
                footer="Place the paging here later on"
                id="instrumentId"
                selectedIDs={store.get('selectedIDs')}
                actions={actions}
                isSelectable
                data={mockData}
                columns={mockColumns}
                renderExtraInfo={renderExtraInfo}
                toggleMultipleSelection={toggleMultiple}
                toggleSingleSelection={toggleSingle}
            />
        </State>
    );
};

export const withSpecialColumn = () => {
    const renderCustomData = (id, data) => {
        return (
            <>
                <ul>Properties:</ul>
                {Object.keys(data).map(key => (
                    <li>
                        <strong>{key}</strong>:{data[key]}
                    </li>
                ))}
            </>
        );
    };

    const renderButton = (id, data) => (
        <button> {data.id}</button>
    );

    const mockColumns = columns;

    mockColumns[0].render = renderCustomData;
    mockColumns[0].hasSorting = true;

    mockColumns[1].render = renderButton;
    mockColumns[1].hasSorting = true;

    const mockData = data;

    return (
        <Router>
            <Table id="id" data={mockData} columns={mockColumns} />
        </Router>
    );
};
