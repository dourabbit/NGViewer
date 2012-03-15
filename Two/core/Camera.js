
var Camera = (function () {
    // private static
    //var nextId = 1;

    // constructor
    var cls = function (parameters) {
    	
    	object3D.call(this);
    	
        var name = name;
        var pMatrix;
       
        var fov = parameters.Fov;
        var near = parameters.Near;
        var far = parameters.Far;
        var aspectRatio = parameters.AspectRatio;
        var isPersp = parameters.IsPersp;
        var left = parameters.Left;
        var right = parameters.Right;
        var bottom = parameters.Bottom;
        var top = parameters.Top;
        this.viewMatrix = new Matrix4();
        //this.Initialize = function () {

            this.pMatrix = mat4.create();

            if (isPersp)
                mat4.perspective(fov, aspectRatio, 0.1, 100.0, pMatrix);
            else
                mat4.ortho(left, right, bottom, top, near, far, pMatrix);


        //}
//        function makeOrtho(left, right,
//                   bottom, top,
//                   znear, zfar) {
//            var tx = -(right + left) / (right - left);
//            var ty = -(top + bottom) / (top - bottom);
//            var tz = -(zfar + znear) / (zfar - znear);
//
//            return $M([[2 / (right - left), 0, 0, tx],
//               [0, 2 / (top - bottom), 0, ty],
//               [0, 0, -2 / (zfar - znear), tz],
//               [0, 0, 0, 1]]);
//        }
            
        

        this.Update = function () {
         
        }
        
    };
    cls.prototype = new object3D;
    cls.prototype.constructor = Camera;

    // public static
    cls.prototype.GetRay = function (winx, winy, winz, invMatrix, viewMatrix, viewHeight, viewWidth, fov, point, direction) {
        var window_y = viewHeight - winy - viewHeight / 2;
        var window_x = winx - viewWidth / 2;
        var norm_x = window_x / (viewWidth / 2);
        var norm_y = window_y / (viewHeight / 2);
        var near = 0.1;
        // var norm_z = (near - cls.GetNearDis()) / (cls.GetFarDis() - cls.GetNearDis());

        //0.1=near Z
        var tan = Math.tan(fov * Math.PI / 360.0);
        var nearHeight = near * tan;
        var aspect = viewWidth / viewHeight;

        var vecRay = [norm_x * nearHeight * aspect,
        			norm_y * nearHeight,
        			-near, 0];
        var vecPoint = [0, 0, -0.1, 1];
        vecPoint = mat4.multiplyVec4(viewMatrix, vecPoint);
        vecRay = mat4.multiplyVec4(viewMatrix, vecRay);

        point[0] = vecPoint[0];
        point[1] = vecPoint[1];
        point[2] = vecPoint[2];

        var v = [0, 0, 0];
        v[0] = vecRay[0];
        v[1] = vecRay[1];
        v[2] = vecRay[2];

        var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);

        direction[0] = v[0] / length;
        direction[1] = v[1] / length;
        direction[2] = v[2] / length;

    }


    return cls;
})();