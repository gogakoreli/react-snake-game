import React, {
  Component,
  useEffect,
  useReducer,
} from 'react';
import { Direction, Map } from './game/models';
import { getInputKey } from './game/input';
import { inputToDirection, defaultGame, tick } from './game/snake';
import { initialGameState, gameReducer, GameState } from './game.reducer';

function drawMap(map: Map): void {
  const strGrid = map.grid
    .map((row) =>
      row
        .map((item) =>
          item.isSnakeHead ? '@' : item.isSnake ? 'x' : item.isFood ? '*' : '.',
        )
        .join(' '),
    )
    .join('\n');
  console.log(strGrid);
  console.log();
}

function useDirection(dispatch: any): void {
  useEffect(function() {
    function input(event: KeyboardEvent) {
      const inputKey = getInputKey(event.keyCode);
      const newDirection = inputToDirection(inputKey);
      if (newDirection !== Direction.None) {
        dispatch({ type: 'UPDATE_DIRECTION', data: newDirection });
      }
    }

    document.addEventListener('keydown', input);

    return () => document.removeEventListener('keydown', input);
  }, []);
}

function useTick(dispatch: any) {
  useEffect(function() {
    setInterval(function() {
      dispatch({ type: 'TICK' });
    }, 300);
  }, []);
}

function useDraw(state: GameState) {
  useEffect(() => {
    if (state.shouldRender) {
      drawMap(state.game.map);
    }
  }, [state]);
}

function Snake() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  useTick(dispatch);
  useDirection(dispatch);
  useDraw(state);

  return <div />;
}

class App extends Component {
  render() {
    return (
      <div>
        <Snake />
      </div>
    );
  }
}

export default App;
