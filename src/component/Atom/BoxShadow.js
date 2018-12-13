import React from 'react';
import styled from 'styled-components';

const BoxShadow = styled.div`
    position: absolute;
	width: 100%;
	height: 100%;
	top: -1rem;
	left: -1rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAOklEQVQoU43MSwoAMAgD0eT+h7ZYaOlHo7N+DNHL2HAGgBWcyGcKbqTghTL4oQiG6IUpOqFEC5bI4QD8PAoKd9j4XwAAAABJRU5ErkJggg==);
`;

export default ({setRef}) => {
    return <BoxShadow ref={(el) => setRef("shadow", el)}/>;
}