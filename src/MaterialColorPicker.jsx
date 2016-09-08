import React from 'react';
import imageDoneBlk from './ic_done_black_64dp_1x.png';
import imageDoneWht from './ic_done_white_64dp_1x.png';
const _colors = require('./colors');

const propTypes = {
    initColor: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
};

const defaultProps = {
    initColor: '#40c4ff',
    onSubmit: () => {},
};

export default class MaterialColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.colorNames = this.colorNameList(_colors);
        this.toneNames = Object.keys(this.colorNames);


        this.toneColorByName = this.toneColorByName.bind(this);
        this.satColorByName = this.satColorByName.bind(this);
        this.resetColor = this.resetColor.bind(this);
        this.resetHover = this.resetHover.bind(this);
        this.submitHover = this.submitHover.bind(this);
        this.makeToneSwatches = this.makeToneSwatches.bind(this);
        this.makeGradeSwatches = this.makeGradeSwatches.bind(this);

//        this.toneSwatches = this.makeToneSwatches(this.toneNames);

        this.initState = this.resetColor();
        this.state = {
//            selectedTone: initTone ||  this.toneNames[0],
//            selectedSat: initSat ||  '500',
            ...this.initState,
            hoveredTone: '',
            hoveredSat: '',
            hoveredSubmit: false,
        };

        this.selectTone = this.selectTone.bind(this);
        this.selectSat = this.selectSat.bind(this);
        this.hoverTone = this.hoverTone.bind(this);
        this.hoverSat = this.hoverSat.bind(this);
        this.hoverReset = this.hoverReset.bind(this);

        this.titleName = this.titleName.bind(this);
        this.fullNameString = this.fullNameString.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onSubmit() {
        return () => {
            const event = {
                target: {
                    value: _colors[this.fullNameString()],
                },
            };
            this.props.onSubmit(event);
        };
    }

    onReset() {
        this.setState(this.initState);
    }

    findColorName(colObj, colString) {
        const nameList = Object.keys(colObj);
        const name = nameList.find((val) => {return (colObj[val] === colString);});
        /* if (!colObj[name]) {
            return 'white';
        }*/
        return name;
    }

    resetColor() {
        const initName = this.findColorName(_colors, this.props.initColor) || '';
        const initTone = this.toneColorByName(initName);
        const initSat = this.satColorByName(initName);
//        console.info(initTone)
//        console.info(initSat)
        const state = {
            selectedTone: initTone || this.toneNames[0],
            selectedSat: initSat || '500',
        };
        return state;
    }

    resetHover() {
        const initColor = this.resetColor();
        this.setState({
            hoveredTone: initColor.selectedTone,
            hoveredSat: initColor.selectedSat,
        });
    }

    submitHover(flag) {
        return () => {
            this.setState({hoveredSubmit: flag})
        }
    }

    colorNameList(colObj) {
        const nameList = Object.keys(colObj);
        const toneList = {
            red: nameList.filter(val => /^red/.test(val)),
            pink: nameList.filter(val => /^pink/.test(val)),
            purple: nameList.filter(val => /^purple/.test(val)),
            deepPurple: nameList.filter(val => /^deepPurple/.test(val)),
            indigo: nameList.filter(val => /^indigo/.test(val)),
            blue: nameList.filter(val => /^blue[A1-9]/.test(val)),
            lightBlue: nameList.filter(val => /^lightBlue/.test(val)),
            cyan: nameList.filter(val => /^cyan/.test(val)),
            teal: nameList.filter(val => /^teal/.test(val)),
            green: nameList.filter(val => /^green/.test(val)),
            lightGreen: nameList.filter(val => /^lightGreen/.test(val)),
            lime: nameList.filter(val => /^lime/.test(val)),
            yellow: nameList.filter(val => /^yellow/.test(val)),
            amber: nameList.filter(val => /^amber/.test(val)),
            orange: nameList.filter(val => /^orange/.test(val)),
            deepOrange: nameList.filter(val => /^deepOrange/.test(val)),
            brown: nameList.filter(val => /^brown/.test(val)),
            blueGrey: nameList.filter(val => /^blueGrey/.test(val)),
            grey: nameList.filter(val => /^grey/.test(val)),
            black: nameList.filter(val => /black|white|Black|White/.test(val)),

        };

        return toneList;
/*
        const toneNames = Object.keys(toneList);
        const allNames = toneNames.join(' ');
        console.log(toneNames.length);
        console.log(allNames);*/
    }

    makeToneSwatches(toneNames) {
        return (
            toneNames.map((val) => {
                let toneBaseName = this.baseToneByName(val);
                const baseColor = _colors[toneBaseName];
                return (
                <div
                  key={toneBaseName}
                  title={val}
                  onClick={this.selectTone(val)}
                  onMouseOver={this.hoverTone(val)}
                  onMouseOut={this.hoverReset()}
                  style={{
                      backgroundColor: baseColor,
                      flexGrow: 1,
                      height: 18,
                      cursor: 'pointer',
                      ...this.borderSelTone(val, this.state.selectedTone, this.state.hoveredTone),
                  }}
                >

                </div>
            );
            })
        );
    }

    makeGradeSwatches(toneName) {
        const gradeNameList = this.colorNames[toneName];
        const gradeSwatches = gradeNameList.map((val) => {
            return (
                <div
                  key={val}
                  style={{
                      backgroundColor: _colors[val],
                      flexGrow: 1,
                      width: '100%',
                      cursor: 'pointer',
                      ...this.borderSelGrade(this.satColorByName(val),
                                          this.state.selectedSat, this.state.hoveredSat),
                  }}
                  onClick={this.selectSat(this.satColorByName(val))}
                  onMouseOver={this.hoverSat(this.satColorByName(val))}
                  onMouseOut={this.hoverReset()}
                >
                    <div
                      style={{ display: 'flex', alignItems: 'center', height: '100%' }}
                    >
                        <div
                          style={{
                              width: 2,
                              height: 2,
                              top: 20,
                              position: 'relative',
                              margin: 'auto',
                              transform: 'rotate(-90deg)',
//                                backgroundColor: 'white',
                          }}
                        >
                            <div style={{
                                textAlign: 'center',
                                display: 'inline-block',
//                                    width: 'auto',
                                left: '-50%',
                                top: -6,
                                position: 'relative',
                                color: this.bwColorByName(val),
                            }}
                            >
                                {this.blackShortName(this.satColorByName(val))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return gradeSwatches;
    }

    borderSelTone(val, selName, hovName) {
        if (val === selName) {
            return {
                borderTop: '2px #ffffff solid',
                borderBottom: '2px #383838 solid',
            };
        }
        if (val === hovName) {
            return {
                borderTop: '2px rgba(255, 255, 255, 0.46) solid',
                borderBottom: '2px rgba(56, 56, 56, 0.44) solid',
            };
        }
        return {
            borderTop: '2px rgba(209, 209, 209, 0) solid',
            borderBottom: '2px rgba(56, 56, 56, 0) solid',
        };
    }

    borderSelGrade(val, selName, hovName) {
        if (val === selName) {
            return {
                borderTop: '3px #d1d1d1 solid',
                borderBottom: '3px #383838 solid',
            };
        }
        if (val === hovName) {
            return {
                borderTop: '3px rgba(255, 255, 255, 0.61) solid',
                borderBottom: '3px rgba(56, 56, 56, 0.5) solid',
            };
        }
        return {};
    }

    selectTone(toneName) {
        return () => {
            this.setState({ selectedTone: toneName });
        };
    }

    selectSat(satName) {
        return () => {
            this.setState({ selectedSat: satName });
        };
    }

    hoverTone(toneName) {
        return () => {
            this.setState({ hoveredTone: toneName });
        };
    }

    hoverSat(satName) {
        return () => {
            this.setState({ hoveredSat: satName });
        };
    }

    hoverReset() {
        return () => {
            this.setState({ hoveredTone: '', hoveredSat: '' });
        };
    }

    baseToneByName(toneName) {
        let toneBaseName = `${toneName}500`;
        if (toneName === 'black') {
            toneBaseName = 'lightBlack';
        }
        return toneBaseName;
    }

    toneColorByName(colorName) {
        const satName = this.satColorByName(colorName);
        const toneName = /black|white|Black|White/.test(satName) ? 'black' :
        colorName.replace(satName, '');
        return toneName;
    }

    satColorByName(colorName) {
        let satName = colorName.replace(/\D*/, '');
        if (/A\d/.test(colorName)) {
            satName = `A${satName}`;
        }
        return satName || colorName;
    }

    blackShortName(satName) {
        let newName = satName;
        if (/Black/.test(newName)) {
            newName = newName.replace(/Black/, '.B');
        }
        if (/White/.test(newName)) {
            newName = newName.replace(/White/, '.W');
        }
        return newName;
    }

    numColorByName(colorName) {
        const satName = colorName.replace(/\D*/, '');
        return satName || colorName;
    }

    bwColorByName(colorName) {
        const contrColor = parseInt(this.numColorByName(colorName), 10);
        if (contrColor) {
            return contrColor <= 200 ? 'black' : 'white';
        }
        if (/black|Black/.test(colorName)) {
            return 'white';
        }
        return 'black';
    }

    fullNameString() {
        let toneString = this.state.hoveredTone || this.state.selectedTone;
        const satString = this.state.hoveredSat || this.state.selectedSat;
        if (toneString === 'black') {
            toneString = '';
//            if(!/black|white/.test(satString)) {
//                satString = 'black';
//            }
        }
        return (`${toneString}${satString}`);
    }

    titleName(isBlack) {
        const baseColor = isBlack ? 'black' : 'white';
        const greyColor = isBlack ? '#505050' : '#c1c1c1';
        let toneString = this.state.hoveredTone || this.state.selectedTone;
        let satString = this.state.hoveredSat || this.state.selectedSat;
        if (toneString === 'black') {
            toneString = '';
//            if(!/black|white/.test(satString)) {
//                satString = 'black';
//            }
        }
        const isHovTone = !(this.state.hoveredTone === this.state.selectedTone)
        && (this.state.hoveredTone);
        const isHovSat = !(this.state.hoveredSat === this.state.selectedSat)
        && (this.state.hoveredSat);
        const toneColor = isHovTone ? greyColor : baseColor;
        const satColor = isHovSat ? greyColor : baseColor;
        return (
            <div>
                <span style={{ color: toneColor, fontWeight: isHovTone ? '' : 'bold' }} >
                    {toneString}
                </span>
                <span style={{ color: satColor, fontWeight: isHovSat ? '' : 'bold' }} >
                    {satString}
                </span>
            </div>);
    }

    render() {
        return (
            <div
              className="material-color-picker"
              style={{
                  padding: 5,
                  fontFamily: 'sans-serif',
                  fontSize: 12,
              }}
            >
                <div
                  className="material-color-picker-tone-swatches"
                  style={{
//                        padding: 5,
//                        width: '100%',
                      display: 'flex',
                      flexDirection: 'row'/* 'column'*/,
                      justifyContent: 'space-between',
                  }}
                >
                    {this.makeToneSwatches(this.toneNames)}

                </div>
                <div
                  className="material-color-picker-title"
                  style={{
                      marginTop: 5,
                      padding: 5,
                      paddingLeft: 25,
                      paddingRight: 25,
                      backgroundColor: _colors[this.baseToneByName(this.state.selectedTone)],
                      display: 'flex',
                      justifyContent: 'space-between',
                  }}
                >
                    {/* <span style={{color: 'white'}} >{this.state.selectedTone + 's'}</span>
                    <span style={{color: 'black'}} >{this.state.selectedTone + 's'}</span>*/}
                    {this.titleName(false)}
                    {this.titleName(true)}
                </div>
                <div
                  style={{
                      marginTop: 5,
//                        padding: 5,
//                        paddingLeft: 0,
//                        paddingRight: 25,
//                        backgroundColor: _colors[this.baseToneByName(this.state.selectedTone)],
                      display: 'flex',
//                        justifyContent: 'space-between',
                  }}
                >
                    <div
                      className="material-color-picker-preview"
                      style={{
                          height: 64,
                          width: 64,
                          backgroundColor: _colors[this.fullNameString()],
                      }}
                    >
                       {this.state.hoveredSubmit ?
                            <img
                               src={
                                    this.bwColorByName(this.fullNameString()) === 'black' ? imageDoneBlk : imageDoneWht}
                               style={{opacity: 0.4}}
                             /> : null
                       }

                    </div>

                    <div
                      className="material-color-picker-sat-swatches"
                      style={{
//                            height: 60,
                          flexGrow: 1,
                          width: 278,
                          marginLeft: 5,
                          display: 'flex',
                      }}
                    >
                        {this.makeGradeSwatches(this.state.selectedTone)}
                    </div>

                </div>
                <div
                  style={{
                      marginTop: 5,
                      padding: 5,
                      paddingLeft: 16,
                      paddingRight: 16,
                      border: '1px solid red',
                      borderColor: _colors[this.baseToneByName(this.state.selectedTone)],
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: '#f2f2f2',
                      color: '#404040',
                  }}
                >
                    <div style={{
                            width: 'auto',
//                            display: 'flex',
//                            flexWrap: 'wrap',
                        }}>
                        <b><nobr>{ _colors[this.fullNameString()] }</nobr></b>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-end',
                            fontSize: 'larger',
                        }}
                    >
                        <div
                          className="material-color-picker-reset"
                          title={`reset to ${this.props.initColor}`}
                          style={{
                                cursor: 'pointer',
                                paddingLeft: 16,
                          }}
                          onClick={this.onReset}
                          onMouseOver={this.resetHover}
                          onMouseOut={this.hoverReset()}
                        >
                            Reset
                        </div>
                        <div
                          className="material-color-picker-submit"
                          title={`submit ${this.fullNameString()} color`}
                          style={{
                                cursor: 'pointer',
                                paddingLeft: 16,
                          }}
                          onClick={this.onSubmit()}
                          onMouseOver={this.submitHover(true)}
                          onMouseOut={this.submitHover(false)}
                        >
                            Submit
                        </div>
                    </div>
                    {/*
                    <span style={{color: 'white'}} >{_colors[this.fullNameString()]}</span>
                    <span style={{color: 'black'}} >{_colors[this.fullNameString()]}</span>*/}
                </div>
            </div>
        );
    }

}

MaterialColorPicker.propTypes = propTypes;
MaterialColorPicker.defaultProps = defaultProps;
