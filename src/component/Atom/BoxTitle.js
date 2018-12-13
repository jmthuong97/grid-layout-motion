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
	@media screen and (min-width: 55em) {
	    top: -4rem;
		right: -4.5rem;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl;
	}
	@media screen and (max-width: 55em) {
	    top: 14rem;
	    right: 0;
	    bottom: 0;
	    left: 0;
	}
`;

export const BoxTitle = ({children, setRef, location, straight}) => {
    const configCss = {
        left: {left: '-2rem', right: 'auto', writingMode: straight ? "horizontal-tb" : ""},
        bottom: {bottom: '-5rem', top: 'auto', writingMode: straight ? "horizontal-tb" : ""}
    };
    return (<Title ref={(el) => setRef("title", el)} style={configCss[location]}>{children}</Title>);
};

export const BoxTitleInner = ({children}) => {
    return <TitleInner id="title-inner" data-hover={children}>{children}</TitleInner>
};