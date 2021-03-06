import WebGLMap from '../../../../src/ol/WebGLMap.js';
import Map from '../../../../src/ol/Map.js';
import View from '../../../../src/ol/View.js';
import TileLayer from '../../../../src/ol/layer/Tile.js';
import WebGLTileLayer from '../../../../src/ol/layer/WebGLTile.js';
import TileWMS from '../../../../src/ol/source/TileWMS.js';

describe('ol.rendering.source.TileWMS', function() {

  function tilesLoaded(source, callback) {
    let loading = 0;

    source.on('tileloadstart', function(event) {
      loading++;
    });
    source.on('tileloadend', function(event) {
      loading--;
      if (loading == 0) {
        callback();
      }
    });
    source.on('tileloaderror', function(event) {
      expect().fail('Tile failed to load');
    });

  }

  let map;
  function createMap(renderer, pixelRatio) {
    const MapConstructor = renderer === 'webgl' ? WebGLMap : Map;

    map = new MapConstructor({
      target: createMapDiv(200, 200),
      pixelRatio: pixelRatio,
      view: new View({
        center: [0, 0],
        zoom: 5
      })
    });
  }

  afterEach(function() {
    if (map) {
      disposeMap(map);
    }
    map = null;
  });

  function createSource(gutter) {
    return new TileWMS({
      params: {
        'LAYERS': 'layer'
      },
      gutter: gutter,
      url: 'rendering/ol/data/tiles/wms/wms' + gutter + '.png',
      transition: 0
    });
  }


  describe('0px gutter, 1 pixel ratio', function() {
    it('tests the canvas renderer', function(done) {
      createMap('canvas', 1);
      const source = createSource(0);
      tilesLoaded(source, function() {
        expectResemble(map, 'rendering/ol/source/expected/0_1.canvas.png', IMAGE_TOLERANCE, done);
      });
      map.addLayer(new TileLayer({
        source: source
      }));
    });

    where('WebGL').it('tests the WebGL renderer', function(done) {
      assertWebGL();
      createMap('webgl', 1);
      const source = createSource(0);
      tilesLoaded(source, function() {
        expectResemble(map, 'rendering/ol/source/expected/0_1.webgl.png', IMAGE_TOLERANCE, done);
      });
      map.addLayer(new WebGLTileLayer({
        source: source
      }));
    });
  });

  describe('0px gutter, 2 pixel ratio', function() {
    it('tests the canvas renderer', function(done) {
      createMap('canvas', 2);
      const source = createSource(0);
      tilesLoaded(source, function() {
        expectResemble(map, 'rendering/ol/source/expected/0_2.canvas.png', IMAGE_TOLERANCE, done);
      });
      map.addLayer(new TileLayer({
        source: source
      }));
    });

    where('WebGL').it('tests the WebGL renderer', function(done) {
      assertWebGL();
      createMap('webgl', 2);
      const source = createSource(0);
      tilesLoaded(source, function() {
        expectResemble(map, 'rendering/ol/source/expected/0_2.webgl.png', IMAGE_TOLERANCE, done);
      });
      map.addLayer(new WebGLTileLayer({
        source: source
      }));
    });
  });


  describe('20px gutter, 1 pixel ratio', function() {
    it('tests the canvas renderer', function(done) {
      createMap('canvas', 1);
      const source = createSource(20);
      tilesLoaded(source, function() {
        expectResemble(map, 'rendering/ol/source/expected/20_1.canvas.png', IMAGE_TOLERANCE, done);
      });
      map.addLayer(new TileLayer({
        source: source
      }));
    });

    where('WebGL').it('tests the WebGL renderer', function(done) {
      assertWebGL();
      createMap('webgl', 1);
      const source = createSource(20);
      tilesLoaded(source, function() {
        expectResemble(map, 'rendering/ol/source/expected/20_1.webgl.png', IMAGE_TOLERANCE, done);
      });
      map.addLayer(new WebGLTileLayer({
        source: source
      }));
    });
  });

  describe('20px gutter, 2 pixel ratio', function() {
    it('tests the canvas renderer', function(done) {
      createMap('canvas', 2);
      const source = createSource(20);
      tilesLoaded(source, function() {
        expectResemble(map, 'rendering/ol/source/expected/20_2.canvas.png', IMAGE_TOLERANCE, done);
      });
      map.addLayer(new TileLayer({
        source: source
      }));
    });

    where('WebGL').it('tests the WebGL renderer', function(done) {
      assertWebGL();
      createMap('webgl', 2);
      const source = createSource(20);
      tilesLoaded(source, function() {
        expectResemble(map, 'rendering/ol/source/expected/20_2.webgl.png', IMAGE_TOLERANCE, done);
      });
      map.addLayer(new WebGLTileLayer({
        source: source
      }));
    });
  });

});
