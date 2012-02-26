
var CamClass = (function () {
    // private static
    //var nextId = 1;

    // constructor
    var cls = function (parameters) {
        var name = name;
        var pMatrix;
        //var invMatrix = mat4.create();
        var vMatrix;
        var fov = parameters.Fov;
        var near = parameters.Near;
        var far = parameters.Far;
        var aspectRatio = parameters.AspectRatio;
        var isPersp = parameters.IsPersp;
        var left = parameters.Left;
        var right = parameters.Right;
        var bottom = parameters.Bottom;
        var top = parameters.Top;

        this.Initialize = function () {

            //            gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            //            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            pMatrix = mat4.create();
            vMatrix = mat4.create();

            if (isPersp)
                mat4.perspective(fov, aspectRatio, 0.1, 100.0, pMatrix);
            else
                mat4.ortho(left, right, bottom, top, near, far, pMatrix);

            this.IsPersp = isPersp;

            mat4.identity(vMatrix);
            mat4.translate(vMatrix, [0, 0, 0]);
            mat4.inverse(vMatrix, vMatrix);
            this._initialized = true;
        }
        function makeOrtho(left, right,
                   bottom, top,
                   znear, zfar) {
            var tx = -(right + left) / (right - left);
            var ty = -(top + bottom) / (top - bottom);
            var tz = -(zfar + znear) / (zfar - znear);

            return $M([[2 / (right - left), 0, 0, tx],
               [0, 2 / (top - bottom), 0, ty],
               [0, 0, -2 / (zfar - znear), tz],
               [0, 0, 0, 1]]);
        }

        this.Update = function () {
            // gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            //mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
            //            var m = mat4.set(pMatrix, mat4.create());
            //            mat4.multiply(m, vMatrix, m);
            //            this.ViewProjectionMatrix = m;
            //gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, m);
        }
        this.GetPersMatrix = function () {
            return pMatrix;
        };
        this.GetViewMatrix = function () {
            return vMatrix;
        };
        this.GetNearDis = function () {
            return near;
        };
        this.GetFarDis = function () {
            return far;
        };
        this.GetFov = function () {
            return fov;
        };
    };


    // public static
    //    cls.get_nextId = function () {
    //        return nextId;
    //    };
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



        //        winx = parseFloat(winx);
        //        winy = parseFloat(winy);
        //        winz = parseFloat(winz);

        //        var inf = [];
        //        var viewport = [0, 0, gl.viewportWidth, gl.viewportHeight];

        //        //Calculation for inverting a matrix, compute projection x modelview; then compute the inverse
        //        //var m = mat4.set(mm, mat4.create());

        //        //mat4.inverse(m, m); // WHY do I have to do this? --see Jax.Context#reloadMatrices
        //        //mat4.multiply(pm, m, m);
        //        //mat4.inverse(m, m);
        //        var m = mat4.create();
        //        mat4.multiply(viewMatrix, invMatrix, m);
        //        // Transformation of normalized coordinates between -1 and 1
        //        inf[0] = (winx - viewport[0]) / viewport[2] * 2.0 - 1.0;
        //        inf[1] = (winy - viewport[1]) / viewport[3] * 2.0 - 1.0;
        //        inf[2] = 2.0 * winz - 1.0;
        //        inf[3] = 1.0;

        //        //Objects coordinates
        //        var out = [0, 0, 0, 0];
        //        mat4.multiplyVec4(m, inf, out);
        //        if (out[3] == 0.0)
        //            return false;

        //        out[3] = 1.0 / out[3];
        //        direction = [out[0] * out[3], out[1] * out[3], out[2] * out[3]];

        //        vec3.normalize(direction);
        //        return true;
    }





    //    // public (shared across instances)
    //    cls.prototype = {
    //        announce: function () {
    //            alert('Hi there! My id is ' + this.get_id() + ' and my name is "' + this.get_name() + '"!\r\n' +
    //                      'The next fellow\'s id will be ' + MyClass.get_nextId() + '!');
    //        }
    //    };

    return cls;
})();