import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import TableHeaderColumn from './TableHeaderColumn';
import { COLUMN_TYPE } from './constants';

describe('<TableHeaderColumn />', () => {
    describe('snapshot tests', () => {
        test('should render with props', () => {
            const column = { type: COLUMN_TYPE.TEXT, key: 'col' };
            const wrapper = mount(
                <table>
                    <thead>
                        <tr>
                            <TableHeaderColumn
                                column={column}
                                index={0}
                                updateFilter={null}
                                filter={{ key: 'col', value: '' }}
                                sortColumn="col1"
                            />
                        </tr>
                    </thead>
                </table>
            );

            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});
