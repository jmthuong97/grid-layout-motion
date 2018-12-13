import React from 'react';
import styled from 'styled-components';

const BoxContent = styled.p`
    position: absolute;
	max-width: 195px;
	font-size: 0.9rem;
	text-align: right;
	//display: none;
`;

export default ({children, setRef}) => {
    return (
        <BoxContent ref={(el) => setRef("content", el)}>{children}</BoxContent>
    );
}