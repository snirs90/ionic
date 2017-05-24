(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../app/menu-controller", "../../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var menu_controller_1 = require("../../app/menu-controller");
    var mock_providers_1 = require("../../../util/mock-providers");
    describe('MenuController', function () {
        describe('get() without menuId', function () {
            it('should not get a menu if no menus', function () {
                var menu = menuCtrl.get();
                expect(menu).toEqual(null);
            });
            it('should get the only menu', function () {
                var someMenu = mock_providers_1.mockMenu();
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get();
                expect(menu).toEqual(someMenu);
            });
            it('should get the only menu if menuId === ""', function () {
                var someMenu = mock_providers_1.mockMenu();
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get('');
                expect(menu).toEqual(someMenu);
            });
            it('should get the enabled menu when multiple menus', function () {
                var someMenu1 = mock_providers_1.mockMenu();
                someMenu1.enabled = false;
                menuCtrl._register(someMenu1);
                var someMenu2 = mock_providers_1.mockMenu();
                someMenu2.enabled = true;
                menuCtrl._register(someMenu2);
                var menu = menuCtrl.get();
                expect(menu).toEqual(someMenu2);
            });
        });
        describe('get() by id', function () {
            it('should be null if no menus', function () {
                var menu = menuCtrl.get('myid');
                expect(menu).toEqual(null);
            });
            it('should be null if no matching menus with id', function () {
                var someMenu = mock_providers_1.mockMenu();
                someMenu.id = 'whatever';
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get('myMenu');
                expect(menu).toEqual(null);
            });
            it('should get the menu by id with matching id', function () {
                var someMenu = mock_providers_1.mockMenu();
                someMenu.id = 'myMenu';
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get('myMenu');
                expect(menu).toEqual(someMenu);
            });
            it('should get the menu by id with left', function () {
                var someMenu = mock_providers_1.mockMenu();
                someMenu.id = 'myMenu';
                someMenu.side = 'left';
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get('myMenu');
                expect(menu).toEqual(someMenu);
            });
            it('should get the menu by id with matching id when multiple menus', function () {
                var someMenu1 = mock_providers_1.mockMenu();
                someMenu1.id = 'myMenu1';
                menuCtrl._register(someMenu1);
                var someMenu2 = mock_providers_1.mockMenu();
                someMenu2.id = 'myMenu2';
                menuCtrl._register(someMenu2);
                var menu = menuCtrl.get('myMenu1');
                expect(menu).toEqual(someMenu1);
                menu = menuCtrl.get('myMenu2');
                expect(menu).toEqual(someMenu2);
            });
        });
        describe('get() by side', function () {
            it('should not get a menu with a left side if no menus', function () {
                var menu = menuCtrl.get('left');
                expect(menu).toEqual(null);
            });
            it('should not get a menu with a right side if no menus', function () {
                var menu = menuCtrl.get('right');
                expect(menu).toEqual(null);
            });
            it('should get the only left menu', function () {
                var someMenu = mock_providers_1.mockMenu();
                someMenu.side = 'left';
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get('left');
                expect(menu).toEqual(someMenu);
            });
            it('should get the only left menu on start ltr', function () {
                var someMenu = mock_providers_1.mockMenu();
                someMenu.side = 'start';
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get('left');
                expect(menu).toEqual(someMenu);
            });
            it('should get the only left menu on end rtl', function () {
                var platform = mock_providers_1.mockPlatform();
                platform.setDir('rtl', true);
                expect(platform.dir()).toEqual('rtl');
                var someMenu = mock_providers_1.mockMenu(platform);
                someMenu.side = 'end';
                menuCtrl._register(someMenu);
                expect(someMenu.side).toEqual('left');
                var menu = menuCtrl.get('left');
                expect(menu).toEqual(someMenu);
            });
            it('should get the enabled left menu', function () {
                var someMenu1 = mock_providers_1.mockMenu();
                someMenu1.side = 'left';
                someMenu1.enabled = false;
                menuCtrl._register(someMenu1);
                var someMenu2 = mock_providers_1.mockMenu();
                someMenu2.side = 'left';
                someMenu2.enabled = true;
                menuCtrl._register(someMenu2);
                var menu = menuCtrl.get('left');
                expect(menu).toEqual(someMenu2);
            });
            it('should get the first left menu when all are disabled', function () {
                var someMenu1 = mock_providers_1.mockMenu();
                someMenu1.side = 'left';
                someMenu1.enabled = false;
                menuCtrl._register(someMenu1);
                var someMenu2 = mock_providers_1.mockMenu();
                someMenu2.side = 'left';
                someMenu2.enabled = false;
                menuCtrl._register(someMenu2);
                var menu = menuCtrl.get('left');
                expect(menu).toEqual(someMenu1);
            });
            it('should get the only right menu', function () {
                var someMenu = mock_providers_1.mockMenu();
                someMenu.side = 'right';
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get('right');
                expect(menu).toEqual(someMenu);
            });
            it('should get the only right menu on end ltr', function () {
                var someMenu = mock_providers_1.mockMenu();
                someMenu.side = 'end';
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get('right');
                expect(menu).toEqual(someMenu);
            });
            it('should get the only right menu on start rtl', function () {
                var platform = mock_providers_1.mockPlatform();
                platform.setDir('rtl', true);
                expect(platform.dir()).toEqual('rtl');
                var someMenu = mock_providers_1.mockMenu(platform);
                someMenu.side = 'start';
                menuCtrl._register(someMenu);
                expect(someMenu.side).toEqual('right');
                var menu = menuCtrl.get('right');
                expect(menu).toEqual(someMenu);
            });
            it('should get the menu by left with id', function () {
                var someMenu = mock_providers_1.mockMenu();
                someMenu.id = 'myMenu';
                someMenu.side = 'left';
                menuCtrl._register(someMenu);
                var menu = menuCtrl.get('left');
                expect(menu).toEqual(someMenu);
            });
            it('should switch menu side in runtime', function () {
                var someMenu = mock_providers_1.mockMenu();
                menuCtrl._register(someMenu);
                ['left', 'right'].forEach(function (side) {
                    someMenu.side = side;
                    expect(someMenu.side).toEqual(side);
                    var menu = menuCtrl.get(side);
                    expect(menu).toEqual(someMenu);
                });
            });
        });
        describe('enable()', function () {
            it('should enable a menu', function () {
                var someMenu = mock_providers_1.mockMenu();
                someMenu.enabled = true;
                menuCtrl._register(someMenu);
                someMenu._menuCtrl = menuCtrl;
                var menu = menuCtrl.enable(true);
                expect(menu.enabled).toEqual(true);
                menu = menuCtrl.enable(false);
                expect(menu.enabled).toEqual(false);
            });
            it('should be only one enabled menu on the same side', function () {
                var someMenu1 = mock_providers_1.mockMenu();
                someMenu1.enabled = true;
                someMenu1.side = 'left';
                someMenu1.id = 'menu1';
                someMenu1._menuCtrl = menuCtrl;
                menuCtrl._register(someMenu1);
                var someMenu2 = mock_providers_1.mockMenu();
                someMenu2.enabled = false;
                someMenu2.side = 'left';
                someMenu2.id = 'menu2';
                someMenu2._menuCtrl = menuCtrl;
                menuCtrl._register(someMenu2);
                var someMenu3 = mock_providers_1.mockMenu();
                someMenu3.enabled = true;
                someMenu3.side = 'right';
                someMenu3.id = 'menu2';
                someMenu3._menuCtrl = menuCtrl;
                menuCtrl._register(someMenu3);
                menuCtrl.enable(true, 'menu1');
                expect(someMenu1.enabled).toEqual(true);
                expect(someMenu2.enabled).toEqual(false);
                expect(someMenu3.enabled).toEqual(true);
                menuCtrl.enable(true, 'menu2');
                expect(someMenu1.enabled).toEqual(false);
                expect(someMenu2.enabled).toEqual(true);
                expect(someMenu3.enabled).toEqual(true);
                menuCtrl.enable(true, 'menu1');
                expect(someMenu1.enabled).toEqual(true);
                expect(someMenu2.enabled).toEqual(false);
                expect(someMenu3.enabled).toEqual(true);
            });
        });
        it('should register a menu', function () {
            var menu = mock_providers_1.mockMenu();
            menuCtrl._register(menu);
            expect(menuCtrl.getMenus().length).toEqual(1);
            var menu2 = mock_providers_1.mockMenu();
            menuCtrl._register(menu2);
            expect(menuCtrl.getMenus().length).toEqual(2);
            menuCtrl._unregister(menu2);
            menuCtrl._unregister(menu);
            expect(menuCtrl.getMenus().length).toEqual(0);
        });
        var menuCtrl;
        beforeEach(function () {
            menuCtrl = new menu_controller_1.MenuController();
        });
    });
});
//# sourceMappingURL=menu.spec.js.map