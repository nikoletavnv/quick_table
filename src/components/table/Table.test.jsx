import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Table from './Table';

import columns from './__mocks__/columns';
import data from './__mocks__/data';

describe('<Table />', () => {
    describe('snapshot tests', () => {
        test('should render with no data', () => {
            const wrapper = mount(<Table columns={[]} data={[]} />);

            expect(toJson(wrapper)).toMatchSnapshot();
        });

        test('should render with data', () => {
            const wrapper = mount(
                <Table
                    columns={columns}
                    data={data}
                    initialSortColumn="col1"
                    isSelectable
                    title="Hello"
                    footer="Bye"
                />
            );

            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
    describe('unit tests', () => {
        test('renders title and footer', () => {
            const wrapper = mount(
                <Table columns={[]} data={[]} title="Hello" footer="Bye" />
            );

            expect(wrapper.find('.Title').length).toBe(1);
            expect(wrapper.find('tfoot').length).toBe(1);
        });
        test('renders empty message if no data', () => {
            const wrapper = mount(<Table columns={[]} data={[]} />);

            expect(wrapper.find('.Empty').length).toBe(1);
        });
        test('renders 3 rows', () => {
            const wrapper = mount(
                <Table
                    columns={columns}
                    data={data}
                    title="Hello"
                    footer="Bye"
                />
            );

            expect(wrapper.find('.Row').length).toBe(data.length);
        });
        test('renders actions', () => {
            const wrapper = mount(
                <Table
                    columns={[columns[0]]}
                    data={[data[0]]}
                    actions={[]}
                    isSelectable
                />
            );

            expect(wrapper.find('.Actions').length).toBe(1);
        });
    });
});
