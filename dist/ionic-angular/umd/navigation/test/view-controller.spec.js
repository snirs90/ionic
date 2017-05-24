(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../util/mock-providers", "../nav-util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mock_providers_1 = require("../../util/mock-providers");
    var nav_util_1 = require("../nav-util");
    describe('ViewController', function () {
        describe('willEnter', function () {
            it('should emit LifeCycleEvent when called with component data', function (done) {
                // arrange
                var viewController = mock_providers_1.mockView();
                subscription = viewController.willEnter.subscribe(function (event) {
                    // assert
                    expect(event).toEqual(null);
                    done();
                }, function (err) {
                    done();
                });
                // act
                viewController._state = nav_util_1.STATE_ATTACHED;
                viewController._willEnter();
            }, 10000);
        });
        describe('didEnter', function () {
            it('should emit LifeCycleEvent when called with component data', function (done) {
                // arrange
                var viewController = mock_providers_1.mockView();
                subscription = viewController.didEnter.subscribe(function (event) {
                    // assert
                    expect(event).toEqual(null);
                    done();
                }, function (err) {
                    done();
                });
                // act
                viewController._state = nav_util_1.STATE_ATTACHED;
                viewController._didEnter();
            }, 10000);
        });
        describe('willLeave', function () {
            it('should emit LifeCycleEvent when called with component data', function (done) {
                // arrange
                var viewController = mock_providers_1.mockView();
                subscription = viewController.willLeave.subscribe(function (event) {
                    // assert
                    expect(event).toEqual(null);
                    done();
                }, function (err) {
                    done();
                });
                // act
                viewController._state = nav_util_1.STATE_ATTACHED;
                viewController._willLeave(false);
            }, 10000);
        });
        describe('didLeave', function () {
            it('should emit LifeCycleEvent when called with component data', function (done) {
                // arrange
                var viewController = mock_providers_1.mockView();
                subscription = viewController.didLeave.subscribe(function (event) {
                    // assert
                    expect(event).toEqual(null);
                    done();
                }, function (err) {
                    done();
                });
                // act
                viewController._didLeave();
            }, 10000);
        });
        describe('willUnload', function () {
            it('should emit LifeCycleEvent when called with component data', function (done) {
                // arrange
                var viewController = mock_providers_1.mockView();
                subscription = viewController.willUnload.subscribe(function (event) {
                    expect(event).toEqual(null);
                    done();
                }, function (err) {
                    done();
                });
                // act
                viewController._willUnload();
            }, 10000);
        });
        describe('willDismiss', function () {
            it('should have data in the willDismiss', function (done) {
                // arrange
                var viewController = mock_providers_1.mockView();
                var navControllerBase = mock_providers_1.mockNavController();
                navControllerBase._isPortal = true;
                mock_providers_1.mockViews(navControllerBase, [viewController]);
                viewController.onWillDismiss(function (data) {
                    expect(data).toEqual('willDismiss data');
                    done();
                });
                viewController.dismiss('willDismiss data');
            }, 10000);
        });
        describe('didDismiss', function () {
            it('should have data in the didDismiss', function (done) {
                // arrange
                var viewController = mock_providers_1.mockView();
                var navControllerBase = mock_providers_1.mockNavController();
                navControllerBase._isPortal = true;
                mock_providers_1.mockViews(navControllerBase, [viewController]);
                viewController.onDidDismiss(function (data) {
                    expect(data).toEqual('didDismiss data');
                    done();
                });
                viewController.dismiss('didDismiss data');
            }, 10000);
            it('should not crash when calling dismiss() twice', function (done) {
                // arrange
                var viewController = mock_providers_1.mockView();
                var navControllerBase = mock_providers_1.mockNavController();
                navControllerBase._isPortal = true;
                mock_providers_1.mockViews(navControllerBase, [viewController]);
                viewController.onDidDismiss(function (data) {
                    expect(data).toEqual('didDismiss data');
                    setTimeout(function () {
                        viewController.dismiss(); // it should not crash
                        done();
                    }, 100);
                });
                viewController.dismiss('didDismiss data');
            }, 10000);
        });
        afterEach(function () {
            if (subscription) {
                subscription.unsubscribe();
            }
        });
        var subscription = null;
    });
});
//# sourceMappingURL=view-controller.spec.js.map