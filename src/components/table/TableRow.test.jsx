import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';

import TableRow from './TableRow';
import Checkbox from '../checkbox/Checkbox';

import columns from './__mocks__/columns';
import data from './__mocks__/data';

describe('<TableRow />', () => {
    describe('snapshot tests', () => {
        test('should render with default props', () => {
            const wrapper = mount(
                <table>
                    <tbody>
                        <TableRow columns={[]} />
                    </tbody>
                </table>
            );

            expect(toJson(wrapper)).toMatchSnapshot();
        });
        test('should render with some props', () => {
            const wrapper = mount(
                <table>
                    <tbody>
                        <TableRow
                            columns={columns}
                            data={data[0]}
                            id="id"
                            onRowSelect={jest.fn}
                            isRowSelected={id => true}
                        />
                    </tbody>
                </table>
            );

            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
    describe('unit tests', () => {
        test('should render a checked checkbox when row is selected', () => {
            const wrapper = mount(
                <table>
                    <tbody>
                        <TableRow
                            columns={columns}
                            data={data[0]}
                            id="id"
                            onRowSelect={jest.fn}
                            isRowSelected={id => true}
                        />
                    </tbody>
                </table>
            );

            const checkbox = wrapper.find(Checkbox).at(0);
            expect(checkbox.prop('checked')).toBe(true);
        });
        test('should render extra info', () => {
            const wrapper = mount(
                <table>
                    <tbody>
                        <TableRow
                            columns={columns}
                            data={data[0]}
                            id="id"
                            renderExtraInfo={() => (
                                <div id="extraElement">
                                    This is my extra element
                                </div>
                            )}
                        />
                    </tbody>
                </table>
            );

            expect(wrapper.find('tr').length).toBe(2);
            expect(wrapper.find('.RowExtra').length).toBe(1);
            expect(wrapper.find('#extraElement').length).toBe(0);

            const mainRow = wrapper.find('tr').at(0);
            act(() => mainRow.prop('onClick')());
            wrapper.update();

            expect(wrapper.find('#extraElement').length).toBe(1);
        });
    });
});
