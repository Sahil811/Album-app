import { ERROR } from "./actionTypes";
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ error }) => {
  return { type: ERROR, error };
};
