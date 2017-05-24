(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../content/content", "../img", "../../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var content_1 = require("../../content/content");
    var img_1 = require("../img");
    var mock_providers_1 = require("../../../util/mock-providers");
    describe('Img', function () {
        describe('reset', function () {
            it('should clear rendering src', function () {
                spyOn(img, '_isLoaded');
                img._renderedSrc = '_renderedSrc.jpg';
                img.reset();
                expect(img._isLoaded).toHaveBeenCalledWith(false);
                expect(img._renderedSrc).toEqual(null);
            });
        });
        describe('src setter', function () {
            it('should set datauri src', function () {
                spyOn(img, 'update');
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==';
                expect(img.src).toEqual('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==');
                expect(img.update).toHaveBeenCalled();
            });
            it('should set src', function () {
                spyOn(img, 'update');
                img.src = 'image.jpg';
                expect(img.src).toEqual('image.jpg');
                expect(img.update).toHaveBeenCalled();
            });
        });
        describe('src getter', function () {
            it('should get src if set', function () {
                img._src = 'loaded.jpg';
                expect(img.src).toEqual('loaded.jpg');
            });
        });
        var contentElementRef;
        var img;
        var elementRef;
        var renderer;
        var plt;
        var content;
        var dom;
        beforeEach(function () {
            contentElementRef = mock_providers_1.mockElementRef();
            dom = mock_providers_1.mockDomController();
            content = new content_1.Content(mock_providers_1.mockConfig(), mock_providers_1.mockPlatform(), dom, contentElementRef, mock_providers_1.mockRenderer(), null, null, mock_providers_1.mockZone(), null, null);
            var ele = document.createElement('div');
            ele.className = 'scroll-content';
            content._scrollContent = mock_providers_1.mockElementRefEle(ele);
            elementRef = mock_providers_1.mockElementRef();
            renderer = mock_providers_1.mockRenderer();
            plt = mock_providers_1.mockPlatform();
            dom = mock_providers_1.mockDomController();
            img = new img_1.Img(elementRef, renderer, plt, content, dom);
        });
    });
});
//# sourceMappingURL=img.spec.js.map