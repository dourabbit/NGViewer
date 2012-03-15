
var object3D = function () {

	this.parent = undefined;
	this.children = [];
	this.name = "";
	
    this._position = new Vector3();
    //this.rotation = new Vector3();
    this._vector = new Vector3();
    this._quaternion = new Quat4();
    this.mMatrix = new Matrix4();
    this.worldMatrix = new Matrix4();
};

object3D.prototype ={
	constructor: object3D,
	getPos:function(){return this._position},
	getQuat:function(){return this._quaternion},
	
	setParams:function(parameters){
		this.name = parameters.name;
		this._position = parameters.position;
		this._quaternion.
			setFromEuler(parameters.rotation).normalize();
	},
	
	translate: function ( distance, axis ) {

		Math3D.Matrix4.rotateVector3(this.mMatrix, axis );
		this._position.addSelf( axis.multiplyScalar( distance ) );
	},
	
	rotateByQuat:function(quat){
		this._quaternion = Quat4.multiplyQuat(this._quaternion, quat);
	},
	translateXLocal: function ( distance ) {

		this.translate( distance, this._vector.set( 1, 0, 0 ) );

	},
	
	translateYLocal: function ( distance ) {
	
		this.translate( distance, this._vector.set( 0, 1, 0 ) );
	
	},
	
	translateZLocal: function ( distance ) {
	
		this.translate( distance, this._vector.set( 0, 0, 1 ) );
	},
	
	getDirection:function(){
		this._vector.set( 0, 0, -1 );
		this._vector = Quat4.multiplyVec3(this._quaternion, this._vector);
		return this._vector;
	},
	update:function(){
		this.mMatrix.setPosition( this._position );
		this.mMatrix.setRotationFromQuaternion( this._quaternion );
		
		this.worldMatrix = this.parent?
				Matrix4.multiply(this.parent.worldMatrix,this.mMatrix)
				:this.mMatrix;
		
			
		if(!this.children||this.children.length==0)
			return;
		
		for(var i=0;i<this.children.length;i++){
			this.children[i].update();
		}
	}

		
};