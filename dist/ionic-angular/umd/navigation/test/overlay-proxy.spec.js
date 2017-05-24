(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../overlay-proxy", "../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var overlay_proxy_1 = require("../overlay-proxy");
    var mock_providers_1 = require("../../util/mock-providers");
    describe('Overlay Proxy', function () {
        describe('dismiss', function () {
            it('should call dismiss if overlay is loaded', function (done) {
                var instance = new overlay_proxy_1.OverlayProxy(mock_providers_1.mockApp(), 'my-component', mock_providers_1.mockConfig(), mock_providers_1.mockDeepLinker());
                instance.overlay = mock_providers_1.mockOverlay();
                spyOn(instance.overlay, instance.overlay.dismiss.name).and.returnValue(Promise.resolve());
                var promise = instance.dismiss();
                promise.then(function () {
                    expect(instance.overlay.dismiss).toHaveBeenCalled();
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
        });
        describe('onWillDismiss', function () {
            it('should update the handler on the overlay object', function () {
                var instance = new overlay_proxy_1.OverlayProxy(mock_providers_1.mockApp(), 'my-component', mock_providers_1.mockConfig(), mock_providers_1.mockDeepLinker());
                instance.overlay = mock_providers_1.mockOverlay();
                spyOn(instance.overlay, instance.overlay.onWillDismiss.name);
                var handler = function () { };
                instance.onWillDismiss(handler);
                expect(instance.overlay.onWillDismiss).toHaveBeenCalledWith(handler);
            });
        });
        describe('onDidDismiss', function () {
            it('should update the handler on the overlay object', function () {
                var instance = new overlay_proxy_1.OverlayProxy(mock_providers_1.mockApp(), 'my-component', mock_providers_1.mockConfig(), mock_providers_1.mockDeepLinker());
                instance.overlay = mock_providers_1.mockOverlay();
                spyOn(instance.overlay, instance.overlay.onDidDismiss.name);
                var handler = function () { };
                instance.onDidDismiss(handler);
                expect(instance.overlay.onDidDismiss).toHaveBeenCalledWith(handler);
            });
        });
        describe('createAndPresentOverlay', function () {
            it('should set onWillDismiss and onDidDismiss handlers', function (done) {
                var instance = new overlay_proxy_1.OverlayProxy(mock_providers_1.mockApp(), 'my-component', mock_providers_1.mockConfig(), mock_providers_1.mockDeepLinker());
                var handler = function () { };
                instance.onWillDismiss(handler);
                instance.onDidDismiss(handler);
                var knownOptions = {};
                var knownOverlay = mock_providers_1.mockOverlay();
                spyOn(knownOverlay, knownOverlay.present.name).and.returnValue(Promise.resolve());
                spyOn(knownOverlay, knownOverlay.onDidDismiss.name);
                spyOn(knownOverlay, knownOverlay.onWillDismiss.name);
                spyOn(instance, 'getImplementation').and.returnValue(knownOverlay);
                var promise = instance.createAndPresentOverlay(knownOptions);
                promise.then(function () {
                    expect(knownOverlay.present).toHaveBeenCalledWith(knownOptions);
                    expect(knownOverlay.onDidDismiss).toHaveBeenCalledWith(handler);
                    expect(knownOverlay.onWillDismiss).toHaveBeenCalledWith(handler);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
        });
        describe('present', function () {
            it('should use present the overlay immediately if the component is not a string', function (done) {
                var knownComponent = {};
                var deepLinker = mock_providers_1.mockDeepLinker();
                var knownOverlay = mock_providers_1.mockOverlay();
                var instance = new overlay_proxy_1.OverlayProxy(mock_providers_1.mockApp(), knownComponent, mock_providers_1.mockConfig(), deepLinker);
                var knownOptions = {};
                spyOn(instance, 'getImplementation').and.returnValue(knownOverlay);
                spyOn(deepLinker, 'getComponentFromName');
                var promise = instance.present(knownOptions);
                promise.then(function () {
                    expect(deepLinker.getComponentFromName).not.toHaveBeenCalled();
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should load the component if its a string before using it', function (done) {
                var knownComponent = {};
                var deepLinker = mock_providers_1.mockDeepLinker();
                var knownOverlay = mock_providers_1.mockOverlay();
                var componentName = 'my-component';
                var instance = new overlay_proxy_1.OverlayProxy(mock_providers_1.mockApp(), componentName, mock_providers_1.mockConfig(), deepLinker);
                var knownOptions = {};
                spyOn(instance, 'getImplementation').and.returnValue(knownOverlay);
                spyOn(deepLinker, 'getComponentFromName').and.returnValue(Promise.resolve(knownComponent));
                var promise = instance.present(knownOptions);
                promise.then(function () {
                    expect(deepLinker.getComponentFromName).toHaveBeenCalledWith(componentName);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
        });
    });
});
//# sourceMappingURL=overlay-proxy.spec.js.map