import React, {
  Component,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { Direction, Game, Map } from './game/models';
import { getInputKey } from './game/input';
import {
  inputToDirection,
  updateDirection,
  defaultGame,
  moveToDirection,
  snakeFoodEaten,
  tick,
} from './game/snake';
import { randomFood, updateMap } from './game/map';

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

function useDirection() {
  const directionRef = useRef(Direction.East);

  const input = useCallback(function(event: KeyboardEvent) {
    const inputKey = getInputKey(event.keyCode);
    const direction = inputToDirection(inputKey);
    if (direction !== Direction.None) {
      directionRef.current = direction;
    }
  }, []);

  useEffect(function() {
    document.addEventListener('keydown', input);
  }, []);

  return { directionRef };
}

function Snake() {
  const [game, setGame] = useState(defaultGame());
  const { directionRef } = useDirection();

  useEffect(() => {
    drawMap(game.map);
  }, [game]);

  useEffect(function() {
    setInterval(function() {
      setGame((prev) => tick(prev, directionRef.current));
    }, 300);
  }, []);

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
