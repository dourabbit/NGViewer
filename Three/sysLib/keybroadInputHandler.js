




var keybroadInputHandler = (function () {
    var threshold = 3;

    // constructor
    var cls = function (keyMapping, fncList) {
    	var objectPool;
        var fncs = fncList;
        var curEvent;
        this.doKeyDown = function (e) {
        	if(keyMapping[e.keyCode]){
                fncList[i].call(InputHelper,objectPool);
        	}
        };

       
        this.GetInputList = function () {

            return objectPool;
        };

        window.addEventListener('keydown',doKeyDown,true);
    };



    return cls;
})();

