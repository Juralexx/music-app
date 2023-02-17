import { createGlobalStyle } from 'styled-components';
import { Loaders } from './Loader';
import { Normalize } from './Normalize';
import { Classes } from './Classes';
import variables from './variables';
import monaSans from './Mona Sans/Mona-Sans.woff2'

/**
 * Styles globaux
 */

const GlobalStyles = createGlobalStyle`
    ${variables}
    ${Classes}
    ${Normalize}
    ${Loaders}

    * {
        margin          : 0;
        padding         : 0;
        box-sizing      : border-box;
        text-decoration : none;
        z-index         : 1;
    }

    html {
        min-height      : 100vh;
        width           : 100%;
        margin          : 0;
        padding         : 0;
        scroll-behavior : smooth;
        scrollbar-width : thin;
        scrollbar-color : var(--body);
        box-sizing      : border-box;
    }

    body {
        width             : 100vw;
        height            : 100%;
        margin            : 0;
        padding           : 0;
        font-family       : var(--font-fam1);
        color             : var(--text);
        font-size         : 14px;
        background-color  : var(--body);
        background-repeat : repeat;
        overflow-y        : hidden;
        overflow-x        : hidden;
    }

    ::selection {
        background-color : rgba(var(--primary-rgb), 0.25);
        color            : var(--primary);
    }

    :focus {
        outline        : 2px dashed var(--primary);
        outline-offset : 3px;
    }

    :focus-visible {
        outline        : 2px dashed var(--primary);
        outline-offset : 3px;
    }

    :focus:not(:focus-visible) {
        outline        : none;
        outline-offset : 0px;
    }

    ::-webkit-scrollbar {
        width : 8px;
    }
    ::-webkit-scrollbar-track {
        background : var(--body);
    }
    ::-webkit-scrollbar-thumb {
        background-color : var(--light-border);
        border           : 3px solid var(--body);
        border-radius    : 10px;
    }

    a {
        background-color : transparent;
        color            : var(--text);
    }

    p {
        font-size   : 14px;
        line-height : 22px;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        margin      : 0 0 10px 0;
        font-weight : 600;
        color       : var(--title);
    }

    h1 {
        font-size   : 32px;
        line-height : 36px;
    }
    h2 {
        font-size   : 28px;
        line-height : 32px;
    }
    h3 {
        font-size   : 20px;
        line-height : 24px;
    }
    h4 {
        font-size   : 18px;
        line-height : 22px;
    }
    h5 {
        font-size   : 16px;
        line-height : 20px;
    }

    @media(max-width:768px) {
        h1 {
            font-size   : 28px;
            line-height : 32px;
        }
        h2 {
            font-size   : 24px;
            line-height : 28px;
        }
        h3 {
            font-size   : 20px;
            line-height : 24px;
        }
        h4 {
            font-size   : 18px;
            line-height : 22px;
        }
        h5 {
            font-size   : 16px;
            line-height : 20px;
        }
    }

    input[type="range"] {
        -webkit-appearance : none;
        height             : 4px;
        background         : var(--input-track);
        border-radius      : var(--rounded-full);
        background-image   : linear-gradient(var(--primary), var(--primary));
        background-repeat  : no-repeat;
        width              : 100%;

        &:focus {
            outline : none;
        }

        &::-webkit-slider-runnable-track {
            -webkit-appearance : none;
            box-shadow         : none;
            border             : none;
            background         : transparent;
        }

        &::-webkit-slider-thumb {
            -webkit-appearance : none;
            height             : 13px;
            width              : 13px;
            background         : var(--content-light);
            border             : 3px solid var(--primary);
            border-radius      : var(--rounded-full);
            cursor             : pointer;
            transition         : background 0.3s ease-in-out;
        }

        &::-moz-range-track,
        &::-moz-range-progress {
            -webkit-appearance : none;
            box-shadow         : none;
            border             : none;
            background         : transparent;
        }

        &::-moz-range-progress {
            background : var(--primary);
        }

        &::-moz-range-thumb {
            -webkit-appearance : none;
            height             : 10px;
            width              : 10px;
            background         : var(--content-light);
            border             : 3px solid var(--primary);
            border-radius      : var(--rounded-full);
            cursor             : pointer;
            transition         : background 0.3s ease-in-out;
        }

        &::-ms-track {
            width      : 100%;
            height     : 4px;
            border     : 0;
            color      : transparent;
            background : transparent;
        }

        &::-ms-fill-lower {
            background : var(--primary);
        }

        &::-ms-fill-upper {
            background : rgba(var(--primary-rgb), 0.2)
        }
    }

    @font-face {
        font-family: 'Mona Sans';
        src: url(${monaSans}) format('woff2 supports variations'), url(${monaSans}) format('woff2-variations');
        font-weight: 200 900;
        font-stretch: 75% 125%;
    }

    .vanish-left {
        left      : 200%;
        transition : .3s ease;
    }

    .vanish-right {
        left      : 0;
        transition : .3s ease;
    }
`;

export default GlobalStyles;