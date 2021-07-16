import { ALBUM_FETCH_DATA_SUCCESS } from "../actions/actionTypes";

const defaultState = {
  albumsData: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, { type, data, page, limit }) => {
  switch (type) {
    case ALBUM_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        albumsData: data,
        page: page || 0,
        limit: limit || 0,
        total: data?.length || 0,
      });
    default:
      return state;
  }
};
