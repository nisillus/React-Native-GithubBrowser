import { call, put, takeLatest, all } from 'redux-saga/effects';

import { AuthService } from '../../services';
import {
  AUTH_ACTIONS,
  AUTH_ACTION_TYPES,
  ROUTING_ACTIONS
} from '../actions';
import { ROUTES_NAMES } from '../../utils/routes.constant';

const _authService = new AuthService();

function* sendLoginRequest(action) {
  try {
    const loginResult = yield call(
      _authService.login,
      action.payload.params
    );

    yield all([
      put(ROUTING_ACTIONS.navigate({ routeName: ROUTES_NAMES.NewsFeedRT })),
      put(AUTH_ACTIONS.loginRequestSuccess(loginResult))
    ]);
  } catch(errorDescription) {
    yield put(AUTH_ACTIONS.authActionFailure({
      action: AUTH_ACTION_TYPES.LOGIN_REQUEST,
      errorDescription
    }));
  }
}

function* checkTokenRequest() {
  try {
    const checkTokenResult = yield call(
      _authService.checkToken
    );

    yield all([
      put(ROUTING_ACTIONS.navigate({ routeName: ROUTES_NAMES.NewsFeedRT })),
      put(AUTH_ACTIONS.checkingAuthInfoSuccess(checkTokenResult))
    ]);
  } catch(errorDescription) {
    yield all([
      put(ROUTING_ACTIONS.navigate({ routeName: ROUTES_NAMES.LoginRT })),
      put(AUTH_ACTIONS.authActionFailure({
        action: AUTH_ACTION_TYPES.CHECKING_AUTH_INFO,
        errorDescription
      }))
    ]);
  }
}

export function* login$() {
  yield all([
    takeLatest(AUTH_ACTION_TYPES.LOGIN_REQUEST, sendLoginRequest),
    takeLatest(AUTH_ACTION_TYPES.CHECKING_AUTH_INFO, checkTokenRequest)
  ]);
}