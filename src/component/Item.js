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
`;

export default ({setRef, dataItem}) => {
    return (
        <Box>
            <BoxShadow setRef={setRef}/>
            <BoxImg src={dataItem.image.src} alt={dataItem.image.alt} setRef={setRef}/>
            {dataItem.title ?
                <BoxTitle setRef={setRef} location={dataItem.title.location}>
                    <BoxTitleInner>{dataItem.title.content}</BoxTitleInner>
                </BoxTitle> : ""}
            <BoxText setRef={setRef} location={dataItem.text.location}>
                <BoxTextInner reverse={dataItem.text.reverse}
                              rotated={dataItem.text.rotated}>{dataItem.text.content}</BoxTextInner>
            </BoxText>
            {dataItem.icon ?
                <BoxDeco setRef={setRef}
                         location={dataItem.icon.location}>{dataItem.icon.content}</BoxDeco> : ""}
            <BoxContent setRef={setRef}>{dataItem.short_content}</BoxContent>
        </Box>
    );
}