import './styles/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import img from './img/fig.2.png';

class Test extends React.Component {
  render() {
    return <div>
      <img src={img}/>
      <p>React está funcion</p>
    </div>;
  }
}

ReactDom.render(<Test />, document.getElementById('root'));
