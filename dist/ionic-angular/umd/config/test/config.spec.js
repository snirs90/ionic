(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../config", "../../platform/platform", "../../platform/platform-registry", "../mode-registry"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config_1 = require("../config");
    var platform_1 = require("../../platform/platform");
    var platform_registry_1 = require("../../platform/platform-registry");
    var mode_registry_1 = require("../mode-registry");
    describe('Config', function () {
        it('should set activator setting to none for old Android Browser on a linux device', function () {
            plt.setUserAgent('Mozilla/5.0 (Linux; U; Android 4.2.2; nl-nl; GT-I9505 Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30');
            plt.setNavigatorPlatform('linux');
            plt.setQueryParams('');
            plt.init();
            config.init(null, plt);
            expect(config.get('activator')).toEqual('none');
        });
        it('should set activator setting to ripple for Android dev tools simulation on a mac', function () {
            plt.setUserAgent('Mozilla/5.0 (Linux; U; Android 4.2.2; nl-nl; GT-I9505 Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30');
            plt.setNavigatorPlatform('MacIntel');
            plt.setQueryParams('');
            plt.init();
            config.init(null, plt);
            expect(config.get('activator')).toEqual('ripple');
        });
        it('should set activator setting to none for Android Chrome versions below v36 on a linux device', function () {
            plt.setUserAgent('Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1650.59 Mobile Safari/537.36');
            plt.setNavigatorPlatform('linux');
            plt.setQueryParams('');
            plt.init();
            config.init(null, plt);
            expect(config.get('activator')).toEqual('none');
        });
        it('should set activator setting to ripple for Android v5.0 and above using Chrome v36 and above on a linux device', function () {
            plt.setUserAgent('Mozilla/5.0 (Linux; Android 5.0; Google Nexus 5 - 5.1.0 - API 22 - 1080x1920 Build/LMY47D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Crosswalk/22.52.561.4 Mobile Safari/537.36');
            plt.setNavigatorPlatform('linux');
            plt.setQueryParams('');
            plt.init();
            config.init(null, plt);
            expect(config.get('activator')).toEqual('ripple');
        });
        it('should set activator setting to none for Android v4.4 and below and Chrome v36 and above on a linux device', function () {
            plt.setUserAgent('Mozilla/5.0 (Linux; Android 4.4.2; XT901 Build/KDA20.92-3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Crosswalk/22.52.561.4 Mobile Safari/537.36');
            plt.setNavigatorPlatform('linux');
            plt.setQueryParams('');
            plt.init();
            config.init(null, plt);
            expect(config.get('activator')).toEqual('none');
        });
        it('should set activator setting to ripple for Android v5.0 and above on a linux device not using Chrome', function () {
            plt.setUserAgent('Mozilla/5.0 (Android 5.0; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0');
            plt.setNavigatorPlatform('linux');
            plt.setQueryParams('');
            plt.init();
            config.init(null, plt);
            expect(config.get('activator')).toEqual('ripple');
        });
        it('should set activator setting to none for Android versions below v5.0 on a linux device not using Chrome', function () {
            plt.setUserAgent('Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0');
            plt.setNavigatorPlatform('linux');
            plt.setQueryParams('');
            plt.init();
            config.init(null, plt);
            expect(config.get('activator')).toEqual('none');
        });
        it('should override mode settings', function () {
            plt._platforms = ['ios'];
            config.init({
                mode: 'md'
            }, plt);
            expect(config.get('mode')).toEqual('md');
            expect(config.get('iconMode')).toEqual('md');
        });
        it('should override mode settings from platforms setting', function () {
            plt._platforms = ['ios'];
            config.init({
                platforms: {
                    ios: {
                        mode: 'md'
                    }
                }
            }, plt);
            expect(config.get('mode')).toEqual('md');
            expect(config.get('iconMode')).toEqual('md');
        });
        it('should get boolean value from querystring', function () {
            plt.setQueryParams('http://biff.com/?ionicanimate=true');
            config.init(null, plt);
            expect(config.get('animate')).toEqual(true);
            config = new config_1.Config();
            plt = new platform_1.Platform();
            plt.setQueryParams('http://biff.com/?ionicanimate=false');
            config.init(null, plt);
            expect(config.get('animate')).toEqual(false);
        });
        it('should get value from case insensitive querystring key', function () {
            plt.setQueryParams('http://biff.com/?ionicConfigKey=b');
            config.init({
                mode: 'a'
            }, plt);
            expect(config.get('configKey')).toEqual('b');
        });
        it('should get value from querystring', function () {
            plt.setQueryParams('http://biff.com/?ionicmode=modeB');
            config.init({
                mode: 'modeA'
            }, plt);
            expect(config.get('mode')).toEqual('modeB');
        });
        it('should override mode platform', function () {
            plt._platforms = ['mobile'];
            config.init({
                mode: 'modeA',
                platforms: {
                    mobile: {
                        mode: 'modeB'
                    },
                    ios: {
                        mode: 'modeC'
                    }
                }
            }, plt);
            expect(config.get('mode')).toEqual('modeB');
        });
        it('should override mode', function () {
            plt._platforms = ['core'];
            config.init({
                mode: 'modeA'
            }, plt);
            expect(config.get('mode')).toEqual('modeA');
        });
        it('should get user settings after user platform settings', function () {
            plt._platforms = ['ios'];
            config.init({
                hoverCSS: true
            }, plt);
            expect(config.get('hoverCSS')).toEqual(true);
        });
        it('should get md mode for core platform', function () {
            plt._platforms = ['core'];
            config.init(null, plt);
            expect(config.get('mode')).toEqual('md');
        });
        it('should get ios mode for ipad platform', function () {
            plt._platforms = ['mobile', 'ios', 'ipad', 'tablet'];
            config.init(null, plt);
            expect(config.get('mode')).toEqual('ios');
        });
        it('should get md mode for windows platform', function () {
            plt._platforms = ['mobile', 'windows'];
            config.init(null, plt);
            expect(config.get('mode')).toEqual('wp');
        });
        it('should get md mode for android platform', function () {
            plt._platforms = ['mobile', 'android'];
            config.init(null, plt);
            expect(config.get('mode')).toEqual('md');
        });
        it('should override ios mode config with user platform setting', function () {
            plt._platforms = ['ios'];
            config.init({
                tabsPlacement: 'hide',
                platforms: {
                    ios: {
                        tabsPlacement: 'top'
                    }
                }
            }, plt);
            expect(config.get('tabsPlacement')).toEqual('top');
        });
        it('should override ios mode config with user setting', function () {
            plt._platforms = ['ios'];
            config.init({
                tabsPlacement: 'top'
            }, plt);
            expect(config.get('tabsPlacement')).toEqual('top');
        });
        it('should get setting from md mode', function () {
            plt._platforms = ['android'];
            config.init(null, plt);
            expect(config.get('iconMode')).toEqual('md');
        });
        it('should get setting from ios mode', function () {
            plt._platforms = ['ios'];
            config.init(null, plt);
            expect(config.get('tabsPlacement')).toEqual('bottom');
        });
        it('should set/get platform setting from set()', function () {
            plt._platforms = ['ios'];
            config.init(null, plt);
            config.set('tabsPlacement', 'bottom');
            config.set('ios', 'tabsPlacement', 'top');
            expect(config.get('tabsPlacement')).toEqual('top');
        });
        it('should set/get setting from set()', function () {
            plt._platforms = ['ios'];
            config.init(null, plt);
            config.set('tabsPlacement', 'top');
            expect(config.get('tabsPlacement')).toEqual('top');
        });
        it('should set ios platform settings from settings()', function () {
            plt._platforms = ['ios'];
            config.init(null, plt);
            config.settings('ios', {
                key: 'iosValue'
            });
            expect(config.get('key')).toEqual('iosValue');
        });
        it('should set/get mobile setting even w/ higher priority ios', function () {
            plt._platforms = ['mobile', 'ios'];
            config.init({
                key: 'defaultValue',
                platforms: {
                    mobile: {
                        key: 'mobileValue'
                    }
                }
            }, plt);
            expect(config.get('key')).toEqual('mobileValue');
        });
        it('should set/get mobile setting even w/ higher priority ios', function () {
            plt._platforms = ['mobile', 'ios'];
            config.init({
                key: 'defaultValue',
                platforms: {
                    mobile: {
                        key: 'mobileValue'
                    }
                }
            }, plt);
            expect(config.get('key')).toEqual('mobileValue');
        });
        it('should set/get android setting w/ higher priority than mobile', function () {
            plt._platforms = ['mobile', 'android'];
            config.init({
                key: 'defaultValue',
                platforms: {
                    mobile: {
                        key: 'mobileValue'
                    },
                    android: {
                        key: 'androidValue'
                    }
                }
            }, plt);
            expect(config.get('key')).toEqual('androidValue');
        });
        it('should set/get ios setting w/ platforms set', function () {
            plt._platforms = ['ios'];
            config.init(null, plt);
            config.settings({
                key: 'defaultValue',
                platforms: {
                    ios: {
                        key: 'iosValue'
                    },
                    android: {
                        key: 'androidValue'
                    }
                }
            });
            expect(config.get('key')).toEqual('iosValue');
        });
        it('should set/get default setting w/ platforms set, but no platform match', function () {
            config.settings({
                key: 'defaultValue',
                platforms: {
                    ios: {
                        key: 'iosValue'
                    },
                    android: {
                        key: 'androidValue'
                    }
                }
            });
            expect(config.get('key')).toEqual('defaultValue');
        });
        it('should set setting object', function () {
            config.settings({
                name: 'Doc Brown',
                occupation: 'Weather Man'
            });
            expect(config.get('name')).toEqual('Doc Brown');
            expect(config.get('name')).toEqual('Doc Brown');
            expect(config.get('occupation')).toEqual('Weather Man');
            expect(config.get('occupation')).toEqual('Weather Man');
        });
        it('should get null setting', function () {
            config.init(null, null);
            expect(config.get('name')).toEqual(null);
            expect(config.get('name')).toEqual(null);
            expect(config.get('occupation')).toEqual(null);
            expect(config.get('occupation')).toEqual(null);
        });
        it('should set/get single setting', function () {
            config.init(null, null);
            config.set('name', 'Doc Brown');
            config.set('occupation', 'Weather Man');
            expect(config.get('name')).toEqual('Doc Brown');
            expect(config.get('name')).toEqual('Doc Brown');
            expect(config.get('occupation')).toEqual('Weather Man');
            expect(config.get('occupation')).toEqual('Weather Man');
        });
        it('should init w/ given config settings', function () {
            config.init({
                name: 'Doc Brown',
                occupation: 'Weather Man'
            }, null);
            expect(config.get('name')).toEqual('Doc Brown');
            expect(config.get('occupation')).toEqual('Weather Man');
        });
        it('should get a fallback value', function () {
            config.init({
                name: 'Doc Brown'
            }, null);
            expect(config.get('name', 'Marty')).toEqual('Doc Brown');
            expect(config.get('occupation', 'Weather Man')).toEqual('Weather Man');
        });
        it('should get a boolean value with a boolean config value', function () {
            config.init({
                key1: true,
                key2: false
            }, null);
            expect(config.getBoolean('key1')).toEqual(true);
            expect(config.getBoolean('key2')).toEqual(false);
        });
        it('should get a boolean value with a string config value', function () {
            config.init({
                key1: 'true',
                key2: 'false',
                key3: 'whatever'
            }, null);
            expect(config.getBoolean('key1')).toEqual(true);
            expect(config.getBoolean('key2')).toEqual(false);
            expect(config.getBoolean('key3')).toEqual(false);
            expect(config.getBoolean('key4')).toEqual(false);
            expect(config.getBoolean('key5', true)).toEqual(true);
        });
        it('should get a boolean value with a number config value', function () {
            config.init({
                key1: 0,
                key2: 1,
                key3: 'whatever'
            }, null);
            expect(config.getBoolean('key1')).toEqual(false);
            expect(config.getBoolean('key2')).toEqual(true);
        });
        it('should get a number value with a number config value', function () {
            config.init({
                key: 6
            }, null);
            expect(config.getNumber('key')).toEqual(6);
        });
        it('should get a number value with a string config value', function () {
            config.init({
                key: '6',
                numThenString: '6baymax',
                stringThenNum: 'baymax6'
            }, null);
            expect(config.getNumber('key', 5)).toEqual(6);
            expect(config.getNumber('numThenString', 4)).toEqual(6);
            expect(isNaN(config.getNumber('stringThenNum'))).toEqual(true);
        });
        it('should get a number NaN value with a NaN config value', function () {
            config.init({
                allString: 'allstring',
                imNull: null,
                imUndefined: undefined
            }, null);
            expect(isNaN(config.getNumber('notfound'))).toEqual(true);
            expect(isNaN(config.getNumber('allString'))).toEqual(true);
            expect(isNaN(config.getNumber('imNull'))).toEqual(true);
            expect(isNaN(config.getNumber('imUndefined'))).toEqual(true);
        });
        it('should get a number fallback value with a NaN config value', function () {
            config.init({
                allString: 'allstring',
                imNull: null,
                imUndefined: undefined
            }, null);
            expect(config.getNumber('notfound', 6)).toEqual(6);
            expect(config.getNumber('allString', 6)).toEqual(6);
            expect(config.getNumber('imNull', 6)).toEqual(6);
            expect(config.getNumber('imUndefined', 6)).toEqual(6);
        });
        it('should get settings object', function () {
            config.init({
                name: 'Doc Brown',
                occupation: 'Weather Man'
            }, null);
            expect(config.settings()).toEqual({
                name: 'Doc Brown',
                occupation: 'Weather Man'
            });
        });
        it('should create default config w/ bad settings value', function () {
            var config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
            config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
            config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
            config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
            config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
            config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
            config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
            config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
            config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
            config = new config_1.Config();
            config.init(null, null);
            expect(config.settings()).toEqual({});
        });
        var plt;
        var config;
        beforeEach(function () {
            config = new config_1.Config();
            mode_registry_1.registerModeConfigs(config)();
            plt = new platform_1.Platform();
            plt.setPlatformConfigs(platform_registry_1.PLATFORM_CONFIGS);
            plt.setWindow(window);
            plt.setDocument(document);
        });
    });
});
//# sourceMappingURL=config.spec.js.map