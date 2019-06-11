'use strict'

const Core = require('./core')

/**
 * These are wrapper/implementation of API methods described on: 
 * https://www.doku.com/API/index.html?javascript#api
 * @return {Promise} - Promise that contains JSON API response decoded as Object
 */
class Api extends Core {

  constructor (input) {
    super(input)
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

module.exports = Api
