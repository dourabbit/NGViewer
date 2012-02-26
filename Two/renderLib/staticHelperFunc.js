var shaderProgram;
var aniRenderer = (function () {
    
    var cls = function(){
    
    };

    cls.prototype.initShaders = function () {
        var vertexShader = cls.prototype.getShader(gl, ShaderLib.baseCol, "vertexShader");
        var fragmentShader = cls.prototype.getShader(gl, ShaderLib.baseCol, "fragmentShader");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    }
    cls.prototype.getShader = function (gl, sh, type) {


        var shader;
        if (type == "fragmentShader") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
        else if (type == "vertexShader") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
        else {
            return null;
        }

        gl.shaderSource(shader, eval("sh." + type));
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }
    return cls;
})();