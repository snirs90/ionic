(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../radio-group", "../radio-button", "../../../util/form", "../../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var radio_group_1 = require("../radio-group");
    var radio_button_1 = require("../radio-button");
    var form_1 = require("../../../util/form");
    var mock_providers_1 = require("../../../util/mock-providers");
    describe('RadioGroup', function () {
        describe('_update', function () {
            it('should set checked via string values', function () {
                var rb1 = createRadioButton();
                rb1.value = 'string1';
                var rb2 = createRadioButton();
                rb2.value = 'string2';
                var rb3 = createRadioButton();
                rb3.value = 'string3';
                rg.value = 'string1';
                rg._update();
                expect(rb1.checked).toEqual(true);
                expect(rb2.checked).toEqual(false);
                expect(rb3.checked).toEqual(false);
            });
            it('should set checked via string group value, and number button values', function () {
                var rb1 = createRadioButton();
                rb1.value = 1;
                var rb2 = createRadioButton();
                rb2.value = 2;
                var rb3 = createRadioButton();
                rb3.value = 3;
                rg.value = '1';
                rg._update();
                expect(rb1.checked).toEqual(true);
                expect(rb2.checked).toEqual(false);
                expect(rb3.checked).toEqual(false);
            });
            it('should set checked via number group value, and string button values', function () {
                var rb1 = createRadioButton();
                rb1.value = '1';
                var rb2 = createRadioButton();
                rb2.value = '2';
                var rb3 = createRadioButton();
                rb3.value = '3';
                rg.value = 1;
                rg._update();
                expect(rb1.checked).toEqual(true);
                expect(rb2.checked).toEqual(false);
                expect(rb3.checked).toEqual(false);
            });
            it('should set checked via empty string group value, and one empty string button value', function () {
                var rb1 = createRadioButton();
                rb1.value = '';
                var rb2 = createRadioButton();
                rb2.value = 'value2';
                var rb3 = createRadioButton();
                rb3.value = 'value3';
                rg.value = '';
                rg._update();
                expect(rb1.checked).toEqual(true);
                expect(rb2.checked).toEqual(false);
                expect(rb3.checked).toEqual(false);
            });
            it('should only check at most one value', function () {
                var rb1 = createRadioButton();
                rb1.value = 'string1';
                var rb2 = createRadioButton();
                rb2.value = 'string1';
                var rb3 = createRadioButton();
                rb3.value = 'string1';
                rg.value = 'string1';
                rg._update();
                expect(rb1.checked).toEqual(true);
                expect(rb2.checked).toEqual(false);
                expect(rb3.checked).toEqual(false);
            });
        });
        beforeEach(function () {
            rg = new radio_group_1.RadioGroup(mock_providers_1.mockRenderer(), mock_providers_1.mockElementRef(), mock_providers_1.mockChangeDetectorRef());
            form = new form_1.Form();
        });
    });
    describe('RadioButton', function () {
        describe('ngOnDestroy', function () {
            it('should work without a group', function () {
                var rb1 = createRadioButton(false);
                expect(function () { return rb1.ngOnDestroy(); }).not.toThrowError();
            });
            it('should remove button from group if part of a radio group', function () {
                var rb1 = createRadioButton();
                spyOn(rg, 'remove');
                rb1.ngOnDestroy();
                expect(rg.remove).toHaveBeenCalledWith(rb1);
            });
        });
        beforeEach(function () {
            rg = new radio_group_1.RadioGroup(mock_providers_1.mockRenderer(), mock_providers_1.mockElementRef(), mock_providers_1.mockChangeDetectorRef());
            form = new form_1.Form();
        });
    });
    var rg;
    var form;
    function createRadioButton(shouldIncludeGroup) {
        if (shouldIncludeGroup === void 0) { shouldIncludeGroup = true; }
        return new radio_button_1.RadioButton(form, mock_providers_1.mockConfig(), mock_providers_1.mockElementRef(), mock_providers_1.mockRenderer(), null, shouldIncludeGroup ? rg : null);
    }
});
//# sourceMappingURL=radio.spec.js.map