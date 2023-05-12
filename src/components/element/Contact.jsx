/** @format */

import React, { Component } from "react";

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "hassan",
      message: "",
      // std: [
      //   {
      //     stdName: "ALi",
      //   },
      //   {
      //     stdName: "ZAhra",
      //   },
      //   {
      //     stdName: "Mano",
      //   },
      //   {
      //     stdName: "Mano",
      //   },
      // ],
    };
  }

  handleSubmit = () => {
    console.log("my name is:====>", this.state.name);
    console.log("message:====>", this.state.message);
  };
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mt-5'>
            <h2 className='text-center'>Contact Us</h2>
            <div className='mt-5 w-75 m-auto'>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label'>
                  username
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  onChange={e => this.setState({ name: e.target.value })}
                  name='username'
                  defaultValue={this.state.name}
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlTextarea1'
                  className='form-label'>
                  Message
                </label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  onChange={e => this.setState({ message: e.target.value })}
                  rows={3}
                  defaultValue={this.state.message}
                />
              </div>
              <div className='mb-3'>
                <button
                  type='submit'
                  className='btn btn-primary mb-3'
                  onClick={this.handleSubmit}>
                  submit
                </button>
              </div>
            </div>
          </div>
          <div className='col-md-6 mt-5'>
            <h2 className='text-center'>Form data</h2>
            <div className='mb-3 mt-5'>Name: {this.state.name}</div>
            <div className='mb-3'>Message: {this.state.message}</div>
            <div className='mb-3'>
              <h2>
                {/* {this.state.std.map(function (value, id) {
                  return (
                    <div key={id} className='card'>
                      <div className='card-body'>
                        <h5 className='card-title'>{value.stdName}</h5>
                      </div>
                    </div>
                  );
                })} */}
              </h2>
            </div>
          </div>
        </div>

        <div className='row'></div>
      </div>
    );
  }
}
