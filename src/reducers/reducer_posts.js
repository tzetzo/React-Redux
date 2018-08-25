import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';  //we import from index.js so no need to specify it
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);  //returns new state without the post with the given key/id
    case FETCH_POST: //if user already visited PostsIndex component we dont want to lose the data;
      return { ...state, [action.payload._id]: action.payload.data }  //the [] are necessary like in obj[id]
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, '_id');  //converting the array of objects into an object with the keys equal to the ids of the objects and the values the objects themselves
    default:
      return state;
  }
}
