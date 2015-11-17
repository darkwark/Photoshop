var layers = getSelectedLayersIdx();
renameLayers(layers, "New Name");



///////////////////////////////
// FUNCTIONS
///////////////////////////////
function renameLayers(layers, name) {
	/*
		Function renames selected layers.
		
		Requires getSelectedLayersIdx() for [layers] argument
		and makeActiveByIndex() for restoring layers selection
		
		2015 (c) darkwark.com
	*/
	
	for(i = 0; i < layers.length; i++){
		//Select layer
		makeActiveByIndex([layers[i]], false);
		
		//Rename layer
		app.activeDocument.activeLayer.name = name;
	}

	//Restore layers selection
	makeActiveByIndex(layers, false);
}




function getSelectedLayersIdx(){
	// Returns indexes of selected layers
	// Works with makeActiveByIndex() function;
	// Source: http://www.ps-scripts.com/bb/viewtopic.php?f=10&t=3625
	
	var selectedLayers = new Array;
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID("Dcmn"),
	charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
	var desc = executeActionGet(ref);
	if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){
		desc = desc.getList( stringIDToTypeID( 'targetLayers' ));
		var c = desc.count
		var selectedLayers = new Array();
		for(var i=0;i<c;i++){
			try{
				activeDocument.backgroundLayer;
				selectedLayers.push( desc.getReference( i ).getIndex() );
			}catch(e){
				selectedLayers.push( desc.getReference( i ).getIndex()+1 );
			}
		}
	}else{
		var ref = new ActionReference();
		ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" ));
		ref.putEnumerated( charIDToTypeID("Lyr "),
		charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
		try{
			activeDocument.backgroundLayer;
			selectedLayers.push(
			executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1);
		}catch(e){
			selectedLayers.push(
			executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));
		}
	}
	return selectedLayers;
}

function makeActiveByIndex(idx, visible) {
	// Function makes active layer by its index
	// Index can be retrieved by getSelectedLayersIdx() function
	
	///////////////////////////////////////////////////////////////////////////////
	// Function: makeActiveByIndex
	// Description: Sets the activeLayer by AM itemIndex
	// Usage: var idx = makeActiveByIndex( 7, false );
	// Input: Array - AM itemIndexes, Boolean - force visible
	// Return: -1 if failed
	// Notes:  If forceVisible = true layer.visible is set to true
	//               if false, layer.visible is left unchanged.
	///////////////////////////////////////////////////////////////////////////////
	
    for (var i = 0; i < idx.length; i++) {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIndex(charIDToTypeID("Lyr "), idx[i])
        desc.putReference(charIDToTypeID("null"), ref);
        if (i > 0) {
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
        }
        desc.putBoolean(charIDToTypeID("MkVs"), visible);
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
    }
}