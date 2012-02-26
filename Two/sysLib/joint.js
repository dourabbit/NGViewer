
var joint = (function () {
    // private static
    //var nextId = 1;
    var pyramidVertexPositionBuffer;
    var pyramidVertexColorBuffe;
    var isInitialized;
    // constructor
    var cls = function (parameters) {

        if (!isInitialized)
            this.initialize();


    };

    cls.prototype.initialize = function () {
        if (isInitialized)
            return;
        pyramidVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
        var vertices = [
        // Front face
             0.0, 1.0, 0.0,
            -1.0, -1.0, 1.0,
             1.0, -1.0, 1.0,

        // Right face
             0.0, 1.0, 0.0,
             1.0, -1.0, 1.0,
             1.0, -1.0, -1.0,

        // Back face
             0.0, 1.0, 0.0,
             1.0, -1.0, -1.0,
            -1.0, -1.0, -1.0,

        // Left face
             0.0, 1.0, 0.0,
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        pyramidVertexPositionBuffer.itemSize = 3;
        pyramidVertexPositionBuffer.numItems = 12;

        pyramidVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
        var colors = [
        // Front face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,

        // Right face
            1.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0,

        // Back face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,

        // Left face
            1.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        pyramidVertexColorBuffer.itemSize = 4;
        pyramidVertexColorBuffer.numItems = 12;

        isInitialized = true;
    };
    cls.prototype.draw = function (modelMatrix, veiwMatrix, projectionMatrix, shaderProgram) {
        mvPushMatrix();

        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pyramidVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, pyramidVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

        gl.drawArrays(gl.TRIANGLES, 0, pyramidVertexPositionBuffer.numItems);
        mvPopMatrix();

    }

    return cls;
})();