import { createGlobalStyle } from 'styled-components';

import theme from '@theme/index';

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Cairo', serif;
        margin: 0;
        font-size: 100%;
        background-color: ${theme.palette.background.default};
        color: ${theme.palette.text.primary};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    * {
        box-sizing: border-box;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    .container {
        position: relative;
        min-width: 20.85714rem;
        max-width: 79.42857rem;
        margin: 0 auto;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        margin: 0;
    }

    .divider-with-text {
        background-color: #ffffff;
        padding: 0 10px;
        font-size: 12px;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .highlight {
        color: ${theme.palette.primary.main};
    }

    .highlight-secondary {
        color: ${theme.palette.secondary.main};
    }

    .error {
        color: ${theme.palette.error.main};
    }

    .bold {
        font-weight: ${theme.typography.fontWeightBold};
    }

    a {
        color: ${theme.palette.text.primary} !important;
        text-decoration: none !important;

        &:hover {
            text-decoration: underline !important;
        }
    }

    .white {
        color: white !important;
    }

    .text {
        color: ${theme.palette.text.primary} !important;
    }

    *:disabled {
        cursor: not-allowed !important;
    }

    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome, Edge, Opera and Firefox */
    }

    .text-right {
        text-align: right;
    }

    .text-left {
        text-align: left;
    }

    @for $i from 0 through 50 {
        .fs-#{$i} {
            font-size: $i + 0px !important;
        }

        .z-#{$i} {
            z-index: $i !important;
        }
    }
`;
