import {
  IAppAction,
  IAuthInitialState,
  AUTH_INITIAL_STATE
} from '../states';
import { AUTH_ACTION_TYPES } from '../actions';

export default function authReducer (
  state: IAuthInitialState = AUTH_INITIAL_STATE,
  action: IAppAction
): IAuthInitialState {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isInProgress: true,
        isAuthenticated: false,
        userData: null,
        error: null
      }

    case AUTH_ACTION_TYPES.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isInProgress: false,
        isAuthenticated: true,
        userData: payload.userInfo,
        error: null
      }

    case AUTH_ACTION_TYPES.LOGIN_REQUEST_FALURE:
      return {
        ...state,
        isInProgress: false,
        isAuthenticated: false,
        userData: null,
        error: payload.error
      }

    default: return state;
  }
}