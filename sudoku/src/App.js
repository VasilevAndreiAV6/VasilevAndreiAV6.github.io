import './App.css';
import React from 'react';
import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";

do {
  var puzzle = makepuzzle();
  var solution = solvepuzzle(puzzle);
  var difficulty = ratepuzzle(puzzle, 4);
} while (difficulty < 3)

for (let i = 0; i < 81; i++)
  solution[i]++;

let active_cell;
let errors = 0;
let pencil_state = false;

class OffOnBtn extends React.Component {
  render() {
    if (pencil_state)
      return (<button id='off_btn' class="off">ON</button>);
    return (<button id='off_btn' class="off">OFF</button>);
  }
}

class Board extends React.Component {
  state = {
    mssg: ""
  };

  handleClick = () => {
    this.setState({ mssg: "Hi there!" });
  };

  numSet(i) {
    if (i.currentTarget.innerHTML === String.fromCharCode(9998)) {
      pencil_state = !pencil_state;
    }
    else if (!pencil_state) {
      if (parseInt(i.currentTarget.innerHTML) === solution[active_cell])
        puzzle[active_cell] = parseInt(i.currentTarget.innerHTML) - 1;
      else if (i.currentTarget.innerHTML === 'X')
        puzzle[active_cell] = null;
      else if (i.currentTarget.innerHTML === String.fromCharCode(9998)) {
        pencil_state = !pencil_state;
      }
      else {
        puzzle[active_cell] = "-";
        errors++;
      }
    }
    else {
      /*
      let table = this.props.innerHTML;

      let index = table.search(active_cell);
      table[index + 3] = '123';
      */
    }
  }

  renderButton(i, j) {
    if (puzzle[i * 9 + j] === '-')
      return ('-');
    if (puzzle[i * 9 + j] === null)
      return ('');
    return (puzzle[i * 9 + j] + 1);
  }

  render() {
    let rows = [];

    for (let i = 0; i < 9; i++) {
      let cells = [];

      for (let j = 0; j < 9; j++) {
        let classname = 'raw' + i + ' cell' + j + " square";

        if (active_cell === i * 9 + j) {
          classname += " active";
        }

        cells.push(
          <td>
            <button onClick={() => { active_cell = i * 9 + j; this.forceUpdate(); }} class={classname} id={i * 9 + j}>
              {this.renderButton(i, j)}
            </button>
          </td >
        );
      }
      rows.push(<tr>{cells}</tr>);
    }

    return (
      <div>
        <div>
          <table>
            {rows}
          </table>

          <div class="errs">ERRORS: {errors}</div>
          <div onClick={this.handleClick}>
            <button onClick={this.numSet} class="num_btn">1</button>
            <button onClick={this.numSet} class="num_btn">2</button>
            <button onClick={this.numSet} class="num_btn">3</button>
            <button onClick={this.numSet} class="num_btn">X</button><br></br>
            <button onClick={this.numSet} class="num_btn">4</button>
            <button onClick={this.numSet} class="num_btn">5</button>
            <button onClick={this.numSet} class="num_btn">6</button>
            <button onClick={this.numSet} class="num_btn">&#9998;</button><br></br>
            <button onClick={this.numSet} class="num_btn">7</button>
            <button onClick={this.numSet} class="num_btn">8</button>
            <button onClick={this.numSet} class="num_btn">9</button>
            <OffOnBtn />
          </div>

        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Board />
      </div>
    );
  }
}


function App() {
  return (
    <Game />
  );
}

export default App;
