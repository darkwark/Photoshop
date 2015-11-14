# Shape Classes
By default Adobe Photoshop doesn't provide functions for drawing shapes like Ellipses or Rectangles.
These classes provide such functionality.

## Usage
Include `Layer.js` to your main JSX file using
```javascript
#include Layer.js
```
## Shapes
1. [Ellipse](#ellipse)
2. [Rectangle](#rectangle)

#### Ellipse
Create new Ellipse object:
```javascript
var circle = new Ellipse(x, y, width, height)
```

#### Rectangle
Create new Rectangle object:
```javascript
var rect = new Rectangle(x, y, width, height)
```

Optionally, you can specify corner radius of the Rectangle:
```javascript
var rect = new Rectangle(x, y, width, height, radius)
```

Specify individual radius for each of the corners:
```javascript
var rect = new Rectangle(x, y, width, height, [topLeft, topRight, bottomRight, bottomLeft])
```

## Methods
These methods are available across all layer shape types

You can also chain methods:
```javascript
var circle = new Ellipse();

circle
  .rename('Circle')
  .translate(200, 200)
  .scale(1.5);
```

Setup layer's attributes using `attr`
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

Change shape's color. You can either enter HEX-code (`FF0000`) or use `SolidColor` object
```javascript
circle.setColor('FF0000')
circle.setColor(app.foregroundColor)
```

Set shape as active layer
```javascript
circle.setActive();
```

Add shape to the group. If group doesn't exist it will be created. 
```javascript
var rect = new Rectangle().addToGroup('Shapes'),
    circle = new Ellipse().addToGroup('Shapes')
```
You can also access LayerSet object by accessing `group` property
```
var rect = new Rectangle().addToGroup("Shapes"),
    circle = new Ellipse().addToGroup(rect.group)
```

Get layer's width and height
```javascript
rect.getWidth(),
rect.getHeight()
```

Set position of the layer
```javascript
circle.position(x, y)
```

#### Access ArtLayer object
You can always access layer object using `layer` property and do regular stuff with ArtLayer
```javascript
var layerRef = new Rectangle(50, 50, 100, 100).layer;
layerRef.rasterize(RasterizeType.ENTIRELAYER);
```

