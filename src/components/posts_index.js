import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import _ from 'lodash';

class PostsIndex extends Component {
  componentDidMount() {  //lifecycle method called automatically
    this.props.fetchPosts();
  }

  renderPosts() {
    //the first time the component renders the this.props.posts is an empyy object and the second has the posts objects
    return _.map(this.props.posts, post => {  //standard JS map() cannot be used on objects
      return (
        <li className="list-group-item" key={post._id} >
          <Link to={`/posts/${post._id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="table">
            <Link className="btn btn-primary  pull-xs-right" to="/posts/new">
              Add a Post
            </Link>
          <h3>Posts</h3>
        </div>
        <ul className="list-group">
         { this.renderPosts() }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
