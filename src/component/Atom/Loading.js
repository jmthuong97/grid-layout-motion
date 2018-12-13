import styled from "styled-components";
import React from "react";

const Loading = styled.div`
    /* Page Loader */
    &:before {
      content: '';
      position: fixed;
      z-index: 100000;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #ececec;
    }
    
    &:after {
      content: '';
      position: fixed;
      z-index: 100000;
      top: 50%;
      left: 50%;
      width: 60px;
      height: 60px;
      margin: -30px 0 0 -30px;
      pointer-events: none;
      border-radius: 50%;
      opacity: 0.4;
      background: #975429;
      animation: loaderAnim 0.7s linear infinite alternate forwards;
    }
    
    @keyframes loaderAnim {
      to {
        opacity: 1;
        transform: scale3d(0.5,0.5,1);
      }
    }
`;

export default ({setRefLoading}) => {
    return <Loading ref={(el) => setRefLoading(el)}/>;
};