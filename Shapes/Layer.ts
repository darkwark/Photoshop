class Layer{
  constructor(){
    //
  }



  rename(name){
    this.name = name;

    return this;
  }



  attr(attrs){
    //List of attributes: x, y, width, height, color, name,

    //TODO: x, y, width, height

    if(attrs.name){
      this.layer.name = attrs.name;
    }

    if(attrs.color){
      this.setColor(attrs.color);
    }

    return this;
  }



  toggleVisible(){

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
    scale(factor, this.layer);

    return this;
  }



  setColor(color){
    if(!(color instanceof SolidColor)){

        var hexValue = color;
        color = new SolidColor();
        color.rgb.hexValue = hexValue;
    }

    fillLayer(color, this.layer);

    return this;
  }
}





//Ellipse
class Ellipse extends Layer{
  constructor(x, y, width, height){
    //Default values
    var color = app.foregroundColor,
      width = width || 100,
      height = height || 100,
      x = x || (app.activeDocument.width/2 - width/2),
      y = y || (app.activeDocument.height/2 - height/2);


      drawEllipse(x, y, width, height, color);

    //Save link to layer object
    this.layer = app.activeDocument.activeLayer;

    return this;
  }
}




//Rectangle
class Rectangle extends Layer{
  constructor(x, y, width, height){
    //Default values
    var color = app.foregroundColor,
      width = width || 100,
      height = height || 100,
      x = x || (app.activeDocument.width/2 - width/2),
      y = y || (app.activeDocument.height/2 - height/2);


      drawRectangle(x, y, width, height, color);

    //Save link to layer object
    this.layer = app.activeDocument.activeLayer;

    return this;
  }
}





//Photoshop Implementation
function drawEllipse(x, y, width, height, color){
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

function drawRectangle(x, y, width, height, color){
  //Draws Rectangle
  
  // Save current foreground color:
  var tmpColor = app.foregroundColor;
  
  app.foregroundColor = color;

  // =======================================================
  var idMk = charIDToTypeID( "Mk  " );
    var desc9 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
      var ref7 = new ActionReference();
      var idcontentLayer = stringIDToTypeID( "contentLayer" );
      ref7.putClass( idcontentLayer );
    desc9.putReference( idnull, ref7 );
    var idUsng = charIDToTypeID( "Usng" );
      var idType = charIDToTypeID( "Type" );
      var desc10 = new ActionDescriptor();
      var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
      desc10.putClass( idType, idsolidColorLayer );
      var idShp = charIDToTypeID( "Shp " );
        var desc11 = new ActionDescriptor();
        var idTop = charIDToTypeID( "Top " );
        var idPxl = charIDToTypeID( "#Pxl" );
            desc11.putUnitDouble( idTop, idPxl, y );
        var idLeft = charIDToTypeID( "Left" );
        var idPxl = charIDToTypeID( "#Pxl" );
            desc11.putUnitDouble( idLeft, idPxl, x );
        var idBtom = charIDToTypeID( "Btom" );
        var idPxl = charIDToTypeID( "#Pxl" );
            desc11.putUnitDouble( idBtom, idPxl, y+height );
        var idRght = charIDToTypeID( "Rght" );
        var idPxl = charIDToTypeID( "#Pxl" );
            desc11.putUnitDouble( idRght, idPxl, x+width );
      var idElps = charIDToTypeID( "Rctn" );
      desc10.putObject( idShp, idElps, desc11 );
    var idcontentLayer = stringIDToTypeID( "contentLayer" );
    desc9.putObject( idUsng, idcontentLayer, desc10 );
  executeAction( idMk, desc9, DialogModes.NO );
  // =======================================================
  
  //Restore old foreground color:
  app.foregroundColor = tmpColor;
}

function fillLayer(color, layer){
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

function scale(factor, layer){
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