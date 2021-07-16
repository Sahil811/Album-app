import axios from "axios";
import { fetchAction, error } from ".";

const headers = {
  "Content-Type": "application/json",
};

export const fetchEntity =
  ({ payload, action, page = 1, limit = 5, endpoint }) =>
  (dispatch) => {
    if (!endpoint) {
      return dispatch(error({ error: "Required endpoint is missing." }));
    }
    dispatch(fetchAction({ fetching: true }));
    const body = Object.assign({}, payload);

    axios
      //.post(`${endpoint}?_start=${page - 1}&_limit=${limit}`, body, { headers })
      .get(endpoint, body, { headers })
      .then((response) => {
        const { status, data } = response;
        if (status === 200 || status === 304) {
          // dispatch the success along with the paginated data
          dispatch({
            type: action,
            data,
            page,
            limit,
          });
        }
        dispatch(fetchAction({ fetching: false }));
      })
      .catch((err) => {
        console.error(err);
        dispatch(fetchAction({ fetching: false }));
        dispatch(error({ error: "Error while fetching entity list." }));
      });
  };
