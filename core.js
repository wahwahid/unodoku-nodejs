'use strict'

const Config = require('./config')
const Utils = require('./utils')
const Http = require('./http')

/**
 * Core object able to do API request to Doku Core API
 */
class Core {
  /**
   * Initiate with options
   * @param  {Object} options - should have these props:
   * isProduction, sharedKey, mallId
   * @param {Boolean} options.isProduction - Set Api Environtment to Production
   * @param {String} options.sharedKey - Doku API Shared Key
   * @param {String} options.mallId - Doku API Mall Id
   */
  constructor(options = { isProduction:false, sharedKey:'', mallId:'' }) {
    this.config = new Config(options)
    this.utils = new Utils(this.config)
    this.http = new Http()
  }
}

module.exports = Core
