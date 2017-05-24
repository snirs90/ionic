(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ion", "../../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ion_1 = require("../../ion");
    var mock_providers_1 = require("../../../util/mock-providers");
    describe('Ion', function () {
        describe('color', function () {
            it('should set color when it hasnt been set yet', function () {
                ion._setMode('md');
                ion._setColor('primary');
                expect(className(ion)).toEqual('icon icon-md icon-md-primary');
            });
            it('should remove color when it has already been set', function () {
                ion._setMode('md');
                ion._setColor('primary');
                ion._setColor(null);
                expect(className(ion)).toEqual('icon icon-md');
            });
            it('should update color when it has already been set', function () {
                ion._setMode('md');
                ion._setColor('primary');
                ion._setColor('secondary');
                expect(className(ion)).toEqual('icon icon-md icon-md-secondary');
            });
            it('should not setElementClass if its the same value', function () {
                ion._setMode('ios');
                ion._setColor('primary');
                spyOn(ion, 'setElementClass');
                expect(ion.setElementClass).not.toHaveBeenCalled();
                ion._setColor('primary');
                expect(className(ion)).toEqual('icon icon-ios icon-ios-primary');
            });
        });
        var ion;
        beforeEach(function () {
            ion = new ion_1.Ion(mock_providers_1.mockConfig(), mock_providers_1.mockElementRef(), mock_providers_1.mockRenderer(), 'icon');
        });
        function className(ion) {
            return ion._elementRef.nativeElement.className;
        }
    });
});
//# sourceMappingURL=ion.spec.js.map