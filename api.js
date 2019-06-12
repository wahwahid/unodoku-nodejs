'use strict'

const Core = require('./core')

/**
 * These are wrapper/implementation of API methods described on: 
 * https://www.doku.com/API/index.html?javascript#api
 * @return {Promise} - Promise that contains JSON API response decoded as Object
 */
class DokuApi extends Core {
  /**
   * Initiate with options
   * @param  {Object} options - should have these props:
   * isProduction, sharedKey, mallId
   * @param {Boolean} options.isProduction - Set Api Environtment to Production
   * @param {String} options.sharedKey - Doku API Shared Key
   * @param {String} options.mallId - Doku API Mall Id
   */
  constructor (options) {
    super(options)
  }
  
  doPrePayment (data) {
    let apiUrl = this.config.getCoreApiBaseUrl() + '/PrePayment'
    data.req_basket = this.utils.formatBasket(data.req_basket)
    let responsePromise = this.http.request(
      'post',
      apiUrl,
      { data: JSON.stringify(data) }
    )
    return responsePromise
  }

  doPayment () {
    let apiUrl = this.config.getCoreApiBaseUrl() + '/paymentMip'
    data.req_basket = this.utils.formatBasket(data.req_basket)
    let responsePromise = this.http.request(
      'post',
      apiUrl,
      { data: JSON.stringify(data) }
    )
    return responsePromise
  }

  doDirectPayment (data) {
    let apiUrl = this.config.getCoreApiBaseUrl() + '/PaymentMIPDirect'
    let responsePromise = this.http.request(
      'post',
      apiUrl,
      { data: JSON.stringify(data) }
    )
    return responsePromise
  }

  doGeneratePaycode (data) {
    let apiUrl = this.config.getCoreApiBaseUrl() + '/DoGeneratePaycodeVA'
    let responsePromise = this.http.request(
      'post',
      apiUrl,
      { data: JSON.stringify(data) }
    )
    return responsePromise
  }

}

module.exports = DokuApi
