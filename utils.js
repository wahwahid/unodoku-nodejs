'use strict'

const _ = require('lodash')
const sha1 = require('crypto-js/sha1')
const countries = require('i18n-iso-countries')

class Utils {

  constructor(config) {
    this.config = config
  }

  isEmpty(data) {
    if (data === undefined || data === null || data === '') {
      return true
    }
    return false
  }

  getCurrency(alpha2 = 'ID') {
    return countries.alpha2ToNumeric(alpha2)
  }

  doCreateWords(data) {
    if (!this.isEmpty(data['device_id'])) {
      if (!this.isEmpty(data['pairing_code'])) {
        return sha1(
          data['amount'] +
          this.config.get().mallId +
          this.config.get().sharedKey +
          data['invoice'] +
          data['currency'] +
          data['token'] +
          data['pairing_code'] +
          data['device_id']
        ).toString()
      } else {
        return sha1(
          data['amount'] +
          this.config.get().mallId +
          this.config.get().sharedKey +
          data['invoice'] +
          data['currency'] +
          data['device_id']
        ).toString()
      }
    } else if (!this.isEmpty(data['pairing_code'])) {
      return sha1(
        data['amount'] +
        this.config.get().mallId +
        this.config.get().sharedKey +
        data['invoice'] +
        data['currency'] +
        data['token'] +
        data['pairing_code']
      ).toString()
    } else if (!this.isEmpty(data['currency'])) {
      return sha1(
        data['amount'] +
        this.config.get().mallId +
        this.config.get().sharedKey +
        data['invoice'] +
        data['currency']
      ).toString()
    } else {
      return sha1(
        data['amount'] +
        this.config.get().mallId +
        this.config.get().sharedKey +
        data['invoice']
      ).toString()
    }
  }

  doCreateWordsRaw(data) {
    if (!this.isEmpty(data['device_id'])) {
      if (!this.isEmpty(data['pairing_code'])) {
        return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice'] + data['currency'] + data['token'] + data['pairing_code'] + data['device_id']
      } else {
        return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice'] + data['currency'] + data['device_id']
      }
    } else if (!this.isEmpty(data['pairing_code'])) {
      return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice'] + data['currency'] + data['token'] + data['pairing_code']
    } else if (!this.isEmpty(data['currency'])) {
      return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice'] + data['currency']
    } else {
      return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice']
    }
  }

  validateWords(data) {
    return data['words'] === this.doCreateWords(data)
  }

  formatBasket(data) {
    let parseBasket = ''
    if (_.isArray(data)) {
      for (let basket of data) {
        parseBasket = parseBasket + basket['name'] + ',' + Number(basket['amount']).toFixed(2) + ',' + basket['quantity'] + ',' + Number(basket['subtotal'] || (basket['amount'] * basket['quantity'])).toFixed(2) + ';'
      }
    }
    return parseBasket
  }

}

module.exports = Utils
