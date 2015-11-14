var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer = (function () {
    function Layer() {
        // ¯\_(ツ)_/¯
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
    Layer.prototype.scale = function (factor) {
        scale(factor, this.layer);
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
    Layer.prototype.addToGroup = function (groupName) {
        var targetGroup;
        try {
            //Check if there's group called groupName
            targetGroup = app.activeDocument.layerSets.getByName(groupName);
        }
        catch (e) {
            //If groupName doesn't exist, then create it
            targetGroup = app.activeDocument.layerSets.add();
            targetGroup.name = groupName;
        }
        this.layer.move(targetGroup, ElementPlacement.INSIDE);
        return this;
    };
    return Layer;
})();
//Ellipse
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(x, y, width, height) {
        //Default values
        var color = app.foregroundColor;
        width = width || 100;
        height = height || 100;
        if (x !== 0)
            x = x || (app.activeDocument.width / 2 - width / 2);
        if (y !== 0)
            y = y || (app.activeDocument.height / 2 - height / 2);
        drawEllipse(x, y, width, height, color);
        //Save link to layer object
        this.layer = app.activeDocument.activeLayer;
        return this;
    }
    return Ellipse;
})(Layer);
//Rectangle
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x, y, width, height, corner) {
        //Default values
        var color = app.foregroundColor;
        width = width || 100;
        height = height || 100;
        if (x !== 0)
            x = x || (app.activeDocument.width / 2 - width / 2);
        if (y !== 0)
            y = y || (app.activeDocument.height / 2 - height / 2);
        if (!corner) {
            drawRectangle(x, y, width, height, color);
        }
        else {
            drawRoundRect(x, y, width, height, corner, color);
        }
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
function drawRoundRect(x, y, width, height, corners, color) {
    //Draw rounded rectangle (Photshop CC)
    //corners can be array of corners [Top Left, Top Right, Bottom Right, Bottom Left]
    if (!(corners instanceof Array)) {
        var corner = corners;
        corners = [corner, corner, corner, corner];
    }
    // =======================================================
    var idMk = charIDToTypeID("Mk  ");
    var desc2722 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref281 = new ActionReference();
    var idcontentLayer = stringIDToTypeID("contentLayer");
    ref281.putClass(idcontentLayer);
    desc2722.putReference(idnull, ref281);
    var idUsng = charIDToTypeID("Usng");
    var desc2723 = new ActionDescriptor();
    var idType = charIDToTypeID("Type");
    var desc2724 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var desc2725 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc2725.putDouble(idRd, color.rgb.red);
    var idGrn = charIDToTypeID("Grn ");
    desc2725.putDouble(idGrn, color.rgb.green);
    var idBl = charIDToTypeID("Bl  ");
    desc2725.putDouble(idBl, color.rgb.blue);
    var idRGBC = charIDToTypeID("RGBC");
    desc2724.putObject(idClr, idRGBC, desc2725);
    var idsolidColorLayer = stringIDToTypeID("solidColorLayer");
    desc2723.putObject(idType, idsolidColorLayer, desc2724);
    var idShp = charIDToTypeID("Shp ");
    var desc2726 = new ActionDescriptor();
    var idunitValueQuadVersion = stringIDToTypeID("unitValueQuadVersion");
    desc2726.putInteger(idunitValueQuadVersion, 1);
    var idTop = charIDToTypeID("Top ");
    var idPxl = charIDToTypeID("#Pxl");
    desc2726.putUnitDouble(idTop, idPxl, x);
    var idLeft = charIDToTypeID("Left");
    var idPxl = charIDToTypeID("#Pxl");
    desc2726.putUnitDouble(idLeft, idPxl, y);
    var idBtom = charIDToTypeID("Btom");
    var idPxl = charIDToTypeID("#Pxl");
    desc2726.putUnitDouble(idBtom, idPxl, y + height);
    var idRght = charIDToTypeID("Rght");
    var idPxl = charIDToTypeID("#Pxl");
    desc2726.putUnitDouble(idRght, idPxl, x + width);
    var idtopRight = stringIDToTypeID("topRight");
    var idPxl = charIDToTypeID("#Pxl");
    desc2726.putUnitDouble(idtopRight, idPxl, corners[1]);
    var idtopLeft = stringIDToTypeID("topLeft");
    var idPxl = charIDToTypeID("#Pxl");
    desc2726.putUnitDouble(idtopLeft, idPxl, corners[0]);
    var idbottomLeft = stringIDToTypeID("bottomLeft");
    var idPxl = charIDToTypeID("#Pxl");
    desc2726.putUnitDouble(idbottomLeft, idPxl, corners[3]);
    var idbottomRight = stringIDToTypeID("bottomRight");
    var idPxl = charIDToTypeID("#Pxl");
    desc2726.putUnitDouble(idbottomRight, idPxl, corners[2]);
    var idRctn = charIDToTypeID("Rctn");
    desc2723.putObject(idShp, idRctn, desc2726);
    var idstrokeStyle = stringIDToTypeID("strokeStyle");
    var desc2727 = new ActionDescriptor();
    var idstrokeStyleVersion = stringIDToTypeID("strokeStyleVersion");
    desc2727.putInteger(idstrokeStyleVersion, 2);
    var idstrokeEnabled = stringIDToTypeID("strokeEnabled");
    desc2727.putBoolean(idstrokeEnabled, false);
    var idfillEnabled = stringIDToTypeID("fillEnabled");
    desc2727.putBoolean(idfillEnabled, true);
    var idstrokeStyleLineWidth = stringIDToTypeID("strokeStyleLineWidth");
    var idPnt = charIDToTypeID("#Pnt");
    desc2727.putUnitDouble(idstrokeStyleLineWidth, idPnt, 1.000000);
    var idstrokeStyleLineDashOffset = stringIDToTypeID("strokeStyleLineDashOffset");
    var idPnt = charIDToTypeID("#Pnt");
    desc2727.putUnitDouble(idstrokeStyleLineDashOffset, idPnt, 0.000000);
    var idstrokeStyleMiterLimit = stringIDToTypeID("strokeStyleMiterLimit");
    desc2727.putDouble(idstrokeStyleMiterLimit, 100.000000);
    var idstrokeStyleLineCapType = stringIDToTypeID("strokeStyleLineCapType");
    var idstrokeStyleLineCapType = stringIDToTypeID("strokeStyleLineCapType");
    var idstrokeStyleButtCap = stringIDToTypeID("strokeStyleButtCap");
    desc2727.putEnumerated(idstrokeStyleLineCapType, idstrokeStyleLineCapType, idstrokeStyleButtCap);
    var idstrokeStyleLineJoinType = stringIDToTypeID("strokeStyleLineJoinType");
    var idstrokeStyleLineJoinType = stringIDToTypeID("strokeStyleLineJoinType");
    var idstrokeStyleMiterJoin = stringIDToTypeID("strokeStyleMiterJoin");
    desc2727.putEnumerated(idstrokeStyleLineJoinType, idstrokeStyleLineJoinType, idstrokeStyleMiterJoin);
    var idstrokeStyleLineAlignment = stringIDToTypeID("strokeStyleLineAlignment");
    var idstrokeStyleLineAlignment = stringIDToTypeID("strokeStyleLineAlignment");
    var idstrokeStyleAlignInside = stringIDToTypeID("strokeStyleAlignInside");
    desc2727.putEnumerated(idstrokeStyleLineAlignment, idstrokeStyleLineAlignment, idstrokeStyleAlignInside);
    var idstrokeStyleScaleLock = stringIDToTypeID("strokeStyleScaleLock");
    desc2727.putBoolean(idstrokeStyleScaleLock, false);
    var idstrokeStyleStrokeAdjust = stringIDToTypeID("strokeStyleStrokeAdjust");
    desc2727.putBoolean(idstrokeStyleStrokeAdjust, false);
    var idstrokeStyleLineDashSet = stringIDToTypeID("strokeStyleLineDashSet");
    var list32 = new ActionList();
    desc2727.putList(idstrokeStyleLineDashSet, list32);
    var idstrokeStyleBlendMode = stringIDToTypeID("strokeStyleBlendMode");
    var idBlnM = charIDToTypeID("BlnM");
    var idNrml = charIDToTypeID("Nrml");
    desc2727.putEnumerated(idstrokeStyleBlendMode, idBlnM, idNrml);
    var idstrokeStyleOpacity = stringIDToTypeID("strokeStyleOpacity");
    var idPrc = charIDToTypeID("#Prc");
    desc2727.putUnitDouble(idstrokeStyleOpacity, idPrc, 100.000000);
    var idstrokeStyleContent = stringIDToTypeID("strokeStyleContent");
    var desc2728 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var desc2729 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc2729.putDouble(idRd, 0.000000);
    var idGrn = charIDToTypeID("Grn ");
    desc2729.putDouble(idGrn, 0.000000);
    var idBl = charIDToTypeID("Bl  ");
    desc2729.putDouble(idBl, 0.000000);
    var idRGBC = charIDToTypeID("RGBC");
    desc2728.putObject(idClr, idRGBC, desc2729);
    var idsolidColorLayer = stringIDToTypeID("solidColorLayer");
    desc2727.putObject(idstrokeStyleContent, idsolidColorLayer, desc2728);
    var idstrokeStyleResolution = stringIDToTypeID("strokeStyleResolution");
    desc2727.putDouble(idstrokeStyleResolution, 72.000000);
    var idstrokeStyle = stringIDToTypeID("strokeStyle");
    desc2723.putObject(idstrokeStyle, idstrokeStyle, desc2727);
    var idcontentLayer = stringIDToTypeID("contentLayer");
    desc2722.putObject(idUsng, idcontentLayer, desc2723);
    executeAction(idMk, desc2722, DialogModes.NO);
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
function scale(factor, layer) {
    var tmpLayer = app.activeDocument.activeLayer;
    app.activeDocument.activeLayer = layer;
    factor *= 100;
    // =======================================================
    var desc4 = new ActionDescriptor(), desc5 = new ActionDescriptor(), ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc4.putReference(charIDToTypeID('null'), ref2);
    desc4.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa'));
    desc5.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
    desc5.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
    desc4.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc5);
    desc4.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), factor);
    desc4.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), factor);
    desc4.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), stringIDToTypeID('bicubicAutomatic'));
    executeAction(charIDToTypeID('Trnf'), desc4, DialogModes.NO);
    app.activeDocument.activeLayer = tmpLayer;
}
