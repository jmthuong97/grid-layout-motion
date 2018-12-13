import React from 'react';
import styled from 'styled-components';

const TitleInner = styled.span`
    display: block;
	position: relative;
	font-weight: normal;
	text-transform: uppercase;
	font-size: 4.15rem;
	letter-spacing: 0.15rem;
	line-height: 1.25;
	font-family: 'Anton', sans-serif;
	-webkit-text-stroke: 2px #000;
	text-stroke: 2px #000;
	-webkit-text-fill-color: transparent;
	text-fill-color: transparent;
	color: transparent;
	&:before {
	    content: attr(data-hover);
        position: absolute;
        top: 0;
        left: 0;
        height: 0;
        overflow: hidden;
        white-space: nowrap;
        -webkit-text-stroke: 0;
        text-stroke: 0;
        -webkit-text-fill-color: #000;
        text-fill-color: #000;
        color: #000;
        transition: all 0.3s;
    }
`;

const Title = styled.h3`
    margin: 0;
	line-height: 1;
	position: absolute;
	z-index: 100;
	@media screen and (min-width: 55em) {
	    top: -4rem;
		right: -4.5rem;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl;
	}
`;

export const BoxTitle = ({children, setRef, location}) => {
    let style = {};
    switch (location) {
        case "left":
            style = {
                left: '-2rem',
                right: 'auto'
            };
            break;
        case "bottom":
            style = {
                bottom: '-5rem',
                top: 'auto'
            };
            break;
        default:
            break;
    }
    return (<Title ref={(el) => setRef("title", el)} style={style}>{children}</Title>);
};

export const BoxTitleInner = ({children}) => {
    return <TitleInner id="title-inner" data-hover={children}>{children}</TitleInner>
};