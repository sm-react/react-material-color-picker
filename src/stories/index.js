import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
// import MaterialColorPicker from 'react-material-color-picker';
import MaterialColorPicker from '../MaterialColorPicker.jsx';

storiesOf('Button', module)
    .addDecorator((story) => (
        <div
          style={{
              backgroundColor: '#c7c7c7',
              position: 'relative',
              width: '70%',
              left: '15%',
//                height: 300,
          }}
        >
            {story()}
        </div>
    ))
    .add('default view', () => (

    <MaterialColorPicker initColor="#f3e5f5"/>

    ));
