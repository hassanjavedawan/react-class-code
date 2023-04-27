/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cards from "../components/element/Cards";
import Faqs from "../components/element/Faqs";
export default class Home extends Component {
  render() {
    return (
      <>
        <Cards />
        <Faqs />
      </>
    );
  }
}
