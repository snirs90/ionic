(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../click-block", "../../../util/mock-providers", "../app-constants"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var click_block_1 = require("../click-block");
    var mock_providers_1 = require("../../../util/mock-providers");
    var app_constants_1 = require("../app-constants");
    describe('App', function () {
        describe('goBack', function () {
            it('should not select the previous tab', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                var tabs = mock_providers_1.mockTabs();
                var tab1 = mock_providers_1.mockTab(tabs);
                var tab2 = mock_providers_1.mockTab(tabs);
                tab1.root = 'Page1';
                tab2.root = 'Page2';
                nav.registerChildNav(tabs);
                tabs.select(tab1);
                tabs.select(tab2);
                expect(tabs._selectHistory).toEqual([tab1.id, tab2.id]);
                spyOn(plt, 'exitApp');
                spyOn(tabs, 'select');
                spyOn(tab1, 'pop');
                spyOn(tab2, 'pop');
                spyOn(portal, 'pop');
                app.goBack();
                expect(tabs.select).not.toHaveBeenCalled();
                expect(tab1.pop).not.toHaveBeenCalled();
                expect(tab2.pop).not.toHaveBeenCalled();
                expect(portal.pop).not.toHaveBeenCalled();
                expect(plt.exitApp).toHaveBeenCalled();
            });
            it('should pop from the active tab, when tabs is nested is the root nav', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                var tabs = mock_providers_1.mockTabs();
                mock_providers_1.mockTab(tabs);
                var tab2 = mock_providers_1.mockTab(tabs);
                mock_providers_1.mockTab(tabs);
                nav.registerChildNav(tabs);
                tab2.setSelected(true);
                spyOn(plt, 'exitApp');
                spyOn(tab2, 'pop');
                spyOn(portal, 'pop');
                var view1 = mock_providers_1.mockView();
                var view2 = mock_providers_1.mockView();
                tab2._views = [view1, view2];
                app.goBack();
                expect(tab2.pop).toHaveBeenCalled();
                expect(portal.pop).not.toHaveBeenCalled();
                expect(plt.exitApp).not.toHaveBeenCalled();
            });
            it('should pop from the active tab, when tabs is the root', function () {
                var tabs = mock_providers_1.mockTabs();
                mock_providers_1.mockTab(tabs);
                var tab2 = mock_providers_1.mockTab(tabs);
                mock_providers_1.mockTab(tabs);
                app._setRootNav(tabs);
                tab2.setSelected(true);
                spyOn(plt, 'exitApp');
                spyOn(tab2, 'pop');
                var view1 = mock_providers_1.mockView();
                var view2 = mock_providers_1.mockView();
                tab2._views = [view1, view2];
                app.goBack();
                expect(tab2.pop).toHaveBeenCalled();
                expect(plt.exitApp).not.toHaveBeenCalled();
            });
            it('should pop the root nav when nested nav has less than 2 views', function () {
                var rootNav = mock_providers_1.mockNavController();
                var nestedNav = mock_providers_1.mockNavController();
                rootNav.registerChildNav(nestedNav);
                nestedNav.parent = rootNav;
                app._setRootNav(rootNav);
                spyOn(plt, 'exitApp');
                spyOn(rootNav, 'pop');
                spyOn(nestedNav, 'pop');
                spyOn(portal, 'pop');
                var rootView1 = mock_providers_1.mockView();
                var rootView2 = mock_providers_1.mockView();
                mock_providers_1.mockViews(rootNav, [rootView1, rootView2]);
                var nestedView1 = mock_providers_1.mockView();
                mock_providers_1.mockViews(nestedNav, [nestedView1]);
                app.goBack();
                expect(portal.pop).not.toHaveBeenCalled();
                expect(rootNav.pop).toHaveBeenCalled();
                expect(nestedNav.pop).not.toHaveBeenCalled();
                expect(plt.exitApp).not.toHaveBeenCalled();
            });
            it('should pop a view from the nested nav that has more than 1 view', function () {
                var rootNav = mock_providers_1.mockNavController();
                var nestedNav = mock_providers_1.mockNavController();
                app._setRootNav(rootNav);
                rootNav.registerChildNav(nestedNav);
                spyOn(plt, 'exitApp');
                spyOn(rootNav, 'pop');
                spyOn(nestedNav, 'pop');
                spyOn(portal, 'pop');
                var rootView1 = mock_providers_1.mockView();
                var rootView2 = mock_providers_1.mockView();
                mock_providers_1.mockViews(rootNav, [rootView1, rootView2]);
                var nestedView1 = mock_providers_1.mockView();
                var nestedView2 = mock_providers_1.mockView();
                mock_providers_1.mockViews(nestedNav, [nestedView1, nestedView2]);
                app.goBack();
                expect(portal.pop).not.toHaveBeenCalled();
                expect(rootNav.pop).not.toHaveBeenCalled();
                expect(nestedNav.pop).toHaveBeenCalled();
                expect(plt.exitApp).not.toHaveBeenCalled();
            });
            it('should pop the overlay in the portal of the root nav', function (done) {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                spyOn(plt, 'exitApp');
                spyOn(nav, 'pop');
                spyOn(portal, 'pop').and.returnValue(Promise.resolve());
                var view1 = mock_providers_1.mockView();
                var view2 = mock_providers_1.mockView();
                mock_providers_1.mockViews(nav, [view1, view2]);
                var overlay1 = mock_providers_1.mockView();
                mock_providers_1.mockViews(portal, [overlay1]);
                app.goBack().then(function () {
                    expect(portal.pop).toHaveBeenCalled();
                    expect(nav.pop).not.toHaveBeenCalled();
                    expect(plt.exitApp).not.toHaveBeenCalled();
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should pop the second view in the root nav', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                spyOn(plt, 'exitApp');
                spyOn(nav, 'pop');
                spyOn(portal, 'pop');
                var view1 = mock_providers_1.mockView();
                var view2 = mock_providers_1.mockView();
                mock_providers_1.mockViews(nav, [view1, view2]);
                app.goBack();
                expect(portal.pop).not.toHaveBeenCalled();
                expect(nav.pop).toHaveBeenCalled();
                expect(plt.exitApp).not.toHaveBeenCalled();
            });
            it('should exit app when only one view in the root nav', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                spyOn(plt, 'exitApp');
                spyOn(nav, 'pop');
                spyOn(portal, 'pop');
                var view1 = mock_providers_1.mockView();
                mock_providers_1.mockViews(nav, [view1]);
                expect(app.getActiveNav()).toBe(nav);
                expect(nav.first()).toBe(view1);
                app.goBack();
                expect(portal.pop).not.toHaveBeenCalled();
                expect(nav.pop).not.toHaveBeenCalled();
                expect(plt.exitApp).toHaveBeenCalled();
            });
            it('should not exit app when only one view in the root nav, but navExitApp config set', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                spyOn(plt, 'exitApp');
                spyOn(nav, 'pop');
                spyOn(portal, 'pop');
                config.set('navExitApp', false);
                var view1 = mock_providers_1.mockView();
                mock_providers_1.mockViews(nav, [view1]);
                expect(app.getActiveNav()).toBe(nav);
                expect(nav.first()).toBe(view1);
                app.goBack();
                expect(portal.pop).not.toHaveBeenCalled();
                expect(nav.pop).not.toHaveBeenCalled();
                expect(plt.exitApp).not.toHaveBeenCalled();
            });
            it('should not go back if app is not enabled', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                spyOn(plt, 'exitApp');
                spyOn(nav, 'pop');
                spyOn(portal, 'pop');
                var view1 = mock_providers_1.mockView();
                mock_providers_1.mockViews(nav, [view1]);
                app.setEnabled(false, 10000);
                app.goBack();
                expect(portal.pop).not.toHaveBeenCalled();
                expect(nav.pop).not.toHaveBeenCalled();
                expect(plt.exitApp).not.toHaveBeenCalled();
            });
            it('should not go back if there is no root nav', function () {
                spyOn(plt, 'exitApp');
                app.goBack();
                expect(plt.exitApp).not.toHaveBeenCalled();
            });
        });
        describe('getActiveNav', function () {
            it('should get active NavController when using tabs with nested nav', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                var tabs = mock_providers_1.mockTabs();
                var tab1 = mock_providers_1.mockTab(tabs);
                var tab2 = mock_providers_1.mockTab(tabs);
                nav.registerChildNav(tabs);
                tab2.setSelected(true);
                var nav2 = mock_providers_1.mockNavController();
                var nav3 = mock_providers_1.mockNavController();
                var nav4 = mock_providers_1.mockNavController();
                tab1.registerChildNav(nav4);
                tab2.registerChildNav(nav2);
                tab2.registerChildNav(nav3);
                expect(app.getActiveNav()).toBe(nav3);
            });
            it('should get active NavController when using tabs, nested in a root nav', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                var tabs = mock_providers_1.mockTabs();
                mock_providers_1.mockTab(tabs);
                var tab2 = mock_providers_1.mockTab(tabs);
                var tab3 = mock_providers_1.mockTab(tabs);
                nav.registerChildNav(tabs);
                tab2.setSelected(true);
                expect(app.getActiveNav()).toBe(tab2);
                tab2.setSelected(false);
                tab3.setSelected(true);
                expect(app.getActiveNav()).toBe(tab3);
            });
            it('should get active tab NavController when using tabs, and tabs is the root', function () {
                var tabs = mock_providers_1.mockTabs();
                mock_providers_1.mockTab(tabs);
                var tab2 = mock_providers_1.mockTab(tabs);
                var tab3 = mock_providers_1.mockTab(tabs);
                app._setRootNav(tabs);
                tab2.setSelected(true);
                expect(app.getActiveNav()).toBe(tab2);
                tab2.setSelected(false);
                tab3.setSelected(true);
                expect(app.getActiveNav()).toBe(tab3);
            });
            it('should get active NavController when nested 3 deep', function () {
                var nav1 = mock_providers_1.mockNavController();
                var nav2 = mock_providers_1.mockNavController();
                var nav3 = mock_providers_1.mockNavController();
                app._setRootNav(nav1);
                nav1.registerChildNav(nav2);
                nav2.registerChildNav(nav3);
                expect(app.getActiveNav()).toBe(nav3);
            });
            it('should get active NavController when nested 2 deep', function () {
                var nav1 = mock_providers_1.mockNavController();
                var nav2 = mock_providers_1.mockNavController();
                app._setRootNav(nav1);
                nav1.registerChildNav(nav2);
                expect(app.getActiveNav()).toBe(nav2);
            });
            it('should get active NavController when only one nav controller', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                expect(app.getActiveNav()).toBe(nav);
            });
            it('should set/get the root nav controller', function () {
                var nav = mock_providers_1.mockNavController();
                app._setRootNav(nav);
                expect(app.getRootNav()).toBe(nav);
            });
            it('should not get an active NavController if there is not root set', function () {
                expect(app.getActiveNav()).toBeNull();
                expect(app.getRootNav()).toBeNull();
            });
        });
        describe('setEnabled', function () {
            it('should disable click block when app is enabled', function (done) {
                plt = mock_providers_1.mockPlatform();
                app._clickBlock = new click_block_1.ClickBlock(app, mock_providers_1.mockConfig(), plt, mock_providers_1.mockElementRef(), mock_providers_1.mockRenderer());
                spyOn(app._clickBlock, '_activate');
                app.setEnabled(true);
                expect(app._clickBlock._activate).not.toHaveBeenCalledWith();
                plt.flushTimeouts(function () {
                    expect(app._clickBlock._activate).toHaveBeenCalledWith(false);
                    done();
                });
            });
            it('should enable click block when false is passed with duration', function () {
                // arrange
                var mockClickBlock = {
                    activate: function () { }
                };
                spyOn(mockClickBlock, 'activate');
                app._clickBlock = mockClickBlock;
                // act
                app.setEnabled(false, 200);
                // assert
                expect(mockClickBlock.activate).toHaveBeenCalledWith(true, 200 + 64, 0);
            });
            it('should enable click block when false is passed w/o duration', function () {
                // arrange
                var mockClickBlock = {
                    activate: function () { }
                };
                spyOn(mockClickBlock, 'activate');
                app._clickBlock = mockClickBlock;
                // act
                app.setEnabled(false);
                // assert
                // 700 is the default
                expect(mockClickBlock.activate).toHaveBeenCalledWith(true, 700 + 64, 0);
            });
            it('should enable click block when false is passed with a duration of 0 and with a minDuration', function () {
                // arrange
                var mockClickBlock = {
                    activate: function () { }
                };
                spyOn(mockClickBlock, 'activate');
                app._clickBlock = mockClickBlock;
                // act
                app.setEnabled(false, 0, 400);
                // assert
                expect(mockClickBlock.activate).toHaveBeenCalledWith(true, 64, 400);
            });
            it('should enable click block when false is passed with a null duration and a minDuration', function () {
                // arrange
                var mockClickBlock = {
                    activate: function () { }
                };
                spyOn(mockClickBlock, 'activate');
                app._clickBlock = mockClickBlock;
                // act
                app.setEnabled(false, null, 400);
                // assert
                expect(mockClickBlock.activate).toHaveBeenCalledWith(true, 64, 400);
            });
            it('should enable click block when false is passed with a duration and a minDuration', function () {
                // arrange
                var mockClickBlock = {
                    activate: function () { }
                };
                spyOn(mockClickBlock, 'activate');
                app._clickBlock = mockClickBlock;
                // act
                app.setEnabled(false, 200, 400);
                // assert
                expect(mockClickBlock.activate).toHaveBeenCalledWith(true, 200 + 64, 400);
            });
        });
        var app;
        var config;
        var plt;
        var portal;
        beforeEach(function () {
            config = mock_providers_1.mockConfig();
            plt = mock_providers_1.mockPlatform();
            app = mock_providers_1.mockApp(config, plt);
            portal = app._appRoot._getPortal(app_constants_1.PORTAL_MODAL);
        });
    });
});
//# sourceMappingURL=app.spec.js.map