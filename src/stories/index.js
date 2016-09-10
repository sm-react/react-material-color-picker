import React from 'react';
import { storiesOf, action, setAddon, addDecorator  } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { withKnobs, text, boolean, number, object } from '@kadira/storybook-addon-knobs';

// import MaterialColorPicker from 'react-material-color-picker';
import MaterialColorPicker from '../MaterialColorPicker.jsx';


setAddon(infoAddon);


storiesOf('Material Color Picker', module)

    .addDecorator((story) => (
        <div
          style={{
              position: 'relative',
              width: '100%',
//              minHeight: 600,
              overflowY: 'visible',
              display: 'flex',
              justifyContent: 'center',
          }}
        >
            {story()}
        </div>
    ))
    .addDecorator(withKnobs)
    .add('default view', () => (

        <div style={{width: 400, backgroundColor: '#c7c7c7'}} >
            <MaterialColorPicker
                initColor="#3f51b5"
                onSubmit={actionLog()}
                onReset={actionLog()}
            />
        </div>

    ))
    .add('fullwidth view', () => (

        <div style={{width: '70%'}} >
            <MaterialColorPicker
                initColor="#9ccc65"
                onSubmit={actionLog()}
                onReset={actionLog()}
                style={{backgroundColor: '#c7c7c7'}}
            />
        </div>

    ))
//    storiesOf('Material Color Picker', module)
    .addWithInfo('API',`
[![GitHub version](https://badge.fury.io/gh/sm-react%2Freact-material-color-picker.svg)](https://badge.fury.io/gh/sm-react%2Freact-material-color-picker)
[![npm version](https://badge.fury.io/js/react-material-color-picker.svg)](https://badge.fury.io/js/react-material-color-picker)

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

[![@UsulPro](https://img.shields.io/badge/github-UsulPro-blue.svg)](https://github.com/UsulPro)
[![@sm-react](https://img.shields.io/badge/github-smARTLight-red.svg)](https://github.com/sm-react)
`                       , () => (
            <div style={{width: 600}} >
               <MaterialColorPicker
                    initColor="rgba(0, 0, 0, 0.26)"
                    onSubmit={actionLog()}
                    onReset={actionLog()}
                    style={{width: 400, backgroundColor: '#c7c7c7'}}
                    submitLabel='Apply'
                    resetLabel='Undo'
                />
            </div>
    ), {inline: true, source: false})
    .addWithInfo('try props',
`
->

->
#### select the \`KNOBS\` tab to get access for props
`,
                 () => {
        const style={
            width: 400,
            backgroundColor: '#c7c7c7',
        }
        return (<div  >
            <MaterialColorPicker
                initColor={text('initColor', '#ec407a')}
                onSubmit={actionLog()}
                onReset={actionLog()}
                submitLabel={text('submitLabel', 'OK')}
                resetLabel={text('resetLabel', 'Cansel')}
                style={object('style', style)}
            />
        </div>)

    }, {inline: true, source: false, header: false});


function actionLog(title) {
    return (event) => {
        const data = {...event};
        data.target.node = 'console.log(event.target.node)';

        action(`${title || ''}${data.type}: ${data.target.value}`.trim())(data);
    }
}
