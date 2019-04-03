import { MAP_HEIGHT, MAP_WIDTH } from './constants';
import { Food, Snake, Map, Game, Tile } from './models';

export const SNAKE_HEAD_TILE = {
  isFood: false,
  isSnake: true,
  isSnakeHead: true,
};

export function defaultMap(): Map {
  const grid = emptyGrid();

  return {
    grid,
  };
}

export function updateMap(map: Map, snake: Snake, food: Food): Map {
  const grid = emptyGrid();
  grid[food.i][food.j] = { isFood: true, isSnake: false, isSnakeHead: false };
  snake.parts.forEach((part) => {
    grid[part.i][part.j] = {
      isFood: false,
      isSnake: true,
      isSnakeHead: false,
    };
  });

  grid[snake.head.i][snake.head.j] = SNAKE_HEAD_TILE;

  return {
    ...map,
    grid,
  };
}

function emptyTile(map: Map, i: number, j: number) {
  const tile = map.grid[i][j];
  return !tile.isFood && !tile.isSnake;
}

function emptyGrid(): Tile[][] {
  return initGrid((i, j) => {
    return { isFood: false, isSnake: false, isSnakeHead: false };
  });
}

function initGrid(setItem: (i: number, j: number) => Tile): Tile[][] {
  const grid: Tile[][] = [];
  for (let i = 0; i < MAP_WIDTH; i++) {
    grid[i] = [];
    for (let j = 0; j < MAP_HEIGHT; j++) {
      grid[i][j] = setItem(i, j);
    }
  }
  return grid;
}

export function randomFood(game: Game, refresh = true): Food {
  let food = game.food;
  if (refresh) {
    while (true) {
      const i = Math.floor(Math.random() * MAP_WIDTH);
      const j = Math.floor(Math.random() * MAP_HEIGHT);

      if (emptyTile(game.map, i, j)) {
        food = {
          i,
          j,
        };
        break;
      }
    }
  }
  return food;
}
