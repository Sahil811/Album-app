/**
 * The application store
 * @author Sahil Siddiqui
 * @since 15 July 2021
 */

import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { routerReducer } from "react-router-redux";
import thunk from "redux-thunk";
import * as reducers from "./reducers";

// enhances combines all the middlewares.
const enhancer = applyMiddleware(thunk, createLogger());

// eslint-disable-next-line import/no-anonymous-default-export
export default (initialState = {}) =>
  createStore(
    combineReducers({
      albums: reducers.albumReducer,
      users: reducers.usersReducer,
      fetching: reducers.fetchReducer,
      error: reducers.errorReducer,
      photos: reducers.photosReducer,
      albumDetails: reducers.albumDetailsReducer,
      userDetails: reducers.userDetailsReducer,
      routing: routerReducer,
    }),
    initialState,
    enhancer
  );
