(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../url-serializer", "../../util/mock-providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var url_serializer_1 = require("../url-serializer");
    var mock_providers_1 = require("../../util/mock-providers");
    describe('UrlSerializer', function () {
        describe('serializeComponent', function () {
            it('should create segement when config has multiple links to same component', function () {
                var link1 = { component: mock_providers_1.MockView1, name: 'viewone', segment: 'view' };
                var link2 = { component: mock_providers_1.MockView1, name: 'viewtwo', segment: 'view/:param1' };
                var link3 = { component: mock_providers_1.MockView1, name: 'viewthree', segment: 'view/:param1/:param2' };
                serializer = mockSerializer([link1, link2, link3]);
                serializer._createSegment = mock_providers_1.noop;
                spyOn(serializer, '_createSegment');
                serializer.serializeComponent(mock_providers_1.MockView1, null);
                expect(serializer._createSegment).toHaveBeenCalledWith(link1, null);
            });
            it('should create segment if component found in links', function () {
                serializer._createSegment = mock_providers_1.noop;
                spyOn(serializer, '_createSegment');
                serializer.serializeComponent(mock_providers_1.MockView1, null);
                expect(serializer._createSegment).toHaveBeenCalled();
            });
            it('should return null if component not found in links', function () {
                serializer._createSegment = mock_providers_1.noop;
                spyOn(serializer, '_createSegment');
                serializer.serializeComponent(NotFound, null);
                expect(serializer._createSegment).not.toHaveBeenCalled();
            });
            it('should create tab segment if component found in deep links', function () {
                serializer._createSegment = mock_providers_1.noop;
                spyOn(serializer, '_createSegment');
                serializer.serializeComponent(mock_providers_1.MockView1, null);
                expect(serializer._createSegment).toHaveBeenCalled();
            });
        });
        describe('_createSegment', function () {
            it('should create segement path data', function () {
                var link = {
                    parts: ['a', ':id', ':name'],
                    component: mock_providers_1.MockView1
                };
                var data = {
                    id: 8675309,
                    name: 'jenny'
                };
                var p = serializer._createSegment(link, data);
                expect(p.id).toEqual('a/8675309/jenny');
                expect(p.component).toEqual(mock_providers_1.MockView1);
            });
            it('should create segement with encodeURIComponent data', function () {
                var char = '道';
                var encoded = encodeURIComponent(char);
                var link = {
                    parts: ['a', ':id'],
                    component: mock_providers_1.MockView1
                };
                var data = {
                    id: char
                };
                var p = serializer._createSegment(link, data);
                expect(p.id).toEqual('a/' + encoded);
                expect(p.component).toEqual(mock_providers_1.MockView1);
                expect(p.data.id).toEqual(char);
            });
            it('should create segement with no data', function () {
                var link = {
                    parts: ['a'],
                    component: mock_providers_1.MockView1
                };
                var p = serializer._createSegment(link, null);
                expect(p.id).toEqual('a');
                expect(p.component).toEqual(mock_providers_1.MockView1);
                expect(p.data).toEqual(null);
            });
        });
        describe('parse', function () {
            it('should parse mix match of component paths', function () {
                serializer = mockSerializer([
                    { segment: 'b/c', name: 'viewone', component: mock_providers_1.MockView1 },
                    { segment: 'a/:id', name: 'viewtwo', component: mock_providers_1.MockView2 }
                ]);
                var p = serializer.parse('a/b/c');
                expect(p.length).toEqual(2);
                expect(p[0].component).toEqual(null);
                expect(p[0].data).toEqual(null);
                expect(p[1].name).toEqual('viewone');
                expect(p[1].data).toEqual(null);
            });
            it('should parse by higher priority with data in middle', function () {
                serializer = mockSerializer([
                    { segment: 'viewone/:id/viewtwo', name: 'viewone', component: mock_providers_1.MockView1 },
                    { segment: 'viewone/viewtwo', name: 'viewtwo', component: mock_providers_1.MockView2 },
                    { segment: 'viewtwo', name: 'viewthree', component: mock_providers_1.MockView3 }
                ]);
                var p = serializer.parse('viewone/viewtwo/viewtwo');
                expect(p.length).toEqual(1);
                expect(p[0].name).toEqual('viewone');
                expect(p[0].data.id).toEqual('viewtwo');
            });
            it('should parse by higher priority, two segments', function () {
                serializer = mockSerializer([
                    { segment: 'viewone/:id', name: 'viewone', component: mock_providers_1.MockView1 },
                    { name: 'viewtwo', component: mock_providers_1.MockView2 }
                ]);
                var p = serializer.parse('viewone/viewtwo');
                expect(p.length).toEqual(1);
                expect(p[0].name).toEqual('viewone');
                expect(p[0].data.id).toEqual('viewtwo');
            });
            it('should parse path with one slash and data', function () {
                serializer = mockSerializer([
                    { segment: 'a/:id', name: 'a', component: mock_providers_1.MockView1 },
                ]);
                var p = serializer.parse('a/b');
                expect(p.length).toEqual(1);
                expect(p[0].name).toEqual('a');
                expect(p[0].data.id).toEqual('b');
            });
            it('should parse multiple url part path', function () {
                serializer = mockSerializer([
                    { segment: 'c/a/b/d', name: 'five', component: mock_providers_1.MockView5 },
                    { segment: 'c/a/b', name: 'four', component: mock_providers_1.MockView4 },
                    { segment: 'a/b/c', name: 'three', component: mock_providers_1.MockView3 },
                    { segment: 'a/b', name: 'two', component: mock_providers_1.MockView2 },
                    { segment: 'a', name: 'one', component: mock_providers_1.MockView1 }
                ]);
                var p = serializer.parse('a/b');
                expect(p.length).toEqual(1);
                expect(p[0].name).toEqual('two');
                p = serializer.parse('a');
                expect(p.length).toEqual(1);
                expect(p[0].name).toEqual('one');
            });
            it('should parse multiple segments with data', function () {
                var p = serializer.parse('viewone/viewtwo');
                expect(p.length).toEqual(2);
                expect(p[0].name).toEqual('viewone');
                expect(p[1].name).toEqual('viewtwo');
            });
            it('should parse one segment path', function () {
                var p = serializer.parse('viewone');
                expect(p.length).toEqual(1);
                expect(p[0].id).toEqual('viewone');
                expect(p[0].name).toEqual('viewone');
                expect(p[0].data).toEqual(null);
            });
            describe('serialize', function () {
                it('should bring together two paths that are not the index', function () {
                    var path = [
                        { id: 'a', name: 'a', component: mock_providers_1.MockView1, data: null },
                        { id: 'b', name: 'b', component: mock_providers_1.MockView1, data: null }
                    ];
                    expect(serializer.serialize(path)).toEqual('/a/b');
                });
                it('should bring together one path, not the index', function () {
                    var path = [
                        { id: 'a', name: 'a', component: mock_providers_1.MockView1, data: null }
                    ];
                    expect(serializer.serialize(path)).toEqual('/a');
                });
                it('should bring together one path that is the index', function () {
                    var path = [
                        { id: '', name: 'a', component: mock_providers_1.MockView1, data: null }
                    ];
                    expect(serializer.serialize(path)).toEqual('/');
                });
            });
            describe('createMatchedData', function () {
                it('should get data from multiple parts', function () {
                    var matchedUrlParts = ['a', 'ellie', 'blacklab'];
                    var link = {
                        parts: ['a', ':name', ':breed'], partsLen: 3, component: mock_providers_1.MockView1
                    };
                    var data = url_serializer_1.createMatchedData(matchedUrlParts, link);
                    expect(data.name).toEqual('ellie');
                    expect(data.breed).toEqual('blacklab');
                });
                it('should get data within the config link path', function () {
                    var char = '道';
                    var matchedUrlParts = ['a', 'b', encodeURIComponent(char), 'd'];
                    var link = {
                        parts: ['a', ':id', ':name', 'd'], partsLen: 4, component: mock_providers_1.MockView1
                    };
                    var data = url_serializer_1.createMatchedData(matchedUrlParts, link);
                    expect(data.id).toEqual('b');
                    expect(data.name).toEqual(char);
                });
                it('should get data within the config link path', function () {
                    var matchedUrlParts = ['a', '8675309'];
                    var link = {
                        parts: ['a', ':num'], partsLen: 2, component: mock_providers_1.MockView1
                    };
                    var data = url_serializer_1.createMatchedData(matchedUrlParts, link);
                    expect(data.num).toEqual('8675309');
                });
                it('should get uri decode data', function () {
                    var char = '道';
                    var matchedUrlParts = ["" + encodeURIComponent(char)];
                    var link = {
                        parts: [':name'], partsLen: 1, component: mock_providers_1.MockView1
                    };
                    var data = url_serializer_1.createMatchedData(matchedUrlParts, link);
                    expect(data.name).toEqual(char);
                });
                it('should get null data if nothing in the url', function () {
                    var matchedUrlParts = ['a'];
                    var link = {
                        parts: ['a'], partsLen: 1, component: mock_providers_1.MockView1
                    };
                    var data = url_serializer_1.createMatchedData(matchedUrlParts, link);
                    expect(data).toEqual(null);
                });
            });
            describe('parseUrlParts', function () {
                it('should match with complex path', function () {
                    var urlParts = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
                    var configLinks = [
                        { parts: ['a', 'b', 'c', 'e'], partsLen: 4, component: mock_providers_1.MockView2 },
                        { parts: ['a', ':key', ':val'], partsLen: 3, component: mock_providers_1.MockView1 },
                        { parts: ['a', 'c', 'd'], partsLen: 3, component: mock_providers_1.MockView5 },
                        { parts: ['d', 'e'], partsLen: 2, component: mock_providers_1.MockView4 },
                        { parts: ['d', ':x'], partsLen: 2, component: mock_providers_1.MockView3 },
                        { parts: ['f'], partsLen: 1, component: mock_providers_1.MockView2 },
                        { parts: [':last'], partsLen: 1, component: mock_providers_1.MockView1 },
                    ];
                    var segments = url_serializer_1.parseUrlParts(urlParts, configLinks);
                    expect(segments.length).toEqual(4);
                    expect(segments[0].id).toEqual('a/b/c');
                    expect(segments[0].data.key).toEqual('b');
                    expect(segments[0].data.val).toEqual('c');
                    expect(segments[1].id).toEqual('d/e');
                    expect(segments[1].data).toEqual(null);
                    expect(segments[2].id).toEqual('f');
                    expect(segments[3].id).toEqual('g');
                    expect(segments[3].data.last).toEqual('g');
                });
                it('should not get a match on already matched parts', function () {
                    var urlParts = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
                    var configLinks = [
                        { parts: ['a', 'b', 'c'], partsLen: 3, component: mock_providers_1.MockView1 },
                        { parts: ['b', 'c', 'd'], partsLen: 3, component: mock_providers_1.MockView1 },
                        { parts: ['a', 'b'], partsLen: 2, component: mock_providers_1.MockView1 },
                        { parts: ['d', 'e'], partsLen: 2, component: mock_providers_1.MockView1 },
                        { parts: ['e', 'f'], partsLen: 2, component: mock_providers_1.MockView1 },
                        { parts: ['e'], partsLen: 1, component: mock_providers_1.MockView1 },
                        { parts: ['f'], partsLen: 1, component: mock_providers_1.MockView1 },
                    ];
                    var segments = url_serializer_1.parseUrlParts(urlParts, configLinks);
                    expect(segments.length).toEqual(4);
                    expect(segments[0].id).toEqual('a/b/c');
                    expect(segments[1].id).toEqual('d/e');
                    expect(segments[2].id).toEqual('f');
                    expect(segments[3].id).toEqual('g');
                });
                it('should get a one part match', function () {
                    var urlParts = ['a', 'b', 'c'];
                    var configLinks = [
                        { parts: ['a'], partsLen: 1, component: mock_providers_1.MockView1 },
                        { parts: ['b'], partsLen: 1, component: mock_providers_1.MockView2 },
                        { parts: ['c'], partsLen: 1, component: mock_providers_1.MockView3 },
                    ];
                    var segments = url_serializer_1.parseUrlParts(urlParts, configLinks);
                    expect(segments.length).toEqual(3);
                    expect(segments[0].id).toEqual('a');
                    expect(segments[1].id).toEqual('b');
                    expect(segments[2].id).toEqual('c');
                });
                it('should not match', function () {
                    var urlParts = ['z'];
                    var configLinks = [
                        { parts: ['a'], partsLen: 1, component: mock_providers_1.MockView1 }
                    ];
                    var segments = url_serializer_1.parseUrlParts(urlParts, configLinks);
                    expect(segments.length).toEqual(1);
                    expect(segments[0].id).toEqual('z');
                    expect(segments[0].name).toEqual('z');
                    expect(segments[0].component).toEqual(null);
                    expect(segments[0].data).toEqual(null);
                });
            });
            describe('fillMatchedUrlParts', function () {
                it('should match w/ many url parts and many config parts w/ : data', function () {
                    var urlParts = ['a', 'b', 'c', 'd', 'e', 'b', 'c'];
                    var configLink = { parts: ['b', 'c', ':key'], partsLen: 3, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments[0]).toEqual(undefined);
                    expect(segments[1].id).toEqual('b/c/d');
                    expect(segments[1].data.key).toEqual('d');
                    expect(urlParts[0]).toEqual('a');
                    expect(urlParts[1]).toEqual(undefined);
                    expect(urlParts[2]).toEqual(undefined);
                    expect(urlParts[3]).toEqual(undefined);
                    expect(urlParts[4]).toEqual('e');
                    expect(urlParts[5]).toEqual('b');
                    expect(urlParts[6]).toEqual('c');
                });
                it('should not match w/ many url parts and many config parts', function () {
                    var urlParts = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
                    var configLink = { parts: ['e', 'c', 'd'], partsLen: 3, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments.filter(function (f) { return !!f; }).length).toEqual(0);
                    expect(urlParts[0]).toEqual('a');
                    expect(urlParts[1]).toEqual('b');
                    expect(urlParts[2]).toEqual('c');
                    expect(urlParts[3]).toEqual('d');
                    expect(urlParts[4]).toEqual('e');
                    expect(urlParts[5]).toEqual('f');
                    expect(urlParts[6]).toEqual('g');
                });
                it('should match w/ two sets of the same parts', function () {
                    var urlParts = ['a', 'b', 'c', 'd', 'b', 'c'];
                    var configLink = { parts: ['b', 'c'], partsLen: 2, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments[0]).toEqual(undefined);
                    expect(segments[1].id).toEqual('b/c');
                    expect(segments[2]).toEqual(undefined);
                    expect(segments[3]).toEqual(undefined);
                    expect(segments[4].id).toEqual('b/c');
                    expect(segments[5]).toEqual(undefined);
                    expect(urlParts[0]).toEqual('a');
                    expect(urlParts[1]).toEqual(undefined);
                    expect(urlParts[2]).toEqual(undefined);
                    expect(urlParts[3]).toEqual('d');
                    expect(urlParts[4]).toEqual(undefined);
                    expect(urlParts[5]).toEqual(undefined);
                });
                it('should match w/ many url parts and many config parts', function () {
                    var urlParts = ['a', 'b', 'c', 'd'];
                    var configLink = { parts: ['c', 'd'], partsLen: 2, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments[0]).toEqual(undefined);
                    expect(segments[1]).toEqual(undefined);
                    expect(segments[2].id).toEqual('c/d');
                    expect(segments[3]).toEqual(undefined);
                    expect(urlParts[0]).toEqual('a');
                    expect(urlParts[1]).toEqual('b');
                    expect(urlParts[2]).toEqual(undefined);
                    expect(urlParts[3]).toEqual(undefined);
                });
                it('should match the repeated url parts', function () {
                    var urlParts = ['a', 'a', 'a', 'a'];
                    var configLink = { parts: ['a'], partsLen: 1, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments[0].id).toEqual('a');
                    expect(segments[1].id).toEqual('a');
                    expect(segments[2].id).toEqual('a');
                    expect(segments[3].id).toEqual('a');
                    expect(urlParts[0]).toEqual(undefined);
                    expect(urlParts[1]).toEqual(undefined);
                    expect(urlParts[2]).toEqual(undefined);
                    expect(urlParts[3]).toEqual(undefined);
                });
                it('should not match w/ two url parts', function () {
                    var urlParts = ['a', 'b'];
                    var configLink = { parts: ['c'], partsLen: 1, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments[0]).toEqual(undefined);
                    expect(segments[1]).toEqual(undefined);
                    expect(urlParts[0]).toEqual('a');
                    expect(urlParts[1]).toEqual('b');
                });
                it('should match data only config link part', function () {
                    var urlParts = ['a', 'b'];
                    var configLink = { parts: [':key'], partsLen: 1, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments[0].id).toEqual('a');
                    expect(segments[0].data.key).toEqual('a');
                    expect(segments[1].id).toEqual('b');
                    expect(segments[1].data.key).toEqual('b');
                    expect(urlParts[0]).toEqual(undefined);
                    expect(urlParts[1]).toEqual(undefined);
                });
                it('should match w/ many url parts', function () {
                    var urlParts = ['a', 'b', 'c', 'd'];
                    var configLink = { parts: ['d'], partsLen: 1, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments[0]).toEqual(undefined);
                    expect(segments[1]).toEqual(undefined);
                    expect(segments[2]).toEqual(undefined);
                    expect(segments[3].id).toEqual('d');
                    expect(urlParts[0]).toEqual('a');
                    expect(urlParts[1]).toEqual('b');
                    expect(urlParts[2]).toEqual('c');
                    expect(urlParts[3]).toEqual(undefined);
                });
                it('should match single part', function () {
                    var urlParts = ['a'];
                    var configLink = { parts: ['a'], partsLen: 1, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments[0].id).toEqual('a');
                    expect(segments[0].component).toEqual(mock_providers_1.MockView1);
                    expect(segments[0].data).toEqual(null);
                    expect(urlParts[0]).toEqual(undefined);
                });
                it('should not match single part', function () {
                    var urlParts = ['a'];
                    var configLink = { parts: ['b'], partsLen: 1, component: mock_providers_1.MockView1 };
                    var segments = new Array(urlParts.length);
                    url_serializer_1.fillMatchedUrlParts(segments, urlParts, configLink);
                    expect(segments[0]).toEqual(undefined);
                    expect(urlParts[0]).toEqual('a');
                });
            });
            describe('isPartMatch', function () {
                it('should match if parts are equal', function () {
                    expect(url_serializer_1.isPartMatch('a', 'a')).toEqual(true);
                });
                it('should not match if parts are not equal', function () {
                    expect(url_serializer_1.isPartMatch('a', 'b')).toEqual(false);
                });
                it('should not match if configLinkPart has a : thats not index 0', function () {
                    expect(url_serializer_1.isPartMatch('urlPart', 'my:id')).toEqual(false);
                });
                it('should match if configLinkPart starts with :', function () {
                    expect(url_serializer_1.isPartMatch('urlPart', ':id')).toEqual(true);
                });
                it('should not match an empty urlPart', function () {
                    expect(url_serializer_1.isPartMatch(null, 'configLinkPart')).toEqual(false);
                });
                it('should not match an empty configLinkPart', function () {
                    expect(url_serializer_1.isPartMatch('urlPart', null)).toEqual(false);
                });
            });
        });
        describe('formatUrlPart', function () {
            it('should encodeURIComponent', function () {
                var name = '你好';
                var encoded = encodeURIComponent(name);
                expect(serializer.formatUrlPart(name)).toEqual(encoded);
            });
            it('should not allow restricted characters', function () {
                expect(serializer.formatUrlPart('!!!Restricted \'?$,.+"*^|/\#%`><;:@&[]=! Characters!!!')).toEqual('restricted-characters');
            });
            it('should trim and replace spaces with dashes', function () {
                expect(serializer.formatUrlPart('   This is the name   ')).toEqual('this-is-the-name');
            });
            it('should not have multiple dashes', function () {
                expect(serializer.formatUrlPart('Contact Detail Page')).toEqual('contact-detail-page');
            });
            it('should change to pascal case for multiple words', function () {
                expect(serializer.formatUrlPart('ContactDetailPage')).toEqual('contact-detail-page');
            });
            it('should change to pascal case for one work', function () {
                expect(serializer.formatUrlPart('View1')).toEqual('view1');
            });
        });
        describe('findLinkByComponentData', function () {
            it('should get matching link by component w/ data and multiple links using same component, 2 matches', function () {
                var link1 = { component: mock_providers_1.MockView1, name: 'viewone', segment: 'view' };
                var link2 = { component: mock_providers_1.MockView1, name: 'viewtwo', segment: 'view/:param1' };
                var link3 = { component: mock_providers_1.MockView1, name: 'viewthree', segment: 'view/:param1/:param2' };
                var links = url_serializer_1.normalizeLinks([link1, link2, link3]);
                var foundLink = url_serializer_1.findLinkByComponentData(links, mock_providers_1.MockView1, {
                    param1: false,
                    param2: 0,
                    param3: 0
                });
                expect(foundLink.name).toEqual('viewthree');
            });
            it('should get matching link by component w/ data and multiple links using same component, 1 match', function () {
                var link1 = { component: mock_providers_1.MockView1, name: 'viewone', segment: 'view' };
                var link2 = { component: mock_providers_1.MockView1, name: 'viewtwo', segment: 'view/:param1' };
                var link3 = { component: mock_providers_1.MockView1, name: 'viewthree', segment: 'view/:param1/:param2' };
                var links = url_serializer_1.normalizeLinks([link1, link2, link3]);
                var foundLink = url_serializer_1.findLinkByComponentData(links, mock_providers_1.MockView1, {
                    param1: false,
                    param3: 0
                });
                expect(foundLink.name).toEqual('viewtwo');
            });
            it('should get matching link by component w/ no data and multiple links using same component', function () {
                var link1 = { component: mock_providers_1.MockView1, name: 'viewone', segment: 'view' };
                var link2 = { component: mock_providers_1.MockView1, name: 'viewtwo', segment: 'view/:param1' };
                var link3 = { component: mock_providers_1.MockView1, name: 'viewthree', segment: 'view/:param1/:param2' };
                var links = url_serializer_1.normalizeLinks([link1, link2, link3]);
                var foundLink = url_serializer_1.findLinkByComponentData(links, mock_providers_1.MockView1, null);
                expect(foundLink.name).toEqual('viewone');
            });
            it('should get matching link by component data and link data', function () {
                var link1 = { component: mock_providers_1.MockView1, name: 'viewone', segment: 'view' };
                var link2 = { component: mock_providers_1.MockView2, name: 'viewtwo', segment: 'view/:param1' };
                var link3 = { component: mock_providers_1.MockView3, name: 'viewthree', segment: 'view/:param1/:param2' };
                var links = url_serializer_1.normalizeLinks([link1, link2, link3]);
                var foundLink = url_serializer_1.findLinkByComponentData(links, mock_providers_1.MockView3, {
                    param1: null,
                    param2: false,
                    param3: 0,
                    param4: 'hello'
                });
                expect(foundLink.name).toEqual('viewthree');
            });
            it('should get matching link by component without data and link without data', function () {
                var link1 = { component: mock_providers_1.MockView1, name: 'viewone', segment: 'view' };
                var link2 = { component: mock_providers_1.MockView2, name: 'viewtwo', segment: 'view/:param1' };
                var link3 = { component: mock_providers_1.MockView3, name: 'viewthree', segment: 'view/:param1/:param2' };
                var links = url_serializer_1.normalizeLinks([link1, link2, link3]);
                var foundLink = url_serializer_1.findLinkByComponentData(links, mock_providers_1.MockView1, null);
                expect(foundLink.name).toEqual('viewone');
            });
            it('should get no matching link by component without data, but link requires data', function () {
                var link1 = { component: mock_providers_1.MockView1, name: 'viewone', segment: 'view' };
                var link2 = { component: mock_providers_1.MockView2, name: 'viewtwo', segment: 'view/:param1' };
                var link3 = { component: mock_providers_1.MockView3, name: 'viewthree', segment: 'view/:param1/:param2' };
                var links = url_serializer_1.normalizeLinks([link1, link2, link3]);
                var foundLink = url_serializer_1.findLinkByComponentData(links, mock_providers_1.MockView2, null);
                expect(foundLink).toEqual(null);
            });
        });
        describe('normalizeLinks', function () {
            it('should sort with four parts, the most number of paths w/out data first', function () {
                var links = [
                    { segment: 'a/:val/:id/:name', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a/:id/:name/d', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a/b/c/d', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a/b/:id/d', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a/b/:id/:name', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a/b/c/:id', component: mock_providers_1.MockView1, name: 'viewone' },
                ];
                var sortedLinks = url_serializer_1.normalizeLinks(links);
                expect(sortedLinks[0].segment).toEqual('a/b/c/d');
                expect(sortedLinks[1].segment).toEqual('a/b/c/:id');
                expect(sortedLinks[2].segment).toEqual('a/b/:id/d');
                expect(sortedLinks[3].segment).toEqual('a/b/:id/:name');
                expect(sortedLinks[4].segment).toEqual('a/:id/:name/d');
                expect(sortedLinks[5].segment).toEqual('a/:val/:id/:name');
            });
            it('should sort with the most number of paths w/out data first', function () {
                var links = [
                    { segment: 'a/:id', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a/b', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a/:id/c', component: mock_providers_1.MockView1, name: 'viewone' },
                ];
                var sortedLinks = url_serializer_1.normalizeLinks(links);
                expect(sortedLinks[0].segment).toEqual('a/:id/c');
                expect(sortedLinks[1].segment).toEqual('a/b');
                expect(sortedLinks[2].segment).toEqual('a/:id');
            });
            it('should sort with the most number of paths first', function () {
                var links = [
                    { segment: 'c', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'b', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'd/c/b/a', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'aaaaa/bbbb/ccccc', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'bbbbbbbbbbbbbbbb/c', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a/b', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'a/b/c', component: mock_providers_1.MockView1, name: 'viewone' },
                    { segment: 'aa/b/c', component: mock_providers_1.MockView1, name: 'viewone' },
                ];
                var sortedLinks = url_serializer_1.normalizeLinks(links);
                expect(sortedLinks[0].segment).toEqual('d/c/b/a');
                expect(sortedLinks[1].segment).toEqual('aaaaa/bbbb/ccccc');
                expect(sortedLinks[2].segment).toEqual('a/b/c');
                expect(sortedLinks[3].segment).toEqual('aa/b/c');
                expect(sortedLinks[4].segment).toEqual('bbbbbbbbbbbbbbbb/c');
                expect(sortedLinks[5].segment).toEqual('a/b');
                expect(sortedLinks[6].segment).toEqual('c');
                expect(sortedLinks[7].segment).toEqual('b');
                expect(sortedLinks[8].segment).toEqual('a');
            });
            it('should create a parts from the name', function () {
                var links = [
                    { name: 'somename', component: ContactDetailPage },
                ];
                expect(url_serializer_1.normalizeLinks(links)[0].parts).toEqual(['somename']);
            });
            it('should create path from name if path missing', function () {
                var links = [
                    { component: ContactDetailPage, name: 'contact-detail-page' },
                    { component: mock_providers_1.MockView2, name: 'view-two' },
                ];
                expect(url_serializer_1.normalizeLinks(links)[0].segment).toEqual('contact-detail-page');
                expect(url_serializer_1.normalizeLinks(links)[1].segment).toEqual('view-two');
            });
        });
        var serializer;
        beforeEach(function () {
            serializer = mockSerializer();
        });
    });
    var ContactDetailPage = (function () {
        function ContactDetailPage() {
        }
        return ContactDetailPage;
    }());
    var NotFound = (function () {
        function NotFound() {
        }
        return NotFound;
    }());
    function mockSerializer(navLinks) {
        var deepLinkConfig = mock_providers_1.mockDeepLinkConfig(navLinks);
        return new url_serializer_1.UrlSerializer(deepLinkConfig);
    }
});
//# sourceMappingURL=url-serializer.spec.js.map