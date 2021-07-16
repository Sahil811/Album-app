import { FETCHING } from "../actions/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = false, { type, fetching = false }) => {
  switch (type) {
    case FETCHING:
      return fetching;
    default:
      return state;
  }
};
