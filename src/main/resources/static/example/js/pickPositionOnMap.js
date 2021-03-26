
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (event) {
    var wp = event.position;
    if (!Cesium.defined(wp)) {
        return
    }
    var ray = viewer.scene.camera.getPickRay(wp);
    if (!Cesium.defined(ray)) {
        return
    }
    var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian)) {
        return
    }
    if (cartesian) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var lon = Cesium.Math.toDegrees(cartographic.longitude);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var elev = viewer.scene.globe.getHeight(cartographic);
        console.log(lon + ',' + lat)
        console.log(elev)
        var carto = new Cesium.Cartographic.fromDegrees(lon, lat);　　//输入经纬度
        var h1 = viewer.scene.globe.getHeight(carto);
        console.log(h1)
        // 获取点击位置坐标
        var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(wp), viewer.scene);
        if (cartesian) {
            // 调用弹窗方法
            var popup = new Popup({
                viewer: viewer,
                geometry: cartesian,
                lon: lon,
                lat: lat,
            })
        }
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

$("#autoCopy").click(function (){
    Popup.prototype.isAutoCopy = false;
    $('input[name="autoCopy"]:checked').each(function () {
        Popup.prototype.isAutoCopy = true;
    })
})