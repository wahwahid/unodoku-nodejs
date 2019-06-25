'use strict'

const _ = require('lodash')
/**
 *  Config Object that used to store isProduction, sharedKey, mallId.
 *  And also API base urls.
 */
class Config {
  /**
   * Initiate with options
   * @param  {Object} options - should have these props:
   * isProduction, sharedKey, mallId
   * @param {Boolean} options.isProduction - Set Api Environtment to Production
   * @param {String} options.sharedKey - Doku API Shared Key
   * @param {String} options.mallId - Doku API Mall Id
   */
  constructor(options = { isProduction: false, sharedKey: '', mallId: '' }) {
    this.isProduction = false
    this.sharedKey = ''
    this.mallId = ''

    this.set(options)
  }
  /**
   * Return config stored
   * @return {Object} object contains isProduction, sharedKey, mallId
   */
  get() {
    let currentConfig = {
      isProduction: this.isProduction,
      sharedKey: this.sharedKey,
      mallId: this.mallId
    }
    return currentConfig
  }
  /**
   * Set config stored
   * @param {Object} options - object contains isProduction, sharedKey, mallId]
   */
  set(options) {
    let currentConfig = {
      isProduction: this.isProduction,
      sharedKey: this.sharedKey,
      mallId: this.mallId
    }
    const parsedOptions = _.pick(options, ['isProduction', 'sharedKey', 'mallId'])
    let mergedConfig = _.merge({}, currentConfig, parsedOptions)

    this.isProduction = mergedConfig.isProduction
    this.sharedKey = mergedConfig.sharedKey
    this.mallId = mergedConfig.mallId
  }
  /**
   * @return {String} core api base url
   */
  getCoreApiBaseUrl() {
    return this.isProduction ?
      Config.CORE_PRODUCTION_BASE_URL :
      Config.CORE_STAGING_BASE_URL
  }
}

// Static vars
Config.CORE_PRODUCTION_BASE_URL = 'https://pay.doku.com/api/payment'
Config.CORE_STAGING_BASE_URL = 'https://staging.doku.com/api/payment'

module.exports = Config
