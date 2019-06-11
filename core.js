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
   */
  constructor(options = { isProduction:false, sharedKey:'', mallId:'' }) {
    this.config = new Config(options)
    this.utils = new Utils(this.config)
    this.http = new Http()
  }
}

module.exports = Core
