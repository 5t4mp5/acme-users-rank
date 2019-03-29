import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";
import Main from "./Main";

const root = document.querySelector('#root');
ReactDOM.render(<HashRouter><Route component={Main} /></HashRouter>, root);


