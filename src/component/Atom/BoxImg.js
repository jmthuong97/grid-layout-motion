import React from 'react';
import styled from 'styled-components';

const BoxImg = styled.img`
    display: block;
	flex: none;
	margin: 0 auto;
	width: 15em;
	filter: grayscale(100%);
	transition: filter 0.3s;
	pointer-events: none;
`;

export default ({src, alt, setRef}) => {
    return <BoxImg id="image" src={src} alt={alt} ref={(el) => setRef("image", el)}/>
}