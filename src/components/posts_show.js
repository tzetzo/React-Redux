import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {  //lifecycle method called automatically
    //if(!this.props.posts) { //lesson 148 -> checks if we already have all the posts(we first visited the postsIndex page) so to avoid fetching an individual post
      const { id } = this.props.match.params; //params matches all parameters from the URL like /:id/:comment etc.
      this.props.fetchPost(id); // fetch all the records; otherwise we might end up with old record
    //}
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if(!post) { //component renders before the post is fetched and post is undefined the first time
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="table">
          <Link to="/" className='btn btn-primary'>Back to Index</Link>
          <button
              className="btn btn-danger pull-xs-right"
              onClick={this.onDeleteClick.bind(this)}
          >
            Delete Post
          </button>
        </div>
        <ul className="list-group">
         <li className="list-group-item">Title: {post.title}</li>
         <li className="list-group-item">Categories: {post.categories}</li>
         <li className="list-group-item">Content: {post.content}</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) { //ownProps === this.props
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
