import React from 'react';
import styled from 'styled-components';

const BoxImg = styled.img`
    display: block;
	flex: none;
	margin: 0 auto;
	width: 230px;
	filter: grayscale(100%);
	transition: filter 0.3s;
	pointer-events: none;
`;

export default ({src, setRef}) => {
    return <BoxImg id="image" src={src} ref={(el) => setRef("image", el)}/>
}