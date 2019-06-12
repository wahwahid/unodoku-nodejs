'use strict'

const axios = require('axios')
const ApiError = require('./apiError')
/**
 * Wrapper of Axios to do API request to Doku Core API
 * @return {Promise} of API response, or exception during request
 * capable to do HTTP `request`
 */
class Http {
  request(method, url, payload = {}) {
    let headers = {
      'user-agent': 'unodoku-nodejs/1.0.0'
    }
    if (method === 'post') {
      headers['content-type'] = 'application/x-www-form-urlencoded'
    }
    return new Promise(function (resolve, reject) {
      // Reject if param is not JSON
      if (typeof payload === 'string' || payload instanceof String) {
        try {
          payload = JSON.parse(payload)
        } catch (err) {
          reject(new ApiError(`fail to parse 'payload' string as JSON. Use JSON string or Object as 'payload'. with message: ${err}`))
        }
      }
      axios({
        method,
        headers,
        url,
        data: method !== 'get' ? `data=${JSON.stringify(payload)}` : null,
        params: method === 'get' ? payload : null
      }).then(function (res) {
        // Reject core API error status code
        if (res.data.hasOwnProperty('status_code') && res.data.status_code >= 300 && res.data.status_code != 407) {
          reject(
            new ApiError(
              `Doku API is returning API error. HTTP status code: ${res.data.status_code}. API response: ${JSON.stringify(res.data)}`,
              res.data.status_code,
              res.data,
              res
            )
          )
        }
        resolve(res.data)
      }).catch(function (err) {
        let res = err.response
        // Reject API error HTTP status code
        if (res.status >= 300) {
          reject(
            new ApiError(
              `Doku API is returning API error. HTTP status code: ${res.status}. API response: ${JSON.stringify(res.data)}`,
              res.status,
              res.data,
              res
            )
          )
        }
        reject(err)
      })
    })
  }
}

module.exports = Http
