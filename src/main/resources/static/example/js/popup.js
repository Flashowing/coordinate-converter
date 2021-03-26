// 创建弹窗对象的方法
var Popup = function (info) {
    this.constructor(info);
}
Popup.prototype.id = 0;
Popup.prototype.isAutoCopy = true;
Popup.prototype.constructor = function (info) {
    var _this = this;
    _this.viewer = info.viewer;//弹窗创建的viewer
    _this.geometry = info.geometry;//弹窗挂载的位置
    _this.id = "popup_" + _this.__proto__.id++;
    _this.ctn = $("<div class='bx-popup-ctn' id =  '" + _this.id + "'>");
    $(_this.viewer.container).append(_this.ctn);
    //测试弹窗内容
    var testConfig = {
        header: "经纬度坐标",
        content: `<div class="bx-popup-content"><div>经度：<input value="` + info.lon + `"></div><div>纬度：<input value="` + info.lat + `"></div></div>`,
    }
    _this.ctn.append(_this.createHtml(testConfig.header, testConfig.content));
    $(".leaflet-popup-close-button").click(function () {
        console.log('delete')
        $(this).parent().remove();
    })
    if (this.isAutoCopy) {
        let newInput = document.createElement('input');
        newInput.value = info.lon + "," + info.lat;
        document.body.appendChild(newInput);
        newInput.select();
        document.execCommand('Copy');
        newInput.remove();
    }
    _this.render(_this.geometry);
    _this.eventListener = _this.viewer.clock.onTick.addEventListener(function (clock) {
        _this.render(_this.geometry);
    })
}
// 实时刷新
Popup.prototype.render = function (geometry) {
    var _this = this;
    try {
        var position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(_this.viewer.scene, geometry)
        _this.ctn.css("left", position.x - _this.ctn.get(0).offsetWidth / 2);
        _this.ctn.css("top", position.y - _this.ctn.get(0).offsetHeight - 10);
    } catch (e) {
        console.log(e)
    }
}
// 动态生成内容
Popup.prototype.createHtml = function (header, content) {
    var html = '<div class="bx-popup-header-ctn">' +
        header +
        '</div>' +
        '<div class="bx-popup-content-ctn" >' +
        '<div class="bx-popup-content" >' +
        content +
        '</div>' +
        '</div>' +
        '<div class="bx-popup-tip-container" >' +
        '<div class="bx-popup-tip" >' +
        '</div>' +
        '</div>' +
        '<a class="leaflet-popup-close-button" id="a" onclick="close()">X</a>';
    $("#a").click(function () {
        console.log('delete')
    })
    return html;
}
// 关闭弹窗按钮
Popup.prototype.close = function () {
    var _this = this;
    _this.ctn.remove();
    _this.viewer.clock.onTick.removeEventListener(_this.eventListener);
}