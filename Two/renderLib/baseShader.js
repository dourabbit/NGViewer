
ShaderLib = {


	'baseCol': {

		uniforms: {

			tDiffuse: { type: "t", value: 0, texture: null },
			opacity:  { type: "f", value: 1.0 }

		},
        fragmentShader: [
            "precision mediump float;",

            "varying vec4 vColor;",

            "void main(void) {",
                "gl_FragColor = vColor;",
            "}"

		].join("\n"),

        vertexShader: [
            "attribute vec3 aVertexPosition;",
            "attribute vec4 aVertexColor;",

            "uniform mat4 uMMatrix;",
            "uniform mat4 uVMatrix;",
            "uniform mat4 uPMatrix;",

            "varying vec4 vColor;",

            "void main(void) {",
                "gl_Position = uPMatrix * uVMatrix*uMMatrix * vec4(aVertexPosition, 1.0);",
                "vColor = aVertexColor;",
            "}"

		].join("\n")

	}

};
