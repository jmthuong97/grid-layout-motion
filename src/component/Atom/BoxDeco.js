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
    const configCss = {
        left: {right: 'auto', left: '-3rem'},
        top: {top: 0, bottom: 'auto'}
    };
    return <BoxDeco ref={(el) => setRef("deco", el)} style={configCss[location]}>{children}</BoxDeco>;
}