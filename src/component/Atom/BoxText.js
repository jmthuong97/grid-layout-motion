import React from 'react';
import styled from 'styled-components';

const Text = styled.h4`
    margin: 0;
	position: absolute;
	top: -6rem;
	font-weight: normal;
	text-transform: uppercase;
	letter-spacing: 0.15rem;
	font-size: 1.75rem;
	margin: 0.5rem 1rem;
	font-family: 'Anton', sans-serif;
`;

const TextInner = styled.span`
    position: relative;
	display: block;
	border: 6px solid var(--color-text);
	padding: 0.25rem 1.25rem;
`;

export const BoxText = ({children, setRef, location}) => {
    let style = {};
    switch (location) {
        case "top":
            style = {top: '-5rem'};
            break;
        case "bottom":
            style = {bottom: '-5rem', top: 'auto'};
            break;
        case "right":
            style = {right: '0', left: 'auto'};
            break;
        default:
            break;
    }
    return (
        <Text ref={(el) => setRef("text", el)} style={style}>{children}</Text>
    );
};

export const BoxTextInner = ({children, rotated, reverse}) => {
    let style = {};
    switch (rotated) {
        case "rotated1":
            style = {transform: 'rotate(4deg)'};
            break;
        case "rotated2":
            style = {transform: 'rotate(-3deg)'};
            break;
        case "rotated3":
            style = {transform: 'rotate(-15deg)'};
            break;
        default:
            break;
    }
    if (reverse) {
        style.background = "#000";
        style.color = "#ececec";
    }
    return (
        <TextInner style={style}>{children}</TextInner>
    );
};

