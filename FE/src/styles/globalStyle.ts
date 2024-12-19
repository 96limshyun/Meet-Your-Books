import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import cinzel from "../assets/fonts/cinzel-v23-latin-regular.woff2";
import nanum from "../assets/fonts/nanum-gothic-v26-latin-regular.woff2";

const GlobalStyle = createGlobalStyle`
    ${reset}

    :root {
    --border-color: #e9e7e7;
    }

    #root {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    @font-face {
        font-display: swap; 
        font-family: "Cinzel";
        font-style: normal;
        font-weight: 400;
        src: url(${cinzel}) format('woff2'); 
        unicode-range: U+0030-0039,U+0041-005A,U+0061-007A
    }
    
    @font-face {
        font-display: swap; 
        font-family: "Nanum Gothic";
        src: url(${nanum}) format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
        font-style: normal;
        unicode-range: U+AC00-D7A3
    }
`;

export default GlobalStyle;
