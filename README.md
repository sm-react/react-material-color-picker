[![GitHub version](https://badge.fury.io/gh/sm-react%2Freact-material-color-picker.svg)](https://badge.fury.io/gh/sm-react%2Freact-material-color-picker)
[![npm version](https://badge.fury.io/js/react-material-color-picker.svg)](https://badge.fury.io/js/react-material-color-picker)
[![@airbnb](https://img.shields.io/badge/code%20style-Airbnb-brightgreen.svg)](https://github.com/sm-react/react-material-color-picker/blob/master/.eslintrc)

# React Material Color Picker Component

[Material Design](https://material.google.com/) is a design language introduced by Google. If you want to find color inspiration for a specific design style based on [material color palette](https://material.google.com/style/color.html#), you can use this component as a development tool. You may find it useful while creating Material apps in combination with such libraries as [Material-UI](http://www.material-ui.com/)

## Appearance

![screen1](https://github.com/sm-react/react-material-color-picker/raw/master/doc/screen1.png)

![screen2](https://github.com/sm-react/react-material-color-picker/raw/master/doc/screen2.png)

![screen3](https://github.com/sm-react/react-material-color-picker/raw/master/doc/screen3.png)


## Install

$ npm i react-material-color-picker --save

## Usage

~~~
import React from 'react';
import MaterialColorPicker from 'react-material-color-picker';

// in your app
<MaterialColorPicker 
    initColor="rgba(0, 0, 0, 0.26)"
    onSubmit={actionLog()}
    onReset={actionLog()}
    style={{width: 400, backgroundColor: '#c7c7c7'}}
    submitLabel='Apply'
    resetLabel='Undo'
/>
~~~

## Demo
[![Live demo](https://img.shields.io/badge/Live%20Demo-%20Storybook-brightgreen.svg)](https://sm-react.github.io/react-material-color-picker/?selectedKind=Material%20Color%20Picker&selectedStory=default%20view&full=0&down=1&left=1&panelRight=1&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

## API

#### Props and Callbacks
**initColor** should be color string from Goggle material color palette

**style** - inline style of the root div node

**submitLabel** and **resetLabel** are titles of the appropriate buttons

**onSubmit** and **onReset** are callbacks wich will be invoked by clicking the appropriate buttons. It will recieve an argument with the following structure:
~~~js
event = {
        type, // 'submit' || 'reset', 
        timeStamp, // nativeEvent.timeStamp,
        target: {
            value, // currient color string,
            nativeEvent, // nativeEvent,
            name: 'MaterialColorPicker',
            node, // ref to root div element,
            ...this.props,
        }
};
~~~


## smArtLight
[![@UsulPro](https://img.shields.io/badge/github-UsulPro-blue.svg)](https://github.com/UsulPro)
[![@sm-react](https://img.shields.io/badge/github-smARTLight-red.svg)](https://github.com/sm-react)

