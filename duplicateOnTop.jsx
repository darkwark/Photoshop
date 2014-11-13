/*
 *  Adobe Photoshop Script
 *
 *  DESCRIPTION:
 *  Script duplicates selected layer and places it on the top of layers stack
 *
 *  INSTALATION: 
 *  To access script from "File > Scripts", place it into "Photoshop/Presets/Scripts" and restart your Photoshop
 *  You can also set up hotkey in "Edit > Keyboard Shortcuts..."
 *
 *  (c) darkwark, 2014/NOV
 */

//Duplicate selected layer and place it on the top
var actLayer = app.activeDocument.activeLayer,
	newLayer = actLayer.duplicate(app.activeDocument.layers[0], ElementPlacement.PLACEBEFORE);

//OPTIONAL: Rename duplicated layer
//newLayer.name = "[DUPLICATE]" + actLayer.name;

//Select duplicated layer:
app.activeDocument.activeLayer = newLayer;
