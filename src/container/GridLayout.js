import React, {Component} from 'react';
import {TweenMax} from "gsap/TweenMax";
import imagesloaded from 'imagesloaded';
import {getRandomInt, lineEq} from '../untils/index';
import Grid from '../component/Atom/Grid';
import GridItem from '../component/GridItem';
import OverlayItem from '../component/OverlayItem';
import Loading from '../component/Atom/Loading';
import data from './data';
import styled from "styled-components";

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

class GridLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isPreviewOpen: false,
            currentPreview: null
        };
        this.grid_items = []; // ref: List: Item(image, title, text, icon,...): this.animatable (GridItem.js)
    }

    setGridItems = (data) => this.grid_items.push(data);

    onClickOpenItem = (index) => {
        this.setState({currentPreview: index});
        this.showOverlayReveal();
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
        if (!this.state.isPreviewOpen) return;
        this.hideOverlayReveal();
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
        this.setState({isPreviewOpen: false});
    };

    showOverlayReveal = () => {
        this.overlay.style.pointerEvents = 'auto';
        TweenMax.to(this.overlay_reveal, .5, {
            ease: 'Power1.easeInOut',
            x: '0%',
            onComplete: () => {
                // hide reveal
                TweenMax.to(this.overlay_reveal, .5, {
                    delay: 0.2,
                    ease: 'Power3.easeOut',
                    x: '-100%'
                });
                this.setState({isPreviewOpen: true});
            }
        });
    };
    hideOverlayReveal = () => {
        this.overlay.style.pointerEvents = 'none';
        // show reveal
        TweenMax.to(this.overlay_reveal, .5, {
            //delay: 0.15,
            ease: 'Power3.easeOut',
            x: '0%',
            onComplete: () => {
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

    componentDidMount() {
        document.body.style.overflow = 'hidden'; // hide scroll
        let listImage = this.grid_items.map(data => {
            return data.image;
        });
        imagesloaded(listImage, () => {
            this.setState({isLoading: false});
            document.body.style.overflow = 'scroll'; // hide scroll
        });
    }

    render() {
        const {isLoading, currentPreview, isPreviewOpen} = this.state;
        const listGridItem = data.data.map((item, index) => {
            return <GridItem
                setGridItems={this.setGridItems}
                onClickOpenItem={this.onClickOpenItem}
                key={index} index={index} dataItem={item}/>;
        });

        return (
            <div>
                <Grid/>
                <Grid>{listGridItem}</Grid>
                <Overlay ref={el => this.overlay = el}>
                    <OverlayReveal ref={el => this.overlay_reveal = el}/>
                    {isPreviewOpen &&
                    <OverlayItem onClickCloseItem={this.onClickCloseItem}
                                 dataItem={data.data[currentPreview]}/>}
                </Overlay>
                {isLoading && <Loading/>}
            </div>
        );
    }
}

export default GridLayout;