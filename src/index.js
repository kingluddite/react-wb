import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/main.css';
import App from './components/App';
import TeamPicker from './components/TeamPicker';
import NotFound from './components/NotFound';

const repo = `/${window.location.pathname.split('/')[1]}`;

const Root = () => {
  return (
    <BrowserRouter basename={repo}>
      <div>
        <Match exactly pattern="/" component={TeamPicker} />
        <Match pattern="/team/:teamId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));