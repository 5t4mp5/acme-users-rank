import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Main from "./components/Main";

const root = document.querySelector('#root');
ReactDOM.render(<HashRouter><Provider store={store}><Route component={Main} /></Provider></HashRouter>, root);


