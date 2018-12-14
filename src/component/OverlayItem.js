import React, {Component} from 'react';
import styled from 'styled-components';
import {TweenMax} from "gsap/TweenMax";
import CloseButton from '../component/Atom/CloseButton';
import {lineEq} from "../untils";
import Item from "./Item";

const MainItem = styled.div`
    width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	background: #ececec;
	opacity: 1;
	display: flex;
	flex-direction: row;
    align-items: center;
    padding: 5rem 5vw;
    justify-content: center;
    img{
        width: 25em;
        filter: grayscale(0);
    }
`;
const OverlayContent = styled.p`
    font-size: 1.25rem;
	line-height: 1.5;
	max-width: 25rem;
	margin: 1rem 0 0 1rem;
	@media screen and (min-width: 55em) {
	    font-size: 1.25rem;
		margin-top: 0;
	}
`;
const OverlayClose = styled.button`
    position: absolute;
	top: 0;
	right: 0;
	background: none;
	border: 0;
	margin: 1rem;
	padding: 1rem;
	opacity: 1;
	&:focus{
	  outline: none;
	}
`;

class OverlayItem extends Component {
    constructor(props) {
        super(props);
        this.animatable = {};
        this.setRef = this.setRef.bind(this);
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden'; // hide scroll
        for (let el of Object.values(this.animatable)) {
            if (el == null) continue;
            const bounds = el.getBoundingClientRect();
            const win = {width: window.innerWidth, height: window.innerHeight};
            TweenMax.to(el, lineEq(0.8, 1.2, win.width, 0, Math.abs(bounds.left + bounds.width - win.width)), {
                ease: 'Expo.easeOut',
                delay: 0.2,
                startAt: {
                    x: `${lineEq(0, 800, win.width, 0, Math.abs(bounds.left + bounds.width - win.width))}`,
                    y: `${lineEq(-100, 100, win.height, 0, Math.abs(bounds.top + bounds.height - win.height))}`,
                    rotationZ: `${lineEq(5, 30, 0, win.width, Math.abs(bounds.left + bounds.width - win.width))}`
                },
                x: 0,
                y: 0,
                rotationZ: 0
            });
        }
    }

    setRef = (label, value) => this.animatable[label] = value;

    render() {
        const {onClickCloseItem, dataItem} = this.props;
        return (
            <div>
                <MainItem>
                    <Item dataItem={dataItem} setRef={this.setRef}/>
                    <OverlayContent ref={el => this.animatable["overlay_content"] = el}
                                    dangerouslySetInnerHTML={{__html: dataItem.description}}/>
                </MainItem>
                <OverlayClose onClick={() => onClickCloseItem()}>
                    <CloseButton/>
                </OverlayClose>
            </div>
        );
    }
}

export default OverlayItem;