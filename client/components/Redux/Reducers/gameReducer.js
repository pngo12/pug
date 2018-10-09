import { FETCH_VALID_GAMES, FETCH_JOINABLE, FETCH_JOINED_ROOMS } from '../Constants'

const initialState = {
  validGames: [],
  joinableRooms: [],
  joinedRooms: []
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VALID_GAMES:
      return {
        ...state,
        validGames: action.validGames
      }
    case FETCH_JOINABLE:
      return {
        ...state,
        joinableRooms: action.rooms
      }
    case FETCH_JOINED_ROOMS: 
      return {
        ...state,
        joinedRooms: action.rooms
      }
    default:
      return state;
  }
}

export default gameReducer;