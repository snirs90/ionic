(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../query-params"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var query_params_1 = require("../query-params");
    describe('QueryParams', function () {
        it('should get case insensitive querystring value', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('/?KEY=value');
            expect(qp.get('key')).toEqual('value');
        });
        it('should get querystring value', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('/?key=value');
            expect(qp.get('key')).toEqual('value');
        });
        it('should have no entries for empty url', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('');
            expect(qp.data).toEqual({});
            qp = new query_params_1.QueryParams();
            qp.parseUrl(null);
            expect(qp.data).toEqual({});
            qp = new query_params_1.QueryParams();
            qp.parseUrl(undefined);
            expect(qp.data).toEqual({});
        });
        it('should have no entries when without ?', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/');
            expect(qp.data).toEqual({});
        });
        it('should have no entries with only ?', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/?');
            expect(qp.data).toEqual({});
        });
        it('should have no entries for key with no =', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/?key');
            expect(qp.data).toEqual({});
        });
        it('should have no entries with only #?', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/#?');
            expect(qp.data).toEqual({});
        });
        it('should have no entries with only #?=', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/#?=');
            expect(qp.data).toEqual({});
        });
        it('should have no entries for url with no "?" character', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/#key1=1&key2=2');
            expect(qp.data).toEqual({});
        });
        it('should contain key/value entries for all the parameters after "?" character', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/#key1=1&key2x=2x?key3=3&key4=4');
            expect(qp.data).toEqual({
                key3: '3',
                key4: '4'
            });
        });
        it('should lowercase param keys', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/#?KEY1=1&kEy2=2');
            expect(qp.data).toEqual({
                key1: '1',
                key2: '2'
            });
        });
        it('should not include any values when # comes after ?', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/?key1=1#key2=2');
            expect(qp.data).toEqual({
                key1: '1'
            });
        });
        it('should ignore empty ?& and &&', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/#?&&');
            expect(qp.data).toEqual({});
            qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/#?&&key1=1&key2=2&&');
            expect(qp.data).toEqual({
                key1: '1',
                key2: '2'
            });
        });
        it('should get "" when key has no value', function () {
            var qp = new query_params_1.QueryParams();
            qp.parseUrl('http://localhost:1234/#?key=');
            expect(qp.data).toEqual({
                key: ''
            });
        });
    });
});
//# sourceMappingURL=query-params.spec.js.map