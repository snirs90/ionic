(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../nav", "../../../gestures/gesture-controller", "../../../platform/keyboard", "../../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var nav_1 = require("../nav");
    var gesture_controller_1 = require("../../../gestures/gesture-controller");
    var keyboard_1 = require("../../../platform/keyboard");
    var mock_providers_1 = require("../../../util/mock-providers");
    describe('Nav', function () {
        describe('ngAfterViewInit', function () {
            it('should call initViews when segment has a component', function (done) {
                var nav = getNav();
                var knownComponent = {};
                var knownSegment = {
                    component: knownComponent
                };
                var knownViews = {};
                spyOn(nav._linker, 'initNav').and.returnValue(knownSegment);
                spyOn(nav._linker, 'initViews').and.returnValue(Promise.resolve(knownViews));
                spyOn(nav, 'setPages');
                var promise = nav.ngAfterViewInit();
                promise.then(function () {
                    expect(nav._linker.initViews).toHaveBeenCalledWith(knownSegment);
                    expect(nav.setPages).toHaveBeenCalledWith(knownViews, null, null);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should call initViews when segment has a loadChildren string', function (done) {
                var nav = getNav();
                var knownLoadChildren = 'someString';
                var knownSegment = {
                    loadChildren: knownLoadChildren
                };
                var knownViews = {};
                spyOn(nav._linker, 'initNav').and.returnValue(knownSegment);
                spyOn(nav._linker, 'initViews').and.returnValue(Promise.resolve(knownViews));
                spyOn(nav, 'setPages');
                var promise = nav.ngAfterViewInit();
                promise.then(function () {
                    expect(nav._linker.initViews).toHaveBeenCalledWith(knownSegment);
                    expect(nav.setPages).toHaveBeenCalledWith(knownViews, null, null);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should call push when root is set', function (done) {
                var nav = getNav();
                var knownComponent = {};
                nav.root = knownComponent;
                spyOn(nav, 'push').and.returnValue(Promise.resolve());
                var promise = nav.ngAfterViewInit();
                promise.then(function () {
                    expect(nav.push).toHaveBeenCalled();
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
        });
    });
    function getNav() {
        var platform = mock_providers_1.mockPlatform();
        var config = mock_providers_1.mockConfig(null, '/', platform);
        var app = mock_providers_1.mockApp(config, platform);
        var zone = mock_providers_1.mockZone();
        var dom = mock_providers_1.mockDomController(platform);
        var keyboard = new keyboard_1.Keyboard(config, platform, zone, dom);
        var elementRef = mock_providers_1.mockElementRef();
        var renderer = mock_providers_1.mockRenderer();
        var componentFactoryResolver = null;
        var gestureCtrl = new gesture_controller_1.GestureController(app);
        var linker = mock_providers_1.mockDeepLinker(null, app);
        var trnsCtrl = mock_providers_1.mockTrasitionController(config);
        var nav = new nav_1.Nav(null, null, app, config, platform, keyboard, elementRef, zone, renderer, componentFactoryResolver, gestureCtrl, trnsCtrl, linker, dom, null);
        return nav;
    }
});
//# sourceMappingURL=nav.spec.js.map