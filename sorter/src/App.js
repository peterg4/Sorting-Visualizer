import React from 'react';
import './App.css';

var numBars = 20;
var max = 0;
function Bar(props) {
  var height = {
    height: props.value/max*500,
    width: 600/numBars,
    bottom: -500 + props.value/max*500,
  }
  return (
    <div id={props.index} className = {'bar'} style={height}></div>
  );
}

class Area extends React.Component {
  constructor(props) {
    super(props);
    var bars = [];
    for(var i = 1; i < numBars; i++){
      var num = Math.floor(Math.random() * Math.floor(numBars*10));
      bars.push(num);
      if(num > max)
        max = num;
    }
    this.state = {
      bars: bars,
      length: bars.length,
      check_len: bars.length
    };
    this.handleChange = this.handleChange.bind(this);
  }
  clearArray() {
    for(var i = 0; i < this.state.length; i++){
      document.getElementById(i).className='bar';
    }
  }
  generateArray(){
    var bars = [];
    for(var i = 1; i < numBars; i++){
      var num = Math.floor(Math.random() * Math.floor(numBars*10));
      bars.push(num);
      if(num > max)
        max = num;
    }
    this.setState({bars: bars, length: bars.length, check_len: bars.length});
    this.clearArray();
  }
  handleChange(event) {
    this.setState({length: event.target.value});
    numBars = event.target.value;
    numBars++;
    max = 0;
    this.generateArray();
    console.log(this.state.length);
  }
  confirmSort() {
    var i = 0;
    var confirm = setInterval(() => {
      var arr = this.state.bars.slice();
      document.getElementById(i).className = 'bar confirmed'
      i++;
      this.setState({bars: arr});
      if( i >= this.state.length){
        clearInterval(confirm);
      }
    }, 700/this.state.length);
  }
  bubbleSort() {
    var swapped = false;
    var i = 0;
    var check_len = this.state.check_len;
    var sort = setInterval(() => {
      var arr = this.state.bars.slice();
      document.getElementById(i+1).className ="bar red";
      if(arr[i] > arr[i+1]) {
        var t = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = t;
        swapped = true;
      }
      document.getElementById(i).className = 'bar';
      i++;
      this.setState({bars: arr});
      if(i >= check_len-1) {
        check_len--;
        this.setState({check_len: check_len});
        clearInterval(sort);
        console.log(swapped);
        if(swapped) {
          this.bubbleSort();
        } else {
          this.confirmSort();
        }
      }
    }, 100/this.state.length)
  }
  renderBar(i) {
    return (
      <Bar
        value = {this.state.bars[i]}
        index = {i}
      />
    );
  }


  render() {
    const sorts = []
    for(var i = 0; i < numBars-1; i++) {
      sorts.push(this.renderBar(i));
    }



    return (
      <div>
        <div className="sortBoard">
          {sorts}
        </div>
        <div>
          <button onClick={()=> this.generateArray()}>New Array</button>
          <button onClick={()=> this.bubbleSort()}>Bubble Sort</button>
          <button onClick={()=> this.clearArray()}>Clear</button>
          <form onSubmit={this.handleSubmit}>
            <input type="range" min="1" max="100" step="1" value={this.state.length} onChange={this.handleChange} name="size" />
          </form>
        </div>
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
