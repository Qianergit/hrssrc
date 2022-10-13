import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'
const timeKey = 'hrsass-timestamp-key'
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeTokens() {
    return Cookies.remove(TokenKey)
}
export function getTimeStamp() {
    return Cookies.get(timeKey)
}
export function setTimeStamp() {
    return Cookies.set(timeKey, Date.now())
}
export function removeTimeStamp() {
    return Cookies.remove(timeKey)
}