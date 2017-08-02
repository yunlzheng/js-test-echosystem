var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    processResult = function (calculator, result, callback) {
        calculator.emit('result', result);
        if (typeof callback !== 'undefined') {
            setTimeout(function () { callback(result); }, 1000, this);
        } else {
            return result;
        }
    };

var request = require('superagent');

function Calculator() {
    EventEmitter.call(this);
}

util.inherits(Calculator, EventEmitter);

Calculator.prototype.remote = function(a, b, callback) {
  request.get('/some-url').end(function(err, res){
    callback(res.body.result)
  })
}

Calculator.prototype.add = function(a, b, callback) {
    var result = a + b;
    return processResult(this, result, callback);
};

Calculator.prototype.substract = function(a, b, callback) {
    var result = a - b;
    return processResult(this, result, callback);
};

Calculator.prototype.multiply = function(a, b, callback) {
    var result = a * b;
    return processResult(this, result, callback);
};

Calculator.prototype.divide = function(a, b, callback) {
    var result = a / b;
    return processResult(this, result, callback);
};

module.exports = Calculator;
