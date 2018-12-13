import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    position: relative;
    @media screen and (max-width: 55em) {
        flex-direction: column;
		height: auto;
		min-height: 0;
    }
`;
const Grid = styled.div`
    width: 100%;
	max-width: 1440px;
	margin: 0 auto;
	padding-bottom: 10rem;
	@media screen and (min-width: 55em) {
	    display: grid;
		align-items: center;
		grid-row-gap: 2rem;
		grid-template-columns: repeat(3,calc(100% / 3));
	}
	@media screen and (min-width: 80em) {
	    grid-template-columns: repeat(4,25%);
	}
`;

export default ({children}) => {
    return <Content><Grid>{children}</Grid></Content>;
}