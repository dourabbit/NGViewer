
var Joint = (function () {
    // private static
    //var nextId = 1;
    var pyramidVertexPositionBuffer;
    var pyramidVertexColorBuffe;
    var isInitialized;
    var offsetRotMat = new Matrix4();
    offsetRotMat.rotateByAxis(new Vector3(0,0,1),(-Math.PI/2.0));
    var scale =0.3;
    //    var offsetRotMatFlatten =[];
    //    offsetRotMat.flattenToArray(offsetRotMatFlatten);
    // constructor
    var jointClass = function (parameters) {
    	this.baseWP = new Vector3();
    	this.tipWP = new Vector3();
    	this.boneVec = new Vector3();
    	object3D.call(this);
    	
    	if(parameters){this.setJoint(parameters);};
    	
        if (!isInitialized)
            this.initialize();
    };
   
    jointClass.prototype = new object3D;
    jointClass.prototype.constructor = Joint;
    jointClass.prototype.setJoint= function(parameters){
		this.name = parameters.name;
		this._position = parameters.position;
//		if(!parameters.direction){
//			this._quaternion = new Quat4();
//		}
//		else {
//			this._rotMat.rotateVecX(parameters.direction, new Vector3(0,1,0));
//			//this._quaternion.setFromRotationMatrix(this._rotMat);
//		}
		//add base and tip here!!!!!!!!!!!!!!!!!!!!!!!!!!!
		this._scaleMat = this._scaleMat.setScale(parameters._length?parameters._length:1,1,1);
		this.mMatrix= parameters.direction?
				this.mMatrix.rotateVecX(parameters.direction, new Vector3(0,1,0),new Vector3(0,0,0))://this._position):
					new Matrix4();
				
		this.mMatrix = Matrix4.multiply(this.mMatrix,this._scaleMat);
		if(!parameters.direction){parameters.direction = new Vector3();}
		this.boneVec = new Vector3(parameters.direction.x*parameters._length,
				parameters.direction.y*parameters._length,
				parameters.direction.z*parameters._length);
		//this.mMatrix =  Matrix4.multiply(this.mMatrix ,offsetRotMat);
		this._quaternion = new Quat4();
	};
	jointClass.prototype.initialJoints=function(){
		//Dont do this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// rotMat -> quat -> rotMat
		// some bug in between converting 
		// rotmat into quat and converting it back
		//this.mMatrix.setRotationFromQuaternion( this._quaternion );
		
		
		//var tmpMat = new Matrix4();
		//tmpMat.setPosition( this._position );
		//this.mMatrix = Matrix4.multiply(this._rotMat,tmpMat);
		
		//var p = this.parent?this.parent:this.root;
		
		//this.baseWP += p.baseWP;
		if(this.parent){
			this.baseWP.x += this.parent.tipWP.x;
			this.baseWP.y += this.parent.tipWP.y;
			this.baseWP.z += this.parent.tipWP.z;
			
			this.tipWP.x = this.baseWP.x + this.boneVec.x;
			this.tipWP.y = this.baseWP.y + this.boneVec.y;
			this.tipWP.z = this.baseWP.z + this.boneVec.z;
		}
		var tmpMat = new Matrix4();
		tmpMat.setPosition( this.baseWP);
		this.mMatrix = Matrix4.multiply(tmpMat,this.mMatrix );
		
		this.worldMatrix = this.parent?
				Matrix4.multiply(this.root.worldMatrix,this.mMatrix)
				:this.mMatrix;
		
		//this.worldMatrix = jointMat;
		if(!this.children||this.children.length==0)
			return;
		
		for(var i=0;i<this.children.length;i++){
			this.children[i].initialJoints();
		}
	};
	jointClass.prototype.update=function(){
	};
//	jointClass.prototype.updatePosRecursively=function(){
//		
//		this.mMatrix.setRotationFromQuaternion( this._quaternion );
//		this.mMatrix.setPosition( this._position );
//		this.mMatrix = Matrix4.multiply(this.parent.worldMatrix,this.mMatrix);
//		this.worldMatrix = this.parent?
//				Matrix4.multiply(this.parent.worldMatrix,this.mMatrix)
//				:this.mMatrix;
//		
//			
//		if(!this.children||this.children.length==0)
//			return;
//		
//		for(var i=0;i<this.children.length;i++){
//			this.children[i].updatePosRecursively();
//		}
//	}
    jointClass.prototype.initialize = function () {
        if (isInitialized)
            return;
        pyramidVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
        var vertices = [
        // Front face
             0.0, 1.0, 0.0,
            -scale, 0.0, scale,
            scale, 0.0, scale,

        // Right face
             0.0, 1.0, 0.0,
             scale, 0.0, scale,
             scale, 0.0, -scale,

        // Back face
             0.0, 1.0, 0.0,
             scale, 0.0, -scale,
            -scale, 0.0, -scale,

        // Left face
             0.0, 1.0, 0.0,
            -scale, 0.0, -scale,
            -scale, 0.0, scale
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
    jointClass.prototype.draw = function (modelMatrix, viewMatrix, projectionMatrix, shaderProgram) {
    	//pushMatrix();

        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pyramidVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, pyramidVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, modelMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, viewMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, pyramidVertexPositionBuffer.numItems);
        //popMatrix();
    };
    jointClass.prototype.drawSkeleton = function(joint, viewMat, projMat, shProgram, depth){
    	//var mat =  Matrix4.multiply(joint.worldMatrix,offsetRotMat);
//    	var mat =  Matrix4.multiply(joint.worldMatrix,this._rotMat);
//    	mat =  Matrix4.multiply(mat,offsetRotMat);
//    	mat.flattenToArray(modelMat);
    	var mat =  Matrix4.multiply(joint.worldMatrix,offsetRotMat);
    	mat.flattenToArray(modelMat);
    	//if(depth>=4) return;
    	joint.draw(modelMat,viewMat,projMat,shProgram);
    	if(depth != undefined){depth++;}
    	for(var i =0;i<joint.children.length;i++){
    		//var mat =  Matrix4.multiply(joint.children[i].worldMatrix,offsetRotMat);
    		//mat.flattenToArray(modelMat);
    		//joint.children[i].draw(modelMat,viewMat,projMat,shProgram);
    		
    		
    		joint.children[i].drawSkeleton(joint.children[i],viewMat,projMat,shProgram,depth);
    	}
    };

    return jointClass;
})();