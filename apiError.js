// ref: https://rclayton.silvrback.com/custom-errors-in-node-js
/**
 * Custom HTTP Error Class that also expose httpStatusCode, httpResponseData, rawHttpClient
 * To expose more info for lib user
 */
class ApiError extends Error {
  constructor(message, httpStatusCode = null, httpResponseData = null, rawHttpClient = null) {
    super(message)
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name

    this.httpStatusCode = httpStatusCode
    this.httpResponseData = httpResponseData
    this.rawHttpClient = rawHttpClient
    
    // This clips the constructor invocation from the stack trace.
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ApiError
