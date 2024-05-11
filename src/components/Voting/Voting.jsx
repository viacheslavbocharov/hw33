import { Component } from 'react'
import SmileCard from '../SmileCard/SmileCard';
import './Voting.css';

export default class Voting extends Component {
  state = {
    candidates: [],
    result: ''
  };

  componentDidMount() {
    fetch('http://localhost:3000/data.json')
      .then(result => result.json())
      .then(result => {
        const myCandidates = result.map(candidate => {
          return {
            ...candidate,
            counter: 0,
          };
        });
        this.setState({ candidates: myCandidates })
      });
  }

  // changeCounter = (id) => {
  //   this.setState(state => {
  //     const candidateIndex = state.candidates.findIndex(candidate => candidate.id == id);
  //     state.candidates[candidateIndex].counter++;
  //     return state;
  //   });
  //   this.setState({ winner: '' });
  // };

  changeCounter = (id) => {
    this.setState(state => {
      const candidateIndex = state.candidates.findIndex(candidate => candidate.id == id);
      state.candidates[candidateIndex].counter++;
      return {
        ...state,
        winner: ''
      };
    });
  };





  showWinner = () => {
    let winnerGroup = [];
    let winnerCounter = 0;

    this.state.candidates.forEach(candidate => {
      if (candidate.counter >= winnerCounter) {
        const concatName = `Smile ${candidate.name}`;
        if (candidate.counter === winnerCounter) {
          winnerGroup.push(concatName);
        } else {
          winnerCounter = candidate.counter;
          winnerGroup = [concatName];
        }
      }
    });

    let result;

    if (winnerGroup.length === 1) {
      result = <div>The winner is: {winnerGroup.join('.')}</div>;
    } else {
      if (winnerCounter === 0) {
        result = <div>You need to vote first</div>;
      } else {
        result = <div>The winners are: {winnerGroup.join(', ')}. Continue the survey to find one winner.</div>;
      }
    }

    this.setState({ winner: result });
  };



  render() {

    return (
      <div>
        <p>Hello world. Here is our voting:</p>
        {!this.state.candidates.length && (<div>No candidates available</div>)}
        {!!this.state.candidates.length && (
          <div className='container'>
            {this.state.candidates.map(candidate => (
              <SmileCard
                id={candidate.id}
                name={candidate.name}
                key={candidate.id}
                counter={candidate.counter}
                votingAction={this.changeCounter}
              />
            ))}
          </div>
        )}

        <input type="button" value="Show Results" onClick={this.showWinner} />
        <p className="winner">{this.state.winner}</p>
      </div>
    )
  }
}
