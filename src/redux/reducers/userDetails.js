import { USER_DETAILS_FETCH_DATA_SUCCESS } from "../actions/actionTypes";

const defaultState = null;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, { type, data }) => {
  switch (type) {
    case USER_DETAILS_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, data);
    default:
      return state;
  }
};
