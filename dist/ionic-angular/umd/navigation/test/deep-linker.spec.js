(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../deep-linker", "../url-serializer", "../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deep_linker_1 = require("../deep-linker");
    var url_serializer_1 = require("../url-serializer");
    var mock_providers_1 = require("../../util/mock-providers");
    describe('DeepLinker', function () {
        describe('updateLocation', function () {
            it('should update the browserUrl to / when the passed in url matches indexAliasUrl', function () {
                linker._indexAliasUrl = '/my-special/url';
                linker._updateLocation('/my-special/url', 'forward');
                expect(linker._history[0]).toEqual('/');
            });
            it('should update location.back when back direction and previous url is the same', function () {
                spyOn(linker._location, 'back');
                spyOn(linker._location, 'go');
                spyOn(linker, '_historyPop');
                linker._history = ['first-page', 'some-page', 'current-page'];
                linker._updateLocation('some-page', 'back');
                expect(linker._location.back).toHaveBeenCalled();
                expect(linker._location.go).not.toHaveBeenCalled();
                expect(linker._historyPop).toHaveBeenCalled();
            });
            it('should not update location.go when same as current page', function () {
                spyOn(linker._location, 'back');
                spyOn(linker._location, 'go');
                linker._history = ['current-page'];
                linker._updateLocation('current-page', 'forward');
                expect(linker._location.back).not.toHaveBeenCalled();
                expect(linker._location.go).not.toHaveBeenCalled();
            });
            it('should update location.go when back direction but not actually the previous url', function () {
                spyOn(linker._location, 'back');
                spyOn(linker._location, 'go');
                spyOn(linker, '_historyPush');
                linker._history = ['first-page', 'some-other-page'];
                linker._updateLocation('some-page', 'forward');
                expect(linker._location.back).not.toHaveBeenCalled();
                expect(linker._location.go).toHaveBeenCalledWith('some-page');
                expect(linker._historyPush).toHaveBeenCalledWith('some-page');
            });
            it('should update location.go when forward direction', function () {
                spyOn(linker._location, 'back');
                spyOn(linker._location, 'go');
                spyOn(linker, '_historyPush');
                linker._updateLocation('new-url', 'forward');
                expect(linker._location.back).not.toHaveBeenCalled();
                expect(linker._location.go).toHaveBeenCalledWith('new-url');
                expect(linker._historyPush).toHaveBeenCalledWith('new-url');
            });
        });
        describe('loadViewFromSegment', function () {
            it('should call done if the view is the same as the last one in the stack', function () {
                var nav = mock_providers_1.mockNavController();
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                view1.id = 'MockPage1';
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                view2.id = 'MockPage2';
                mock_providers_1.mockViews(nav, [view1, view2]);
                linker._segments = serializer.parse('/MockPage2');
                spyOn(nav, 'push');
                spyOn(nav, 'popTo');
                linker._loadViewFromSegment(nav, mock_providers_1.noop);
                expect(nav.push).not.toHaveBeenCalled();
                expect(nav.popTo).not.toHaveBeenCalled();
            });
            it('should popTo a view thats already in the stack', function () {
                var nav = mock_providers_1.mockNavController();
                var view1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                view1.id = 'MockPage1';
                var view2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                view2.id = 'MockPage2';
                mock_providers_1.mockViews(nav, [view1, view2]);
                linker._segments = serializer.parse('/MockPage1');
                spyOn(nav, 'push');
                spyOn(nav, 'popTo');
                linker._loadViewFromSegment(nav, mock_providers_1.noop);
                expect(nav.push).not.toHaveBeenCalled();
                expect(nav.popTo).toHaveBeenCalled();
            });
            it('should push a new page', function () {
                var nav = mock_providers_1.mockNavController();
                linker._segments = serializer.parse('/MockPage1');
                spyOn(nav, 'push');
                spyOn(nav, 'popTo');
                linker._loadViewFromSegment(nav, mock_providers_1.noop);
                expect(nav.push).toHaveBeenCalled();
                expect(nav.popTo).not.toHaveBeenCalled();
            });
            it('should call select when its a Tabs nav', function () {
                var tabs = mock_providers_1.mockTabs();
                mock_providers_1.mockTab(tabs);
                mock_providers_1.mockTab(tabs);
                linker._segments = serializer.parse('/MockPage1');
                spyOn(tabs, 'select');
                linker._loadViewFromSegment(tabs, mock_providers_1.noop);
                expect(tabs.select).toHaveBeenCalled();
            });
            it('should not error when no segment found', function () {
                var calledDone = false;
                var done = function () { calledDone = true; };
                var nav = mock_providers_1.mockNavController();
                linker._loadViewFromSegment(nav, done);
                expect(calledDone).toEqual(true);
            });
        });
        describe('pathFromNavs', function () {
            it('should climb up through Tab and selected Tabs', function () {
                var nav1 = mock_providers_1.mockNavController();
                var nav1View1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                var nav1View2 = mock_providers_1.mockView(mock_providers_1.MockView2);
                mock_providers_1.mockViews(nav1, [nav1View1, nav1View2]);
                var tabs = mock_providers_1.mockTabs();
                tabs.parent = nav1;
                mock_providers_1.mockTab(tabs);
                mock_providers_1.mockTab(tabs);
                var tab3 = mock_providers_1.mockTab(tabs);
                var path = linker._pathFromNavs(tab3, mock_providers_1.MockView3);
                expect(path.length).toEqual(3);
                expect(path[0].id).toEqual('viewtwo');
                expect(path[1].id).toEqual('tab-2');
                expect(path[2].id).toEqual('viewthree');
            });
            it('should climb up two navs to set path', function () {
                var nav1 = mock_providers_1.mockNavController();
                var nav1View1 = mock_providers_1.mockView(mock_providers_1.MockView1);
                mock_providers_1.mockViews(nav1, [nav1View1]);
                var nav2 = mock_providers_1.mockNavController();
                nav2.parent = nav1;
                var path = linker._pathFromNavs(nav2, mock_providers_1.MockView3);
                expect(path.length).toEqual(2);
                expect(path[0].id).toEqual('viewone');
                expect(path[0].name).toEqual('viewone');
                expect(path[1].id).toEqual('viewthree');
                expect(path[1].name).toEqual('viewthree');
            });
            it('should get the path for view and nav', function () {
                var nav = mock_providers_1.mockNavController();
                var view = mock_providers_1.MockView1;
                var path = linker._pathFromNavs(nav, view, null);
                expect(path.length).toEqual(1);
                expect(path[0].id).toEqual('viewone');
                expect(path[0].name).toEqual('viewone');
                expect(path[0].component).toEqual(mock_providers_1.MockView1);
                expect(path[0].data).toEqual(null);
            });
            it('should do nothing if blank nav', function () {
                var path = linker._pathFromNavs(null, null, null);
                expect(path.length).toEqual(0);
            });
        });
        describe('getTabSelector', function () {
            it('should get tab url path selector', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab1 = mock_providers_1.mockTab(tabs);
                tab1.tabUrlPath = 'some-tab-url-path';
                tab1.tabTitle = 'My Tab Title';
                expect(linker._getTabSelector(tab1)).toEqual('some-tab-url-path');
            });
            it('should get tab title selector', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab1 = mock_providers_1.mockTab(tabs);
                tab1.tabTitle = 'My Tab Title';
                expect(linker._getTabSelector(tab1)).toEqual('my-tab-title');
            });
            it('should get tab-0 selector', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab1 = mock_providers_1.mockTab(tabs);
                expect(linker._getTabSelector(tab1)).toEqual('tab-0');
            });
        });
        describe('getSelectedTabIndex', function () {
            it('should select index from tab title', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab1 = mock_providers_1.mockTab(tabs);
                var tab2 = mock_providers_1.mockTab(tabs);
                var tab3 = mock_providers_1.mockTab(tabs);
                tab1.tabTitle = 'My Account';
                tab2.tabTitle = 'My Contact';
                tab3.tabTitle = 'My Settings!!';
                var selectedIndex = linker.getSelectedTabIndex(tabs, 'my-settings');
                expect(selectedIndex).toEqual(2);
            });
            it('should select index from tab url path', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab1 = mock_providers_1.mockTab(tabs);
                var tab2 = mock_providers_1.mockTab(tabs);
                var tab3 = mock_providers_1.mockTab(tabs);
                tab1.tabUrlPath = 'account';
                tab2.tabUrlPath = 'contact';
                tab3.tabUrlPath = 'settings';
                var selectedIndex = linker.getSelectedTabIndex(tabs, 'settings');
                expect(selectedIndex).toEqual(2);
            });
            it('should select index 2 from tab-2 format', function () {
                var tabs = mock_providers_1.mockTabs();
                mock_providers_1.mockTab(tabs);
                mock_providers_1.mockTab(tabs);
                mock_providers_1.mockTab(tabs);
                var selectedIndex = linker.getSelectedTabIndex(tabs, 'tab-2');
                expect(selectedIndex).toEqual(2);
            });
            it('should select index 0 when not found', function () {
                var tabs = mock_providers_1.mockTabs();
                mock_providers_1.mockTab(tabs);
                mock_providers_1.mockTab(tabs);
                mock_providers_1.mockTab(tabs);
                var selectedIndex = linker.getSelectedTabIndex(tabs, 'notfound');
                expect(selectedIndex).toEqual(0);
            });
        });
        describe('initViews', function () {
            it('should return an array with one view controller when there isnt default history', function (done) {
                var knownSegment = {
                    id: 'idk',
                    name: 'viewone',
                    data: {}
                };
                var promise = linker.initViews(knownSegment);
                promise.then(function (result) {
                    expect(Array.isArray(result)).toBeTruthy();
                    expect(result.length).toEqual(1);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
        });
        describe('initNav', function () {
            it('should load root view that contains tabs, and the selected tabs view', function () {
                var nav1 = mock_providers_1.mockNavController();
                nav1.id = 'nav1';
                nav1.parent = null;
                var tabs = mock_providers_1.mockTabs();
                tabs.id = 'tabs';
                tabs.parent = nav1;
                var tab1 = mock_providers_1.mockTab(tabs);
                tab1.id = 'tab1';
                tab1.parent = tabs;
                var tab2 = mock_providers_1.mockTab(tabs);
                tab2.id = 'tab2';
                tab2.parent = tabs;
                linker._segments = serializer.parse('/viewone/account/viewtwo');
                var navSegment = linker.initNav(nav1);
                expect(navSegment.navId).toEqual('nav1');
                expect(navSegment.id).toEqual('viewone');
                var tabsSegment = linker.initNav(tabs);
                expect(tabsSegment.navId).toEqual('tabs');
                expect(tabsSegment.id).toEqual('account');
                var tabSegment = linker.initNav(tab2);
                expect(tabSegment.navId).toEqual('tab2');
                expect(tabSegment.id).toEqual('viewtwo');
            });
            it('should load root and descendant nav', function () {
                var nav1 = mock_providers_1.mockNavController();
                nav1.parent = null;
                nav1.id = 'nav1';
                var nav2 = mock_providers_1.mockNavController();
                nav2.parent = nav1;
                nav2.id = 'nav2';
                var nav3 = mock_providers_1.mockNavController();
                nav3.parent = nav2;
                nav3.id = 'nav3';
                linker._segments = serializer.parse('/viewone/viewtwo/viewthree');
                var p1 = linker.initNav(nav1);
                expect(p1.navId).toEqual('nav1');
                expect(p1.id).toEqual('viewone');
                var p2 = linker.initNav(nav2);
                expect(p2.navId).toEqual('nav2');
                expect(p2.id).toEqual('viewtwo');
                var p3 = linker.initNav(nav3);
                expect(p3.navId).toEqual('nav3');
                expect(p3.id).toEqual('viewthree');
            });
            it('should load root nav', function () {
                var nav = mock_providers_1.mockNavController();
                nav.id = 'myNavId';
                linker._segments = serializer.parse('MockPage1');
                var p = linker.initNav(nav);
                expect(p.navId).toEqual('myNavId');
                expect(p.id).toEqual('MockPage1');
            });
            it('should return null when no nav', function () {
                linker._segments = serializer.parse('MockPage1');
                expect(linker.initNav(null)).toEqual(null);
            });
            it('should return null when segments in path', function () {
                var nav = mock_providers_1.mockNavController();
                linker._segments = [];
                expect(linker.initNav(nav)).toEqual(null);
            });
        });
        describe('createSegmentFromName', function () {
            it('should match by the links string name', function () {
                var segment = serializer.createSegmentFromName('viewone');
                expect(segment.component).toEqual(mock_providers_1.MockView1);
            });
            it('should get no match', function () {
                var segment = serializer.createSegmentFromName('nonofindo');
                expect(segment).toEqual(null);
            });
        });
        describe('urlChange', function () {
            it('should use indexAliasUrl when set and browserUrl is /', function () {
                linker._loadNavFromPath = function (nav) { };
                linker._app.getRootNav = function () {
                    return mock_providers_1.mockNavController();
                };
                spyOn(serializer, 'parse');
                linker._indexAliasUrl = '/tabs-page/recents/tab1-page1';
                linker._urlChange('/');
                expect(serializer.parse).toHaveBeenCalledWith('/tabs-page/recents/tab1-page1');
            });
            it('should use indexAliasUrl when set and browserUrl is /', function () {
                linker._loadNavFromPath = function (nav) { };
                linker._app.getRootNav = function () {
                    return mock_providers_1.mockNavController();
                };
                spyOn(serializer, 'parse');
                linker._indexAliasUrl = '/tabs-page/recents/tab1-page1';
                linker._urlChange('/');
                expect(serializer.parse).toHaveBeenCalledWith('/tabs-page/recents/tab1-page1');
            });
            it('should historyPush if new url', function () {
                spyOn(linker, '_historyPop');
                spyOn(linker, '_historyPush');
                linker._history = ['back-url', 'current-url'];
                linker._urlChange('new-url');
                expect(linker._historyPop).not.toHaveBeenCalled();
                expect(linker._historyPush).toHaveBeenCalled();
            });
            it('should historyPop if back url', function () {
                spyOn(linker, '_historyPop');
                spyOn(linker, '_historyPush');
                linker._history = ['back-url', 'current-url'];
                linker._urlChange('back-url');
                expect(linker._historyPop).toHaveBeenCalled();
                expect(linker._historyPush).not.toHaveBeenCalled();
            });
            it('should do nothing if the url is the same', function () {
                spyOn(linker, '_historyPop');
                spyOn(linker, '_historyPush');
                linker._history = ['current-url'];
                linker._urlChange('current-url');
                expect(linker._historyPop).not.toHaveBeenCalled();
                expect(linker._historyPush).not.toHaveBeenCalled();
            });
        });
        describe('isBackUrl', function () {
            it('should not be the back path when no history', function () {
                expect(linker._isBackUrl('some-page')).toEqual(false);
            });
            it('should not be the back when same as last path', function () {
                linker._history = ['first-page', 'some-page'];
                expect(linker._isBackUrl('some-page')).toEqual(false);
            });
            it('should be the back when same as second to last path', function () {
                linker._history = ['first-page', 'some-page', 'current-page'];
                expect(linker._isBackUrl('some-page')).toEqual(true);
            });
        });
        describe('isCurrentUrl', function () {
            it('should not be the current path when no history', function () {
                expect(linker._isCurrentUrl('some-page')).toEqual(false);
            });
            it('should be the current when same as last path', function () {
                linker._history = ['first-page', 'some-page'];
                expect(linker._isCurrentUrl('some-page')).toEqual(true);
            });
            it('should not be the current when not the last path', function () {
                linker._history = ['first-page', 'some-page', 'current-page'];
                expect(linker._isCurrentUrl('some-page')).toEqual(false);
            });
        });
        describe('normalizeUrl', function () {
            it('should parse multiple segment with leading and following / path', function () {
                expect(deep_linker_1.normalizeUrl('   /MockPage1/MockPage2/   ')).toEqual('/MockPage1/MockPage2');
            });
            it('should parse following / path', function () {
                expect(deep_linker_1.normalizeUrl('MockPage1/')).toEqual('/MockPage1');
            });
            it('should parse leading / path', function () {
                expect(deep_linker_1.normalizeUrl('/MockPage1')).toEqual('/MockPage1');
            });
            it('should parse / path', function () {
                expect(deep_linker_1.normalizeUrl('/')).toEqual('/');
            });
            it('should parse empty path with padding', function () {
                expect(deep_linker_1.normalizeUrl('    ')).toEqual('/');
            });
            it('should parse empty path', function () {
                expect(deep_linker_1.normalizeUrl('')).toEqual('/');
            });
        });
        var linker;
        var serializer;
        beforeEach(function () {
            var linkConfig = mock_providers_1.mockDeepLinkConfig();
            serializer = new url_serializer_1.UrlSerializer(linkConfig);
            var moduleLoader = mock_providers_1.mockModuleLoader();
            var baseCfr = null;
            linker = new deep_linker_1.DeepLinker(mock_providers_1.mockApp(), serializer, mock_providers_1.mockLocation(), moduleLoader, baseCfr);
        });
    });
});
//# sourceMappingURL=deep-linker.spec.js.map