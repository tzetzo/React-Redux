import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'https://boiling-ravine-15937.herokuapp.com/api/posts' || 'http://localhost:3000/api/posts'; //having this URL as http instead of https caused a "mixed content" error when deployed on heroku

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values) {
  const request = axios.post(`${ROOT_URL}`, values);

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) { //separate action creator for PostsShow component since user can directly visit a post with particular ID
  const request = axios.get(`${ROOT_URL}/${id}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/${id}`)
  .then(() =>
    callback());

  return {
    type: DELETE_POST,
    payload: id
  };
}
