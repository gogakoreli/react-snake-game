import { Direction, Food, Snake, SnakePart, Game, defaultFood } from './models';
import { InputKey } from './input';
import { defaultMap, randomFood, updateMap } from './map';

export function inputToDirection(inputKey: InputKey): Direction {
  let res: Direction = Direction.None;
  switch (inputKey) {
    case InputKey.Left:
      res = Direction.West;
      break;
    case InputKey.Right:
      res = Direction.East;
      break;
    case InputKey.Down:
      res = Direction.South;
      break;
    case InputKey.Up:
      res = Direction.North;
      break;
  }
  return res;
}

export function defaultGame(): Game {
  return {
    food: defaultFood(),
    map: defaultMap(),
    snake: defaultSnake(),
  };
}

export function defaultSnake(): Snake {
  const parts = [{ i: 0, j: 0 }, { i: 0, j: 1 }, { i: 0, j: 2 }];
  return {
    direction: Direction.East,
    head: parts[parts.length - 1],
    length: parts.length,
    parts,
    foodEaten: false,
  };
}

export function updateDirection(snake: Snake, direction: Direction): Snake {
  if (validNextDirection(snake.direction, direction)) {
    snake = {
      ...snake,
      direction,
    };
  }
  return snake;
}

export function moveToDirection(snake: Snake, food: Food): Snake {
  let newParts = snake.parts;
  const newHead = getNewHead(snake);
  newParts.push(newHead);

  return {
    ...snake,
    head: newHead,
    parts: newParts,
    length: newParts.length,
  };
}

export function snakeFoodEaten(snake: Snake, food: Food) {
  const foodEaten = hasFoodEaten(snake, food);
  let parts = snake.parts;
  if (!foodEaten) {
    parts = parts.filter((_, i) => i > 0);
  }

  return {
    ...snake,
    foodEaten,
    parts,
    length: parts.length,
  };
}

/**
 * @description shouldn't be used from outside of snake
 * this is mainly for checking by itself to set property foodEaten
 * @see snake.foodEaten for using from outside
 */
function hasFoodEaten(snake: Snake, food: Food): boolean {
  return snake.head.i === food.i && snake.head.j === food.j;
}

function getNewHead(snake: Snake) {
  const head = snake.head;
  let newHead: SnakePart;
  switch (snake.direction) {
    case Direction.North:
      newHead = { i: head.i - 1, j: head.j };
      break;
    case Direction.East:
      newHead = { i: head.i, j: head.j + 1 };
      break;
    case Direction.South:
      newHead = { i: head.i + 1, j: head.j };
      break;
    case Direction.West:
      newHead = { i: head.i, j: head.j - 1 };
      break;
  }
  return newHead;
}

function validNextDirection(curr: Direction, next: Direction): boolean {
  let result = true;
  switch (curr) {
    case Direction.North:
      result = next !== Direction.South;
      break;
    case Direction.East:
      result = next !== Direction.West;
      break;
    case Direction.South:
      result = next !== Direction.North;
      break;
    case Direction.West:
      result = next !== Direction.East;
      break;
    case Direction.None:
      result = false;
      break;
  }
  return result;
}

export function tick(game: Game, direction: Direction): Game {
  game = { ...game, snake: updateDirection(game.snake, direction) };
  game = { ...game, snake: moveToDirection(game.snake, game.food) };
  game = { ...game, snake: snakeFoodEaten(game.snake, game.food) };
  game = { ...game, food: randomFood(game, game.snake.foodEaten) };

  game = { ...game, map: updateMap(game.map, game.snake, game.food) };

  return game;
}
