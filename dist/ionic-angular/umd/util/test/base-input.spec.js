(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../base-input", "../form", "../../components/item/item", "../input-tester", "../mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var base_input_1 = require("../base-input");
    var form_1 = require("../form");
    var item_1 = require("../../components/item/item");
    var input_tester_1 = require("../input-tester");
    var mock_providers_1 = require("../mock-providers");
    var platform;
    var config;
    var elementRef;
    var renderer;
    describe('BaseInput', function () {
        it('should initialize', function () {
            var input = mockInput(null, null, null);
            expect(input._init).toBeFalsy();
            expect(input._isFocus).toBeFalsy();
            expect(input._config).toEqual(config);
            expect(input._elementRef).toEqual(elementRef);
            expect(input._renderer).toEqual(renderer);
            expect(input._componentName).toEqual('input');
            expect(input.id).toBeUndefined();
            expect(input._labelId).toBeUndefined();
        });
        it('should configure with item', function () {
            var form = new form_1.Form();
            var item = new item_1.Item(form, config, elementRef, renderer, null);
            var input = mockInput(form, item, null);
            expect(input.id).toEqual('input-0-0');
            expect(input._labelId).toEqual('lbl-0');
        });
        it('should pass base test', function () {
            var input = mockInput(mock_providers_1.mockForm(), null, null);
            input_tester_1.commonInputTest(input, {
                defaultValue: null,
                corpus: input_tester_1.ANY_CORPUS
            });
        });
    });
    function mockInput(form, item, ngControl) {
        platform = mock_providers_1.mockPlatform();
        config = mock_providers_1.mockConfig(null, '/', platform);
        elementRef = mock_providers_1.mockElementRef();
        renderer = mock_providers_1.mockRenderer();
        return new base_input_1.BaseInput(config, elementRef, renderer, 'input', null, form, item, ngControl);
    }
});
//# sourceMappingURL=base-input.spec.js.map