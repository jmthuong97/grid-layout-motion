import React, {Component} from 'react';
import {TweenMax} from "gsap/TweenMax";
import {options, getMousePos, setRange} from '../untils/index';
import styled from 'styled-components';
import Item from './Item';

const MainItem = styled.a`
    display: flex;
    color: #000000;
	justify-content: center;
	margin: 0 0 10rem 0;
	cursor: pointer;
	&:hover #image{
	    filter: grayscale(0);
	}
	&:hover #title-inner::before{
	    height: 100%;
	    width: 100%;
	}
	@media screen and (min-width: 55em) {
	    margin: 0;
	}
	@media screen and (min-width: 80em) {
	    &:nth-child(4n-2) {
            margin-top: -8rem;
            margin-bottom: 8rem;
	    }
	    &:nth-child(4n) {
		    margin-top: -5rem;
	    }
	}
`;

class GridItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enter: false,
            options: options
        };
        this.mainDom = {};
        this.animatable = {};
        this.setRef = this.setRef.bind(this);
    }

    componentDidMount() {
        this.props.setGridItems(this.animatable)
    }

    setRef = (label, value) => this.animatable[label] = value;
    mouseenterFn = () => {
        if (this.state.enter) this.setState({enter: false});
        clearTimeout(this.mousetime);
        this.mousetime = setTimeout(() => this.setState({enter: true}), 40);
    };
    mousemoveFn = (ev) => {
        if (!this.state.enter) return;
        this.tilt(ev);
    };
    mouseleaveFn = () => {
        const {options} = this.state;
        const animatable = this.animatable;
        this.setState({enter: false});

        clearTimeout(this.mousetime);
        for (let key in animatable) {
            if (animatable[key] === undefined || options[key] === undefined) continue;
            TweenMax.to(animatable[key],
                options[key].reverseAnimation !== undefined ? options[key].reverseAnimation.duration || 0 : 1.5, {
                    ease: options[key].reverseAnimation !== undefined ? options[key].reverseAnimation.ease || 'Power2.easeOut' : 'Power2.easeOut',
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: 0
                });
        }
    };
    tilt = (ev) => {
        const {options} = this.state;
        const animatable = this.animatable;
        const mousepos = getMousePos(ev);

        // Document scrolls.
        const docScrolls = {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        };
        const bounds = this.mainDom.el.getBoundingClientRect();

        // Mouse position relative to the main element (this.DOM.el).
        const relmousepos = {
            x: mousepos.x - bounds.left - docScrolls.left,
            y: mousepos.y - bounds.top - docScrolls.top
        };

        // Movement settings for the animatable elements.
        for (let key in animatable) {
            if (animatable[key] === undefined || options[key] === undefined) continue;
            let t = options[key] !== undefined ? options[key].translation || {x: 0, y: 0, z: 0} : {x: 0, y: 0, z: 0},
                r = options[key] !== undefined ? options[key].rotation || {x: 0, y: 0, z: 0} : {x: 0, y: 0, z: 0};

            setRange(t);
            setRange(r);

            const transforms = {
                translation: {
                    x: (t.x[1] - t.x[0]) / bounds.width * relmousepos.x + t.x[0],
                    y: (t.y[1] - t.y[0]) / bounds.height * relmousepos.y + t.y[0],
                    z: (t.z[1] - t.z[0]) / bounds.height * relmousepos.y + t.z[0],
                },
                rotation: {
                    x: (r.x[1] - r.x[0]) / bounds.height * relmousepos.y + r.x[0],
                    y: (r.y[1] - r.y[0]) / bounds.width * relmousepos.x + r.y[0],
                    z: (r.z[1] - r.z[0]) / bounds.width * relmousepos.x + r.z[0]
                }
            };

            TweenMax.to(animatable[key], 1.5, {
                ease: 'Power1.easeOut',
                x: transforms.translation.x,
                y: transforms.translation.y,
                z: transforms.translation.z,
                rotationX: transforms.rotation.x,
                rotationY: transforms.rotation.y,
                rotationZ: transforms.rotation.z
            });
        }
    };

    render() {
        const {index, dataItem, onClickOpenItem} = this.props;
        return (
            <MainItem ref={(el) => this.mainDom.el = el}
                      onClick={() => onClickOpenItem(index)}
                      onMouseEnter={this.mouseenterFn}
                      onMouseLeave={this.mouseleaveFn}
                      onMouseMove={this.mousemoveFn}>
                <Item dataItem={dataItem} index={index} setRef={this.setRef}/>
            </MainItem>
        );
    }
}

export default GridItem;