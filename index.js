'use strict';

var crypo = require('crypto');

module.exports = function hash(object, algorithm, encoding) {
  var h = crypo.createHash(algorithm || 'md5');
  (function update(v, k) {
    if (k !== undefined) {
      h.update(JSON.stringify(k));
    }
    if (v && v.constructor === Array) {
      v.forEach(function(value) {
        update(h, value);
      });
    } else if (v && v.constructor === Object) {
      var keys = Object.keys(v);
      keys.sort();
      keys.forEach(function(key) {
        update(h, v[key], key);
      });
    } else {
      h.update(JSON.stringify(v));
    }
  }(object));
  return h.digest(encoding || 'hex');
};
