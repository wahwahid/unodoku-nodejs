'use strict'

const sha1 = require('crypto-js/sha1')

class Utils {

  constructor(config) {
    this.config = config
  }

  isEmpty (data) {
    if (data === undefined || data === null || data === '') {
      return true
    }
    return false
  }

	doCreateWords (data) {
		if(!this.isEmpty(data['device_id'])){
			if(!this.isEmpty(data['pairing_code'])){
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
			}else{
				return sha1(
          data['amount'] + 
          this.config.get().mallId + 
          this.config.get().sharedKey + 
          data['invoice'] + 
          data['currency'] + 
          data['device_id']
        ).toString()
			}
		}else if(!this.isEmpty(data['pairing_code'])){
      return sha1(
        data['amount'] + 
        this.config.get().mallId + 
        this.config.get().sharedKey + 
        data['invoice'] + 
        data['currency'] + 
        data['token'] + 
        data['pairing_code']
      ).toString()
		}else if(!this.isEmpty(data['currency'])){
			return sha1(
        data['amount'] + 
        this.config.get().mallId + 
        this.config.get().sharedKey + 
        data['invoice'] + 
        data['currency']
      ).toString()
		}else{
			return sha1(
        data['amount'] + 
        this.config.get().mallId + 
        this.config.get().sharedKey + 
        data['invoice']
      ).toString()
		}
  }
  
	doCreateWordsRaw (data) {
		if(!this.isEmpty(data['device_id'])){
			if(!this.isEmpty(data['pairing_code'])){
				return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice'] + data['currency'] + data['token'] + data['pairing_code'] + data['device_id']
			}else{
				return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice'] + data['currency'] + data['device_id']
			}
		}else if(!this.isEmpty(data['pairing_code'])){
			return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice'] + data['currency'] + data['token'] + data['pairing_code']
		}else if(!this.isEmpty(data['currency'])){
			return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice'] + data['currency']
		}else{
			return data['amount'] + this.config.get().mallId + this.config.get().sharedKey + data['invoice']
		}
	}

	formatBasket(data){
    let parseBasket = ''
		if (!this.isEmpty(data)) {
			for (basket in data) {
				parseBasket = parseBasket + basket['name'] + ',' + basket['amount'] + ',' + basket['quantity'] + ',' + basket['subtotal'] + ';'
			}
		}
		return parseBasket
	}

}

module.exports = Utils
