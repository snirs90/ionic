(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../dom"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dom = require("../dom");
    describe('dom', function () {
        describe('isTextInput', function () {
            it('should return false if input[type=button]', function () {
                var ele = document.createElement('input');
                ele.type = 'button';
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return false if input[type=checkbox]', function () {
                var ele = document.createElement('input');
                ele.type = 'checkbox';
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return false if input[type=color]', function () {
                var ele = document.createElement('input');
                ele.type = 'color';
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return false if input[type=file]', function () {
                var ele = document.createElement('input');
                ele.type = 'file';
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return false if input[type=image]', function () {
                var ele = document.createElement('input');
                ele.type = 'image';
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return false if input[type=radio]', function () {
                var ele = document.createElement('input');
                ele.type = 'radio';
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return false if input[type=range]', function () {
                var ele = document.createElement('input');
                ele.type = 'range';
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return false if input[type=reset]', function () {
                var ele = document.createElement('input');
                ele.type = 'reset';
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return false if input[type=submit]', function () {
                var ele = document.createElement('input');
                ele.type = 'submit';
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return true if input date', function () {
                var ele = document.createElement('input');
                ele.type = 'date';
                expect(dom.isTextInput(ele)).toBe(true);
                ele.type = 'datetime';
                expect(dom.isTextInput(ele)).toBe(true);
                ele.type = 'datetime-local';
                expect(dom.isTextInput(ele)).toBe(true);
                ele.type = 'month';
                expect(dom.isTextInput(ele)).toBe(true);
                ele.type = 'time';
                expect(dom.isTextInput(ele)).toBe(true);
                ele.type = 'week';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if input[type=email]', function () {
                var ele = document.createElement('input');
                ele.type = 'email';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if input[type=number]', function () {
                var ele = document.createElement('input');
                ele.type = 'number';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if input[type=number]', function () {
                var ele = document.createElement('input');
                ele.type = 'number';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if input[type=password]', function () {
                var ele = document.createElement('input');
                ele.type = 'password';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if input[type=search]', function () {
                var ele = document.createElement('input');
                ele.type = 'search';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if input[type=tel]', function () {
                var ele = document.createElement('input');
                ele.type = 'tel';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if input[type=url]', function () {
                var ele = document.createElement('input');
                ele.type = 'url';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if input[type=text]', function () {
                var ele = document.createElement('input');
                ele.type = 'text';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if input and unknown type', function () {
                var ele = document.createElement('input');
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if contentEditable', function () {
                var ele = document.createElement('div');
                ele.contentEditable = 'true';
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return true if textarea', function () {
                var ele = document.createElement('textarea');
                expect(dom.isTextInput(ele)).toBe(true);
            });
            it('should return false if a div', function () {
                var ele = document.createElement('div');
                expect(dom.isTextInput(ele)).toBe(false);
            });
            it('should return false if blank', function () {
                expect(dom.isTextInput(null)).toBe(false);
                expect(dom.isTextInput(undefined)).toBe(false);
                expect(dom.isTextInput(false)).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=dom.spec.js.map