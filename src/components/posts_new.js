import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) {  //the field argument connects the Field component to the component which will be rendered
    const { meta: { touched, error } } = field;   //field.meta.touched field.meta.error
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label> {/*acess property passed from the Field*/}
        <input
          className="form-control"
          type="text"
          {...field.input}  //spreads the eventHandlers & properties of the redux-form field.input Object
        />
        <div className="text-help">
          {touched ? error : '' } {/*will show the errors Object property values from the validate function*/}
        </div>
      </div>
    );
  }

  onSubmit(values) {  //values is an Object with the Field values entered{title: 'abcdef', categories: '', content: 'this is my name'}
    this.props.createPost(values)
    .then(() => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;  //passed to our component from reduxForm

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}> {/*handleSubmit calls validate and if no errors our custom onSubmit is called*/}
        <Field  //each Field represents an HTML input field
          label="Title"   //will be passed to the field argument of the renderField function; you can pass as many arguments as you need
          name="title"    //required;describes the piece of reduxForm state; needed by the reduxForm
          component={this.renderField}  //required;connects the Field component to the component which will be rendered
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Save</button>
        <Link className="btn btn-danger" to="/">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate (values) {  //values is an Object {title: 'abcdef', categories: '', content: 'this is my name'}
  const errors = {};
    if (!values.title || values.title.length < 3 ) {
      errors.title = "Enter a title that is at least 3 characters!"; //should be same as the name value of the Field it belongs to
    }
    if (!values.categories) {
      errors.categories = "Enter some categories!";
    }
    if (!values.content) {
      errors.content = "Enter some content please!";
    }
  return errors;  //if errors is empty form is ready to submit
}

export default reduxForm({ //connects the redux-form reducer to the component
  validate, //validate will be auto called by redux-form whenever the User tries to submit the form - handleSubmit() is called
  form: 'PostsNewForm'  //make sure the name of the form is unique for the form; if you have 2 + forms on the page they need different names
})(
  connect(null, { createPost })(PostsNew)
);
