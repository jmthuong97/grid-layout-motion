import React from 'react';
import styled from 'styled-components';

const BoxContent = styled.p`
    position: absolute;
	font-size: 0.9rem;
	text-align: right;
	@media screen and (min-width: 80em) {
	    display: block;
	}
	@media screen and (max-width: 55em) {
	    display: none;
	}
`;

export default ({children, setRef}) => {
    return <BoxContent ref={(el) => setRef("content", el)} dangerouslySetInnerHTML={{__html: children}}/>;
}