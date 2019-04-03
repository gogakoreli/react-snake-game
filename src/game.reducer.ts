import { Game, Direction } from './game/models';
import { tick, defaultGame } from './game/snake';

export interface GameState {
  game: Game;
  directions: Direction[];
  shouldRender: boolean;
}

export const initialGameState: GameState = {
  game: defaultGame(),
  directions: [Direction.East],
  shouldRender: true,
};

export function gameReducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case 'TICK': {
      const [curDirection, nextDirection, ...rest] = state.directions;

      let direction = curDirection;
      if (nextDirection !== undefined) {
        direction = nextDirection;
      }
      const directions =
        state.directions.length === 1
          ? state.directions
          : [nextDirection, ...rest];
      return {
        ...state,
        game: tick(state.game, direction),
        directions,
        shouldRender: true,
      };
    }
    case 'UPDATE_DIRECTION': {
      return {
        ...state,
        directions: [...state.directions, action.data],
        shouldRender: false,
      };
    }
    default:
      return state;
  }
}
