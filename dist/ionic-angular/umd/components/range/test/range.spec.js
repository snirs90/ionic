(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../range", "../../../util/mock-providers", "../../../util/form", "../../../util/input-tester"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var range_1 = require("../range");
    var mock_providers_1 = require("../../../util/mock-providers");
    var form_1 = require("../../../util/form");
    var input_tester_1 = require("../../../util/input-tester");
    describe('Range', function () {
        it('should pass common test', function () {
            // TODO, validate range inside bounds
            var range = createRange();
            range._slider = mock_providers_1.mockElementRef();
            input_tester_1.commonInputTest(range, {
                defaultValue: 0,
                corpus: input_tester_1.NUMBER_CORPUS
            });
        });
        describe('valueToRatio', function () {
            it('step=1', function () {
                var range = createRange();
                range.max = 5000;
                range.min = 2490;
                range.step = 1;
                range.snaps = true;
                expect(range._valueToRatio(5000)).toEqual(1);
                expect(range._valueToRatio(5100)).toEqual(1);
                expect(range._valueToRatio(2490)).toEqual(0);
                expect(range._valueToRatio(2000)).toEqual(0);
                var middle = (range.max - range.min) / 2 + range.min;
                expect(range._valueToRatio(middle)).toEqual(0.5);
            });
            it('step>range', function () {
                var range = createRange();
                range.max = 5000;
                range.min = 2490;
                range.step = 5900;
                range.snaps = true;
                expect(range._valueToRatio(7000)).toEqual(1);
                expect(range._valueToRatio(5000)).toEqual(0);
                expect(range._valueToRatio(2490)).toEqual(0);
                expect(range._valueToRatio(2000)).toEqual(0);
            });
        });
        describe('ratioToValue', function () {
            it('step=1', function () {
                var range = createRange();
                range.max = 5000;
                range.min = 2490;
                range.step = 1;
                range.snaps = true;
                expect(range._ratioToValue(0)).toEqual(2490);
                expect(range._ratioToValue(1)).toEqual(5000);
                var middle = (range.max - range.min) / 2 + range.min;
                expect(range._ratioToValue(0.5)).toEqual(middle);
            });
            it('step>range', function () {
                var range = createRange();
                range.max = 5000;
                range.min = 2490;
                range.step = 1;
                expect(range._ratioToValue(0)).toEqual(2490);
                expect(range._ratioToValue(1)).toEqual(5000);
                var middle = (range.max - range.min) / 2 + range.min;
                expect(range._ratioToValue(0.5)).toEqual(middle);
            });
        });
    });
    function createRange() {
        var form = new form_1.Form();
        return new range_1.Range(form, mock_providers_1.mockHaptic(), mock_providers_1.mockItem(), mock_providers_1.mockConfig(), mock_providers_1.mockPlatform(), mock_providers_1.mockElementRef(), mock_providers_1.mockRenderer(), mock_providers_1.mockDomController(), mock_providers_1.mockChangeDetectorRef());
    }
});
//# sourceMappingURL=range.spec.js.map