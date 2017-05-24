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
    describe('NavController', function () {
        describe('push and pop', function () {
            it('should push multiple times and pop multiple times', function (done) {
                var push1Done = jasmine.createSpy('PushDone');
                var push2Done = jasmine.createSpy('PushDone');
                var push3Done = jasmine.createSpy('PushDone');
                var push4Done = jasmine.createSpy('PushDone');
                var pop1Done = jasmine.createSpy('PopDone');
                var pop2Done = jasmine.createSpy('PopDone');
                var pop3Done = jasmine.createSpy('PopDone');
                var hasCompleted = true;
                var requiresTransition = true;
                // Push 1
                nav.push(mock_providers_1.MockView1, null, { animate: false }, push1Done).then(function () {
                    expect(push1Done).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView1', undefined, nav_util_1.DIRECTION_FORWARD);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    // Push 2
                    return nav.push(mock_providers_1.MockView2, null, { animate: false }, push2Done);
                }).then(function () {
                    expect(push2Done).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView2', 'MockView1', nav_util_1.DIRECTION_FORWARD);
                    expect(nav.length()).toEqual(2);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    // Push 3
                    return nav.push(mock_providers_1.MockView3, null, { animate: false }, push3Done);
                }).then(function () {
                    expect(push3Done).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView3', 'MockView2', nav_util_1.DIRECTION_FORWARD);
                    expect(nav.length()).toEqual(3);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    expect(nav.getByIndex(2).component).toEqual(mock_providers_1.MockView3);
                    // Push 4
                    return nav.push(mock_providers_1.MockView4, null, { animate: false }, push4Done);
                }).then(function () {
                    expect(push4Done).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView4', 'MockView3', nav_util_1.DIRECTION_FORWARD);
                    expect(nav.length()).toEqual(4);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    expect(nav.getByIndex(2).component).toEqual(mock_providers_1.MockView3);
                    expect(nav.getByIndex(3).component).toEqual(mock_providers_1.MockView4);
                    // Pop 1
                    return nav.pop({ animate: false }, pop1Done);
                }).then(function () {
                    expect(pop1Done).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView3', 'MockView4', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(3);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    expect(nav.getByIndex(2).component).toEqual(mock_providers_1.MockView3);
                    // Pop 2
                    return nav.pop({ animate: false }, pop2Done);
                }).then(function () {
                    expect(pop2Done).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView2', 'MockView3', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(2);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    // Pop 3
                    return nav.pop({ animate: false }, pop3Done);
                }).then(function () {
                    expect(pop3Done).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView1', 'MockView2', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
        });
        describe('push', function () {
            it('should push a component as the first view', function (done) {
                nav.push(mock_providers_1.MockView1, null, null, trnsDone).then(function () {
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView1', undefined, nav_util_1.DIRECTION_FORWARD);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.isTransitioning()).toEqual(false);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should push a component as the second view at the end', function (done) {
                mock_providers_1.mockViews(nav, [mock_providers_1.mockView(mock_providers_1.MockView1)]);
                nav.push(mock_providers_1.MockView2, null, null, trnsDone).then(function () {
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView2', 'MockView1', nav_util_1.DIRECTION_FORWARD);
                    expect(nav.length()).toEqual(2);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    expect(nav.isTransitioning()).toEqual(false);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should push a ViewController as the second view and fire lifecycles', function (done) {
                var view1 = mock_providers_1.mockView();
                var view2 = mock_providers_1.mockView();
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                mock_providers_1.mockViews(nav, [view1]);
                nav.push(view2, null, null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).not.toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView', 'MockView', nav_util_1.DIRECTION_FORWARD);
                    expect(nav.length()).toEqual(2);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
        });
        describe('insert', function () {
            it('should not modify the view id', function (done) {
                var view = mock_providers_1.mockView(mock_providers_1.MockView4);
                view.id = 'custom_id';
                nav.insert(0, view).then(function () {
                    expect(view.id).toEqual('custom_id');
                    done();
                }).catch(function (err) {
                    fail(err);
                    done();
                });
                expect(view.id).toEqual('custom_id');
            }, 10000);
            it('should insert at the begining with no async transition', function (done) {
                var view4 = mock_providers_1.mockView(mock_providers_1.MockView4);
                var instance4 = spyOnLifecycles(view4);
                var opts = {};
                mock_providers_1.mockViews(nav, [mock_providers_1.mockView(mock_providers_1.MockView1), mock_providers_1.mockView(mock_providers_1.MockView2), mock_providers_1.mockView(mock_providers_1.MockView3)]);
                nav.insert(0, view4, null, opts, trnsDone).then(function () {
                    expect(instance4.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillUnload).not.toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = false;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, undefined, undefined, undefined);
                    expect(nav.length()).toEqual(4);
                    expect(nav.first().component).toEqual(mock_providers_1.MockView4);
                    expect(nav.last().component).toEqual(mock_providers_1.MockView3);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should insert at the end when given -1', function (done) {
                var opts = {};
                mock_providers_1.mockViews(nav, [mock_providers_1.mockView(mock_providers_1.MockView1)]);
                nav.insert(-1, mock_providers_1.MockView2, null, opts, trnsDone).then(function () {
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView2', 'MockView1', nav_util_1.DIRECTION_FORWARD);
                    expect(nav.length()).toEqual(2);
                    expect(nav.last().component).toEqual(mock_providers_1.MockView2);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should insert at the end when given a number greater than actual length', function (done) {
                mock_providers_1.mockViews(nav, [mock_providers_1.mockView(mock_providers_1.MockView1)]);
                nav.insert(9999, mock_providers_1.MockView2, null, null, trnsDone).then(function () {
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView2', 'MockView1', nav_util_1.DIRECTION_FORWARD);
                    expect(nav.length()).toEqual(2);
                    expect(nav.last().component).toEqual(mock_providers_1.MockView2);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should not insert if null view', function (done) {
                mock_providers_1.mockViews(nav, [mock_providers_1.mockView(mock_providers_1.MockView1)]);
                nav.insert(-1, null, null, null, trnsDone).then(function () {
                    fail('it should not succeed');
                    done();
                }).catch(function (err) {
                    var hasCompleted = false;
                    var requiresTransition = false;
                    var rejectReason = 'invalid views to insert';
                    expect(err).toEqual(rejectReason);
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, rejectReason);
                    expect(nav.length()).toEqual(1);
                    expect(nav.last().component).toEqual(mock_providers_1.MockView1);
                    done();
                });
            }, 10000);
            it('should not insert any view in the stack if canLeave returns false', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                mock_providers_1.mockViews(nav, [view1, view2]);
                var instance2 = spyOnLifecycles(view2);
                var count = 0;
                instance2.ionViewCanLeave = function () {
                    count++;
                    return (count === 3);
                };
                nav.push(view3).then(function () {
                    expect(nav.length()).toEqual(2);
                    return nav.push(view3);
                }).then(function () {
                    expect(nav.length()).toEqual(2);
                    return nav.push(view3);
                }).then(function () {
                    expect(nav.length()).toEqual(3);
                    done();
                }).catch(function (err) { return fail(err); });
            }, 10000);
            it('should not remove any view from the stack if canLeave returns false', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                mock_providers_1.mockViews(nav, [view1, view2]);
                var instance2 = spyOnLifecycles(view2);
                var count = 0;
                instance2.ionViewCanLeave = function () {
                    count++;
                    return (count === 3);
                };
                nav.pop().then(function () {
                    expect(nav.length()).toEqual(2);
                    return nav.pop();
                }).then(function () {
                    expect(nav.length()).toEqual(2);
                    return nav.pop();
                }).then(function () {
                    expect(nav.length()).toEqual(1);
                    done();
                }).catch(function (err) { return fail(err); });
            }, 10000);
        });
        describe('insertPages', function () {
            it('should insert all pages in the middle', function (done) {
                var view4 = mock_providers_1.mockView(mock_providers_1.MockView4);
                var instance4 = spyOnLifecycles(view4);
                mock_providers_1.mockViews(nav, [mock_providers_1.mockView(mock_providers_1.MockView1), mock_providers_1.mockView(mock_providers_1.MockView2), mock_providers_1.mockView(mock_providers_1.MockView3)]);
                nav.insertPages(1, [view4, mock_providers_1.mockView(mock_providers_1.MockView5)], null, trnsDone).then(function () {
                    expect(instance4.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillUnload).not.toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = false;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, undefined, undefined, undefined);
                    expect(nav.length()).toEqual(5);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView4);
                    expect(nav.getByIndex(2).component).toEqual(mock_providers_1.MockView5);
                    expect(nav.getByIndex(3).component).toEqual(mock_providers_1.MockView2);
                    expect(nav.getByIndex(4).component).toEqual(mock_providers_1.MockView3);
                    expect(nav.getByIndex(1)._nav).toEqual(nav);
                    expect(nav.getByIndex(2)._nav).toEqual(nav);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
        });
        describe('pop', function () {
            it('should not pop when no views in the stack', function (done) {
                nav.pop(null, trnsDone).then(function () {
                    fail('it should not succeed');
                    done();
                }).catch(function (err) {
                    var hasCompleted = false;
                    var requiresTransition = false;
                    var rejectReason = 'no views in the stack to be removed';
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, rejectReason);
                    expect(err).toEqual(rejectReason);
                    expect(nav.length()).toEqual(0);
                    expect(nav.isTransitioning()).toEqual(false);
                    done();
                });
            }, 10000);
            it('should remove the last view and fire lifecycles', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                mock_providers_1.mockViews(nav, [view1, view2]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                nav.pop(null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView1', 'MockView2', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.isTransitioning()).toEqual(false);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
        });
        describe('popTo', function () {
            it('should pop to a view', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                mock_providers_1.mockViews(nav, [view1, view2, view3]);
                nav.popTo(view2, null, trnsDone).then(function () {
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView2', 'MockView3', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(2);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should pop to using an index number', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                var view4 = mock_providers_1.mockView(mock_providers_1.MockView4);
                mock_providers_1.mockViews(nav, [view1, view2, view3, view4]);
                nav.popTo(1, null, trnsDone).then(function () {
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView2', 'MockView4', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(2);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should pop to first using an index number', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                var view4 = mock_providers_1.mockView(mock_providers_1.MockView4);
                mock_providers_1.mockViews(nav, [view1, view2, view3, view4]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                var instance3 = spyOnLifecycles(view3);
                var instance4 = spyOnLifecycles(view4);
                nav.popTo(0, null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance3.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance3.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance3.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance4.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanLeave).toHaveBeenCalled();
                    expect(instance4.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance4.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance4.ionViewWillUnload).toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView1', 'MockView4', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
        });
        describe('popToRoot', function () {
            it('should pop to the first view', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                var view4 = mock_providers_1.mockView(mock_providers_1.MockView4);
                mock_providers_1.mockViews(nav, [view1, view2, view3, view4]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                var instance3 = spyOnLifecycles(view3);
                var instance4 = spyOnLifecycles(view4);
                nav.popToRoot(null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance3.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance3.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance3.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance4.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanLeave).toHaveBeenCalled();
                    expect(instance4.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance4.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance4.ionViewWillUnload).toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView1', 'MockView4', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should not pop first view if it\'s the only view', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                mock_providers_1.mockViews(nav, [view1]);
                nav.popToRoot(null, trnsDone).then(function () {
                    var hasCompleted = true;
                    var requiresTransition = false;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, undefined, undefined, undefined);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
        });
        describe('remove', function () {
            it('should remove the first three views in the beginning, no last view transition', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                var view4 = mock_providers_1.mockView(mock_providers_1.MockView4);
                mock_providers_1.mockViews(nav, [view1, view2, view3, view4]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                var instance3 = spyOnLifecycles(view3);
                var instance4 = spyOnLifecycles(view4);
                nav.remove(0, 3, null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance3.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance3.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance3.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance4.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillUnload).not.toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = false;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, undefined, undefined, undefined);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView4);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should remove two views in the middle', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                var view4 = mock_providers_1.mockView(mock_providers_1.MockView4);
                var view5 = mock_providers_1.mockView(mock_providers_1.MockView5);
                mock_providers_1.mockViews(nav, [view1, view2, view3, view4, view5]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                var instance3 = spyOnLifecycles(view3);
                var instance4 = spyOnLifecycles(view4);
                var instance5 = spyOnLifecycles(view5);
                nav.remove(2, 2, null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance3.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance3.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance4.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance4.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance4.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance5.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance5.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance5.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance5.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance5.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance5.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance5.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance5.ionViewWillUnload).not.toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = false;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, undefined, undefined, undefined);
                    expect(nav.length()).toEqual(3);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    expect(nav.getByIndex(2).component).toEqual(mock_providers_1.MockView5);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should remove the last two views at the end', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                var view4 = mock_providers_1.mockView(mock_providers_1.MockView4);
                mock_providers_1.mockViews(nav, [view1, view2, view3, view4]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                var instance3 = spyOnLifecycles(view3);
                var instance4 = spyOnLifecycles(view4);
                nav.remove(2, 2, null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance3.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance3.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance4.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance4.ionViewCanLeave).toHaveBeenCalled();
                    expect(instance4.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance4.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance4.ionViewWillUnload).toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView2', 'MockView4', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(2);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView2);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
        });
        describe('setRoot', function () {
            it('should set a ViewController as the root when its the last view, no transition', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                mock_providers_1.mockViews(nav, [view1, view2, view3]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                var instance3 = spyOnLifecycles(view3);
                nav.setRoot(view3, null, null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance3.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillUnload).not.toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = false;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, undefined, undefined, undefined);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView3);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should set a ViewController as the root when its the middle view, with transition', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                mock_providers_1.mockViews(nav, [view1, view2, view3]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                var instance3 = spyOnLifecycles(view3);
                nav.setRoot(view2, null, null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanLeave).toHaveBeenCalled();
                    expect(instance3.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance3.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance3.ionViewWillUnload).toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView2', 'MockView3', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView2);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should set a ViewController as the root when its the first view, with transition', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                mock_providers_1.mockViews(nav, [view1, view2, view3]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                var instance3 = spyOnLifecycles(view3);
                nav.setRoot(view1, null, null, trnsDone).then(function () {
                    expect(instance1.ionViewDidLoad).toHaveBeenCalled();
                    expect(instance1.ionViewCanEnter).toHaveBeenCalled();
                    expect(instance1.ionViewWillEnter).toHaveBeenCalled();
                    expect(instance1.ionViewDidEnter).toHaveBeenCalled();
                    expect(instance1.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewDidLeave).not.toHaveBeenCalled();
                    expect(instance1.ionViewWillUnload).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance2.ionViewCanLeave).not.toHaveBeenCalled();
                    expect(instance2.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance2.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance3.ionViewDidLoad).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewWillEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewDidEnter).not.toHaveBeenCalled();
                    expect(instance3.ionViewCanLeave).toHaveBeenCalled();
                    expect(instance3.ionViewWillLeave).toHaveBeenCalled();
                    expect(instance3.ionViewDidLeave).toHaveBeenCalled();
                    expect(instance3.ionViewWillUnload).toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView1', 'MockView3', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView1);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
            it('should set a page component as the root, with transition', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                var view3 = mock_providers_1.mockView(mock_providers_1.MockView3);
                mock_providers_1.mockViews(nav, [view1, view2, view3]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                var instance3 = spyOnLifecycles(view3);
                nav.setRoot(mock_providers_1.MockView4, null, null, trnsDone).then(function () {
                    expect(instance1.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance3.ionViewWillUnload).toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView4', 'MockView3', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(1);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView4);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
        });
        describe('setPages', function () {
            it('should set the pages from an array, starting at the root, with transition', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                mock_providers_1.mockViews(nav, [view1, view2]);
                var instance1 = spyOnLifecycles(view1);
                var instance2 = spyOnLifecycles(view2);
                nav.setPages([{ page: mock_providers_1.MockView4 }, { page: mock_providers_1.MockView5 }], null, trnsDone).then(function () {
                    expect(instance1.ionViewWillUnload).toHaveBeenCalled();
                    expect(instance2.ionViewWillUnload).toHaveBeenCalled();
                    var hasCompleted = true;
                    var requiresTransition = true;
                    expect(trnsDone).toHaveBeenCalledWith(hasCompleted, requiresTransition, 'MockView5', 'MockView2', nav_util_1.DIRECTION_BACK);
                    expect(nav.length()).toEqual(2);
                    expect(nav.getByIndex(0).component).toEqual(mock_providers_1.MockView4);
                    expect(nav.getByIndex(1).component).toEqual(mock_providers_1.MockView5);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            }, 10000);
        });
        describe('_nextTrns', function () {
            it('should not start next transition when already transitioning', function () {
                nav.setTransitioning(true);
                expect(nav._nextTrns()).toEqual(false);
            });
            it('should not start next transition nothing in the queue', function () {
                expect(nav._nextTrns()).toEqual(false);
            });
        });
        describe('destroy', function () {
            it('should not crash when destroyed while transitioning', function (done) {
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                nav.push(view1).then(function () {
                    fail('it should not succeed');
                    done();
                }).catch(function (err) {
                    expect(err).toEqual('nav controller was destroyed');
                    done();
                });
                nav.destroy();
            }, 10000);
        });
        var nav;
        var trnsDone;
        function spyOnLifecycles(view) {
            var instance = view.instance = {
                ionViewDidLoad: function () { },
                ionViewCanEnter: function () { return true; },
                ionViewWillEnter: function () { },
                ionViewDidEnter: function () { },
                ionViewCanLeave: function () { },
                ionViewWillLeave: function () { return true; },
                ionViewDidLeave: function () { },
                ionViewWillUnload: function () { },
            };
            spyOn(instance, 'ionViewDidLoad');
            spyOn(instance, 'ionViewCanEnter');
            spyOn(instance, 'ionViewWillEnter');
            spyOn(instance, 'ionViewDidEnter');
            spyOn(instance, 'ionViewCanLeave');
            spyOn(instance, 'ionViewWillLeave');
            spyOn(instance, 'ionViewDidLeave');
            spyOn(instance, 'ionViewWillUnload');
            return instance;
        }
        beforeEach(function () {
            trnsDone = jasmine.createSpy('TransitionDone');
            nav = mock_providers_1.mockNavController();
        });
    });
});
//# sourceMappingURL=nav-controller.spec.js.map