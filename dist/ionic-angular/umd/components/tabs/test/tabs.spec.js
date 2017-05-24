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
        define(["require", "exports", "@angular/core", "../../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var mock_providers_1 = require("../../../util/mock-providers");
    describe('Tabs', function () {
        describe('initTabs', function () {
            it('should not select a hidden or disabled tab', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab0 = mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                tab0.root = SomePage;
                tab1.root = SomePage;
                tab1.enabled = false;
                tab1.show = false;
                tabs.selectedIndex = 1;
                tabs.initTabs();
                expect(tab0.isSelected).toEqual(true);
                expect(tab1.isSelected).toEqual(false);
            });
            it('should select the second tab from selectedIndex input', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab0 = mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                tab0.root = SomePage;
                tab1.root = SomePage;
                tabs.selectedIndex = 1;
                tabs.initTabs();
                expect(tab0.isSelected).toEqual(false);
                expect(tab1.isSelected).toEqual(true);
            });
            it('should select the first tab by default', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab0 = mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                tab0.root = SomePage;
                tab1.root = SomePage;
                tabs.initTabs();
                expect(tab0.isSelected).toEqual(true);
                expect(tab1.isSelected).toEqual(false);
            });
        });
        describe('previousTab', function () {
            it('should find the previous tab when there has been 3 selections', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab0 = mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                var tab2 = mock_providers_1.mockTab(tabs);
                tab0.root = SomePage;
                tab1.root = SomePage;
                tab2.root = SomePage;
                tabs.select(tab0);
                tabs.select(tab1);
                tabs.select(tab2);
                expect(tabs._selectHistory).toEqual([tab0.id, tab1.id, tab2.id]);
                expect(tabs.previousTab(true)).toEqual(tab1);
                expect(tabs._selectHistory).toEqual([tab0.id, tab1.id]);
                expect(tabs.previousTab(true)).toEqual(tab0);
                expect(tabs._selectHistory).toEqual([tab0.id]);
            });
            it('should not find a previous tab when there has only been one selection', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab0 = mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                tab0.root = SomePage;
                tab1.root = SomePage;
                tabs.select(tab0);
                expect(tabs.previousTab(true)).toEqual(null);
            });
            it('should not find a previous tab when theres no history', function () {
                var tabs = mock_providers_1.mockTabs();
                expect(tabs._selectHistory.length).toEqual(0);
                expect(tabs.previousTab(true)).toEqual(null);
            });
            it('should track tab selections', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab0 = mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                tab0.root = SomePage;
                tab1.root = SomePage;
                expect(tabs._selectHistory.length).toEqual(0);
                tabs.select(tab0);
                expect(tabs._selectHistory[0]).toEqual(tab0.id);
                expect(tabs._selectHistory.length).toEqual(1);
                tabs.select(tab1);
                expect(tabs._selectHistory[0]).toEqual(tab0.id);
                expect(tabs._selectHistory[1]).toEqual(tab1.id);
                expect(tabs._selectHistory.length).toEqual(2);
                tabs.select(tab0);
                expect(tabs._selectHistory[0]).toEqual(tab0.id);
                expect(tabs._selectHistory[1]).toEqual(tab1.id);
                expect(tabs._selectHistory[2]).toEqual(tab0.id);
                expect(tabs._selectHistory.length).toEqual(3);
            });
        });
        describe('select', function () {
            it('should select tab by tab instance', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab0 = mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                tab0.root = SomePage;
                tab1.root = SomePage;
                tabs.select(tab1);
                expect(tab0.isSelected).toEqual(false);
                expect(tab1.isSelected).toEqual(true);
            });
            it('should select tab by index', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab0 = mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                tab0.root = SomePage;
                tab1.root = SomePage;
                expect(tabs.length()).toEqual(2);
                expect(tab0.isSelected).toBeUndefined();
                expect(tab1.isSelected).toBeUndefined();
                tabs.select(0);
                expect(tab0.isSelected).toEqual(true);
                expect(tab1.isSelected).toEqual(false);
            });
        });
        describe('getByIndex', function () {
            it('should get the tab', function () {
                var tabs = mock_providers_1.mockTabs();
                var tab0 = mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                expect(tabs.getIndex(tab0)).toEqual(0);
                expect(tabs.getIndex(tab1)).toEqual(1);
            });
        });
        describe('getSelected', function () {
            it('should get the selected tab', function () {
                var tabs = mock_providers_1.mockTabs();
                mock_providers_1.mockTab(tabs);
                var tab1 = mock_providers_1.mockTab(tabs);
                tab1.setSelected(true);
                expect(tabs.getSelected()).toEqual(tab1);
            });
            it('should get null if no selected tab', function () {
                var tabs = mock_providers_1.mockTabs();
                mock_providers_1.mockTab(tabs);
                mock_providers_1.mockTab(tabs);
                expect(tabs.getSelected()).toEqual(null);
            });
        });
        var SomePage = (function () {
            function SomePage() {
            }
            return SomePage;
        }());
        SomePage = __decorate([
            core_1.Component({})
        ], SomePage);
    });
});
//# sourceMappingURL=tabs.spec.js.map