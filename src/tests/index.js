import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import MaterialColorPicker from '../MaterialColorPicker.jsx';
const { describe, it } = global;

describe('### <MaterialColorPicker /> ###\n\n', () => {
    it('should show 20 tone swatches', () => {
        const text = 'The Text';
        const wrapper = shallow(<MaterialColorPicker />);
        const tonewrap = wrapper.find('.material-color-picker-tone-swatches');
        expect(tonewrap.children()).to.have.length(20);
    });

    it('should show right color name /* deepOrange800 */', () => {
        const text = 'The Text';
        const wrapper = shallow(<MaterialColorPicker initColor="#d84315"/>);
        const titlewrap = wrapper.find('.material-color-picker-title');
        expect(titlewrap.childAt(0).text()).to.be.equal('deepOrange800');
    });

    it('should show right color name /* darkBlack */', () => {
        const text = 'The Text';
        const wrapper = shallow(<MaterialColorPicker initColor="rgba(0, 0, 0, 0.87)"/>);
        const titlewrap = wrapper.find('.material-color-picker-title');
        expect(titlewrap.childAt(0).text()).to.be.equal('darkBlack');
    });

    it('should show right color in preview', () => {
        const initColor='rgba(255, 255, 255, 0.87)';
        const wrapper = shallow(<MaterialColorPicker initColor={initColor}/>);
        const previewwrap = wrapper.find('.material-color-picker-preview');
        expect(previewwrap.props().style.backgroundColor)
            .to.be.equal(initColor);
    });

    it('should handle the onSubmit event', () => {
        const clickMe = sinon.stub();
    // Here we do a JSDOM render. So, that's why we need to
    // wrap this with a div.
        const wrapper = mount(
      <div>
        <MaterialColorPicker
            initColor="#40c4ff"
            onSubmit={ clickMe }
        />
      </div>
    );
        wrapper.find('.material-color-picker-submit').simulate('click');
        expect(clickMe.callCount).to.be.equal(1);
    });

    it('should switch colors tones', () => {
        const clickMe = sinon.stub();
        const wrapper = mount(
          <div>
            <MaterialColorPicker
                initColor="#f3e5f5"
                onSubmit={ clickMe }
            />
          </div>
        );

        const tonesw = wrapper.find('.material-color-picker-tone-swatches');
        const previewwrap = wrapper.find('.material-color-picker-preview');
        const satwrap = wrapper.find('.material-color-picker-sat-swatches');

        /* red */
        tonesw.childAt(0).simulate('click');
        expect(satwrap.children()).to.have.length(14);
        expect(previewwrap.props().style.backgroundColor)
            .to.be.equal('#ffebee');

        /* indigo */
        tonesw.childAt(4).simulate('click');
        expect(satwrap.children()).to.have.length(14);
        expect(previewwrap.props().style.backgroundColor)
            .to.be.equal('#e8eaf6');

        /* brown */
        tonesw.childAt(16).simulate('click');
        expect(satwrap.children()).to.have.length(10);
        expect(previewwrap.props().style.backgroundColor)
            .to.be.equal('#efebe9');

        /* grey */
        tonesw.childAt(18).simulate('click');
        expect(satwrap.children()).to.have.length(10);
        expect(previewwrap.props().style.backgroundColor)
            .to.be.equal('#fafafa');

        /* black */
        tonesw.childAt(19).simulate('click');
        expect(satwrap.children()).to.have.length(10);
        expect(previewwrap.props().style.backgroundColor)
            .to.be.equal(undefined);
    });
});



