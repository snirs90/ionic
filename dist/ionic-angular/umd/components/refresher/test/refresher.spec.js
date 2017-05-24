(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../refresher", "../../content/content", "../../../gestures/gesture-controller", "../../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var refresher_1 = require("../refresher");
    var content_1 = require("../../content/content");
    var gesture_controller_1 = require("../../../gestures/gesture-controller");
    var mock_providers_1 = require("../../../util/mock-providers");
    describe('Refresher', function () {
        describe('_onEnd', function () {
            it('should set to refreshing if state=ready', function () {
                refresher.state = 'ready';
                refresher._onEnd();
                expect(refresher.state).toEqual('refreshing');
            });
            it('should set to canelling if state=pulling on release', function () {
                refresher.state = 'pulling';
                refresher._onEnd();
                expect(refresher.state).toEqual('cancelling');
            });
            it('should do nothing if state=cancelling', function () {
                refresher.state = 'cancelling';
                refresher._onEnd();
                expect(refresher.state).toEqual('cancelling');
            });
            it('should do nothing if state=completing', function () {
                refresher.state = 'completing';
                refresher._onEnd();
                expect(refresher.state).toEqual('completing');
            });
            it('should do nothing if state=refreshing', function () {
                refresher.state = 'refreshing';
                refresher._onEnd();
                expect(refresher.state).toEqual('refreshing');
            });
            it('should do nothing if state=inactive', function () {
                refresher.state = 'inactive';
                refresher._onEnd();
                expect(refresher.state).toEqual('inactive');
            });
        });
        describe('_onMoveInZone', function () {
            it('should set ready state when pulling down and it went past the pull min', function () {
                refresher.state = 'inactive';
                refresher.pullMin = 100;
                refresher.pullMax = 200;
                refresher.deltaY = 100;
                var result = refresher._onMoveInZone();
                expect(result).toEqual(4);
                expect(refresher.state).toEqual('ready');
                expect(refresher.progress).toEqual(1);
            });
            it('should set begin refreshing when pulling down and it went past the pull max', function () {
                refresher.state = 'inactive';
                refresher.pullMin = 100;
                refresher.pullMax = 200;
                refresher.deltaY = 250;
                var result = refresher._onMoveInZone();
                expect(result).toEqual(3);
                expect(refresher.state).toEqual('refreshing');
                expect(refresher.progress).toEqual(2.5);
            });
            it('should set pulling state when pulling down, but not past the pull min', function () {
                refresher.state = 'inactive';
                refresher.pullMin = 100;
                refresher.pullMax = 200;
                refresher.deltaY = 50;
                var result = refresher._onMoveInZone();
                expect(result).toEqual(2);
                expect(refresher.state).toEqual('pulling');
                expect(refresher.progress).toEqual(0.5);
            });
        });
        describe('_onMove', function () {
            it('should set scrollElement inline styles when pulling down, but not past threshold', function (done) {
                setContentScrollTop(0);
                refresher.startY = 100;
                refresher.pullMin = 80;
                refresher._onMove(touchEv(125));
                done();
                // dom.flush(() => {
                //   // expect(getScrollElementStyles().transform).toEqual('translateY(25px) translateZ(0px)');
                //   // expect(getScrollElementStyles().transitionDuration).toEqual('0ms');
                //   // expect(getScrollElementStyles().overflow).toEqual('hidden');
                //   done();
                // });
            });
            it('should set scrollElement inline styles when pulling up above startY', function () {
                refresher.state = 'inactive';
                refresher._appliedStyles = false;
                setContentScrollTop(1);
                refresher.startY = 100;
                var result = refresher._onMove(touchEv(95));
                expect(result).toEqual(6);
            });
            it('should not pull when scrolling down, state=inactive, deltaY>0, scrollTop>0', function () {
                refresher.state = 'inactive';
                setContentScrollTop(50);
                refresher.startY = 100;
                var result = refresher._onMove(touchEv(125));
                expect(refresher.state).toEqual('inactive');
                expect(refresher.progress).toEqual(0);
                expect(refresher.startY).toEqual(null);
                expect(result).toEqual(7);
            });
            it('should reset styles when _appliedStyles=true, delta<=0', function (done) {
                refresher._appliedStyles = true;
                refresher.startY = 100;
                refresher._onMove(touchEv(85));
                done();
                // dom.flush(() => {
                //   expect(refresher.state).toEqual('inactive');
                //   expect(getScrollElementStyles().transform).toEqual('translateZ(0px)');
                //   expect(getScrollElementStyles().transitionDuration).toEqual('');
                //   expect(getScrollElementStyles().overflow).toEqual('');
                //   expect(result).toEqual(5);
                //   done();
                // });
            });
            it('should not run when scrollTop is > 0', function () {
                setContentScrollTop(50);
                refresher.startY = 100;
                var results = refresher._onMove(touchEv(80));
                expect(results).toEqual(6);
            });
            it('should not run when scrolling up, but isnt actively dragging', function () {
                setContentScrollTop(1);
                refresher.startY = 100;
                var results = refresher._onMove(touchEv(85));
                expect(results).toEqual(6);
            });
            it('should set the deltaY', function () {
                setContentScrollTop(1);
                refresher.startY = 100;
                refresher._onMove(touchEv(133));
                expect(refresher.deltaY).toEqual(33);
                refresher._lastCheck = 0; // force allow next check
                refresher.startY = 100;
                var results = refresher._onMove(touchEv(50));
                expect(results).toEqual(6);
                expect(refresher.deltaY).toEqual(-50);
            });
            it('should not run if it already ran less than 16ms ago', function () {
                refresher.startY = 100;
                var results = refresher._onMove(touchEv(88));
                expect(results).toEqual(6);
                results = refresher._onMove(touchEv(88));
                expect(results).toEqual(3);
            });
            it('should not run if state=refreshing', function () {
                refresher.startY = 100;
                refresher.state = 'refreshing';
                var results = refresher._onMove(touchEv(88));
                expect(results).toEqual(2);
            });
            it('should not run if state=completing', function () {
                refresher.startY = 100;
                refresher.state = 'completing';
                var results = refresher._onMove(touchEv(88));
                expect(results).toEqual(2);
            });
            it('should not run if state=cancelling', function () {
                refresher.startY = 100;
                refresher.state = 'cancelling';
                var results = refresher._onMove(touchEv(88));
                expect(results).toEqual(2);
            });
            it('should not run if no startY', function () {
                refresher.startY = null;
                var results = refresher._onMove(touchEv(88));
                expect(results).toEqual(2);
            });
            it('should not run if multiple touches', function () {
                var results = refresher._onMove({
                    touches: [{}, {}]
                });
                expect(results).toEqual(1);
            });
        });
        var contentElementRef;
        var refresher;
        var content;
        var dom;
        beforeEach(function () {
            contentElementRef = mock_providers_1.mockElementRef();
            dom = mock_providers_1.mockDomController();
            content = new content_1.Content(mock_providers_1.mockConfig(), mock_providers_1.mockPlatform(), dom, contentElementRef, mock_providers_1.mockRenderer(), null, null, mock_providers_1.mockZone(), null, null);
            var ele = document.createElement('div');
            ele.className = 'scroll-content';
            content._scrollContent = mock_providers_1.mockElementRefEle(ele);
            var gestureController = new gesture_controller_1.GestureController(null);
            refresher = new refresher_1.Refresher(mock_providers_1.mockPlatform(), content, mock_providers_1.mockZone(), gestureController);
        });
        function touchEv(y) {
            return {
                type: 'mockTouch',
                pageX: 0,
                pageY: y,
                preventDefault: function () { }
            };
        }
        function setContentScrollTop(scrollTop) {
            content.getContentDimensions = function () {
                return {
                    scrollTop: scrollTop,
                    scrollHeight: null,
                    contentHeight: null,
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
            };
        }
    });
});
//# sourceMappingURL=refresher.spec.js.map