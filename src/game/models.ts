export interface SnakePart {
  i: number;
  j: number;
}

export interface Snake {
  head: SnakePart;
  parts: SnakePart[];
  direction: Direction;
  length: number;
  foodEaten: boolean;
}

export enum Direction {
  None = -1,
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

export function defaultFood(): Food {
  return { i: 0, j: 10 };
}

export interface Food {
  i: number;
  j: number;
}

export interface Map {
  grid: Tile[][];
}

export interface Tile {
  isFood: boolean;
  isSnake: boolean;
  isSnakeHead: boolean;
}

export interface Game {
  snake: Snake;
  map: Map;
  food: Food;
}
