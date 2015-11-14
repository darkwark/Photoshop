# Shape Classes
By default Adobe Photoshop doesn't provide functions for drawing shapes like Ellipses or Rectangles.
These classes provide such functionality.

## Usage
Include `Layer.js` to your main JSX file using
```javascript
#include Layer.js
```

## Layer
These methods are available across all shape types. 

You can set up layer's attributes using `attr` function
```javascript
var circle = new Ellipse().attr({
  name: "My Circle",
  color: "D2876D"
})
```

Rename shape layer
```javascript
circle.rename('myLayer')
```

Scale shape layer by 250%
```javascript
circle.scale(2.5)
```

Change shape's color. You can either enter HEX code or use `SolidColor` object
```javascript
circle.setColor("FF0000")
circle.setColor(app.foregroundColor)
```

Set shape as active layer
```javascript
circle.setActive();
```

You can also chain methods like this:
```javascript
var circle = new Ellipse();

circle
  .rename('Circle')
  .translate(200, 200)
  .scale(1.5);
```

Add shape to the group. If group doesn't exist it will be created.
```javascript
var rect = new Rectangle().addToGroup('Shapes'),
    circle = new Ellipse().addToGroup('Shapes')
```

Get layer Width and Height
```javascript
var rect = new Rectangle(0, 0, 120, 120, 50).scale(1.5),

newWidth = rect.getWidth(),
newHeight = rect.getHeight()
```

### Access ArtLayer object
You can always access layer object using `layer` property and do regular stuff with ArtLayer
```javascript
var layerRef = new Rectangle(50, 50, 100, 100).layer;
layerRef.rasterize(RasterizeType.ENTIRELAYER);
```

## Ellipse
Create new Ellipse object:
```javascript
var circle = new Ellipse(x, y, width, height)
```

## Rectangle
Create new Rectangle object:
```javascript
var rect = new Rectangle(x, y, width, height)
```

You can also specify corner radius of the Rectangle:
```javascript
var rect = new Rectangle(x, y, width, height, radius)
```

Or specify each corner's radius:
```javascript
var rect = new Rectangle(x, y, width, height, [topLeft, topRight, bottomRight, bottomLeft])
```