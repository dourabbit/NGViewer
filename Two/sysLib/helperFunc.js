var mvMatrix = mat4.create();
var modelMat = mat4.create();
var viewMat = mat4.create();
mat4.identity(modelMat);
mat4.identity(viewMat);

var matrixStack = [];
var pMatrix = mat4.create();


function pushMatrix() {
    var copy = mat4.create();
    //mat4.multiply(modelMat, viewMat, mvMatrix);
    mat4.set(modelMat, copy);
    matrixStack.push(copy);
}

function popMatrix() {
    if (matrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    modelMat = matrixStack.pop();
}
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}


