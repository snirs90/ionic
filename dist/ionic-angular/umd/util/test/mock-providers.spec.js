(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../mock-providers", "../mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mock_providers_1 = require("../mock-providers");
    var mock_providers_2 = require("../mock-providers");
    describe('mock-providers', function () {
        describe('MockDomController', function () {
            it('should schedule a raf after a timeout', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                var callback3 = function () { callOrder.push(3); };
                var callback4 = function () { callOrder.push(4); };
                dom.read(callback1, 10);
                dom.read(callback2, 20);
                dom.read(callback3, 30);
                dom.read(callback4, 40);
                dom.flushUntil(30, function () {
                    expect(callOrder).toEqual([1, 2]);
                    callOrder.length = 0;
                    dom.flushUntil(50, function () {
                        expect(callOrder).toEqual([3, 4]);
                        done();
                    });
                });
            });
            it('should schedule a raf with a timeout', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                dom.read(callback1, 10);
                dom.write(callback2, 20);
                dom.flush(function () {
                    expect(callOrder).toEqual([1, 2]);
                    done();
                });
            });
            it('should cancel read/write that have timeouts', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                var readId = dom.read(callback1, 100);
                var writeId = dom.write(callback2, 100);
                dom.cancel(readId);
                dom.cancel(writeId);
                dom.flush(function () {
                    expect(callOrder).toEqual([]);
                    done();
                });
            });
            it('should cancel read/write', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                var readId = dom.read(callback1);
                var writeId = dom.write(callback2);
                dom.cancel(readId);
                dom.cancel(writeId);
                dom.flush(function () {
                    expect(callOrder).toEqual([]);
                    done();
                });
            });
            it('should schedule a read/write', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                var callback3 = function () { callOrder.push(3); };
                var callback4 = function () { callOrder.push(4); };
                dom.read(callback1);
                dom.write(callback4);
                dom.write(callback2);
                dom.read(callback3);
                dom.flush(function () {
                    expect(callOrder).toEqual([1, 3, 4, 2]);
                    done();
                });
            });
            var dom;
            beforeEach(function () {
                dom = mock_providers_2.mockDomController();
            });
        });
        describe('MockPlatform', function () {
            it('should cancel raf by id', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                var callback3 = function () { callOrder.push(3); };
                plt.raf(callback1);
                var tmr2 = plt.raf(callback2);
                plt.raf(callback3);
                plt.cancelRaf(tmr2);
                plt.flushRafs(function () {
                    expect(callOrder).toEqual([1, 3]);
                    done();
                });
            });
            it('should set rafs', function (done) {
                var callOrder = [];
                var timestamps = [];
                var callback1 = function (timeStamp) { callOrder.push(1); timestamps.push(timeStamp); };
                var callback2 = function (timeStamp) { callOrder.push(2); timestamps.push(timeStamp); };
                plt.raf(callback1);
                plt.raf(callback2);
                plt.flushRafs(function () {
                    expect(callOrder).toEqual([1, 2]);
                    expect(timestamps).toEqual([1, 1]);
                    done();
                });
            });
            it('should flush up until timeout', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                var callback3 = function () { callOrder.push(3); };
                var callback4 = function () { callOrder.push(4); };
                plt.timeout(callback1, 10);
                plt.timeout(callback2, 20);
                plt.timeout(callback3, 30);
                plt.timeout(callback4, 40);
                plt.flushTimeoutsUntil(30, function () {
                    expect(callOrder).toEqual([1, 2]);
                    callOrder.length = 0;
                    plt.flushTimeoutsUntil(50, function () {
                        expect(callOrder).toEqual([3, 4]);
                        done();
                    });
                });
            });
            it('should cancel timeout by id', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                var callback3 = function () { callOrder.push(3); };
                plt.timeout(callback1, 10);
                var tmr2 = plt.timeout(callback2, 20);
                plt.timeout(callback3, 30);
                plt.cancelTimeout(tmr2);
                plt.flushTimeouts(function () {
                    expect(callOrder).toEqual([1, 3]);
                    done();
                });
            });
            it('should set timeouts but put them in the right order depending on timeout', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                var callback3 = function () { callOrder.push(3); };
                var callback4 = function () { callOrder.push(4); };
                plt.timeout(callback1, 30);
                plt.timeout(callback2, 10);
                plt.timeout(callback3, 20);
                plt.timeout(callback4, 10);
                plt.flushTimeouts(function () {
                    expect(callOrder).toEqual([2, 4, 3, 1]);
                    done();
                });
            });
            it('should set timeouts', function (done) {
                var callOrder = [];
                var callback1 = function () { callOrder.push(1); };
                var callback2 = function () { callOrder.push(2); };
                plt.timeout(callback1, 10);
                plt.timeout(callback2, 10);
                plt.flushTimeouts(function () {
                    expect(callOrder).toEqual([1, 2]);
                    done();
                });
            });
            var plt;
            beforeEach(function () {
                plt = mock_providers_1.mockPlatform();
            });
        });
    });
});
//# sourceMappingURL=mock-providers.spec.js.map