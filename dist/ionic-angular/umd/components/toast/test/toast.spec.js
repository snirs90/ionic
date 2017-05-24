(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../util/mock-providers", "../toast-controller"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mock_providers_1 = require("../../../util/mock-providers");
    var toast_controller_1 = require("../toast-controller");
    describe('Toast', function () {
        describe('create', function () {
            it('should create toast with close button', function () {
                var toast = toastCtrl.create({
                    message: 'Please Wait...',
                    showCloseButton: true
                });
                expect(toast.data.position).toEqual('bottom');
                expect(toast.data.message).toEqual('Please Wait...');
                expect(toast.data.showCloseButton).toEqual(true);
            });
            it('should create toast with position top', function () {
                var toast = toastCtrl.create({
                    message: 'Please Wait...',
                    position: 'top'
                });
                expect(toast.data.position).toEqual('top');
            });
            it('should create toast with position middle', function () {
                var toast = toastCtrl.create({
                    message: 'Please Wait...',
                    position: 'middle'
                });
                expect(toast.data.position).toEqual('middle');
            });
            it('should create toast with position bottom', function () {
                var toast = toastCtrl.create({
                    message: 'Please Wait...',
                    position: 'bottom'
                });
                expect(toast.data.position).toEqual('bottom');
            });
            it('should set a duration', function () {
                var toast = toastCtrl.create({
                    message: 'Please Wait...',
                    duration: 3000
                });
                expect(toast.data.duration).toEqual(3000);
            });
        });
        var toastCtrl;
        beforeEach(function () {
            toastCtrl = new toast_controller_1.ToastController(mock_providers_1.mockApp(), mock_providers_1.mockConfig());
        });
    });
});
//# sourceMappingURL=toast.spec.js.map