function showLocation() {
    this.init.apply(this, arguments);
}

showLocation.prototype = {
    coordinatesDiv: null,
    init: function (enabled) {
        let _this = this;
        _this.coordinatesDiv = document.createElement('div');
        _this.coordinatesDiv.style.background = "red";
        // _this.coordinatesDiv.style.height = "40px";
        // _this.coordinatesDiv.style.width = "300px";
        _this.coordinatesDiv.style.position = "absolute";
        _this.coordinatesDiv.style.zIndex = "5";
        _this.coordinatesDiv.style.bottom = "5px";
        _this.coordinatesDiv.style.right = "100px";
        let p1 = document.createElement('p');
        p1.style.display = 'inline-block';
        p1.textContent = "经度：";
        let p2 = document.createElement('p');
        p2.textContent = "纬度：";
        p2.style.display = 'inline-block';
        let p3 = document.createElement('p');
        p3.textContent = "高度：";
        p3.style.display = 'inline-block';
        // _this.coordinatesDiv.appendChild(p1)
        // _this.coordinatesDiv.appendChild(p2)
        // _this.coordinatesDiv.appendChild(p3)
        document.body.appendChild(_this.coordinatesDiv);
        _this.mouseMove();
    },
    mouseMove: function () {
        let _this = this;
        viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
                let lon, lat, MouseHeight, cameraHeight;
                //获取相机射线
                let ray = viewer.scene.camera.getPickRay(movement.endPosition);
                //根据射线和场景求出在球面中的笛卡尔坐标
                let position1 = viewer.scene.globe.pick(ray, viewer.scene);
                //获取该浏览器坐标的顶部数据
                // let feature = viewer.scene.pick(movement.endPosition);
                // console.log(feature)
                // if (feature == undefined && position1) {
                if (position1) {
                    let cartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
                    lon = Cesium.Math.toDegrees(cartographic1.longitude);
                    lat = Cesium.Math.toDegrees(cartographic1.latitude);
                    MouseHeight = cartographic1.height;
                } else {
                    let cartesian = viewer.scene.pickPosition(movement.endPosition);
                    if (Cesium.defined(cartesian)) {
                        //如果对象已定义，将度转为经纬度
                        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                        lon = Cesium.Math.toDegrees(cartographic.longitude);
                        lat = Cesium.Math.toDegrees(cartographic.latitude);
                        MouseHeight = cartographic.height;//模型高度
                    }
                }
                // 获取相机的高度
                cameraHeight = Math.ceil(viewer.camera.positionCartographic.height);
                try {
                    _this.coordinatesDiv.innerHTML = "<span id='cd_label' style='font-size:13px;text-align:center;font-family:微软雅黑;color:#edffff;'>视角高度:" + cameraHeight + "米&nbsp;&nbsp;&nbsp;&nbsp;地形高度:" + MouseHeight.toFixed(2) + "米&nbsp;&nbsp;&nbsp;&nbsp;经度：" + lon.toFixed(6) + "&nbsp;&nbsp;纬度：" + lat.toFixed(6) + "</span>";
                } catch (e) {

                }
                // console.log('高度:', MouseHeight, '经度:', lon, '纬度:', lat, "视角：" + cameraHeight)
            },
            Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
}