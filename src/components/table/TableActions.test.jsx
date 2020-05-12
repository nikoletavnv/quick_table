import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Filter from './Filter';
import TableActions from './TableActions';

describe('<TableActions />', () => {
    describe('snapshot tests', () => {
        test('should render with no actions', () => {
            const wrapper = mount(<TableActions />);

            expect(toJson(wrapper)).toMatchSnapshot();
        });
        test('should render with some actions', () => {
            const actions = [
                {
                    title: 'Open Filter',
                    component: Filter,
                    disabled: false,
                    actionHexCode: <>&#8722;</>
                }
            ];
            const wrapper = mount(<TableActions actions={actions} />);

            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
    describe('unit tests', () => {
        let actions;
        const spyAction = jest.fn();

        beforeAll(() => {
            actions = [
                {
                    title: 'Open',
                    component: Filter,
                    disabled: false,
                    onAction: spyAction
                },
                {
                    title: 'Close',
                    component: Filter,
                    disabled: false,
                    onAction: spyAction
                },
                {
                    title: 'Invalid',
                    component: Filter,
                    disabled: false,
                    onAction: spyAction,
                    actionHexCode: <>&#8722;</>
                }
            ];
        });
        beforeEach(() => {
            jest.clearAllMocks();
        });
        test('should render 3 action items', () => {
            const wrapper = mount(<TableActions actions={actions} />);

            expect(wrapper.find('.ActionItem').length).toBe(3);
        });
        test('should allow clicking on action', () => {
            const wrapper = mount(<TableActions actions={actions} />);

            expect(spyAction).toHaveBeenCalledTimes(0);

            const actionItem = wrapper.find('.ActionItem').at(0);
            actionItem.prop('onClick')();

            expect(spyAction).toHaveBeenCalledTimes(1);
        });
        test('should not allow clicking on action when all actions are disabled', () => {
            const wrapper = mount(
                <TableActions actions={actions} disableActions />
            );

            expect(spyAction).toHaveBeenCalledTimes(0);

            const actionItem = wrapper.find('.ActionItem').at(0);
            actionItem.prop('onClick')();

            expect(spyAction).toHaveBeenCalledTimes(0);
        });
    });
});
