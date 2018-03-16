var url = "http://101.200.86.126:6080/arcgis/rest/services/承德市河长制/MapServer"
var landLayer;
var myMap;
var options;
var City = [];
var Pro = "";

$(function () {
    init();
})

function init() {
    require([
     "esri/map",//容器，放置图层 
     "esri/layers/ArcGISDynamicMapServiceLayer",
     "esri/tasks/IdentifyTask",
     "esri/tasks/IdentifyParameters",
     "dojo/_base/array",
      "esri/InfoTemplate"
    //图层控制
    ], function (Map, ArcGISDynamicMapServiceLayer,IdentifyTask,IdentifyParameters,arrayUtils,InfoTemplate) {
        options = {
            logo: false,
            center: [18.50, 31.8]
        };
        myMap = new Map("map", options);
        landLayer = new ArcGISDynamicMapServiceLayer(url);
        myMap.addLayer(landLayer);
        landLayer.on("load", function (e) {
//          var scalebar = new esri.dijit.Scalebar({
//                  map: myMap,
//                  scalebarUnit: "metric"
//              }, dojo.byId("scalebar"))
            extent = e.layer.fullExtent;
            myMap.setExtent(extent);
            landLayer.setVisibleLayers([12,13,14,15,17]);
            //设置地图点击事件，拾取要素
            mapClick = myMap.on("click", executeIdentifyTask);
            identifyTask = new IdentifyTask(url);
            var identifyParams = new IdentifyParameters();
            identifyParams.tolerance = 5; //设置点击获取要素的范围，值越小越精准，越大越容易选中
            identifyParams.returnGeometry = true;

            identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            identifyParams.width = myMap.width;
            identifyParams.height = myMap.height;
            function executeIdentifyTask(event) {
               // clearGraphic();
                 var identyArray = [0];
            
//          var filterIdentyArray = [];
//          //根据当前地图缩放，筛选出可见图层
//          for (var i = 0; i < identyArray.length; i++) {
//              var item = identyArray[i];
//              var li = landLayer.layerInfos[item];
//              var sacle = myMap.getScale();
//              //地图是否比例显示并且图层可见
//              if (subLayerIsVisible(li, sacle) && $.inArray(li.id, visibleArray) != -1) {
//                  filterIdentyArray.push(item);
//              }
//          }
            identifyParams.layerIds = identyArray;
            identifyParams.geometry = event.mapPoint;
            identifyParams.mapExtent = myMap.extent;

            var deferred = identifyTask
                .execute(identifyParams)
                .addCallback(function (response) {
                    return arrayUtils.map(response, function (result) {
                        var feature = result.feature;
                        var layerName = result.layerName; //图层名称
                        var dmTemplate;
//                  if (result.layerId == 1) {
//                      dmTemplate = new InfoTemplate("",
//                          "<div style='height:100%; width:100%;'>" +
//                          "<div style='height:100%;with:8px; background:#5da10c; position:absolute; top:0;bottom:0px;left:0px;'>" +
//                          "</div>编号: ${OBJECTID}</div>");
//                      dmTemplate.setTitle("<b>" + layerName + "</b>");
//                  }
//                  if (result.layerId == 2) {
//                      dmTemplate = new InfoTemplate("",
//                          "<div style='height:100%; width:100%;'>" +
//                          "<div style='height:100%;with:8px; background:#5da10c; position:absolute; top:0;bottom:0px;left:0px;'>" +
//                          "</div>编号: ${OBJECTID}</div>");
//                      dmTemplate.setTitle("<b>" + layerName + "</b>");
//                  }
				dmTemplate = new InfoTemplate("",
                            "<div style='height:100%; width:100%;'>" +
                            "<div style='height:100%;with:8px; background:#5da10c; position:absolute; top:0;bottom:0px;left:0px;'>" +
                            "</div>编号: ${FID}</div>");
                        dmTemplate.setTitle("<b>" + layerName + "</b>");
                        
                    feature.setInfoTemplate(dmTemplate);
                    myMap.graphics.add(feature);

                    return feature;
                    });
                });

            myMap.infoWindow.show(event.mapPoint);
            myMap.infoWindow.setFeatures([deferred]);
            }
        });
    });
}
function checkLayer() {
    var tuceng = [];
    for (var i = 1; i < 18; i++) {
    	var isexist=document.getElementById("checkbox" + i);
    	if(isexist!=null){
	        if (document.getElementById("checkbox" + i).checked) {
	            tuceng.push(i-1);
	        }
        }
    }
    if (tuceng.length === 0) {
        tuceng.push(-1);
    }
    tuceng.push(12,13,14,15,17)
    landLayer.setVisibleLayers(tuceng);
}

function locationPro(id) {
    myMap.graphics.clear();
    var queryTask;
    var query
    query = new esri.tasks.Query();
    queryTask = new esri.tasks.QueryTask(url + "/" + 33);
    query.where = "NAME = '" + id + "'";
    query.outSpatialReference = { wkid: 3785 };
    query.returnGeometry = true;
    query.outFields = ["NAME", "NAME"];
    queryTask.execute(query, showResults);
}

//渲染省份
function showResults(featureSet) {
    var resultFeatures = featureSet.features;
    var graphic = resultFeatures[0];
    var geo = resultFeatures[0].geometry;
    var x1, y1, x2, y2;
    x1 = geo.getExtent().xmin;
    y1 = geo.getExtent().ymin;
    x2 = geo.getExtent().xmax;
    y2 = geo.getExtent().ymax;
    var Color = new dojo.Color([148, 0, 211]);
    var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, Color, 3);
    graphic.setSymbol(symbol);
    myMap.graphics.add(graphic)
    var extent = new esri.geometry.Extent(x1, y1, x2, y2, new esri.SpatialReference({ wkid: 3785 }));
    myMap.setExtent(extent);
}



