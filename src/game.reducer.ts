import { Game, Direction } from './game/models';
import { tick, defaultGame } from './game/snake';

export interface GameState {
  game: Game;
  direction: Direction;
  shouldRender: boolean;
}

export const initialGameState: GameState = {
  game: defaultGame(),
  direction: Direction.East,
  shouldRender: true,
}

export function gameReducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        game: tick(state.game, state.direction),
        shouldRender: true,
      };
    case 'UPDATE_DIRECTION':
      return { ...state, direction: action.data, shouldRender: false };
    default:
      return state;
  }
}
