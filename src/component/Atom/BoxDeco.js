import React from 'react';
import styled from 'styled-components';

const BoxDeco = styled.div`
    font-size: 6rem;
	line-height: 1;
	font-weight: bold;
	position: absolute;
	bottom: -4rem;
	right: -4rem;
	display: none;
	@media screen and (min-width: 55em) {
	    display: block;
	}
`;

export default ({children, setRef, location}) => {
    let style = {};
    switch (location) {
        case "left":
            style = {right: 'auto', left: '-3rem'};
            break;
        case "top":
            style = {top: 0, bottom: 'auto'};
            break;
        default:
            break;
    }
    return (
        <BoxDeco ref={(el) => setRef("deco", el)} style={style}>{children}</BoxDeco>
    );
}