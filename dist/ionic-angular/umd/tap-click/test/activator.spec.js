(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../activator", "../../config/config", "../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var activator_1 = require("../activator");
    var config_1 = require("../../config/config");
    var mock_providers_1 = require("../../util/mock-providers");
    describe('Activator', function () {
        it('should config css', function () {
            var activator = mockActivator(true, null);
            expect(activator._css).toEqual('activated');
            activator = mockActivator(true, 'enabled');
            expect(activator._css).toEqual('enabled');
        });
        it('should async down/up/click action (normal flow)', function (done) {
            var _a = testValues(), ev = _a.ev, ele = _a.ele, pos = _a.pos;
            var activator = mockActivator(true, null);
            activator.activatedDelay = 80;
            activator.clearDelay = 80;
            activator.downAction(ev, ele, pos);
            expect(ele.classList.contains('activated')).toBeFalsy();
            done();
            // upAction
            // dom.flushUntil(100, () => {
            //   expect(ele.classList.contains('activated')).toBeTruthy();
            //   activator.upAction(ev, ele, pos);
            //   expect(ele.classList.contains('activated')).toBeTruthy();
            //   // clickAction
            //   expect(ele.classList.contains('activated')).toBeTruthy();
            //   activator.clickAction(ev, ele, pos);
            //   expect(ele.classList.contains('activated')).toBeTruthy();
            //   // Read final results
            //   dom.flushUntil(2000, () => {
            //     expect(ele.classList.contains('activated')).toBeFalsy();
            //     done();
            //   });
            // });
        });
        it('should async down then down', function (done) {
            var _a = testValues(), ev = _a.ev, ele = _a.ele, pos = _a.pos;
            var activator = mockActivator(true, null);
            activator.activatedDelay = 80;
            activator.clearDelay = 80;
            activator.downAction(ev, ele, pos);
            dom.flushUntil(100, function () {
                expect(ele.classList.contains('activated')).toBeTruthy();
                activator.downAction(ev, ele, pos);
                expect(ele.classList.contains('activated')).toBeFalsy();
                dom.flushUntil(100, function () {
                    expect(ele.classList.contains('activated')).toBeTruthy();
                    done();
                });
            });
        });
        it('should async down then click', function (done) {
            var _a = testValues(), ev = _a.ev, ele = _a.ele, pos = _a.pos;
            var activator = mockActivator(true, null);
            activator.activatedDelay = 80;
            activator.clearDelay = 80;
            activator.downAction(ev, ele, pos);
            dom.flushUntil(16, function () {
                expect(ele.classList.contains('activated')).toBeFalsy();
                activator.clickAction(ev, ele, pos);
                expect(ele.classList.contains('activated')).toBeTruthy();
                dom.flushUntil(100, function () {
                    expect(ele.classList.contains('activated')).toBeFalsy();
                    // Check the value is stable
                    dom.flushUntil(2000, function () {
                        expect(ele.classList.contains('activated')).toBeFalsy();
                        done();
                    });
                });
            });
        });
        it('should async down then click then down (fast clicking)', function (done) {
            var _a = testValues(), ev = _a.ev, ele = _a.ele, pos = _a.pos;
            var activator = mockActivator(true, null);
            activator.activatedDelay = 80;
            activator.clearDelay = 80;
            activator.downAction(ev, ele, pos);
            dom.flushUntil(16, function () {
                expect(ele.classList.contains('activated')).toBeFalsy();
                activator.clickAction(ev, ele, pos);
                expect(ele.classList.contains('activated')).toBeTruthy();
                dom.flushUntil(32, function () {
                    expect(ele.classList.contains('activated')).toBeTruthy();
                    activator.downAction(ev, ele, pos);
                    expect(ele.classList.contains('activated')).toBeFalsy();
                    done();
                });
            });
        });
    });
    function testValues() {
        var parent = document.createElement('div');
        var ele = document.createElement('a');
        parent.appendChild(ele);
        return {
            ev: null,
            ele: ele,
            pos: { x: 0, y: 0 },
        };
    }
    var dom;
    function mockActivator(appEnabled, css) {
        dom = mock_providers_1.mockDomController();
        var app = {
            isEnabled: function () { return appEnabled; },
        };
        var config = new config_1.Config();
        if (css) {
            config.set('activatedClass', css);
        }
        return new activator_1.Activator(app, config, dom);
    }
});
//# sourceMappingURL=activator.spec.js.map