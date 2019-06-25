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
   * @param  {Object} options Should have these props:
   * isProduction, sharedKey, mallId
   * @param {Boolean} options.isProduction Set Api Environtment to Production
   * @param {String} options.sharedKey Doku API Shared Key
   * @param {String} options.mallId Doku API Mall Id
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
      data
    )
    return responsePromise
  }

  doPayment (data) {
    let apiUrl = this.config.getCoreApiBaseUrl() + '/paymentMip'
    data.req_basket = this.utils.formatBasket(data.req_basket)
    let responsePromise = this.http.request(
      'post',
      apiUrl,
      data
    )
    return responsePromise
  }

  doDirectPayment (data) {
    let apiUrl = this.config.getCoreApiBaseUrl() + '/PaymentMIPDirect'
    let responsePromise = this.http.request(
      'post',
      apiUrl,
      data
    )
    return responsePromise
  }

  doGeneratePaycode (data, short) {
    let apiUrl = this.config.getCoreApiBaseUrl() + (short ? '/doGeneratePaymentCode' : '/DoGeneratePaycodeVA')
    data.req_basket = this.utils.formatBasket(data.req_basket)
    if (this.utils.isEmpty(data.req_mall_id)) {
      data.req_mall_id = this.config.get().mallId
    }
    if (this.utils.isEmpty(data.req_words)) {
      data.req_words = this.utils.doCreateWords({
        amount: data.req_amount,
        invoice: data.req_trans_id_merchant,
        currency: this.utils.getCurrency(data.req_currency)
      })
    }
    let responsePromise = this.http.request(
      'post',
      apiUrl,
      data
    )
    return responsePromise
  }

}

module.exports = DokuApi
