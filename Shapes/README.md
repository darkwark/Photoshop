# Shape Classes
By default Adobe Photoshop doesn't provide functions for drawing shapes like Ellipses or Rectangles.
These classes provide such functionality.

## Usage
Include `Layer.js` to your main JSX file using
```
#include Layer.js
```

## Layer
These methods are available across all shape types. 

You can set up layer's attributes using `attr` function
```
var circle = new Ellipse().attr({
  name: "My Circle",
  color: "D2876D"
});
```

Rename shape layer
```
circle.rename('myLayer');
```

Scale shape layer by 250%
```
circle.scale(2.5);
```

Change shape's color. You can either enter HEX code or use `SolidColor` object
```
circle.setColor("FF0000");
circle.setColor(app.foregroundColor);
```

Set shape as active layer
```
circle.setActive();
```

You can also chain methods like this:
```
var circle = new Ellipse();

circle
  .rename('Circle')
  .translate(200, 200)
  .scale(1.5);
```

Add shape to the group. If group doesn't exist it will be created.
```
var rect = new Rectangle().addToGroup('Shapes'),
    circle = new Ellipse().addToGroup('Shapes');
```

### Access ArtLayer object
You can always access layer object using `layer` property and do regular stuff with ArtLayer
```
var layerRef = new Rectangle(50, 50, 100, 100).layer;
layerRef.rasterize(RasterizeType.ENTIRELAYER);
```

## Ellipse
Create new Ellipse object:
```
var circle = new Ellipse(x, y, width, height).attr({
  color: "DDFF00",
  name: "Circle"
})
```

## Rectangle
Create new Rectangle object:
```
var rect = new Rectangle(x, y, width, height).attr({
  color: "b58dae",
  name: "Rect"
})
```

You can also specify corner radius of the Rectangle:
```
var rect = new Rectangle(x, y, width, height, radius)
```

Or specify each corner's radius:
```
var rect = new Rectangle(x, y, width, height, [topLeft, topRight, bottomRight, bottomLeft])
```