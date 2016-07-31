class Layer{
  constructor(layer, x, y, width, height){
    // ¯\_(ツ)_/¯
    //Default values
    if(layer){
      this.layer = layer;
    }

    this.color = app.foregroundColor;
    this.width = width || 100;
    this.height = height || 100;

    if(x !== 0) 
      this.x = x || Number(app.activeDocument.width/2 - this.width/2);
    else
      this.x = 0;
    
    if(y !== 0)
      this.y = y || Number(app.activeDocument.height/2 - this.height/2);
    else
      this.y = 0
    
  }

  rename(name){
    this.layer.name = name;

    return this;
  }

  attr(attrs){
    //List of attributes: x, y, width, height, color, name,

    //TODO: x, y, width, height

    if('name' in attrs){
      this.layer.name = attrs.name;
    }

    if('color' in attrs){
      this.setColor(attrs.color);
    }

    if(('x' in attrs) && ('y' in attrs)){
      this.position(attrs.x, attrs.y);
    }else if('x' in attrs){
      this.position(attrs.x, this.y);
    }else if('y' in attrs){
      this.position(this.x, attrs.y);
    }

    return this;
  }

  toggleVisible(){
    //Toggle visibility of the layer
    if(this.layer.visible){
      this.layer.visible = false
    }else{
      this.layer.visible = true;
    }

    return this;

  }

  setActive(){
    //Make layer active
    app.activeDocument.activeLayer = this.layer;

    return this;
  }

  translate(xShift, yShift){
    //Move layer by xShift, yShift
    this.layer.translate(xShift, yShift);

    return this;
  }

  scale(factor){
    //Scale layer by factor
    Photoshop.scale(factor, this.layer);

    return this;
  }

  setColor(color){
    //Change color of the layer
    if(!(color instanceof SolidColor)){
      //If passed color is HEX value, 
      //then create SolidColor using this value 
      var hexValue = color;
      color = new SolidColor();
      color.rgb.hexValue = hexValue;
    }

    Photoshop.fillLayer(color, this.layer);

    return this;
  }

  addToGroup(groupName) {
    var targetGroup;

    if(typeof groupName === 'string'){
      try{
        //Check if there's group called groupName
        targetGroup = app.activeDocument.layerSets.getByName(groupName);
      }catch(e){
        //If groupName doesn't exist, then create it
        targetGroup = app.activeDocument.layerSets.add();
        targetGroup.name = groupName;
      } 
    }else{
      targetGroup = groupName;
    }
    
    this.layer.move(targetGroup, ElementPlacement.INSIDE);
    this.group = targetGroup;

    return this;
  }

  getWidth() {
    return Photoshop.getSize(this.layer).width;
  }

  getHeight() {
    return Photoshop.getSize(this.layer).height;
  }

  position(targetX, targetY) {
    var currentX = Number(this.layer.bounds[0]),
        currentY = Number(this.layer.bounds[1]);

    this.layer.translate(targetX - currentX, targetY - currentY);

    return this;
  }

}



//Ellipse
class Ellipse extends Layer{
  constructor(x, y, width, height){
    
    super(null, x, y, width, height);
    Photoshop.drawEllipse(this.x, this.y, this.width, this.height, this.color);

    //Save link to layer object
    this.layer = app.activeDocument.activeLayer;

    return this;
  }
}



//Rectangle
class Rectangle extends Layer{
  constructor(x, y, width, height, corner){
    
    super(null, x, y, width, height);
    
    if(!corner){
      Photoshop.drawRoundRect(this.x, this.y, this.width, this.height, 0, this.color);
    }else{
      Photoshop.drawRoundRect(this.x, this.y, this.width, this.height, corner, this.color);
    }

    //Save link to layer object
    this.layer = app.activeDocument.activeLayer;

    return this;
  }
}



// =======================================================
//  Photoshop Implementation
// =======================================================

// Encapsulate all Photoshop related methods
var Photoshop = {};

//AM-code beautify
function cTID(s) { return app.charIDToTypeID(s); }
function sTID(s) { return app.stringIDToTypeID(s); }


Photoshop.drawEllipse = function(x, y, width, height, color){
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
}

Photoshop.drawRoundRect = function(x, y, width, height, corners, color) {
  //Draw rounded rectangle (Photshop CC)
  //corners can be array of corners [Top Left, Top Right, Bottom Right, Bottom Left]

  
  if(!(corners instanceof Array)){
    var corner = corners;
    corners = [corner, corner, corner, corner];
  }
  
  // =======================================================
    var desc2722 = new ActionDescriptor();
      var ref281 = new ActionReference();
      ref281.putClass( sTID('contentLayer') );
    desc2722.putReference( cTID('null'), ref281 );
      var desc2723 = new ActionDescriptor();
        var desc2724 = new ActionDescriptor();
          var desc2725 = new ActionDescriptor();
          desc2725.putDouble( cTID('Rd  '), color.rgb.red );
          desc2725.putDouble( cTID('Grn '), color.rgb.green );
          desc2725.putDouble( cTID('Bl  '), color.rgb.blue );
        desc2724.putObject( cTID('Clr '), cTID('RGBC'), desc2725 );
      desc2723.putObject( cTID('Type'), sTID('solidColorLayer'), desc2724 );
        var desc2726 = new ActionDescriptor();
        desc2726.putInteger( sTID('unitValueQuadVersion'), 1 );
        desc2726.putUnitDouble( cTID('Top '), cTID('#Pxl'), y );
        desc2726.putUnitDouble( cTID('Left'), cTID('#Pxl'), x );
        desc2726.putUnitDouble( cTID('Btom'), cTID('#Pxl'), y+height );
        desc2726.putUnitDouble( cTID('Rght'), cTID('#Pxl'), x+width );
        desc2726.putUnitDouble( sTID('topRight'), cTID('#Pxl'), corners[1] );
        desc2726.putUnitDouble( sTID('topLeft'), cTID('#Pxl'), corners[0] );
        desc2726.putUnitDouble( sTID('bottomLeft'), cTID('#Pxl'), corners[3] );
        desc2726.putUnitDouble( sTID('bottomRight'), cTID('#Pxl'), corners[2] );
      desc2723.putObject( cTID('Shp '), cTID('Rctn'), desc2726 );
        desc2722.putObject( cTID('Usng'), sTID('contentLayer'), desc2723 );
      executeAction( cTID('Mk  '), desc2722, DialogModes.NO );
};


Photoshop.fillLayer = function(color, layer){
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

Photoshop.scale = function(factor, layer){
  var tmpLayer = app.activeDocument.activeLayer;
  app.activeDocument.activeLayer = layer;
  
  factor *= 100;
  
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
  desc4.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), factor);
  desc4.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), factor);
  desc4.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), stringIDToTypeID('bicubicAutomatic'));
  executeAction(charIDToTypeID('Trnf'), desc4, DialogModes.NO);
  
  app.activeDocument.activeLayer = tmpLayer;
}

Photoshop.getSize = function(layer){
  //Width/Height of layer
  var topX = Number(layer.bounds[0]);
  var topY = Number(layer.bounds[1]);
  var bottomX = Number(layer.bounds[2]);
  var bottomY = Number(layer.bounds[3]);
  
  var layerWidth = parseInt(bottomX - topX);
  var layerHeight = parseInt(bottomY - topY);
  
  return {width:layerWidth, height: layerHeight };
}
