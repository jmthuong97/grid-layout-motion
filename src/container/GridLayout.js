import React, {Component} from 'react';
import styled from 'styled-components';
import {TweenMax} from "gsap/TweenMax";
import imagesloaded from 'imagesloaded';
import {getRandomInt, lineEq} from '../untils/index';
import Grid from '../component/Atom/Grid';
import CloseButton from '../component/Atom/CloseButton';
import GridItem from '../component/GridItem';
import OverlayItem from '../component/OverlayItem';
import Loading from '../component/Atom/Loading';
import data from './data';

const Overlay = styled.div`
    pointer-events: none;
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	overflow: hidden;
`;
const OverlayReveal = styled.div`
    width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: #975429;
	position: absolute;
	z-index: 100;
	transform: translate3d(100%,0,0);
`;
const OverlayClose = styled.button`
    position: absolute;
	top: 0;
	right: 0;
	background: none;
	border: 0;
	margin: 1rem;
	padding: 1rem;
	opacity: 0;
	&:focus{
	  outline: none;
	}
`;

class GridLayout extends Component {
    constructor(props) {
        super(props);
        this.isPreviewOpen = false;
        this.overlay = {};
        this.overlay_reveal = {};
        this.overlay_close = {};
        this.overlay_items = []; // ref: List: Item(parent, image, title, text, icon,...) (OverlayItem.js)
        this.grid_items = []; // ref: List: Item(image, title, text, icon,...): this.animatable (GridItem.js)
        this.items = []; // ref: List: MainItem (GridItem.js)
    }

    setRefLoading = (el) => this.loading = el;
    setGridItems = (data) => this.grid_items.push(data);
    setOverlayItems = (data) => this.overlay_items.push(data);

    show = () => {
        this.overlay.style.pointerEvents = 'auto';
        TweenMax.to(this.overlay_reveal, .5, {
            ease: 'Power1.easeInOut',
            x: '0%',
            onComplete: () => {
                document.body.style.overflow = 'hidden'; // hide scroll
                this.revealItem(); // show preview
                // hide reveal
                TweenMax.to(this.overlay_reveal, .5, {
                    delay: 0.2,
                    ease: 'Power3.easeOut',
                    x: '-100%'
                });
                this.overlay_close.style.opacity = 1;
            }
        });
    };
    hide = () => {
        this.overlay.style.pointerEvents = 'none';
        // show reveal
        TweenMax.to(this.overlay_reveal, .5, {
            //delay: 0.15,
            ease: 'Power3.easeOut',
            x: '0%',
            onComplete: () => {
                this.overlay_close.style.opacity = 0;
                this.contentItem["parent"].style.opacity = 0; // hide preview
                this.contentItem["parent"].style.flexDirection = 'column';
                document.body.style.overflow = 'auto'; // show scroll
                // hide reveal
                TweenMax.to(this.overlay_reveal, .5, {
                    delay: 0,
                    ease: 'Power3.easeOut',
                    x: '100%'
                });
            }
        });
    };

    revealItem() {
        this.contentItem["parent"].style.opacity = 1; // show MainItem (GridItem.js) on center screen
        this.contentItem["parent"].style.flexDirection = 'row';
        for (let el of Object.values(this.contentItem)) {
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

    onClickOpenItem = (index) => {
        if (this.isPreviewOpen) return;
        this.isPreviewOpen = true;
        this.contentItem = this.overlay_items[index];
        this.show(); // show content after overlay full screen

        for (let item of this.grid_items) {
            for (let key in item) {
                if (item[key]) {
                    let x, y;
                    const bounds = item[key].getBoundingClientRect();
                    const win = {width: window.innerWidth, height: window.innerHeight};

                    if (bounds.top + bounds.height / 2 < win.height / 2 - win.height * .1) {
                        //x = getRandomInt(-250,-50);
                        //y = getRandomInt(20,100)*-1;
                        x = -1 * lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
                        y = -1 * lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
                    } else if (bounds.top + bounds.height / 2 > win.height / 2 + win.height * .1) {
                        //x = getRandomInt(-250,-50);
                        //y = getRandomInt(20,100);
                        x = -1 * lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
                        y = lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds.width - win.width))
                    } else {
                        //x = getRandomInt(300,700)*-1;
                        x = -1 * lineEq(10, 700, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
                        y = getRandomInt(-25, 25);
                    }

                    TweenMax.to(item[key], 0.4, {
                        ease: 'Power3.easeOut',
                        delay: lineEq(0, 0.3, 0, win.width, Math.abs(bounds.left + bounds.width - win.width)),
                        x: x,
                        y: y,
                        rotationZ: getRandomInt(-10, 10),
                        opacity: 0
                    });
                }
            }
        }
    };
    onClickCloseItem = () => {
        if (!this.isPreviewOpen) return;
        this.isPreviewOpen = false;
        this.hide();
        for (let item of this.grid_items) {
            for (let key in item) {
                if (item[key]) {
                    const bounds = item[key].getBoundingClientRect();
                    const win = {width: window.innerWidth};
                    TweenMax.to(item[key], 0.6, {
                        ease: 'Expo.easeOut',
                        delay: .55 + lineEq(0, 0.2, 0, win.width, Math.abs(bounds.left + bounds.width - win.width)),
                        x: 0,
                        y: 0,
                        rotationZ: 0,
                        opacity: 1
                    });
                }
            }
        }
    };

    componentDidMount() {
        document.body.style.overflow = 'hidden'; // hide scroll
        let listImage = this.grid_items.map(data => {
            return data.image;
        });
        imagesloaded(listImage, () => {
            this.loading.style.display = "none";
            document.body.style.overflow = 'scroll'; // hide scroll
        });
    }

    render() {
        const listGridItem = data.data.map((item, index) => {
            return <GridItem ref={val => this.items.push(val.mainDom.el)}
                             setGridItems={this.setGridItems}
                             onClickOpenItem={this.onClickOpenItem}
                             key={index} index={index} dataItem={item}/>;
        });
        const listOverlayItem = data.data.map((item, index) => {
            return <OverlayItem setOverlayItems={this.setOverlayItems}
                                key={index} dataItem={item}/>;
        });
        return (
            <div>
                <Loading setRefLoading={this.setRefLoading}/>
                <Grid/>
                <Grid>{listGridItem}</Grid>
                <Overlay ref={(el) => this.overlay = el}>
                    <OverlayReveal ref={(el) => this.overlay_reveal = el}/>
                    {listOverlayItem}
                    <OverlayClose onClick={this.onClickCloseItem}
                                  ref={(el) => this.overlay_close = el}>
                        <CloseButton/>
                    </OverlayClose>
                </Overlay>
            </div>
        );
    }
}

export default GridLayout;