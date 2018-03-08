import jwtDecode from 'jwt-decode'
import * as auth from '../actions/auth'

const initialState = {
    access: undefined,
    refresh: undefined,
    user: undefined,
    errors: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case auth.LOGIN_SUCCESS:
            return {
                user: {
                    id: jwtDecode(action.payload.access).user_id
                },
                access: {
                    token: action.payload.access,
                    ...jwtDecode(action.payload.access)
                },
                refresh: {
                    token: action.payload.refresh,
                    ...jwtDecode(action.payload.refresh)
                    },
                errors: {}
            }
        case auth.TOKEN_RECEIVED:
            return {
                ...state,
                access: {
                    token: action.payload.access,
                    ...jwtDecode(action.payload.access)
                }
            }
        case auth.LOGIN_FAILURE:
        case auth.TOKEN_FAILURE:
            return {
                access: undefined,
                refresh: undefined,
                errors:
                    action.payload.response ||
                    { 'non_field_errors': action.payload.statusText },
            }
        case '@@auth/HANDLE_LOGOUT':
            return {
                ...state,
                access: undefined,
                refresh: undefined,
            }
        case auth.LOGGED_IN_USER_RECEIVED:
            return {
                ...state,
                user: {...action.payload}
            }
        default:
            return state
    }
}

export function accessToken(state) {
    if (state.access) {
        return state.access.token
    }
}

export function refreshToken(state) {
    if (state.refresh) {
        return state.refresh.token
    }
}

export function isAccessTokenExpired(state) {
    if (state.access && state.access.exp) {
        return 1000 * state.access.exp - (new Date()).getTime() < 5000
    }
    return true
}

export function isRefreshTokenExpired(state) {
    if (state.refresh && state.refresh.exp) {
        return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
    }
    return true
}

export function isAuthenticated(state) {
    return !isRefreshTokenExpired(state)
}

export function errors(state) {
    return state.errors
}

export function getUser(state) {
    return state.user
}

export function getUserId(state) {
    return state.access.user_id
}

