import {
  CREATE_USER,
  RETRIEVE_USERS,
  RETRIEVE_USERS_BYID,
  UPDATE_USER,
  DELETE_USER,
  DELETE_ALL_USERS,
} from "../actions/Variables.js";

const initialState = [];

function UserReducer(users = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
      return [...users, payload];

    case RETRIEVE_USERS:
      return payload;

    case RETRIEVE_USERS_BYID:
      return payload;

    case UPDATE_USER:
      return users.map((u) => {
        if (u.id === payload.id) {
          return {
            ...users,
            ...payload,
          };
        } else {
          return u;
        }
      });

    case DELETE_USER:
      return users.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_USERS:
      return [];

    default:
      return users;
  }
}

export default UserReducer;
