(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../toggle", "../../../util/mock-providers", "../../../util/input-tester"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toggle_1 = require("../toggle");
    var mock_providers_1 = require("../../../util/mock-providers");
    var input_tester_1 = require("../../../util/input-tester");
    describe('Toggle', function () {
        it('should pass common test', function () {
            var platform = mock_providers_1.mockPlatform();
            var config = mock_providers_1.mockConfig();
            var elementRef = mock_providers_1.mockElementRef();
            var renderer = mock_providers_1.mockRenderer();
            var item = mock_providers_1.mockItem();
            var form = mock_providers_1.mockForm();
            var haptic = mock_providers_1.mockHaptic();
            var gesture = mock_providers_1.mockGestureController();
            var zone = mock_providers_1.mockZone();
            var toggle = new toggle_1.Toggle(form, config, platform, elementRef, renderer, haptic, item, gesture, null, zone);
            input_tester_1.commonInputTest(toggle, {
                defaultValue: false,
                corpus: input_tester_1.BOOLEAN_CORPUS,
            });
        });
    });
});
//# sourceMappingURL=toggle.spec.js.map