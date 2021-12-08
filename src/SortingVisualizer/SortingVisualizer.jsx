import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSortAlgorithm.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSortAlgorithm.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSortAlgorithm.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 100;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const PIVOT_COLOR = 'purple';

const SMALLER_COLOR = 'blue';
const GREATER_COLOR = 'yellow';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx, changeColor] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = changeColor === true ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }



  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    var quickAnimation;
    let i = 0;
    for (quickAnimation of animations) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const barOneIdx = quickAnimation[0];
      const barTwoIdx = quickAnimation[1];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (quickAnimation.length === 3) {
        const color = quickAnimation[2] === true ? SMALLER_COLOR : GREATER_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = PIVOT_COLOR;
        }, i * ANIMATION_SPEED_MS);
        i++;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        i++;
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        i++;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        i++;
        const barOneNewHeight = quickAnimation[2];
        const barTwoNewHeight = quickAnimation[3];
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        i++;
      }
    }
  }


  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    var bubbleAnimation;
    let i = 0;
    for (bubbleAnimation of animations) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const barOneIdx = bubbleAnimation[0];
      const barTwoIdx = bubbleAnimation[1];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      setTimeout(() => {
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
      }, i * ANIMATION_SPEED_MS);
      i++;
      if (bubbleAnimation.length > 2) {
        const barOneNewHeight = bubbleAnimation[2];
        const barTwoNewHeight = bubbleAnimation[3];
        setTimeout(() => {
          barOneStyle.backgroundColor = PIVOT_COLOR;
          barTwoStyle.backgroundColor = PIVOT_COLOR;
        }, i * ANIMATION_SPEED_MS);
        i++;
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        i++;
      }
      setTimeout(() => {
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS);
      i++;
    }
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <h1 className="title">My Sorting Visualizer</h1>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <p>Hit "Generate New Array" first and then pick one of your favorite sorting algorithms. Let's go!</p>
        <button onClick={() => this.resetArray()} class="generate-new">Generate New Array</button>
        <button onClick={() => this.mergeSort()} class="sort-algo">Merge Sort</button>
        <button onClick={() => this.quickSort()} class="sort-algo">Quick Sort</button>
        <button onClick={() => this.bubbleSort()} class="sort-algo">Bubble Sort</button>
        {/* <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button> */}
      </div>

    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
