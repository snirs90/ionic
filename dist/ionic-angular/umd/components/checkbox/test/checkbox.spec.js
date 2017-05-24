(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../checkbox", "../../../util/mock-providers", "../../../util/input-tester"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var checkbox_1 = require("../checkbox");
    var mock_providers_1 = require("../../../util/mock-providers");
    var input_tester_1 = require("../../../util/input-tester");
    describe('Checkbox', function () {
        it('should pass common test', function () {
            var config = mock_providers_1.mockConfig();
            var elementRef = mock_providers_1.mockElementRef();
            var renderer = mock_providers_1.mockRenderer();
            var item = mock_providers_1.mockItem();
            var checkbox = new checkbox_1.Checkbox(config, null, item, elementRef, renderer);
            input_tester_1.commonInputTest(checkbox, {
                defaultValue: false,
                corpus: input_tester_1.BOOLEAN_CORPUS
            });
        });
    });
});
//# sourceMappingURL=checkbox.spec.js.map