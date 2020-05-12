import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
    test('has proper html structure with default props', () => {
        const wrapper = shallow(<Checkbox vaue={10} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test('has proper html structure with label and checked state', () => {
        const wrapper = shallow(
            <Checkbox checked={true} value={10}>
                <p>Label</p>
            </Checkbox>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
