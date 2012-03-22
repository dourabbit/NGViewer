
var aniReader = (function () {
  
    var cls = function (params) {
    	


    };
    cls.prototype.loadObj = function(url, callBack){
    	var req = new XMLHttpRequest();
		if(url.indexOf(".asf")!=-1) 
		        req.onreadystatechange = function () { cls.prototype.processLoadObj(req,callBack);};
		else if(url.indexOf(".amc")!=-1)
				req.onreadystatechange = function () { cls.prototype.processLoadAMC(req,callBack);};
        req.open("GET", url, true);
        req.send(null);
    };
    cls.prototype.parseASF = function(text){
    	result=[];
    	var args = text.match(/:[^:]*/g);//divided by ':*'
    	for(var paragraph in args){
    		
    		if(args[paragraph].split(' ').length==2){//two words single line
    			var params = args[paragraph].split(' ');
    			params[0] = params[0].split(':')[1];
    			result[params[0]] = params[1];
    		}
    		else{//multi lines
    			var lines = args[paragraph].match(/[\w].*/g);
    			if(/documentation/.test(lines[0]))//skip the :documentation
    				continue;
    			
    			
    			if(!cls.prototype.hasTag(lines)){//Don't have tag like "begin","end"
    				var data = [];
    				var child = {};
    				for(var i=1;i<lines.length;i++){
    					// read line by line
    					var data = cls.prototype.getChild(lines[i]);
    					
    					child[data[0]]=data[1];
    				}
    				var key = lines[0];
    				result[key] = child;
    			}
    			else if(lines[0]=="bonedata"){
    				//childDoc for reading
    				var childDoc = args[paragraph].match(/begin[^:]*?end/g);
    				var childResult =[];//for writing
    				for(var i=0;i<childDoc.length;i++){//every begin..end

    					//combining <limits> data into one raw			
    					var tmp = childDoc[i].replace(/\n\s+(?=\()/g," ");
    		
    					var childLines = tmp.split('\n');
    					var data = [];
    					var child = {};
    					for(var j=1;j<childLines.length-1;j++){
    						// read line by line
    						var data = cls.prototype.getChild(childLines[j]);
    						
    						child[data[0]]=data[1];
    						if(data.length>2){
    							
    							child[data[0]+"RotOrder"] = data[2];
    						}
    					}
    					//var key = child.name;
    					//childResult[key] = child;
    					childResult.push(child);
    				}
    				result[lines[0]] = childResult;
    			}
    			else if(lines[0]=="hierarchy"){
    				//childDoc for reading
    				var childDoc = args[paragraph].match(/begin[^:]*?end/g);

    				//combining <limits> data into one raw			
    				var tmp = childDoc[0].replace(/\n\s+(?=\()/g," ");
    		
    				var childLines = tmp.split('\n');
    				var data = [];
    				var child = [];
    				for(var j=1;j<childLines.length-1;j++)
    					child.push(childLines[j].match(/[\w].*/)[0]);

    				var hierarchyJoints = cls.prototype.readHierarchy(child);
    				result[lines[0]] = hierarchyJoints;
    				
    			}
    		}
    		//document.write(result);
    	}
    	return result;
    };
    cls.prototype.readHierarchy = function(linesStr){
    	var nodes = linesStr[0].split(" ");
    	var lines =[];
    	for(var c=0;c<linesStr.length;c++){
    		lines[c] = [];
    		var keyWords = linesStr[c].split(" ");
    		for(var r=0;r<keyWords.length;r++){
    			lines[c][r] = keyWords[r];
    		}
    	}
    	
    	var root = {};
    	root["children"]=[];
    	root["name"] = "root";
    	root["root"] = root;
    	var rootStack = [];
    	while(true){
    		var curNod = cls.prototype.moveNext(root,lines[0][1]);
    		for(var c=1;c<lines.length;c++){
    			if(lines[c][0]==curNod["name"]){

    				if(lines[c].length>2){
    					rootStack.push(curNod);
    				}
    				
    				curNod = cls.prototype.moveNext(curNod, lines[c][1]);
    				lines[c].splice(1,1);

    				
    				//delete curLine
    				if(lines[c].length==1){
    					lines.splice(c,1);c--;
    				}
    			}
    		}
    		lines[0].splice(1,1);
    		if(lines[0].length==1){
    			lines.splice(0,1);
    			if(rootStack.length==0)
    				break;
    			
    			root = rootStack.shift();
    		}
    	}
    	root = root.root;
    	//cls.prototype.printHierarchy(root,-1);
    	return root;
    }
    cls.prototype.printHierarchy = function(node,layer){
    	layer++;
    	if(!node.children)
    		return;
    	for(var n=0;n<layer;n++)
    		document.write("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
    	document.write(node.name+"<br/>");
    	for(var i =0; i<node.children.length;i++){
    		
    		cls.prototype.printHierarchy(node.children[i],layer);
    	}
    };
    
//    cls.prototype.searchChildren=function (curNod,context){
//    	//if(root.hasownproperty(child))
//    		//root[child]=[];
//    	
//    	for(var i=0;i<2;i++){
//    		for(var c=1;c<context.length;c++){
//    			if(context[c][0]==curNod["name"]){
//    				for(var r = 1; r<context[c].length;r++){	
//    					curNod = moveNext(curNod, context[c][r])
//    				}
//    				//delete curLine
//    				if(context[c].length==2){
//    					context.splice(c,1);
//    					c--;
//    				}
//    			}
//    		}
//    	}
//    }
    cls.prototype.moveNext=function (curNod, nextNodNm){
    	var nextNod = {};
    	nextNod["children"]=[];
    	nextNod["name"] = nextNodNm;
    	nextNod["root"] = curNod.root;
    	curNod["children"].push(nextNod);
    	return nextNod;
    };

    //\([\W].*?\)
    cls.prototype.getChild=function (data){
    		var result=new Array;
    		var index = 0;
    		var paramNms = data.match(/\b[a-zA-Z]+/g);
 
    			//data.match(/(?<=\D)[a-zA-Z]+/g);
    			//above is correct but javascript won't support
    			//searching str forward
    			//Damn! why?
    			//somebody kill me
    			
    			//data.match(/\S\D[a-zA-Z]+/g);
    			//above won't match [space]id xxx weird
    			
    			//data.match(/[a-zA-Z]+(?=\s)/g);
    			//above won't match xxx [space] xxx
    		
    		
    		//var digits = data.match(/[-+]?[0-9]*\.?[0-9]+/g); damn it has scientific notation;
    		var digitsStr = data.match(/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);
    		//Copy from following link
    		//http://stackoverflow.com/questions/638565/parsing-scientific-notation-sensibly
    		
    		
    		if(paramNms[0]=="length")
    			paramNms[0]="_length";
    		result[index]= paramNms[0];

//    		if(paramNms[0]=="id"&&digitsStr=="4"){
//    			console.log("asdf");
//    		}
//    		
    		
    		if(digitsStr!=null){
    			//Convert digitsStr to decimal
    			if(digitsStr.length==1)
    				result[++index]= +digitsStr[0];
    			else
    				result[++index]= this.convertScientificToDecimal(digitsStr);
    		
    			// for "axis 0 0 0 XYZ"
    			// get rot order into result in format of string
    			// use [XYZ] parse it later
    			//var tmpParams = data.match(/[a-df-zA-Z]+/g);
    			if(paramNms.length >1)
    				for(var i=1;i<paramNms.length;i++){
    					result[++index] = paramNms[i];
    				}
    			
    		}
    		else{
    			var value = data.replace(eval('/'+paramNms[0]+'/'),"");
    			value = value.replace(/^\s+/,"");
    			result[++index]= value;
    		}
    		return result;
    };
    cls.prototype.convertVectors = function(vec){
    	var result = [];
    	for(var i=0;i<sGrp.length;i++){
    		 result.push(+vec[i]);
    	}
    	return result;
    };
    
    //http://stackoverflow.com/questions/4126206/javascript-parsefloat-1-23e-7-gives-1-23e-7-when-need-0-000000123
    cls.prototype.convertScientificToDecimal = function(sGrp){
    		var result=[];
    		for(var i=0;i<sGrp.length;i++){
    			if (sGrp[i].match(/^[-+]?[1-9]\.[0-9]+e[-]?[1-9][0-9]*$/)) {
    				result.push((+sGrp[i]).toFixed(getPrecision(s)));
    			}
    			else{
    				result.push(+sGrp[i]);
    			}
    		}
    		var vector;
    		if(result.length==3){
    			vector = new Vector3(result[0],result[1],result[2]);
    			return vector;
    		}
    		return result;

    		// Get a nice decimal place precision for the scientific notation number.
    		// e.g. 1.23e-7 yields 7+2 places after the decimal point
    		// e.g. 4.5678e-11 yields 11+4 places after the decimal point
    		function getPrecision(scinum) {
    		  var arr = new Array();
    		  // Get the exponent after 'e', make it absolute.  
    		  arr = scinum.split('e');
    		  var exponent = Math.abs(arr[1]);

    		  // Add to it the number of digits between the '.' and the 'e'
    		  // to give our required precision.
    		  var precision = new Number(exponent);
    		  arr = arr[0].split('.');
    		  precision += arr[1].length;

    		  return precision;
    		}
    };
    cls.prototype.hasTag=function (data){
    	var result = false;
    	for(var i=0;i<data.length;i++)
    		result |= /begin|end/.test(data[i]);
    	return result;
    }
//    cls.prototype.hasFloat=function (data){
//
//    	return /[^A-Za-z]*/.test(data);
//    }
//    cls.prototype.isFloat=function (data){
//
//    	return /^[-+]?[0-9]+(\.[0-9]+)?$/.test(data);
//    }
//    cls.prototype.vectorFilter=function (data){
//    	var args = data.match(/[^A-Za-z]*/g);
//    	for(var lines in args){
//    		document.write(args[lines]);
//    	}
//    	
//    }
//    cls.prototype.getParam=function (line){
//    	result = {}
//    	var args = text.match(/\S+/g);
//    	var value = [];
//    	for(var i=1; i<args.length; i++){
//    		value[i-1] = args[i];  
//    	}
//    	result[args[0]] = value;
//    }

    cls.prototype.write=function (asf)
    {
        document.write(JSON.stringify(asf));

    }

    cls.prototype.frameData = function(frameNum, jointName, dof)
    {
    	this.frameNum = frameNum;
    	this.jointName = jointName;
    	this.dof = dof;
    }

    cls.prototype.getName = function(num)
    {
    	return result.bonedata[String(num)]['name'];
    }

    cls.prototype.getDof = function(num)
    {
    	return result.bonedata[String(num)]['dof'];
    }
    cls.prototype.parseAMC = function(text)
    {
    	var frameNumber = [];
    	animData = [];
    	var args = text.split('\n');
    	var Info1 = args[1];
    	var degOrRad = args[2]; 
    	var frameCount = 0;
    	    	
    	for(var paragraph = 3;paragraph<args.length;paragraph++){
    		var lines = args[paragraph].split(' '); 
    		if(lines.length==1){//frame number
    				frameNumber[frameCount] = lines[0];
    				frameCount++;
    				
    			}
    		else{
    			if(lines[0] == "root")
    			{
    				frameDataRoot = new Object(); 
    				frameDataRoot.frameNum =frameNumber[frameCount-1];
    				frameDataRoot.jointName ="root";
    				var dofValues = new Object();
    				dofValues.tx = lines[1];
    				dofValues.ty =lines[2];
    				dofValues.tz =lines[3];
    				dofValues.rx = lines[4];
    				dofValues.ry=lines[5];
    				dofValues.rz=lines[6];
    				frameDataRoot.dof=dofValues;
    			
    				animData.push(frameDataRoot);
    			}
    			else
    			{
    				var dofValues1 = new Object();
    				
    				for(var boneOrder in result["bonedata"])
    				{
    					var name = cls.prototype.getName(boneOrder);
    					
    					if(name.substr(0,lines[0].length) == lines[0])
    					{
    						//alert("value matched");	
    						var dof = cls.prototype.getDof(boneOrder).split(' ');
    						for( var dofCount =0;dofCount<dof.length;dofCount++)
    						{
    							//alert(dofCount);
    							switch(dof[dofCount].substr(0,2))
    							{
    							case "rx":
    								dofValues1.rx = lines[dofCount+1];
    								break;
    							case "ry":
    								dofValues1.ry = lines[dofCount+1];
    								break;
    							case "rz":
    								dofValues1.rz = lines[dofCount+1];
    								break;
    							}			
    						}
    					}
    					
    				}
    				animData.push(new cls.prototype.frameData(frameNumber[frameCount-1],lines[0],dofValues1));
    			}
    			
    				//document.write(animData);
    		}
    	}
    	return animData;

    };
    
    cls.prototype.processLoadObj = function(req,callBack)
    {
    	var result;
        if (req.readyState == 4) {
        	var text = req.responseText;
        	var args = text.match(/id\s+(\d+)/g);
        	//var boneNum = args[args.length-1].split(' ')[1];
    		
        	result =cls.prototype.parseASF(text);
        	
        	callBack.call(this,result);
        	
        }
    };
    cls.prototype.processLoadAMC = function(req,callBack)
	{
    	var result;
		if (req.readyState == 4) {
			var text = req.responseText;
			result = cls.prototype.parseAMC(text);
			//cls.prototype.printAnimData();
			callBack.call(result);
		}
	};
    

    cls.prototype.printAnimData = function(){
    	
    	for(var i =0;i<animData.length;i++)
    	{
    		document.write(animData[String(i)]['jointName']+"\n");
    		document.write(animData[String(i)]['dof']['rx']+"\n");
    		document.write(animData[String(i)]['frameNum']+"\n");
    	}
    	//chengfu changed
    };

    return cls;
})();