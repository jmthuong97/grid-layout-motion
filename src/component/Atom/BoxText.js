import React from 'react';
import styled from 'styled-components';

const Text = styled.h4`
    position: absolute;
	top: -6rem;
	font-weight: normal;
	text-transform: uppercase;
	letter-spacing: 0.15rem;
	font-size: 1.5rem;
	margin: 0.5rem 1rem;
	font-family: 'Anton', sans-serif;
	@media screen and (max-width: 55em) {
	    top: -6rem !important;
	    right: 0 !important;
	    bottom: 0 !important;
	    left: 0 !important;
	}
`;

const TextInner = styled.span`
    position: relative;
	display: block;
	width: fit-content;
	border: 6px solid #000;
	padding: 0.25rem 1.25rem;
`;

export const BoxText = ({children, setRef, location}) => {
    const configCss = {
        top: {top: '-5rem'},
        bottom: {bottom: '-5rem', top: 'auto'},
        right: {right: '0', left: 'auto'}
    };
    return <Text ref={(el) => setRef("text", el)} style={configCss[location]}>{children}</Text>;
};

export const BoxTextInner = ({children, rotated, reverse}) => {
    let style = {};
    style.transform = rotated === "rotated1" ? "rotate(4deg)" : rotated === "rotated2" ? "rotate(-3deg)" : "rotate(-15deg)";
    style.background = reverse ? "#000" : "";
    style.color = reverse ? "#ececec" : "";
    return <TextInner style={style}>{children}</TextInner>;
};

