// import * as pic from "Map_Assets";

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/SimpleRenderer",

  ], function(Map, MapView, GeoJSONLayer, SimpleMarkerSymbol, SimpleRenderer) {
  
    var myMap = new Map({
      basemap: "topo-vector"
    });

    var myView = new MapView({
      center: [ 172.54297, -42.38585],
      container: "viewDiv",  
      map: myMap,        
      zoom: 6              
    });
//====================================================================================================
var lotr_data = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [175.68279, -37.87181]
      },
      "properties": {
        "movie_name": "The Shire",
        "real_name": "Matamata",
        "picture":"the_shire.jpg"
        
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [174.77023, -37.44057]
      },
      "properties": {
        "movie_name": "Weathertop",
        "real_name": "Port Waikato",
        "picture":"weathertop.jpg"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [175.19340, -41.05722]
      },
      "properties": {
        "movie_name": "Rivendell",
        "real_name": "Kaitoke Regional Park",
        "picture":"rivendell.jpg"
        
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 168.89269, -45.01145]
      },
      "properties": {
        "movie_name": "The Argonath on the Anduin River",
        "real_name": "Kawarau Gorge",
        "picture": "argonath.jpg"
        
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [175.63215, -39.15626]
      },
      "properties": {
        "movie_name": "Mount Doom (Mordor)",
        "real_name": "Mount Ngauruhoe",
        "picture": "mordor.jpg"
        
      }
    }
  ]
};

//====================================================================================================
var blob = new Blob([JSON.stringify(lotr_data)], {
  type: "application/json"
    });
    
    var url = URL.createObjectURL(blob);

    var my_renderer = new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        style: "square",
        size: 7,
        color: [0, 255, 255],
        outline: {
          color: "black",
          width: 2}
      })
    });
    
    var popup_template = {
      title: "{movie_name}",
    //   content: [{
    //     type: "media",
    //   mediaInfos: [{
    //     title: "{real_name}",
    //     caption: "",
    //     type: "image",
    //     value: {
    //       sourceURL: '{https://compressjpeg.com/images/compressjpeg/icon.png}'
    //     }
    //   }]
    // }]
      content: "Real Location: {real_name} <img src='Map_Assets/{picture}'/>"
    }
    var geojsonlayer = new GeoJSONLayer({
      url, 
      geometryType: "point",
      popupTemplate: popup_template,
      renderer: my_renderer
    });
    myMap.add(geojsonlayer);
    
    var xmlhttp = new XMLHttpRequest();

  
  xmlhttp.open("GET", url, true),
  xmlhttp.send();
  myView.popup.defaultPopupTemplateEnabled = true;
  
  });