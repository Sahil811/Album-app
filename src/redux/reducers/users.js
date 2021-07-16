import { USER_FETCH_DATA_SUCCESS } from "../actions/actionTypes";

const defaultState = {
  usersData: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, { type, data, page, limit }) => {
  switch (type) {
    case USER_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        usersData: data,
        page: page || 0,
        limit: limit || 0,
        total: data?.length || 0,
      });
    default:
      return state;
  }
};
