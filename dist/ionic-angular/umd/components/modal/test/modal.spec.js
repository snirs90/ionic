var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../util/mock-providers", "@angular/core", "../modal-controller"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mock_providers_1 = require("../../../util/mock-providers");
    var core_1 = require("@angular/core");
    var modal_controller_1 = require("../modal-controller");
    describe('Modal', function () {
        describe('create', function () {
            it('should have the correct properties on modal view controller proxy instance', function () {
                var modalCtrl = new modal_controller_1.ModalController(mock_providers_1.mockApp(), mock_providers_1.mockConfig(), mock_providers_1.mockDeepLinker());
                var modalViewControllerProxy = modalCtrl.create(ComponentToPresent);
                expect(modalViewControllerProxy._component).toEqual(ComponentToPresent);
            });
        });
    });
    var ComponentToPresent = (function () {
        function ComponentToPresent() {
        }
        return ComponentToPresent;
    }());
    ComponentToPresent = __decorate([
        core_1.Component({
            template: "<div class=\"myComponent\"></div>"
        })
    ], ComponentToPresent);
});
//# sourceMappingURL=modal.spec.js.map