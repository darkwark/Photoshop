# Shape Classes
Classes for drawing various shapes using JSX.

## Ellipse (Draft)

Create new Ellipse object:
```
var circle = new Ellipse(color, x, y, width, height);
```

Rename shape layer
```
circle.setName('myLayer');
```

Scale shape layer by 250%
```
circle.setScale(2.5);
```

Change shape's color to red
```
var red = new SolidColor();
    red.rgb.hexValue = "FF0000";
  
circle.setColor(red);
```

Set shape as active layer
```
circle.setActive();
```

You can always access layer object using `circle.layer` property and do regular stuff with ArtLayer

You can also chain methods like this:
```
var circle = new Ellipse();

circle
  .setName('Circle')
  .translate(200, 200)
  .setScale(1.5);
```
