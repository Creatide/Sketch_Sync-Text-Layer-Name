function syncTextLayerName(context) {

    var doc = context.document;
    var selection = context.selection;

    if (selection.count() == 0) {
        doc.showMessage("Select at least one item. Only Text layer names is affected.");
        return;

    } else {
        loopLayers(selection, function (layer) {});
    }

    // Loop all layers even they are in groups
    function loopLayers(layers, callback) {

        for (var i = 0; i < [layers count]; i++) {

            var layer = [layers objectAtIndex: i];

            // Group
            if ([layer isMemberOfClass: [MSLayerGroup class]]) {
                callback(layer);
                loopLayers([layer layers], callback);
            }
            // Layer
            else {
                callback(layer);
                if ([layer isMemberOfClass: [MSTextLayer class]]) {
                    layer.setName(layer.stringValue());
                    layer.setNameIsFixed(false);
                }

            }

        }
    }

};
