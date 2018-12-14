import React from 'react';
import styled from 'styled-components';

import BoxContent from './Atom/BoxContent';
import BoxDeco from './Atom/BoxDeco';
import BoxImg from './Atom/BoxImg';
import BoxShadow from './Atom/BoxShadow';
import {BoxText, BoxTextInner} from './Atom/BoxText';
import {BoxTitle, BoxTitleInner} from './Atom/BoxTitle';

const Box = styled.div`
    position: relative;
	margin: 2rem;
	@media screen and (min-width: 55em) {
	    margin: 4rem;
	}
	@media screen and (min-width: 80em) {
	    margin: 6rem 4.5rem;
	}
`;

export default ({setRef, dataItem, index}) => {
    return (
        <Box>
            <BoxShadow setRef={setRef}/>
            <BoxImg src={dataItem.image} alt={`image${index}`} setRef={setRef}/>
            {dataItem.title ?
                <BoxTitle setRef={setRef} location={dataItem.title.location} straight={dataItem.title.straight}>
                    <BoxTitleInner>{dataItem.title.content}</BoxTitleInner>
                </BoxTitle> : ""}
            {dataItem.text ?
                <BoxText setRef={setRef} location={dataItem.text.location}>
                    <BoxTextInner reverse={dataItem.text.reverse}
                                  rotated={dataItem.text.rotated}>{dataItem.text.content}</BoxTextInner>
                </BoxText> : ""}
            {dataItem.icon ?
                <BoxDeco setRef={setRef}
                         location={dataItem.icon.location}>{dataItem.icon.content}</BoxDeco> : ""}
            {dataItem.short_content ?
                <BoxContent setRef={setRef}>{dataItem.short_content}</BoxContent> : ""}
        </Box>
    );
}