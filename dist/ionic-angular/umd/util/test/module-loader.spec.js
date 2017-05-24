(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../module-loader", "../mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var module_loader_1 = require("../module-loader");
    var mock_providers_1 = require("../mock-providers");
    describe('module-loader', function () {
        describe('load', function () {
            it('should call ngModuleLoader and receive a promise back', function (done) {
                var mockLoadedModule = {
                    create: function () { }
                };
                var mockComponentFactoryResolver = {};
                var mockInjector = {
                    get: function () { }
                };
                var mockNgModuleRef = {
                    injector: mockInjector,
                    componentFactoryResolver: mockComponentFactoryResolver
                };
                var mockComponent = {};
                spyOn(mockInjector, mockInjector.get.name).and.returnValue(mockComponent);
                spyOn(mockLoadedModule, mockLoadedModule.create.name).and.returnValue(mockNgModuleRef);
                spyOn(ngModuleLoader, 'load').and.returnValue(Promise.resolve(mockLoadedModule));
                var pathPrefix = '../some/known/path';
                var exportSuffix = 'SomeModule';
                var loadChildren = pathPrefix + '#' + exportSuffix;
                var promise = moduleLoader.load(loadChildren);
                promise.then(function (response) {
                    expect(ngModuleLoader.load).toHaveBeenCalledWith(pathPrefix, exportSuffix);
                    expect(mockLoadedModule.create).toHaveBeenCalledWith(null); // whatever the injector is
                    expect(mockInjector.get).toHaveBeenCalledWith(module_loader_1.LAZY_LOADED_TOKEN);
                    expect(response.component).toEqual(mockComponent);
                    expect(response.componentFactoryResolver).toEqual(mockComponentFactoryResolver);
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should only call the ngModuleLoader when there is not an active request', function () {
                var resolve = null;
                var reject = null;
                var promise = new Promise(function (scopedResolved, scopedReject) {
                    resolve = scopedResolved;
                    reject = scopedReject;
                });
                spyOn(ngModuleLoader, 'load').and.returnValue(promise);
                var pathPrefix = '../some/known/path';
                var exportSuffix = 'SomeModule';
                var loadChildren = pathPrefix + '#' + exportSuffix;
                promise = moduleLoader.load(loadChildren);
                // the promise is not resolved
                var secondPromise = moduleLoader.load(loadChildren);
                // The promise returned should be the cached promise
                expect(promise).toEqual(secondPromise);
                expect(ngModuleLoader.load).toHaveBeenCalledTimes(1);
            });
            it('should call the ngModuleLoader twice and return the active request', function () {
                var resolve = null;
                var reject = null;
                var promise = new Promise(function (scopedResolved, scopedReject) {
                    resolve = scopedResolved;
                    reject = scopedReject;
                });
                var promise2 = new Promise(function (scopedResolved, scopedReject) {
                    resolve = scopedResolved;
                    reject = scopedReject;
                });
                spyOn(ngModuleLoader, 'load').and.returnValue(promise);
                // Load the first module
                var pathPrefix = '../some/known/path';
                var exportSuffix = 'SomeModule';
                var loadChildren = pathPrefix + '#' + exportSuffix;
                promise = moduleLoader.load(loadChildren);
                expect(ngModuleLoader.load).toHaveBeenCalledWith(pathPrefix, exportSuffix);
                // Load the second module
                var pathPrefix2 = '../another/known/path';
                var exportSuffix2 = 'AnotherModule';
                var loadChildren2 = pathPrefix2 + '#' + exportSuffix2;
                promise2 = moduleLoader.load(loadChildren2);
                expect(ngModuleLoader.load).toHaveBeenCalledWith(pathPrefix2, exportSuffix2);
                // Load the first module before the promise has resolved
                var secondPromise = moduleLoader.load(loadChildren);
                // The promise returned from the first module should be the cached promise
                expect(promise).toEqual(secondPromise);
                // Load the second module before the promise has resolved
                var thirdPromise = moduleLoader.load(loadChildren2);
                // The promise returned from the second module should be the cached promise
                expect(promise2).toEqual(thirdPromise);
                expect(ngModuleLoader.load).toHaveBeenCalledTimes(2);
            });
        });
        describe('setupPreloadingImplementation', function () {
            it('should return a promise', function (done) {
                var promise = module_loader_1.setupPreloadingImplementation(config, null, moduleLoader);
                promise.then(function (response) {
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should not call ModuleLoader when preloading disabled', function (done) {
                spyOn(moduleLoader, 'load').and.returnValue(Promise.resolve());
                config.set('preloadModules', false);
                var deepLinkConfig = {
                    links: []
                };
                var promise = module_loader_1.setupPreloadingImplementation(config, deepLinkConfig, moduleLoader);
                promise.then(function (response) {
                    expect(moduleLoader.load).not.toHaveBeenCalled();
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should not call ModuleLoader when deepLinkConfig missing', function (done) {
                spyOn(moduleLoader, 'load').and.returnValue(Promise.resolve());
                config.set('preloadModules', true);
                var promise = module_loader_1.setupPreloadingImplementation(config, null, moduleLoader);
                promise.then(function (response) {
                    expect(moduleLoader.load).not.toHaveBeenCalled();
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should not call ModuleLoader when no low or high priority links', function (done) {
                spyOn(moduleLoader, 'load').and.returnValue(Promise.resolve());
                config.set('preloadModules', true);
                var deepLinkConfig = {
                    links: [{
                            loadChildren: 'offString',
                            priority: 'off'
                        }]
                };
                var promise = module_loader_1.setupPreloadingImplementation(config, deepLinkConfig, moduleLoader);
                promise.then(function (response) {
                    expect(moduleLoader.load).not.toHaveBeenCalled();
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should call ModuleLoader when has low priority links', function (done) {
                spyOn(moduleLoader, 'load').and.returnValue(Promise.resolve());
                config.set('preloadModules', true);
                var deepLinkConfig = {
                    links: [{
                            loadChildren: 'lowString',
                            priority: 'low'
                        }]
                };
                var promise = module_loader_1.setupPreloadingImplementation(config, deepLinkConfig, moduleLoader);
                promise.then(function (response) {
                    expect(moduleLoader.load).toHaveBeenCalledWith('lowString');
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
            it('should call ModuleLoader when has high priority links', function (done) {
                spyOn(moduleLoader, 'load').and.returnValue(Promise.resolve());
                config.set('preloadModules', true);
                var deepLinkConfig = {
                    links: [{
                            loadChildren: 'highString',
                            priority: 'high'
                        }]
                };
                var promise = module_loader_1.setupPreloadingImplementation(config, deepLinkConfig, moduleLoader);
                promise.then(function (response) {
                    expect(moduleLoader.load).toHaveBeenCalledWith('highString');
                    done();
                }).catch(function (err) {
                    fail(err);
                    done(err);
                });
            });
        });
        var moduleLoader;
        var ngModuleLoader;
        var config;
        beforeEach(function () {
            ngModuleLoader = mock_providers_1.mockNgModuleLoader();
            moduleLoader = mock_providers_1.mockModuleLoader(ngModuleLoader);
            config = mock_providers_1.mockConfig();
        });
    });
});
//# sourceMappingURL=module-loader.spec.js.map