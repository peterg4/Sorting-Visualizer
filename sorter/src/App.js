import React from 'react';
import './App.css';

var numBars = 10;
function Bar(props) {
  var height = {
    height: props.value,
  }
  return (
    <div className = {'bar'} style={height}></div>
  );
}

class Area extends React.Component {
  constructor(props) {
    super(props);
    var bars = [];
    for(var i = 1; i < numBars; i++){
      bars.push(i*10);
    }
    this.state = {
      bars: bars,
      length: bars.length,
    };
  }

  renderBar(i) {
    return (
      <Bar
        value = {this.state.bars[i]}
      // bar attributes added here
      />
    );
  }


  render() {
    const sorts = []
    for(var i = 0; i < numBars-1; i++) {
      sorts.push(this.renderBar(i));
    }



    return (
      <div className="sortBoard">
        {sorts}
      </div>
    )
  }

}

class App extends React.Component {
  render() {



    return (
      <div className="App">
        <header className="App-header">
          <Area />
        </header>
      </div>
    );
  }
}

export default App;
