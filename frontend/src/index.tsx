import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import App from './App';
import { config } from './overmind';

const overmind = createOvermind(config);

ReactDOM.render(
  <Provider value={overmind}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
