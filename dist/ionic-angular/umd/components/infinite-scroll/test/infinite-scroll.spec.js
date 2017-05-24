(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../content/content", "../infinite-scroll", "../../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var content_1 = require("../../content/content");
    var infinite_scroll_1 = require("../infinite-scroll");
    var mock_providers_1 = require("../../../util/mock-providers");
    describe('Infinite Scroll', function () {
        describe('_onScroll', function () {
            it('should not set loading state when does not meet threshold', function () {
                setInfiniteScrollHeight(25);
                content.getContentDimensions = function () {
                    return mockGetContentDimensions(1000, 350, 500);
                };
                inf.threshold = '100px';
                setInfiniteScrollTop(300);
                var result = inf._onScroll(ev);
                expect(result).toEqual(6);
            });
            it('should set loading state when meets threshold', function () {
                setInfiniteScrollHeight(25);
                content.getContentDimensions = function () {
                    return mockGetContentDimensions(1000, 500, 500);
                };
                inf.threshold = '100px';
                setInfiniteScrollTop(300);
                var result = inf._onScroll(ev);
                expect(result).toEqual(5);
            });
            it('should not run if there is not infinite element height', function () {
                setInfiniteScrollTop(0);
                var result = inf._onScroll(ev);
                expect(result).toEqual(3);
            });
            it('should not run again if ran less than 32ms ago', function () {
                ev.timeStamp = Date.now();
                inf._lastCheck = Date.now();
                var result = inf._onScroll(ev);
                expect(result).toEqual(2);
            });
            it('should not run if state is disabled', function () {
                inf.state = 'disabled';
                var result = inf._onScroll(ev);
                expect(result).toEqual(1);
            });
            it('should not run if state is loading', function () {
                inf.state = 'loading';
                var result = inf._onScroll(ev);
                expect(result).toEqual(1);
            });
            it('should not run if not enabled', function () {
                inf.state = 'disabled';
                var result = inf._onScroll(ev);
                expect(result).toEqual(1);
            });
        });
        describe('threshold', function () {
            it('should set by percent', function () {
                inf.threshold = '10%';
                expect(inf._thr).toEqual('10%');
                expect(inf._thrPx).toEqual(0);
                expect(inf._thrPc).toEqual(0.1);
            });
            it('should set by pixels', function () {
                inf.threshold = '10';
                expect(inf._thr).toEqual('10');
                expect(inf._thrPx).toEqual(10);
                expect(inf._thrPc).toEqual(0);
                inf.threshold = '10px';
                expect(inf._thr).toEqual('10px');
                expect(inf._thrPx).toEqual(10);
                expect(inf._thrPc).toEqual(0);
            });
        });
        describe('position', function () {
            it('should default to bottom', function () {
                expect(inf._position).toEqual('bottom');
            });
            it('should set to top', function () {
                inf.position = 'top';
                expect(inf._position).toEqual('top');
            });
            it('should set to bottom', function () {
                inf.position = 'bottom';
                expect(inf._position).toEqual('bottom');
            });
            it('should not set to anything else', function () {
                inf.position = 'derp';
                expect(inf._position).toEqual('bottom');
            });
        });
        var config = mock_providers_1.mockConfig();
        var inf;
        var content;
        var contentElementRef;
        var infiniteElementRef;
        var ev = {};
        var dom;
        beforeEach(function () {
            contentElementRef = mock_providers_1.mockElementRef();
            dom = mock_providers_1.mockDomController();
            content = new content_1.Content(config, mock_providers_1.mockPlatform(), dom, contentElementRef, mock_providers_1.mockRenderer(), null, null, mock_providers_1.mockZone(), null, null);
            var ele = document.createElement('div');
            ele.className = 'scroll-content';
            content._scrollContent = mock_providers_1.mockElementRefEle(ele);
            infiniteElementRef = mock_providers_1.mockElementRef();
            inf = new infinite_scroll_1.InfiniteScroll(content, mock_providers_1.mockZone(), infiniteElementRef, dom);
        });
        function setInfiniteScrollTop(scrollTop) {
            infiniteElementRef.nativeElement.scrollTop = scrollTop;
        }
        function setInfiniteScrollHeight(scrollHeight) {
            infiniteElementRef.nativeElement.scrollHeight = scrollHeight;
        }
        function mockGetContentDimensions(scrollHeight, scrollTop, contentHeight) {
            return {
                scrollHeight: scrollHeight,
                scrollTop: scrollTop,
                contentHeight: contentHeight,
                contentTop: null,
                contentBottom: null,
                contentWidth: null,
                contentLeft: null,
                contentRight: null,
                scrollBottom: null,
                scrollWidth: null,
                scrollLeft: null,
                scrollRight: null
            };
        }
    });
});
//# sourceMappingURL=infinite-scroll.spec.js.map