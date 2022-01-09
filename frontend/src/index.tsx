import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import { config } from './overmind';

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: hsl(240deg 40% 98%);
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

`;

const overmind = createOvermind(config);

ReactDOM.render(
  <Provider value={overmind}>
    <BrowserRouter>
        <GlobalStyle />
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
