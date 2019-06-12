Unofficial Doku JavaScript (NodeJS) Library
===============
[![NPM](https://nodei.co/npm/unodoku-nodejs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/unodoku-nodejs/)

[![npm version](https://img.shields.io/npm/v/unodoku-nodejs.svg?style=flat-square)](https://www.npmjs.org/package/unodoku-nodejs)
[![Build Status](https://travis-ci.org/rizdaprasetya/midtrans-nodejs-client.svg?branch=master)](https://travis-ci.org/rizdaprasetya/midtrans-nodejs-client)
![NPM download/month](https://img.shields.io/npm/dm/unodoku-nodejs.svg)
![NPM download total](https://img.shields.io/npm/dt/unodoku-nodejs.svg)

This is an Unofficial JavaScript (NodeJS) API client/library for Doku Core API. Visit [https://www.doku.com/API](https://www.doku.com/API/index.html?javascript#api) for more technical details.

## 1. Installation

### 1.a Using NPM

```
npm install --save unodoku-nodejs
```

### 1.b Manual Installation

If you are not using NPM, you can clone or [download](https://github.com/wahwahid/unodoku-nodejs/archive/master.zip) this repository.
Then require from `api.js` file.

```javascript
const DokuApi = require('./unodoku-nodejs/api')
```

## 2. Usage

### 2.1 Client Initialization and Configuration

Set your sharedKey and mallId

Create API client object

```javascript
const DokuApi = require('unodoku-nodejs')
// Create Core API instance
let doku = new DokuApi({
    isProduction : false,
    sharedKey : 'YOUR_SHARED_KEY',
    mallId : 'YOUR_MALL_ID'
})
```

You can also re-set config using `DokuApi.config.set( ... )`
example:

```javascript
const DokuApi = require('unodoku-nodejs')
// Create Core API instance
let doku = new DokuApi()
doku.config.set({
    isProduction : false,
    sharedKey : 'YOUR_SHARED_KEY',
    mallId : 'YOUR_MALL_ID'
})

// You don't have to re-set using all the options, 
// i.e. set sharedKey only
doku.config.set({sharedKey : 'YOUR_SHARED_KEY'})
```

You can also set config directly from attribute
```javascript
const DokuApi = require('unodoku-nodejs')
// Create Core API instance
let doku = new DokuApi()

doku.config.isProduction = false
doku.config.sharedKey = 'YOUR_SHARED_KEY'
doku.config.mallId = 'YOUR_MALL_ID'
```

## 3. Handling Error / Exception
When using function that result in Doku API call e.g: `DokuApi.doGeneratePaycode(...)`
there's a chance it may throw error (`ApiError` object), the error object will contains below properties that can be used as information to your error handling logic:
```javascript
doku.doGeneratePaycode(payload)
    .then((res)=>{
    })
    .catch((e)=>{
        e.message // Basic error message string
        e.httpStatusCode // HTTP status code e.g: 400, 401, etc.
        e.httpResponseData // HTTP response data
        e.rawHttpClient // raw Axios response object
    })
```