(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../events"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var events_1 = require("../events");
    describe('Events service', function () {
        var events;
        var listener;
        beforeEach(function () {
            events = new events_1.Events();
        });
        it('should call listener when event is published', function () {
            var eventParams = [{}, {}, {}];
            listener = jasmine.createSpy('listener');
            events.subscribe('test', listener);
            events.publish.apply(events, ['test'].concat(eventParams));
            (_a = expect(listener)).toHaveBeenCalledWith.apply(_a, eventParams);
            var _a;
        });
        it('should unsubscribe listener', function () {
            listener = jasmine.createSpy('listener');
            events.subscribe('test', listener);
            events.unsubscribe('test', listener);
            expect(listener).not.toHaveBeenCalled();
        });
        it('should return an array of responses when event is published', function () {
            var _a = [{}, {}], response = _a[0], anotherResponse = _a[1];
            var listener = jasmine.createSpy('listener').and.returnValue(response);
            var anotherListener = jasmine.createSpy('anotherListener').and.returnValue(anotherResponse);
            events.subscribe('test', listener, anotherListener);
            var responses = events.publish('test');
            expect(responses).toEqual([response, anotherResponse]);
        });
    });
});
//# sourceMappingURL=events.spec.js.map