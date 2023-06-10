/** @format */

import React, { useEffect, useState } from "react";
import { firebase } from "../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { set, ref, getDatabase } from "firebase/database";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const About = () => {
  const [name, setName] = useState("Shazra");
  const [message, setMesssage] = useState("typing");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  const auth = getAuth(firebase);
  const db = getDatabase(firebase);

  const handleSignUP = () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      alert("please enter correct email & password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(value => {
        const currentUser = value.user;
        console.log(currentUser);
        alert("user sign up");
        setEmail("");
        setPassword("");
      })
      .catch(err => {
        console.error(err.message);
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("email-already-in-use");
        } else if (
          err.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setError("Password should be at least 6 characters");
        } else {
          setError(err.message);
        }
      });
  };

  const handleLogin = () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      alert("please enter correct email & password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        const currentUser = value.user;
        console.log(currentUser);
        alert("user Login");
        setEmail("");
        setPassword("");
      })
      .catch(err => {
        console.log(err.message);
        console.error(err.message);
        if (err.message === "Firebase: Error (auth/user-not-found).") {
          setError("user-not-found");
        } else if (err.message === "Firebase: Error (auth/invalid-email).") {
          setError("invalid-email");
        } else if (err.message === "Firebase: Error (auth/wrong-password).") {
          setError("wrong-password");
        } else {
          setError(err.message);
        }
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsLogin(false);
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  };

  const loginUser = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLogin(true);
        // ...
      } else {
        // User is signed out
        setIsLogin(false);

        // ...
      }
    });
  }, []);

  return (
    <div className='container pt-5'>
      <div className='row'>
        <div className='col-md-12'>
          {/* <h1>{name}</h1>
          <p>{message}</p> */}
          {isLogin ? (
            <div className='text-center'>
              <h1>Welcome to the app</h1>
              user Email: {loginUser.email}
              <div className='mt-3 '>
                <button
                  className='btn btn-primary w-25'
                  onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className='tabs-section m-auto'>
              <Tab.Container id='left-tabs-example' defaultActiveKey='SignUp'>
                <Nav variant='pills' className='m-auto w-50'>
                  <Nav.Item>
                    <Nav.Link eventKey='SignUp'>Sign Up</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='Login'>Login</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey='SignUp'>
                    {" "}
                    <div className='mt-5'>
                      <h1>Sign Up</h1>
                      <div className='mb-3'>
                        <input
                          type='email'
                          onChange={e => setEmail(e.target.value)}
                          name='email'
                          className='form-control'
                          required
                          placeholder='email'
                          value={email}
                        />
                      </div>
                      <div className='mb-3'>
                        <input
                          type='password'
                          placeholder='password'
                          onChange={e => setPassword(e.target.value)}
                          className='form-control'
                          required
                          value={password}
                        />
                      </div>
                      <div className='mb-3 text-center'>
                        <button
                          className='btn btn-primary w-50'
                          onClick={handleSignUP}>
                          Sign Up
                        </button>
                      </div>
                      <div className='mb-3 text-center'>
                        <p className='text-danger'>{error}</p>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='Login'>
                    <div className='mt-5'>
                      <h1>Login</h1>
                      <div className='mb-3'>
                        <input
                          type='email'
                          onChange={e => setEmail(e.target.value)}
                          name='email'
                          className='form-control'
                          required
                          placeholder='email'
                          value={email}
                        />
                      </div>
                      <div className='mb-3'>
                        <input
                          type='password'
                          placeholder='password'
                          onChange={e => setPassword(e.target.value)}
                          className='form-control'
                          required
                          value={password}
                        />
                      </div>
                      <div className='mb-3 text-center'>
                        <button
                          className='btn btn-primary w-50 '
                          onClick={handleLogin}>
                          Login
                        </button>
                      </div>
                      <div className='mb-3 text-center'>
                        <p className='text-danger'>{error}</p>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default About;
