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
  insertionSort(){
    //at each element look back through sorted array and place in correct position
    var i = 1;
    var swapped = false;
    var sort = setInterval(() => {
      this.clearArray();
      var arr = this.state.bars.slice();
      document.getElementById(i).className = 'bar red';
      var j = i;
      var low = i-1;
      while(arr[j] < arr[low]) {
        //j--;
        low--;
      }
      console.log(low + ' break');
      var t = arr[i];
      arr.splice(low+1,0,t);
      arr.splice(i+1,1);

      
      i++;
      this.setState({bars: arr});
      document.getElementById(low+1).className = 'bar red';
      if(i >= this.state.length){
        this.confirmSort();
        clearInterval(sort);
      }
    }, 5000/this.state.length)
  }
  selectionSort(){
    //contiunally find the min and place at "beginning"
    var i = 0;
    var low = 0;
    var sort = setInterval(() => {
      var arr = this.state.bars.slice();
      var min = 1000;
      var min_in;
      for(var j = low; j < arr.length; j++) {
       if(arr[j] < min) {
        min = arr[j]
        min_in = j;
       }
      }
      var t = arr[min_in];
      arr[min_in] = arr[low];
      arr[low] = t;
     
      document.getElementById(low).className ="bar red";
      i++;
      low++;
      this.setState({bars: arr});
      if(i >= arr.length) {
        clearInterval(sort);
        this.confirmSort();
      }
    }, 5000/this.state.length)
  }
  mergeSort(){
    //decimate then merge
  }
  partition(arr, low, high) {
    var x = arr[high];
    var i = (low-1)
    var j = low;
    for(var j = low; j < high; j++) {
      if(arr[j] <= x) {
        i++;
        var t = arr[j];
        arr[j] = arr[i];
        arr[i] = t;
      }
    }
    var t = arr[i+1];
    arr[i+1] = arr[high];
    arr[high] = t;
    return [(i+1), arr];
  }
  quickSort(low, high){
    var stack = [];
    stack.push(low);
    stack.push(high);
    var sort = setInterval(() => {
      this.clearArray();
      var arr = this.state.bars.slice();
      high = stack.pop();
      low = stack.pop();
      document.getElementById(low).className = 'bar red';
      document.getElementById(high).className = 'bar red';
      var res = this.partition(arr, low, high);
      var p = res[0];
      var bars = res[1];
      if(p - 1 > low) {
        stack.push(low);
        stack.push(p-1);
      }
      if (p + 1 < high) { 
        stack.push(p + 1); 
        stack.push(high); 
      }
      this.setState({bars: bars});
      if(stack.length <= 0) {
        clearInterval(sort);
        this.confirmSort();
      }
  }, 5000/this.state.length)
}
  heapSort(){
    //heapify until done
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
          <button onClick={()=> this.insertionSort()}>Insertion Sort</button>
          <button onClick={()=> this.selectionSort()}>Selection Sort</button>
          <button onClick={()=> this.quickSort(0, this.state.length-1)}>Quick Sort</button>
          <button onClick={()=> this.heapSort()}>Heap Sort</button>
          <button onClick={()=> this.mergeSort()}>Merge Sort</button>
          
          <form onSubmit={this.handleSubmit}>
            <input className="slider" type="range" min="2" max="100" step="1" value={this.state.length} onChange={this.handleChange} name="size" />
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
