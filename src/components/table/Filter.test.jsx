import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Filter from './Filter';

describe('<Filter /> tests', () => {
    describe('snapshot tests', () => {
        test('should render with normal props', () => {
            const wrapper = mount(<Filter value="value" />);

            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
    describe('unit tests', () => {
        test('renders 1 input and 1 icon', () => {
            const wrapper = mount(<Filter value="value" />);

            const inputs = wrapper.find('input[type="search"]');
            const icons = wrapper.find('svg');

            expect(inputs.length).toBe(1);
            expect(icons.length).toBe(1);
        });
        test('onKeyDown is triggered', () => {
            const spyKeyDown = jest.fn();
            const wrapper = mount(
                <Filter value="value" onKeyDown={spyKeyDown} />
            );

            const searchInput = wrapper.find('input[type="search"]').at(0);
            searchInput.prop('onKeyDown')();

            expect(spyKeyDown).toHaveBeenCalledTimes(1);
        });
        test('updateFilter is triggered', () => {
            const spyUpdate = jest.fn();
            const wrapper = mount(
                <Filter value="value" updateFilter={spyUpdate} />
            );

            const searchInput = wrapper.find('input[type="search"]').at(0);
            searchInput.prop('onChange')({ target: { value: 'new value' } });

            expect(spyUpdate).toHaveBeenCalledTimes(1);
        });
        test('onClose is triggered', () => {
            const spyClose = jest.fn();
            const wrapper = mount(<Filter value="value" onClose={spyClose} />);

            const icon = wrapper.find('svg').at(0);
            icon.prop('onClick')();

            expect(spyClose).toHaveBeenCalledTimes(1);
        });
    });
});
