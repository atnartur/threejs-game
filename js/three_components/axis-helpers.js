/*!from github.com/usco/three-js-helpers*/

import THREE from 'three'

THREE.ArrowHelper2 = function(direction, origin, length, color, headLength, headRadius, headColor) {
    THREE.Object3D.call(this);

    this.direction = direction || new THREE.Vector3(1, 0, 0);
    this.origin = origin || new THREE.Vector3(0, 0, 0);
    this.length = length || 50;
    this.color = color || "#FF0000";
    this.headLength = headLength || 6;
    this.headRadius = headRadius || headLength / 7;
    this.headColor = headColor || this.color;

    //dir, origin, length, hex
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(this.origin);
    lineGeometry.vertices.push(this.direction.setLength(this.length));
    this.line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color: this.color
    }));
    this.add(this.line);

    this.arrowHeadRootPosition = this.origin.clone().add(this.direction);
    this.head = new THREE.Mesh(new THREE.CylinderGeometry(0, this.headRadius, this.headLength, 8, 1, false), new THREE.MeshBasicMaterial({
        color: this.headColor
    }));
    this.head.position.copy(this.arrowHeadRootPosition);

    this.head.lookAt(this.arrowHeadRootPosition.clone().add(this.direction.clone().setLength(this.headLength)));
    this.head.rotateX(Math.PI / 2);

    this.add(this.head);

}
THREE.ArrowHelper2.prototype = Object.create(THREE.Object3D.prototype);



export
default THREE.LabeledAxes = function(options) {
    THREE.Object3D.call(this);

    this.size = options.size !== undefined ? options.size : 50;
    this.xColor = options.xColor !== undefined ? options.xColor : "0xFF7700";
    this.yColor = options.yColor !== undefined ? options.yColor : "0x77FF00";
    this.zColor = options.zColor !== undefined ? options.zColor : "0x0077FF";

    this.fontSize = options.fontSize !== undefined ? options.fontSize : 6;
    this.textColor = options.textColor !== undefined ? options.textColor : "#000";

    this.arrowSize = options.arrowSize !== undefined ? options.arrowSize : 3;

    var addLabels = options.addLabels !== undefined ? options.addLabels : true;
    var addArrows = options.addArrows !== undefined ? options.addArrows : true;

    this.xColor = new THREE.Color().setHex(this.xColor);
    this.yColor = new THREE.Color().setHex(this.yColor);
    this.zColor = new THREE.Color().setHex(this.zColor);

    if (addLabels == true) {
        var s = this.size;
        var fontSize = this.fontSize;

        this.xLabel = this._drawText("X", fontSize);
        this.xLabel.position.set(s, 0, 0);

        this.yLabel = this._drawText("Y", fontSize);
        this.yLabel.position.set(0, s, 0);

        this.zLabel = this._drawText("Z", fontSize);
        this.zLabel.position.set(0, 0, s);
    }
    if (addArrows == true) {
        s = this.size / 1.25; // THREE.ArrowHelper arrow length
        this.xArrow = new THREE.ArrowHelper2(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), s, this.xColor, this.arrowSize);
        this.yArrow = new THREE.ArrowHelper2(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), s, this.yColor, this.arrowSize);
        this.zArrow = new THREE.ArrowHelper2(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), s, this.zColor, this.arrowSize);
        this.add(this.xArrow);
        this.add(this.yArrow);
        this.add(this.zArrow);
    } else {
        this._buildAxes()
    }

    this.add(this.xLabel);
    this.add(this.yLabel);
    this.add(this.zLabel);
    this.name = "axes";

    //Make sure arrows are always visible (through objects)
    //not working in all cases ?
    this.xArrow.line.material.depthTest = false;
    this.xArrow.head.material.depthTest = false;

    this.yArrow.line.material.depthTest = false;
    this.yArrow.head.material.depthTest = false;

    this.zArrow.line.material.depthTest = false;
    this.zArrow.head.material.depthTest = false;
}

THREE.LabeledAxes.prototype = Object.create(THREE.Object3D.prototype);

THREE.LabeledAxes.prototype.toggle = function(toggle) {
    //apply visibility settings to all children 
    this.traverse(function(child) {
        child.visible = toggle;
    });
};


THREE.LabeledAxes.prototype._buildAxes = function() {
    lineGeometryX = new THREE.Geometry();
    lineGeometryX.vertices.push(new THREE.Vector3(-this.size, 0, 0));
    lineGeometryX.vertices.push(new THREE.Vector3(this.size, 0, 0));
    xLine = new THREE.Line(lineGeometryX, new THREE.LineBasicMaterial({
        color: this.xColor
    }));

    lineGeometryY = new THREE.Geometry();
    lineGeometryY.vertices.push(new THREE.Vector3(0, -this.size, 0));
    lineGeometryY.vertices.push(new THREE.Vector3(0, this.size, 0));
    yLine = new THREE.Line(lineGeometryY, new THREE.LineBasicMaterial({
        color: this.yColor
    }));

    lineGeometryZ = new THREE.Geometry();
    lineGeometryZ.vertices.push(new THREE.Vector3(0, 0, -this.size));
    lineGeometryZ.vertices.push(new THREE.Vector3(0, 0, this.size));
    zLine = new THREE.Line(lineGeometryZ, new THREE.LineBasicMaterial({
        color: this.zColor
    }));

    this.add(xLine);
    this.add(yLine);
    this.add(zLine);
}

THREE.LabeledAxes.prototype._drawText = function(text, fontSize, fontFace, textColor, background, scale) {
    var fontSize = 30; //fontSize || 
    var fontFace = fontFace || "sans-serif";
    var textColor = textColor || "#ffffff";
    var background = background || false;
    var scale = scale || 1.0;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = " " + fontSize + "px " + fontFace; //Bold

    canvas.width = 256
    canvas.height = 128
    // get size data (height depends only on font size)
    var metrics = context.measureText(text);
    console.log(metrics, canvas.width, canvas.height)
    var textWidth = metrics.width;

    // text color
    context.strokeStyle = textColor;
    context.fillStyle = textColor;
    // context.fillText( text, canvas.width/2, canvas.height/2 );
    context.strokeText(text, canvas.width / 2, canvas.height / 2)

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        useScreenCoordinates: false,
        color: 0xffffff
    });
    spriteMaterial.depthTest = false;
    spriteMaterial.renderDepth = 1e20

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(100 * scale, 50 * scale, 1.0);
    return sprite;
};