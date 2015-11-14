var Ellipse = function(x, y, width, height){
  //Draws ellipse
  
  //Default values
  var color = app.foregroundColor,
    width = width || 100,
    height = height || 100,
    x = x || (app.activeDocument.width/2 - width/2),
    y = y || (app.activeDocument.height/2 - height/2);
      
  
  // Save current foreground color:
  var tmpColor = app.foregroundColor; 
  app.foregroundColor = color;

  // =======================================================
  var desc1 = new ActionDescriptor(),
      desc2 = new ActionDescriptor(),
      desc3 = new ActionDescriptor(),
      ref1 = new ActionReference();
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
  
  //Save link to layer object
  this.layer = app.activeDocument.activeLayer;

  return this;
};

Ellipse.prototype.attr = function(attrs){
  //List of attributes: x, y, width, height, color, name, visible

  //TODO: x, y, width, height, color, name, visible

  if(attrs.name){
    this.layer.name = attrs.name;
  }

  if(attrs.visible){
    this.layer.visible = attrs.visible;
  }

  if(attrs.color){

    var color = new SolidColor();
    color.rgb.hexValue = attrs.color;

    this.setColor(color);
    
  }

}

Ellipse.prototype.setActive = function () {
  //Make layer active
  app.activeDocument.activeLayer = this.layer;

  return this;
}

Ellipse.prototype.translate = function (xShift, yShift) {
  //Move layer by xShift, yShift
  this.layer.translate(xShift, yShift);

  return this;
}

Ellipse.prototype.setName = function (name) {
  //Rename layer
  this.layer.name = name;

  return this;
}

Ellipse.prototype.setScale = function (scale) {
  //Scale layer, scale = 1.5 will scale layer to 150%
  
  var tmpLayer = app.activeDocument.activeLayer;
  app.activeDocument.activeLayer = this.layer;
  
  scale *= 100;
  
  /*
  var top = this.layer.bounds[0];
  var left = this.layer.bounds[1];
  var bottom = this.layer.bounds[2];
  var right = this.layer.bounds[3];
  
  var currentWidth = Math.abs(left - right);
  var currentHeight = Math.abs(top - bottom);
  */
  
  // =======================================================
  var desc4 = new ActionDescriptor(),
      desc5 = new ActionDescriptor(),
      ref2 = new ActionReference();
  ref2.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
  desc4.putReference(charIDToTypeID('null'), ref2);
  desc4.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa'));
  desc5.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
  desc5.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
  desc4.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc5);
  desc4.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), scale);
  desc4.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), scale);
  desc4.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), stringIDToTypeID('bicubicAutomatic'));
  executeAction(charIDToTypeID('Trnf'), desc4, DialogModes.NO);
  
  app.activeDocument.activeLayer = tmpLayer;

  return this;
}

Ellipse.prototype.setColor = function (color) {
  var tmpLayer = app.activeDocument.activeLayer;
  app.activeDocument.activeLayer = this.layer;
  
  var tmpColor = app.foregroundColor;
  app.foregroundColor = color;
  
  // =======================================================
  var desc6 = new ActionDescriptor();
  desc6.putEnumerated(charIDToTypeID('Usng'), charIDToTypeID('FlCn'), charIDToTypeID('FrgC'));
  executeAction(charIDToTypeID('Fl  '), desc6, DialogModes.NO);
  
  app.activeDocument.activeLayer = tmpLayer;
  app.foregroundColor = tmpColor;

  return this;
}
