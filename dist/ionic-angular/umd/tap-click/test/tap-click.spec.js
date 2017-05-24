(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../tap-click"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tap_click_1 = require("../tap-click");
    describe('TapClick', function () {
        describe('isActivatable', function () {
            it('should be activatable on <a> element', function () {
                var ele = document.createElement('a');
                expect(tap_click_1.isActivatable(ele)).toBe(true);
            });
            it('should be activatable on <button> element', function () {
                var ele = document.createElement('button');
                expect(tap_click_1.isActivatable(ele)).toBe(true);
            });
            it('should be activatable on <ion-item-sliding> element', function () {
                var ele = document.createElement('ion-item-sliding');
                expect(tap_click_1.isActivatable(ele)).toBe(false);
            });
            it('should be not activatable on <ion-item> element', function () {
                var ele = document.createElement('ion-item');
                expect(tap_click_1.isActivatable(ele)).toBe(false);
            });
            it('should be not activatable on <div> element', function () {
                var ele = document.createElement('div');
                expect(tap_click_1.isActivatable(ele)).toBe(false);
            });
            it('should be activatable with "tappable" attribute', function () {
                var ele = document.createElement('div');
                ele.setAttribute('tappable', 'true');
                expect(tap_click_1.isActivatable(ele)).toBe(true);
            });
            it('should be not activatable on element without "hasAttribute" function', function () {
                var doc = document.createDocumentFragment();
                expect(tap_click_1.isActivatable(doc)).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=tap-click.spec.js.map