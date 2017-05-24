(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../nav-util", "../../util/mock-providers", "../view-controller"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var nav_util_1 = require("../nav-util");
    var mock_providers_1 = require("../../util/mock-providers");
    var view_controller_1 = require("../view-controller");
    describe('NavUtil', function () {
        describe('convertToViews', function () {
            it('should convert all page components', function (done) {
                var linker = mock_providers_1.mockDeepLinker();
                var pages = [{ page: mock_providers_1.MockView }, { page: mock_providers_1.MockView }, { page: mock_providers_1.MockView }];
                nav_util_1.convertToViews(linker, pages).then(function (views) {
                    expect(views.length).toEqual(3);
                    expect(views[0].component).toEqual(mock_providers_1.MockView);
                    expect(views[1].component).toEqual(mock_providers_1.MockView);
                    expect(views[2].component).toEqual(mock_providers_1.MockView);
                    done();
                });
            });
            it('should convert all string names', function (done) {
                var linker = mock_providers_1.mockDeepLinker({
                    links: [{ component: mock_providers_1.MockView, name: 'someName' }]
                });
                var pages = ['someName', 'someName', 'someName'];
                nav_util_1.convertToViews(linker, pages).then(function (views) {
                    expect(views.length).toEqual(3);
                    expect(views[0].component).toEqual(mock_providers_1.MockView);
                    expect(views[1].component).toEqual(mock_providers_1.MockView);
                    expect(views[2].component).toEqual(mock_providers_1.MockView);
                    done();
                });
            });
            it('should convert all page string names', function (done) {
                var linker = mock_providers_1.mockDeepLinker({
                    links: [{ component: mock_providers_1.MockView, name: 'someName' }]
                });
                var pages = [{ page: 'someName' }, { page: 'someName' }, { page: 'someName' }];
                nav_util_1.convertToViews(linker, pages).then(function (views) {
                    expect(views.length).toEqual(3);
                    expect(views[0].component).toEqual(mock_providers_1.MockView);
                    expect(views[1].component).toEqual(mock_providers_1.MockView);
                    expect(views[2].component).toEqual(mock_providers_1.MockView);
                    done();
                });
            });
            it('should convert all ViewControllers', function (done) {
                var pages = [mock_providers_1.mockView(mock_providers_1.MockView), mock_providers_1.mockView(mock_providers_1.MockView), mock_providers_1.mockView(mock_providers_1.MockView)];
                var linker = mock_providers_1.mockDeepLinker();
                nav_util_1.convertToViews(linker, pages).then(function (views) {
                    expect(views.length).toEqual(3);
                    expect(views[0].component).toEqual(mock_providers_1.MockView);
                    expect(views[1].component).toEqual(mock_providers_1.MockView);
                    expect(views[2].component).toEqual(mock_providers_1.MockView);
                    done();
                });
            });
        });
        describe('convertToView', function () {
            it('should return new ViewController instance from page component link config name', function (done) {
                var linker = mock_providers_1.mockDeepLinker({
                    links: [{ component: mock_providers_1.MockView, name: 'someName' }]
                });
                nav_util_1.convertToView(linker, 'someName', null).then(function (view) {
                    expect(view.component).toEqual(mock_providers_1.MockView);
                    done();
                });
            });
            it('should return new ViewController instance from page component', function (done) {
                var linker = mock_providers_1.mockDeepLinker();
                nav_util_1.convertToView(linker, mock_providers_1.MockView, null).then(function (view) {
                    expect(view.component).toEqual(mock_providers_1.MockView);
                    done();
                });
            });
            it('should return existing ViewController instance', function (done) {
                var linker = mock_providers_1.mockDeepLinker();
                var inputView = new view_controller_1.ViewController(mock_providers_1.MockView);
                nav_util_1.convertToView(linker, inputView, null).then(function (outputView) {
                    expect(outputView).toEqual(inputView);
                    done();
                });
            });
            it('should return null for null', function (done) {
                var linker = mock_providers_1.mockDeepLinker();
                nav_util_1.convertToView(linker, null, null).then(function (view) {
                    expect(view).toEqual(null);
                    done();
                });
            });
            it('should return null for undefined', function (done) {
                var linker = mock_providers_1.mockDeepLinker();
                nav_util_1.convertToView(linker, undefined, undefined).then(function (view) {
                    expect(view).toEqual(null);
                    done();
                });
            });
            it('should return null for number', function (done) {
                var linker = mock_providers_1.mockDeepLinker();
                nav_util_1.convertToView(linker, 8675309, null).then(function (view) {
                    expect(view).toEqual(null);
                    done();
                });
            });
        });
        describe('setZIndex', function () {
            it('should set zIndex 100 when leaving view doesnt have a zIndex', function () {
                var leavingView = mock_providers_1.mockView();
                var enteringView = mock_providers_1.mockView();
                var nav = mock_providers_1.mockNavController();
                mock_providers_1.mockViews(nav, [leavingView, enteringView]);
                nav_util_1.setZIndex(nav, enteringView, leavingView, nav_util_1.DIRECTION_FORWARD, mock_providers_1.mockRenderer());
                expect(enteringView._zIndex).toEqual(100);
            });
            it('should set zIndex 100 on first entering view', function () {
                var enteringView = mock_providers_1.mockView();
                var nav = mock_providers_1.mockNavController();
                nav_util_1.setZIndex(nav, enteringView, null, nav_util_1.DIRECTION_FORWARD, mock_providers_1.mockRenderer());
                expect(enteringView._zIndex).toEqual(100);
            });
            it('should set zIndex 101 on second entering view', function () {
                var leavingView = mock_providers_1.mockView();
                leavingView._zIndex = 100;
                var enteringView = mock_providers_1.mockView();
                var nav = mock_providers_1.mockNavController();
                nav_util_1.setZIndex(nav, enteringView, leavingView, nav_util_1.DIRECTION_FORWARD, mock_providers_1.mockRenderer());
                expect(enteringView._zIndex).toEqual(101);
            });
            it('should set zIndex 100 on entering view going back', function () {
                var leavingView = mock_providers_1.mockView();
                leavingView._zIndex = 101;
                var enteringView = mock_providers_1.mockView();
                var nav = mock_providers_1.mockNavController();
                nav_util_1.setZIndex(nav, enteringView, leavingView, nav_util_1.DIRECTION_BACK, mock_providers_1.mockRenderer());
                expect(enteringView._zIndex).toEqual(100);
            });
            it('should set zIndex 9999 on first entering portal view', function () {
                var enteringView = mock_providers_1.mockView();
                var nav = mock_providers_1.mockNavController();
                nav._isPortal = true;
                nav_util_1.setZIndex(nav, enteringView, null, nav_util_1.DIRECTION_FORWARD, mock_providers_1.mockRenderer());
                expect(enteringView._zIndex).toEqual(9999);
            });
        });
    });
});
//# sourceMappingURL=nav-util.spec.js.map