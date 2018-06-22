import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Slider from './Slider';

describe('<Slider />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Slider />);
  });

  it('renders children by default', () => {
    const wrapper = shallow(<Slider>account_circle</Slider>);
    assert.strictEqual(wrapper.contains('account_circle'), true, 'should contain the children');
  });

  it('should render an span with root class', () => {
    const wrapper = shallow(<Slider>account_circle</Slider>);
    assert.strictEqual(wrapper.name(), 'span');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the "root" class');
  });

  it('should spread props on span', () => {
    const wrapper = shallow(<Slider data-test="hello">account_circle</Slider>);
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the span');
  });

  describe('optional classes', () => {
    it('should render with the user class', () => {
      const wrapper = shallow(<Slider className="meow">account_circle</Slider>);
      assert.strictEqual(wrapper.hasClass('meow'), true, 'should have the "meow" class');
    });

    it('should render with the secondary color', () => {
      const wrapper = shallow(<Slider color="secondary">account_circle</Slider>);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
    });

    it('should render with the action color', () => {
      const wrapper = shallow(<Slider color="action">account_circle</Slider>);
      assert.strictEqual(
        wrapper.hasClass(classes.colorAction),
        true,
        'should have the "action" color',
      );
    });

    it('should render with the error color', () => {
      const wrapper = shallow(<Slider color="error">account_circle</Slider>);
      assert.strictEqual(
        wrapper.hasClass(classes.colorError),
        true,
        'should have the "error" color',
      );
    });

    it('should render with the primary class', () => {
      const wrapper = shallow(<Slider color="primary">account_circle</Slider>);
      assert.strictEqual(
        wrapper.hasClass(classes.colorPrimary),
        true,
        'should have the "primary" color',
      );
    });
  });
});
