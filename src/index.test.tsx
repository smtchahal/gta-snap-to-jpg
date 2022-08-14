import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('./index');
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      div,
    );
  });
});
