var Calculator = require('../lib/calculator');
var sinon = require('sinon');
var assert = require('assert');
var request = require('superagent');

describe('When adding one and two using the calculator', function () {
    var calculator;

    before(function () {
        calculator = new Calculator();
    });

    it('should result in three using the return style approach', function () {
        var result = calculator.add(1, 2);
        assert.equal(3, result)
        // assert.expect(result).equal(3);
    });
});

describe('When substracting six and eight using the calculator', function () {
    var calculator;

    before(function () {
        calculator = new Calculator();
    });

    it('should result in minus two the callback approach', function (done) {
        calculator.substract(6, 8, function(result) {
            assert.equal(result, -2);
            done();
        });
    });
});

describe('proxy superagent()# When add 2 and 3 using remote calculator', function(){

    var calculator;

    before(function () {
        calculator = new Calculator();
    });

    after(function() {
      request.get.restore()
    })

    it('should get result fro catalator', function(){
      getRequest = sinon.stub(request, 'get');
      callback = sinon.spy()

      getRequest.returns({
        end: (cb)=>{
          cb(null, {ok: true, body: { "status" : "OK", "result": 5 }});
        }
      })
      calculator.remote(2, 3, callback);
      assert.equal(true, request.get.calledWithMatch("/some-url"))
      assert.equal(true, callback.calledOnce)
      assert.equal(5, callback.args)
    })
})

describe('When multiplying nine and three using the calculator', function () {
    var calculator,
        eventEmitterStub,
        callbackSpy,
        clock;

    before(function () {
        calculator = new Calculator();
        clock = sinon.useFakeTimers();
        eventEmitterStub = sinon.stub(calculator, 'emit');
        callbackSpy = sinon.spy();
    });

    it('should emit the event before the callback', function (done) {
        calculator.multiply(9, 3, callbackSpy);
        clock.tick(1000);
        assert.equal(callbackSpy.called, true);
        assert.equal(eventEmitterStub.calledWithExactly('result', 27), true);
        assert.equal(eventEmitterStub.calledBefore(callbackSpy), true);
        done();
    });

    after(function () {
        clock.restore();
    });
});
