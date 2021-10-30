import React from 'react';
import './style.css';
import ReactDOM from 'react-dom';
import StudentTable from './StudentTable/StudentTable';
export default function App() {
  let handleClick = () => {
    ReactDOM.render(<StudentTable />, document.getElementById('root'));
  };
  return (
    <div>
      <h1>App component</h1>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <button onClick={() => handleClick()}>Click</button>
    </div>
  );
}
