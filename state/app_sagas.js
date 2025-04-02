import { put, call, takeLatest } from 'redux-saga/effects'
import API from './api'
import { actionSuccess, actionError, reduce } from './lib/actions'
import {
  CHECK_ACCESS_CODE,
  LOGIN,
  REGISTER,
  END_NETWORK_ACTIVITY,
  UPDATE_PASSWORD,
  UPDATE_USER,
  START_NETWORK_ACTIVITY,
  FORGOT_PASSWORD,
  GET_CURRENT_USER_JOURNAL,
  GET_RESOURCES,
  GET_TROPHIES,
  GET_USER_MEDIA,
  UPDATE_CURRENT_USER_JOURNAL,
  UPDATE_USER_MEDIA_BOOKMARK,
  UPDATE_USER_MEDIA_COMPLETED,
  LOGOUT
} from './lib/action_types'
import {
  API_URL,
  STATUS_REGISTERED,
  STATUS_AUTHENTICATED,
  STATUS_UPDATED,
  STATUS_UNAUTHENTICATED
} from '../constants/constants'
import * as RootNavigation from '../utils/RootNavigation'
import Toast from 'react-native-toast-message'

const showToast = (type, text1) => {
  Toast.show({
    type,
    text1,
    topOffset: 90,
  })
}

export const checkAccessCode = function* (action) {
  console.log('IN checkAccessCode() - action', action)
  const { type } = action
  try {
    yield put(reduce(START_NETWORK_ACTIVITY))
    const data = yield call(API, 'POST', `${API_URL}/public/checkAccessCode`, action.data)
    yield put(reduce(END_NETWORK_ACTIVITY))
    console.log('IN checkAccessCode() - data: ', data)
    if (data.success) {
      yield put(actionSuccess(data, type))
      if (action.data?.fromRegister) {
        RootNavigation.navigate('Tabs')
      } else {
        RootNavigation.navigate('ResetPassword')
      }
    } else {
      yield put(actionError(null, type, data))
    }
  } catch (error) {
    console.log('ERROR: ' + error)
    yield put(actionError(error, type))
  }
}
export const watchCheckAccessCode = function* () {
  yield takeLatest(CHECK_ACCESS_CODE, checkAccessCode)
}

export const forgotPassword = function* (action) {
  console.log('IN forgotPassword() - action', action)
  const { type } = action
  try {
    yield put(reduce(START_NETWORK_ACTIVITY))
    const data = yield call(API, 'POST', `${API_URL}/public/forgotPassword`, action.data)
    yield put(reduce(END_NETWORK_ACTIVITY))
    console.log('IN forgotPassword() - data: ', data)
    if (data.success) {
      yield put(actionSuccess(data, type))
    } else {
      yield put(actionError(null, type, data))
    }
  } catch (error) {
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchForgotPassword = function* () {
  yield takeLatest(FORGOT_PASSWORD, forgotPassword)
}


export const getCurrentUserJournal = function* (action) {
  console.log('IN getCurrentUserJournal() - action', action)
  const { type } = action

  try {
    const data = yield call(API, 'POST', `${API_URL}/getCurrentUserJournal`, null, action.session)
    console.log('IN getCurrentUserJournal() - data: ', data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    console.error('getCurrentUserJournal Error:', error)
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchGetCurrentUserJournal = function* () {
  yield takeLatest(GET_CURRENT_USER_JOURNAL, getCurrentUserJournal)
}

export const getResources = function* (action) {
  console.log('IN getResources() - action', action)
  const { type } = action

  try {
    const data = yield call(API, 'POST', `${API_URL}/getResources`, null, action.session)
    console.log('IN getResources() - data: ', data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    console.error('getResources Error:', error)
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchGetResources = function* () {
  yield takeLatest(GET_RESOURCES, getResources)
}

export const getTrophies = function* (action) {
  console.log('IN getTrophies() - action', action)
  const { type } = action

  try {
    const data = yield call(API, 'POST', `${API_URL}/getTrophies`, null, action.session)
    console.log('IN getTrophies() - data: ', data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    console.error('getTrophies Error:', error)
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchGetTrophies = function* () {
  yield takeLatest(GET_TROPHIES, getTrophies)
}

export const getUserMedia = function* (action) {
  console.log('IN getUserMedia() - action', action)
  const { type, session, data } = action
  const { resourceId } = data
  const payload = { resourceId }

  try {
    const data = yield call(API, 'POST', `${API_URL}/getUserMedia`, payload, session)
    console.log('IN getUserMedia() - data: ', data)
    yield put(actionSuccess(data, type)) // Ensure this dispatches the correct action
  } catch (error) {
    console.error('getUserMedia Error:', error)
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchGetUserMedia = function* () {
  yield takeLatest(GET_USER_MEDIA, getUserMedia)
}

export const login = function* (action) {
  console.log('IN login() - action', action)
  const { type } = action
  try {
    yield put(reduce(START_NETWORK_ACTIVITY))
    const data = yield call(API, 'POST', `${API_URL}/public/login`, action.data)
    yield put(reduce(END_NETWORK_ACTIVITY))
    console.log('IN login() - data: ', data)
    if (data.authStatus === STATUS_AUTHENTICATED) {
      yield put(actionSuccess(data, type))
      RootNavigation.navigate('Tabs')
    } else {
      yield put(actionError(null, type, data))
    }
  } catch (error) {
    console.log('ERROR: ' + error)
    yield put(actionError(error, type))
  }
}
export const watchLogin = function* () {
  yield takeLatest(LOGIN, login)
}

export const logout = function* (action) {
  console.log('IN logout() - action', action)
  const { type } = action
  try {
    yield put(reduce(START_NETWORK_ACTIVITY))
    const data = yield call(API, 'POST', `${API_URL}/logout`, action.data, action.session)
    yield put(reduce(END_NETWORK_ACTIVITY))
    console.log('IN login() - data: ', data)
    if (data.authStatus === STATUS_UNAUTHENTICATED) {
      yield put(actionSuccess(data, type))
      RootNavigation.navigate('Login')
    }
    else {
      yield put(actionError(null, type, data))
    }
  } catch (error) {
    console.log('ERROR: ' + error)
    yield put(actionError(error, type))
  }
}
export const watchLogout = function* () {
  yield takeLatest(LOGOUT, logout)
}

export const register = function* (action) {
  console.log('IN register() - action', action)
  const { type } = action
  try {
    yield put(reduce(START_NETWORK_ACTIVITY))
    const data = yield call(API, 'POST', `${API_URL}/public/register`, action.data)
    yield put(reduce(END_NETWORK_ACTIVITY))
    console.log('IN register() - data: ', data)
    if (data.authStatus === STATUS_REGISTERED) {
      RootNavigation.navigate('RegisterSuccess', { email: action?.data?.email, name: action?.data?.name })
    }
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
    yield put(reduce(END_NETWORK_ACTIVITY))
  }
}
export const watchRegister = function* () {
  yield takeLatest(REGISTER, register)
}

export const updateCurrentUserJournal = function* (action) {
  console.log('IN updateCurrentUserJournal() - action', action)
  const { type } = action

  try {
    const data = yield call(API, 'POST', `${API_URL}/updateCurrentUserJournal`, action.data, action.session)
    console.log('IN updateCurrentUserJournal() - data: ', data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    console.error('updateCurrentUserJournal Error:', error)
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchUpdateCurrentUserJournal = function* () {
  yield takeLatest(UPDATE_CURRENT_USER_JOURNAL, updateCurrentUserJournal)
}

export const updatePassword = function* (action) {
  console.log('IN updatePassword() - action', action)
  const { type } = action
  try {
    yield put(reduce(START_NETWORK_ACTIVITY))
    const data = yield call(API, 'POST', `${API_URL}/updatePassword`, action.data, action.session)
    yield put(reduce(END_NETWORK_ACTIVITY))
    console.log('IN updatePassword() - data: ', data)
    if (data.authStatus === STATUS_UPDATED) {
      yield put(actionSuccess(data, type))
      RootNavigation.navigate('Tabs')
      showToast('success', 'Password Changed  👋')
    } else {
      yield put(actionError(null, type, data))
    }
  } catch (error) {
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchUpdatePassword = function* () {
  yield takeLatest(UPDATE_PASSWORD, updatePassword)
}

export const updateUser = function* (action) {
  console.log('IN updateUser() - action', action)
  const { type } = action
  try {
    yield put(reduce(START_NETWORK_ACTIVITY))
    const data = yield call(API, 'POST', `${API_URL}/updateUser`, action.data, action.session)
    yield put(reduce(END_NETWORK_ACTIVITY))
    console.log('IN updateUser() - data: ', data)
    if (data.authStatus === STATUS_UPDATED) {
      yield put(actionSuccess(data, type))
      RootNavigation.navigate('Profile', { count: 0 })
      showToast('success', 'User Updated  👋')
    } else {
      yield put(actionError(null, type, data))
    }
  } catch (error) {
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchUpdateUser = function* () {
  yield takeLatest(UPDATE_USER, updateUser)
}

export const updateUserMediaBookmark = function* (action) {
  console.log('IN updateUserMediaBookmark - action', action)
  const { type, data, session } = action

  try {
    yield put(reduce(START_NETWORK_ACTIVITY))
    const response = yield call(API, 'POST', `${API_URL}/updateUserMediaBookmark`, data, session)
    yield put(reduce(END_NETWORK_ACTIVITY))
    console.log('IN updateUserMediaBookmark - response: ', response)
    if (response.success) {
      yield put(actionSuccess(data, type))
    } else {
      yield put(actionError(null, type, response))
    }
  } catch (error) {
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchUpdateUserMediaBookmark = function* () {
  yield takeLatest(UPDATE_USER_MEDIA_BOOKMARK, updateUserMediaBookmark)
}

export const updateUserMediaCompleted = function* (action) {
  console.log('IN updateUserMediaCompleted - action', action)
  const { type, mediaId } = action
  try {
    yield put(reduce(START_NETWORK_ACTIVITY))
    const data = yield call(API, 'POST', `${API_URL}/updateUserMediaCompleted`, data, session)
    yield put(reduce(END_NETWORK_ACTIVITY))
    console.log('IN updateUserMediaCompleted - data: ', data)
    if (data.authStatus === STATUS_UPDATED) {
      yield put(actionSuccess(data, type))
    } else {
      yield put(actionError(null, type, data))
    }
  } catch (error) {
    yield put(reduce(END_NETWORK_ACTIVITY))
    yield put(actionError(error, type))
  }
}
export const watchUpdateUserMediaCompleted = function* () {
  yield takeLatest(UPDATE_USER_MEDIA_COMPLETED, updateUserMediaCompleted)
}
