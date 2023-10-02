import { createGlobalStyle } from 'styled-components';

const Style = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }
  
  body {
    line-height: 1.4;
    font-family: sans-serif;
  }

  h1 {
    font-size: 1.8rem;
  }

  h2 {
      font-size: 1.6rem;
      margin-bottom: 1.4rem;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  p {
      margin-bottom: 1.4rem;
      font-size: 1rem;
  }
`;

export default Style;