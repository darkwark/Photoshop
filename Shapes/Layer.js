var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer = (function () {
    function Layer() {
        //
    }
    Layer.prototype.rename = function (name) {
        this.name = name;
        return this;
    };
    Layer.prototype.attr = function (attrs) {
        //List of attributes: x, y, width, height, color, name,
        //TODO: x, y, width, height
        if (attrs.name) {
            this.layer.name = attrs.name;
        }
        if (attrs.color) {
            this.setColor(attrs.color);
        }
        return this;
    };
    Layer.prototype.toggleVisible = function () {
        if (this.layer.visible) {
            this.layer.visible = false;
        }
        else {
            this.layer.visible = true;
        }
        return this;
    };
    Layer.prototype.setActive = function () {
        //Make layer active
        app.activeDocument.activeLayer = this.layer;
        return this;
    };
    Layer.prototype.translate = function (xShift, yShift) {
        //Move layer by xShift, yShift
        this.layer.translate(xShift, yShift);
        return this;
    };
    Layer.prototype.setColor = function (color) {
        if (!(color instanceof SolidColor)) {
            var hexValue = color;
            color = new SolidColor();
            color.rgb.hexValue = hexValue;
        }
        fillLayer(color, this.layer);
        return this;
    };
    return Layer;
})();
//Ellipse
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(x, y, width, height) {
        //Default values
        var color = app.foregroundColor, width = width || 100, height = height || 100, x = x || (app.activeDocument.width / 2 - width / 2), y = y || (app.activeDocument.height / 2 - height / 2);
        drawEllipse(x, y, width, height, color);
        //Save link to layer object
        this.layer = app.activeDocument.activeLayer;
        return this;
    }
    return Ellipse;
})(Layer);
//Ellipse
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x, y, width, height) {
        //Default values
        var color = app.foregroundColor, width = width || 100, height = height || 100, x = x || (app.activeDocument.width / 2 - width / 2), y = y || (app.activeDocument.height / 2 - height / 2);
        drawRectangle(x, y, width, height, color);
        //Save link to layer object
        this.layer = app.activeDocument.activeLayer;
        return this;
    }
    return Rectangle;
})(Layer);
//Photoshop Implementation
function drawEllipse(x, y, width, height, color) {
    // Save current foreground color:
    var tmpColor = app.foregroundColor;
    app.foregroundColor = color;
    // =======================================================
    var desc1 = new ActionDescriptor(), desc2 = new ActionDescriptor(), desc3 = new ActionDescriptor(), ref1 = new ActionReference();
    ref1.putClass(stringIDToTypeID('contentLayer'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    desc2.putClass(charIDToTypeID('Type'), stringIDToTypeID('solidColorLayer'));
    desc3.putUnitDouble(charIDToTypeID('Top '), charIDToTypeID('#Pxl'), y);
    desc3.putUnitDouble(charIDToTypeID('Left'), charIDToTypeID('#Pxl'), x);
    desc3.putUnitDouble(charIDToTypeID('Btom'), charIDToTypeID('#Pxl'), y + height);
    desc3.putUnitDouble(charIDToTypeID('Rght'), charIDToTypeID('#Pxl'), x + width);
    desc2.putObject(charIDToTypeID('Shp '), charIDToTypeID('Elps'), desc3);
    desc1.putObject(charIDToTypeID('Usng'), stringIDToTypeID('contentLayer'), desc2);
    executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);
    // =======================================================
    //Restore old foreground color:
    app.foregroundColor = tmpColor;
}
function drawRectangle(x, y, width, height, color) {
    //Draws Rectangle
    // Save current foreground color:
    var tmpColor = app.foregroundColor;
    app.foregroundColor = color;
    // =======================================================
    var idMk = charIDToTypeID("Mk  ");
    var desc9 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref7 = new ActionReference();
    var idcontentLayer = stringIDToTypeID("contentLayer");
    ref7.putClass(idcontentLayer);
    desc9.putReference(idnull, ref7);
    var idUsng = charIDToTypeID("Usng");
    var idType = charIDToTypeID("Type");
    var desc10 = new ActionDescriptor();
    var idsolidColorLayer = stringIDToTypeID("solidColorLayer");
    desc10.putClass(idType, idsolidColorLayer);
    var idShp = charIDToTypeID("Shp ");
    var desc11 = new ActionDescriptor();
    var idTop = charIDToTypeID("Top ");
    var idPxl = charIDToTypeID("#Pxl");
    desc11.putUnitDouble(idTop, idPxl, y);
    var idLeft = charIDToTypeID("Left");
    var idPxl = charIDToTypeID("#Pxl");
    desc11.putUnitDouble(idLeft, idPxl, x);
    var idBtom = charIDToTypeID("Btom");
    var idPxl = charIDToTypeID("#Pxl");
    desc11.putUnitDouble(idBtom, idPxl, y + height);
    var idRght = charIDToTypeID("Rght");
    var idPxl = charIDToTypeID("#Pxl");
    desc11.putUnitDouble(idRght, idPxl, x + width);
    var idElps = charIDToTypeID("Rctn");
    desc10.putObject(idShp, idElps, desc11);
    var idcontentLayer = stringIDToTypeID("contentLayer");
    desc9.putObject(idUsng, idcontentLayer, desc10);
    executeAction(idMk, desc9, DialogModes.NO);
    // =======================================================
    //Restore old foreground color:
    app.foregroundColor = tmpColor;
}
function fillLayer(color, layer) {
    var tmpLayer = app.activeDocument.activeLayer;
    app.activeDocument.activeLayer = layer;
    var tmpColor = app.foregroundColor;
    app.foregroundColor = color;
    // =======================================================
    var desc6 = new ActionDescriptor();
    desc6.putEnumerated(charIDToTypeID('Usng'), charIDToTypeID('FlCn'), charIDToTypeID('FrgC'));
    executeAction(charIDToTypeID('Fl  '), desc6, DialogModes.NO);
    app.activeDocument.activeLayer = tmpLayer;
    app.foregroundColor = tmpColor;
}