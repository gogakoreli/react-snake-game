import React, { Component, useEffect, useRef, useState } from 'react';
import { Direction, Map } from './game/models';
import { getInputKey } from './game/input';
import { inputToDirection, defaultGame, tick } from './game/snake';

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

  useEffect(function() {
    function input(event: KeyboardEvent) {
      const inputKey = getInputKey(event.keyCode);
      const newDirection = inputToDirection(inputKey);
      if (newDirection !== Direction.None) {
        directionRef.current = newDirection;
      }
    }

    document.addEventListener('keydown', input);

    return () => document.removeEventListener('keydown', input);
  }, []);

  return { directionRef };
}

function Snake() {
  const [game, setGame] = useState(defaultGame());

  const { directionRef } = useDirection();

  useEffect(function() {
    setInterval(function() {
      setGame((prev) => tick(prev, directionRef.current));
    }, 300);
  }, []);

  useEffect(() => {
    drawMap(game.map);
  }, [game]);

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
