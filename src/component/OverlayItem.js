import React, {Component} from 'react';
import styled from 'styled-components';
import Item from './Item';

const MainItem = styled.div`
    width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	background: #ececec;
	opacity: 0;
	display: flex;
	flex-direction: column;
    align-items: center;
    padding: 5rem 5vw;
    justify-content: center;
    img{
        width: 25em;
        filter: grayscale(0);
    }
`;
const OverlayContent = styled.p`
    font-size: 1.25rem;
	line-height: 1.5;
	max-width: 25rem;
	margin: 1rem 0 0 1rem;
	@media screen and (min-width: 55em) {
	    font-size: 1.25rem;
		margin-top: 0;
	}
`;

class OverlayItem extends Component {
    constructor(props) {
        super(props);
        this.animatable = {};
        this.setRef = this.setRef.bind(this);
    }

    componentDidMount() {
        this.props.setOverlayItems(this.animatable);
    }

    setRef = (label, value) => this.animatable[label] = value;

    render() {
        const {dataItem} = this.props;
        return (
            <MainItem ref={el => this.animatable["parent"] = el}>
                <Item dataItem={dataItem} setRef={this.setRef}/>
                <OverlayContent ref={el => this.animatable["overlay_content"] = el}
                                dangerouslySetInnerHTML={{__html: dataItem.description}}/>
            </MainItem>
        );
    }
}

export default OverlayItem;