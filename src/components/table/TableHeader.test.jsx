import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import TableHeader from './TableHeader';
import { COLUMN_TYPE } from './constants';
import Checkbox from '../checkbox/Checkbox';
import { SingleArrowIcon, DoubleArrowIcon } from '../image';
import { SORT_ORDER } from '../../hooks';

describe('<TableHeader />', () => {
    describe('snapshot tests', () => {
        test('should render with no props', () => {
            const wrapper = mount(
                <table>
                    <TableHeader />
                </table>
            );

            expect(toJson(wrapper)).toMatchSnapshot();
        });
        test('should render with props', () => {
            const columns = [{ type: COLUMN_TYPE.TEXT, key: 'col' }];

            const wrapper = mount(
                <table>
                    <TableHeader
                        columns={columns}
                        sortByColumn={jest.fn}
                        sortColumn="col"
                        sortOrder={SORT_ORDER.ASCENDING}
                        isSelected={false}
                    />
                </table>
            );

            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
    describe('unit tests', () => {
        test('should render 1 column', () => {
            const columns = [{ type: COLUMN_TYPE.TEXT, key: 'col' }];

            const wrapper = mount(
                <table>
                    <TableHeader
                        columns={columns}
                        sortByColumn={() => {}}
                        sortColumn="col"
                        sortOrder={SORT_ORDER.ASCENDING}
                        isSelected={false}
                    />
                </table>
            );

            expect(wrapper.find('.Column').length).toBe(1);
        });
        test('should render 2 column when we have selection', () => {
            const columns = [{ type: COLUMN_TYPE.TEXT, key: 'col' }];

            const wrapper = mount(
                <table>
                    <TableHeader
                        columns={columns}
                        sortByColumn={() => {}}
                        sortColumn="col"
                        sortOrder={SORT_ORDER.ASCENDING}
                        isSelected={false}
                        onToggleSelect={jest.fn}
                    />
                </table>
            );

            expect(wrapper.find(Checkbox).length).toBe(1);
            expect(wrapper.find('th').length).toBe(2);
        });
        test('should render filter for column with filtering', () => {
            const columns = [
                { type: COLUMN_TYPE.TEXT, key: 'col', hasFiltering: true }
            ];
            const filters = [{ key: 'col', value: '' }];

            const wrapper = mount(
                <table>
                    <TableHeader
                        columns={columns}
                        sortByColumn={jest.fn}
                        sortColumn="col"
                        sortOrder={SORT_ORDER.ASCENDING}
                        updateFilter={jest.fn}
                        filters={filters}
                    />
                </table>
            );

            expect(wrapper.find('.FilterContainer').length).toBe(1);
        });
        test('should not render filter for column without filtering', () => {
            const columns = [{ type: COLUMN_TYPE.TEXT, key: 'col' }];

            const wrapper = mount(
                <table>
                    <TableHeader
                        columns={columns}
                        sortByColumn={() => {}}
                        sortColumn="col"
                        sortOrder={SORT_ORDER.ASCENDING}
                    />
                </table>
            );

            expect(wrapper.find('.FilterContainer').length).toBe(0);
        });
        test('should render default sorting icon', () => {
            const columns = [
                { type: COLUMN_TYPE.TEXT, key: 'col', hasSorting: true }
            ];

            const wrapper = mount(
                <table>
                    <TableHeader
                        columns={columns}
                        sortByColumn={() => {}}
                        sortColumn="col"
                        sortOrder={SORT_ORDER.ASCENDING}
                    />
                </table>
            );

            expect(wrapper.find(SingleArrowIcon).length).toBe(1);
        });
        test('should render normal sorting icon when we do not have default sorting', () => {
            const columns = [
                { type: COLUMN_TYPE.TEXT, key: 'col', hasSorting: true }
            ];

            const wrapper = mount(
                <table>
                    <TableHeader
                        columns={columns}
                        sortByColumn={jest.fn}
                        sortOrder={SORT_ORDER.ASCENDING}
                    />
                </table>
            );

            expect(wrapper.find(DoubleArrowIcon).length).toBe(1);
        });
        test('should trigger checkbox onChange event', () => {
            const columns = [{ type: COLUMN_TYPE.TEXT, key: 'col' }];
            const spyOnChange = jest.fn();

            const wrapper = mount(
                <table>
                    <TableHeader
                        columns={columns}
                        sortByColumn={() => {}}
                        sortColumn="col"
                        sortOrder={SORT_ORDER.ASCENDING}
                        onToggleSelect={spyOnChange}
                    />
                </table>
            );

            const checkbox = wrapper.find(Checkbox).at(0);
            checkbox.prop('onChange')();
            expect(spyOnChange).toHaveBeenCalledTimes(1);
        });
        test('should have checkbox checked', () => {
            const columns = [{ type: COLUMN_TYPE.TEXT, key: 'col' }];

            const wrapper = mount(
                <table>
                    <TableHeader
                        columns={columns}
                        onToggleSelect={jest.fn}
                        isSelected
                    />
                </table>
            );

            const checkbox = wrapper.find(Checkbox).at(0);
            expect(checkbox.prop('checked')).toBe(true);
        });
    });
});
