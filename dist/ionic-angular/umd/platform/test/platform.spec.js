(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../config/config", "../platform", "../platform-registry", "../../config/mode-registry"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config_1 = require("../../config/config");
    var platform_1 = require("../platform");
    var platform_registry_1 = require("../platform-registry");
    var mode_registry_1 = require("../../config/mode-registry");
    describe('Platform', function () {
        describe('registerBackButtonAction', function () {
            it('should register two actions with different priorities, call the highest one', function () {
                var ranAction1 = false;
                var action1 = function () {
                    ranAction1 = true;
                };
                var ranAction2 = false;
                var action2 = function () {
                    ranAction2 = true;
                };
                plt.registerBackButtonAction(action1, 200);
                plt.registerBackButtonAction(action2, 100);
                plt.runBackButtonAction();
                expect(ranAction1).toEqual(true);
                expect(ranAction2).toEqual(false);
            });
            it('should register two actions with the same priority, call the second one', function () {
                var ranAction1 = false;
                var action1 = function () {
                    ranAction1 = true;
                };
                var ranAction2 = false;
                var action2 = function () {
                    ranAction2 = true;
                };
                plt.registerBackButtonAction(action1, 100);
                plt.registerBackButtonAction(action2, 100);
                plt.runBackButtonAction();
                expect(ranAction1).toEqual(false);
                expect(ranAction2).toEqual(true);
            });
            it('should register a default action', function () {
                var ranAction1 = false;
                var action1 = function () {
                    ranAction1 = true;
                };
                plt.registerBackButtonAction(action1);
                plt.runBackButtonAction();
                expect(ranAction1).toEqual(true);
            });
            it('should not run any actions when none registered', function () {
                plt.runBackButtonAction();
            });
        });
        describe('orientation', function () {
            it('Should return true if orientation is landscape', function () {
                expect(plt.isLandscape()).toEqual(true);
            });
            it('Should return false if orientation is not landscape', function () {
                var portraitWindow = {
                    innerWidth: 200,
                    innerHeight: 300,
                    screen: {
                        width: 200,
                        height: 300
                    }
                };
                plt.setWindow(portraitWindow);
                expect(plt.isLandscape()).toEqual(false);
            });
            it('Should return true if orientation is landscape but window.screen shows portrait', function () {
                // Even though we do not use window.screen.height/width
                // anymore beyond checking if they are > 0
                // as that api is broken on iOS, we should still check
                // this edge case
                var iOSLandscapeWindow = {
                    innerWidth: 300,
                    innerHeight: 200,
                    screen: {
                        width: 200,
                        height: 300
                    }
                };
                plt.setWindow(iOSLandscapeWindow);
                expect(plt.isLandscape()).toEqual(true);
            });
            it('Should return false if orientation is not portrait', function () {
                expect(plt.isPortrait()).toEqual(false);
            });
            it('Should return true if orientation is portrait', function () {
                var portraitWindow = {
                    innerWidth: 200,
                    innerHeight: 300,
                    screen: {
                        width: 200,
                        height: 300
                    }
                };
                plt.setWindow(portraitWindow);
                expect(plt.isPortrait()).toEqual(true);
            });
            it('Should return false when orientation is landscape and then true when changed to portrait', function () {
                // start in landscape
                expect(plt.isPortrait()).toEqual(false);
                var portraitWindow = {
                    innerWidth: 200,
                    innerHeight: 300,
                    screen: {
                        width: 200,
                        height: 300
                    }
                };
                // change to portrait
                plt.setWindow(portraitWindow);
                expect(plt.isPortrait()).toEqual(true);
            });
            it('Should return true when orientation is landscape and then false when changed to portrait', function () {
                // start in landscape
                expect(plt.isLandscape()).toEqual(true);
                var portraitWindow = {
                    innerWidth: 200,
                    innerHeight: 300,
                    screen: {
                        width: 200,
                        height: 300
                    }
                };
                // change to portrait
                plt.setWindow(portraitWindow);
                expect(plt.isLandscape()).toEqual(false);
            });
            it('Should return a number that is equal to window.innerWidth', function () {
                var type = typeof plt.width();
                expect(type).toEqual('number');
                expect(plt.width()).toEqual(window.innerWidth);
            });
            it('Should return a number that is equal to window.innerHeight', function () {
                var type = typeof plt.height();
                expect(type).toEqual('number');
                expect(plt.height()).toEqual(window.innerHeight);
            });
        });
        describe('dimensions', function () {
            it('should return the correct width of the window', function () {
                expect(plt.width()).toEqual(window.innerWidth);
            });
            it('should return the correct height of the window', function () {
                expect(plt.height()).toEqual(window.innerHeight);
            });
            it('should return the correct width of the window after resize', function () {
                // start with default window
                expect(plt.width()).toEqual(window.innerWidth);
                var resizedWindow = {
                    innerWidth: 200,
                    innerHeight: 300,
                    screen: {
                        width: 200,
                        height: 300
                    }
                };
                // resize to smaller window
                plt.setWindow(resizedWindow);
                expect(plt.width()).toEqual(resizedWindow.innerWidth);
            });
            it('should return the correct height of the window after resize', function () {
                // start with default window
                expect(plt.height()).toEqual(window.innerHeight);
                var resizedWindow = {
                    innerWidth: 200,
                    innerHeight: 300,
                    screen: {
                        width: 200,
                        height: 300
                    }
                };
                // resize to smaller window
                plt.setWindow(resizedWindow);
                expect(plt.height()).toEqual(resizedWindow.innerHeight);
            });
        });
        it('should set core as the fallback', function () {
            plt.setDefault('core');
            plt.setQueryParams('');
            plt.setUserAgent('idk');
            plt.init();
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
            expect(plt.is('core')).toEqual(true);
        });
        it('should set windows via querystring', function () {
            plt.setQueryParams('/?ionicplatform=windows');
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('windows')).toEqual(true);
            expect(plt.is('ios')).toEqual(false);
        });
        it('should set ios via querystring', function () {
            plt.setQueryParams('/?ionicplatform=ios');
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('ios')).toEqual(true);
        });
        it('should set windows via querystring, even with android user agent', function () {
            plt.setQueryParams('/?ionicplatform=windows');
            plt.setUserAgent(ANDROID_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('windows')).toEqual(true);
            expect(plt.is('ios')).toEqual(false);
        });
        it('should set ios via querystring, even with android user agent', function () {
            plt.setQueryParams('/?ionicplatform=ios');
            plt.setUserAgent(ANDROID_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('ios')).toEqual(true);
        });
        it('should set android via querystring', function () {
            plt.setQueryParams('/?ionicplatform=android');
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('android')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
        });
        it('should set android via querystring, even with ios user agent', function () {
            plt.setQueryParams('/?ionicplatform=android');
            plt.setUserAgent(IPHONE_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('android')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
        });
        it('should set windows platform via user agent', function () {
            plt.setQueryParams('');
            plt.setUserAgent(WINDOWS_PHONE_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(true);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
        });
        it('should set windows platform via windows8 mobile user agent', function () {
            plt.setQueryParams('');
            plt.setUserAgent(WINDOWS8_PHONE_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(true);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
        });
        it('should set windows platform via windows7 mobile user agent', function () {
            plt.setQueryParams('');
            plt.setUserAgent(WINDOWS7_PHONE_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(true);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
        });
        it('should set android via user agent', function () {
            plt.setQueryParams('');
            plt.setUserAgent(ANDROID_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(true);
            expect(plt.is('ios')).toEqual(false);
            plt.setQueryParams('');
            plt.setUserAgent(ANDROID_7_1_1_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(true);
            expect(plt.is('ios')).toEqual(false);
        });
        it('should set iphone via user agent', function () {
            plt.setQueryParams('');
            plt.setUserAgent(IPHONE_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(true);
            expect(plt.is('iphone')).toEqual(true);
            expect(plt.is('ipad')).toEqual(false);
            expect(plt.is('tablet')).toEqual(false);
            plt.setQueryParams('');
            plt.setUserAgent(IPHONE_10_2_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(true);
            expect(plt.is('iphone')).toEqual(true);
            expect(plt.is('ipad')).toEqual(false);
            expect(plt.is('tablet')).toEqual(false);
        });
        it('should set ipad via user agent', function () {
            plt.setQueryParams('');
            plt.setUserAgent(IPAD_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(true);
            expect(plt.is('ipad')).toEqual(true);
            expect(plt.is('iphone')).toEqual(false);
            expect(plt.is('tablet')).toEqual(true);
            plt.setQueryParams('');
            plt.setUserAgent(IPAD_10_2_UA);
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(true);
            expect(plt.is('ipad')).toEqual(true);
            expect(plt.is('iphone')).toEqual(false);
            expect(plt.is('tablet')).toEqual(true);
        });
        // for https://forums.developer.apple.com/thread/25948
        it('should set ipad when user agent is iphone but navigator.platform is iPad', function () {
            plt.setQueryParams('');
            plt.setUserAgent(IPHONE_UA);
            plt.setNavigatorPlatform('iPad');
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(true);
            expect(plt.is('ipad')).toEqual(true);
            expect(plt.is('iphone')).toEqual(false);
            expect(plt.is('tablet')).toEqual(true);
            plt.setQueryParams('');
            plt.setUserAgent(IPHONE_10_2_UA);
            plt.setNavigatorPlatform('iPad');
            plt.init();
            expect(plt.is('core')).toEqual(false);
            expect(plt.is('mobile')).toEqual(true);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(true);
            expect(plt.is('ipad')).toEqual(true);
            expect(plt.is('iphone')).toEqual(false);
            expect(plt.is('tablet')).toEqual(true);
        });
        it('should set electron via user agent', function () {
            plt.setQueryParams('');
            plt.setDefault('core');
            plt.setUserAgent(OSX_10_ELECTRON_1_4_15_UA);
            plt.init();
            expect(plt.is('core')).toEqual(true);
            expect(plt.is('mobile')).toEqual(false);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
            expect(plt.is('ipad')).toEqual(false);
            expect(plt.is('tablet')).toEqual(false);
            expect(plt.is('electron')).toEqual(true);
        });
        it('should set core platform for osx desktop firefox', function () {
            plt.setQueryParams('');
            plt.setDefault('core');
            plt.setUserAgent(OSX_10_FIREFOX_43_UA);
            plt.init();
            expect(plt.is('core')).toEqual(true);
            expect(plt.is('mobile')).toEqual(false);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
            expect(plt.is('ipad')).toEqual(false);
            expect(plt.is('tablet')).toEqual(false);
        });
        it('should set core platform for osx desktop safari', function () {
            plt.setQueryParams('');
            plt.setDefault('core');
            plt.setUserAgent(OSX_10_SAFARI_9_UA);
            plt.init();
            expect(plt.is('core')).toEqual(true);
            expect(plt.is('mobile')).toEqual(false);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
            expect(plt.is('ipad')).toEqual(false);
            expect(plt.is('tablet')).toEqual(false);
        });
        it('should set core platform for osx desktop chrome', function () {
            plt.setQueryParams('');
            plt.setDefault('core');
            plt.setUserAgent(OSX_10_CHROME_49_UA);
            plt.init();
            expect(plt.is('core')).toEqual(true);
            expect(plt.is('mobile')).toEqual(false);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
            expect(plt.is('ipad')).toEqual(false);
            expect(plt.is('tablet')).toEqual(false);
        });
        it('should set core platform for windows desktop chrome', function () {
            plt.setQueryParams('');
            plt.setDefault('core');
            plt.setUserAgent(WINDOWS_10_CHROME_40_UA);
            plt.init();
            expect(plt.is('core')).toEqual(true);
            expect(plt.is('mobile')).toEqual(false);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
            expect(plt.is('ipad')).toEqual(false);
            expect(plt.is('tablet')).toEqual(false);
        });
        it('should set core platform for windows desktop edge', function () {
            plt.setQueryParams('');
            plt.setDefault('core');
            plt.setUserAgent(WINDOWS_10_EDGE_12_UA);
            plt.init();
            expect(plt.is('core')).toEqual(true);
            expect(plt.is('mobile')).toEqual(false);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
            expect(plt.is('ipad')).toEqual(false);
            expect(plt.is('tablet')).toEqual(false);
        });
        it('should set core platform for windows desktop IE', function () {
            plt.setQueryParams('');
            plt.setDefault('core');
            plt.setUserAgent(WINDOWS_8_IE_11_UA);
            plt.init();
            expect(plt.is('core')).toEqual(true);
            expect(plt.is('mobile')).toEqual(false);
            expect(plt.is('windows')).toEqual(false);
            expect(plt.is('android')).toEqual(false);
            expect(plt.is('ios')).toEqual(false);
            expect(plt.is('ipad')).toEqual(false);
            expect(plt.is('tablet')).toEqual(false);
        });
        var plt;
        beforeEach(function () {
            plt = new platform_1.Platform();
            plt.setWindow(window);
            plt.setDocument(document);
            plt.setPlatformConfigs(platform_registry_1.PLATFORM_CONFIGS);
            mode_registry_1.registerModeConfigs(new config_1.Config())();
        });
    });
    var OSX_10_FIREFOX_43_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0';
    var OSX_10_SAFARI_9_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/601.4.4 (KHTML, like Gecko) Version/9.0.3 Safari/601.4.4';
    var OSX_10_CHROME_49_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36';
    var OSX_10_ELECTRON_1_4_15_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) ionic-hello-world/1.4.15 Chrome/53.0.2785.143 Electron/1.4.15 Safari/537.36';
    var WINDOWS_10_CHROME_40_UA = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36';
    var WINDOWS_10_EDGE_12_UA = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    var WINDOWS_8_IE_11_UA = 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko';
    var WINDOWS_PHONE_UA = 'Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 930) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537';
    var WINDOWS8_PHONE_UA = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)';
    var WINDOWS7_PHONE_UA = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; LG; GW910)';
    var ANDROID_UA = 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.20 Mobile Safari/537.36';
    var ANDROID_7_1_1_UA = 'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36';
    var IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';
    var IPHONE_10_2_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C89 (140564782665216)';
    var IPAD_UA = 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';
    var IPAD_10_2_UA = 'Mozilla/5.0 (iPad; CPU OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C89 (140342232906320)';
});
//# sourceMappingURL=platform.spec.js.map