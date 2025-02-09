import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin-block-end: 0;
}

ul,
ol {
  list-style: none;
}

body {
  line-height: 1.5;
  margin: 0;
}

h1,
h2,
h3,
h4,
button,
input,
label {
  line-height: 1.1;
}

h1,
h2,
h3,
h4 {
  overflow-wrap: break-word;
  word-break: break-word;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
  color: currentColor;
}

img,
picture {
  max-width: 100%;
  display: block;
}

input,
button,
textarea,
select {
  font: inherit;
}


:target {
  scroll-margin-block: 5ex;
}

/* Pretendard Font 설정 */
@font-face {
  font-family: "Pretendard";
  src: url("/assets/fonts/Pretendard-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Pretendard";
  src: url("/assets/fonts/Pretendard-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Pretendard";
  src: url("/assets/fonts/Pretendard-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Pretendard";
  src: url("/assets/fonts/Pretendard-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
}

body {
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  height: 100vh;
}
`;
