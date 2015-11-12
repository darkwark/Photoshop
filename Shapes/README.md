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

Also, you can always access layer object through `circle.layer` property.