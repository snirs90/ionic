(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "../segment", "../../../util/mock-providers", "../../../util/input-tester"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var segment_1 = require("../segment");
    var mock_providers_1 = require("../../../util/mock-providers");
    var input_tester_1 = require("../../../util/input-tester");
    describe('Segment', function () {
        it('should pass common test', function () {
            var config = mock_providers_1.mockConfig();
            var elementRef = mock_providers_1.mockElementRef();
            var renderer = mock_providers_1.mockRenderer();
            var segment = new segment_1.Segment(config, elementRef, renderer, null);
            segment._buttons = new core_1.QueryList();
            input_tester_1.commonInputTest(segment, {
                defaultValue: null,
                corpus: [
                    ['option1', 'option1'],
                    ['option2', 'option2'],
                    ['option3', 'option3'],
                    ['option4', 'option4'],
                    ['', ''],
                ]
            });
        });
    });
});
//# sourceMappingURL=segment.spec.js.map