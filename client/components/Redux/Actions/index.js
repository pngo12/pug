import axios from 'axios';
import { FETCH_VALID_GAMES, FETCH_JOINABLE, FETCH_JOINED_ROOMS } from '../Constants'

// Template Thunk
// --------------
// export const sampleThunk = () => dispatch => {
//   // this sends an action that can be used to start a loading GIF
//   dispatch({ type: REQUESTED_DATA });

//   axios.get('')
//     .then(res => {

//       // this sends an action to send HTTP response data to Redux store
//       dispatch({ type: RECEIVED_DATA, data: res.data.message })
//     });
// }

export const fetchValidGames = () => async dispatch => {
  let { data } = await axios.get('http://localhost:5000/gamelist');
  dispatch({ type: FETCH_VALID_GAMES, validGames: data });
}

export const fetchJoinableRooms = (game, userId) => async dispatch => {
  let { data } = await axios.get(`http://localhost:5000/gamerooms?game=${game}&userId=${userId}`);
  dispatch({ type: FETCH_JOINABLE, rooms: data });
}

export const fetchJoinedRooms = (game, userId) => async dispatch => {
  let { data } = await axios.get(`http://localhost:5000/userrooms?game=${game}&userId=${userId}`);
  dispatch({ type: FETCH_JOINED_ROOMS, rooms: data });
}