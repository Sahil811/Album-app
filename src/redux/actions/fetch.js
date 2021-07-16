/**
 * dispatch the fetch action
 */
import { FETCHING } from "./actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ fetching = false }) => {
  return { type: FETCHING, fetching };
};
