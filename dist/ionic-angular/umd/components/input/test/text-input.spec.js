(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../input"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var input_1 = require("../input");
    describe('text input', function () {
        describe('getScrollData', function () {
            it('should scroll, top and bottom below safe area, no room to scroll', function () {
                var inputOffsetTop = 350;
                var inputOffsetHeight = 35;
                var scrollViewDimensions = {
                    contentTop: 100,
                    contentHeight: 700,
                    contentBottom: 0,
                    contentWidth: 400,
                    contentLeft: 0,
                    scrollTop: 30,
                    scrollHeight: 700,
                    scrollWidth: 400,
                    scrollLeft: 0,
                };
                var keyboardHeight = 400;
                var platformHeight = 800;
                var scrollData = input_1.getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, platformHeight);
                expect(scrollData.scrollAmount).toBe(-205);
                expect(scrollData.scrollTo).toBe(235);
                expect(scrollData.scrollPadding).toBe(400);
            });
            it('should scroll, top and bottom below safe area, room to scroll', function () {
                var inputOffsetTop = 350;
                var inputOffsetHeight = 35;
                var scrollViewDimensions = {
                    contentTop: 100,
                    contentHeight: 700,
                    contentBottom: 0,
                    contentWidth: 400,
                    contentLeft: 0,
                    scrollTop: 30,
                    scrollHeight: 1000,
                    scrollWidth: 400,
                    scrollLeft: 0,
                };
                var keyboardHeight = 400;
                var platformHeight = 800;
                var scrollData = input_1.getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, platformHeight);
                expect(scrollData.scrollAmount).toBe(-205);
                expect(scrollData.scrollTo).toBe(235);
                expect(scrollData.scrollPadding).toBe(400);
            });
            it('should scroll, top above safe', function () {
                // TextInput top within safe area, bottom below safe area, room to scroll
                var inputOffsetTop = 100;
                var inputOffsetHeight = 33;
                var scrollViewDimensions = {
                    contentTop: 100,
                    contentHeight: 700,
                    contentBottom: 0,
                    contentWidth: 400,
                    contentLeft: 0,
                    scrollTop: 250,
                    scrollHeight: 700,
                    scrollWidth: 400,
                    scrollLeft: 0,
                };
                var keyboardHeight = 400;
                var platformHeight = 800;
                var scrollData = input_1.getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, platformHeight);
                expect(scrollData.scrollAmount).toBe(33);
                expect(scrollData.scrollTo).toBe(217);
                expect(scrollData.scrollPadding).toBe(400);
            });
            it('should scroll, top in safe, bottom below safe, below more than top in, not enough padding', function () {
                // TextInput top within safe area, bottom below safe area, room to scroll
                var inputOffsetTop = 100;
                var inputOffsetHeight = 320;
                var scrollViewDimensions = {
                    contentTop: 100,
                    contentHeight: 700,
                    contentBottom: 0,
                    contentWidth: 400,
                    contentLeft: 0,
                    scrollTop: 20,
                    scrollHeight: 700,
                    scrollWidth: 400,
                    scrollLeft: 0,
                };
                var keyboardHeight = 400;
                var platformHeight = 800;
                var scrollData = input_1.getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, platformHeight);
                expect(scrollData.scrollAmount).toBe(-80);
                expect(scrollData.scrollTo).toBe(100);
                expect(scrollData.scrollPadding).toBe(400);
            });
            it('should scroll, top in safe, bottom below safe, below more than top in, enough padding', function () {
                // TextInput top within safe area, bottom below safe area, room to scroll
                var inputOffsetTop = 20;
                var inputOffsetHeight = 330;
                var scrollViewDimensions = {
                    contentTop: 100,
                    contentHeight: 700,
                    contentBottom: 0,
                    contentWidth: 400,
                    contentLeft: 0,
                    scrollTop: 0,
                    scrollHeight: 700,
                    scrollWidth: 400,
                    scrollLeft: 0,
                };
                var keyboardHeight = 400;
                var platformHeight = 800;
                var scrollData = input_1.getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, platformHeight);
                expect(scrollData.scrollAmount).toBe(-20);
                expect(scrollData.scrollTo).toBe(20);
                expect(scrollData.scrollPadding).toBe(400);
            });
            it('should scroll, top in safe, bottom below safe, below less than top in, enough padding', function () {
                // TextInput top within safe area, bottom below safe area, room to scroll
                var inputOffsetTop = 250;
                var inputOffsetHeight = 80; // goes 30px below safe area
                var scrollViewDimensions = {
                    contentTop: 100,
                    contentHeight: 700,
                    contentBottom: 0,
                    contentWidth: 400,
                    contentLeft: 0,
                    scrollTop: 0,
                    scrollHeight: 700,
                    scrollWidth: 400,
                    scrollLeft: 0,
                };
                var keyboardHeight = 400;
                var platformHeight = 800;
                var scrollData = input_1.getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, platformHeight);
                expect(scrollData.scrollAmount).toBe(-180);
                expect(scrollData.scrollTo).toBe(180);
                expect(scrollData.scrollPadding).toBe(400);
            });
            it('should not scroll, top in safe, bottom in safe', function () {
                // TextInput top within safe area, bottom within safe area
                var inputOffsetTop = 100;
                var inputOffsetHeight = 50;
                var scrollViewDimensions = {
                    contentTop: 100,
                    contentBottom: 0,
                    contentHeight: 700,
                    contentWidth: 400,
                    contentLeft: 0,
                    scrollTop: 0,
                    scrollHeight: 700,
                    scrollWidth: 400,
                    scrollLeft: 0,
                };
                var keyboardHeight = 400;
                var platformHeight = 800;
                var scrollData = input_1.getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, platformHeight);
                expect(scrollData.scrollAmount).toBe(0);
            });
        });
    });
});
//# sourceMappingURL=text-input.spec.js.map