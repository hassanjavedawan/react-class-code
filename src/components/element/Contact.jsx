/** @format */

import React, { Component } from "react";

import { getDatabase, onValue, push, ref } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as myRef,
  uploadBytesResumable,
} from "firebase/storage";
import { firebase } from "../../config/firebase";

const database = getDatabase(firebase);
const storage = getStorage(firebase);

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "hassan",
      message: "",
      file: null,
      progress: 0,
      imgUrl: "",
    };

    // const database  = firebase.database();
  }

  handleSubmit = () => {
    // console.log("my name is:====>", this.state.name);
    // console.log("message:====>", this.state.message);

    push(ref(database, "user/"), {
      userName: this.state.name,
      userMessage: this.state.message,
      file: this.state.imgUrl,
    })
      .then(() => {
        alert("data submit");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleGet = () => {
    var arr = [];
    onValue(ref(database, "user/"), data => {
      arr.push(data.val());
      console.log(arr);
    });
  };
  handleUploadFile = e => {
    const file = e.target.files[0];
    const ref = myRef(storage, "cardImages/" + file.name);
    uploadBytesResumable(ref, file).on(
      "state_changed",
      e => {
        // console.log(e.bytesTransferred, e.totalBytes);
        const progress = (e.bytesTransferred / e.totalBytes) * 100;

        this.setState({ progress: progress });

        console.log("Upload is " + progress + "% done");

        // eslint-disable-next-line default-case
        switch (e.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      err => {
        // eslint-disable-next-line default-case
        switch (err.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        console.log("Upload is complete");
        getDownloadURL(ref).then(url => {
          console.log(url);
          this.setState({ imgUrl: url });
        });
      },
    );
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
              {this.state.progress === 100 ? (
                <div className='mb-3'>
                  <img src={this.state.imgUrl} width={200} alt='no Image' />
                </div>
              ) : (
                <div className='mb-3'>
                  <label
                    htmlFor='exampleFormControlInput1'
                    className='form-label'>
                    Upload image
                  </label>
                  <input
                    type='file'
                    className='form-control'
                    id='file'
                    name='file'
                    onChange={e => this.handleUploadFile(e)}
                  />
                  <div className='progress mt-3'>
                    <div
                      className='progress-bar progress-bar-striped'
                      role='progressbar'
                      aria-label='Default striped example'
                      style={{ width: this.state.progress + "%" }}
                      aria-valuemin='0'
                      aria-valuemax='100'></div>
                  </div>
                </div>
              )}

              <div className='mb-3'>
                <button
                  type='submit'
                  className='btn btn-primary mb-3'
                  onClick={this.handleSubmit}>
                  submit
                </button>
                <button
                  className='btn btn-primary mb-3'
                  onClick={this.handleGet}>
                  Get data
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
