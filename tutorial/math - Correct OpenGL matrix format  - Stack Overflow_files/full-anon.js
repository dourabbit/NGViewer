'use strict';(function(e){function c(){this._events={};this._maxListeners=10}function a(b,d,g,a,f){this.type=b;this.listener=d;this.scope=g;this.once=a;this.instance=f}a.prototype.fire=function(b){this.listener.apply(this.scope||this.instance,b);if(this.once)return this.instance.removeListener(this.type,this.listener,this.scope),!1};c.prototype.eachListener=function(b,d){var a=null,c=null,f=null;if(this._events.hasOwnProperty(b)){c=this._events[b];for(a=0;a<c.length;a+=1)if(f=d.call(this,c[a],a),
!1===f)a-=1;else if(!0===f)break}return this};c.prototype.addListener=function(b,d,g,c){this._events.hasOwnProperty(b)||(this._events[b]=[]);this._events[b].push(new a(b,d,g,c,this));this.emit("newListener",b,d,g,c);this._maxListeners&&!this._events[b].warned&&this._events[b].length>this._maxListeners&&("undefined"!==typeof console&&console.warn("Possible EventEmitter memory leak detected. "+this._events[b].length+" listeners added. Use emitter.setMaxListeners() to increase limit."),this._events[b].warned=
!0);return this};c.prototype.on=c.prototype.addListener;c.prototype.once=function(b,a,g){return this.addListener(b,a,g,!0)};c.prototype.removeListener=function(b,a,g){this.eachListener(b,function(c,f){c.listener===a&&(!g||c.scope===g)&&this._events[b].splice(f,1)});this._events[b]&&0===this._events[b].length&&delete this._events[b];return this};c.prototype.off=c.prototype.removeListener;c.prototype.removeAllListeners=function(b){b&&this._events.hasOwnProperty(b)?delete this._events[b]:b||(this._events=
{});return this};c.prototype.listeners=function(b){if(this._events.hasOwnProperty(b)){var a=[];this.eachListener(b,function(b){a.push(b.listener)});return a}return[]};c.prototype.emit=function(a){for(var d=[],c=null,c=1;c<arguments.length;c+=1)d.push(arguments[c]);this.eachListener(a,function(a){return a.fire(d)});return this};c.prototype.setMaxListeners=function(a){this._maxListeners=a;return this};"function"===typeof define&&define.amd?define(function(){return c}):e.EventEmitter=c})(this);
StackExchange.realtime=function(){function e(){j.on("hb",function(a){d.send(a)})}function c(a){f?(console.log("sending: "+a),d.send(a)):h.push(a)}function a(a){var b=document.title.replace(/^\(\d*\*?\) /,"");0<a&&(b="("+a+") "+b);window.setTimeout(function(){$(document).attr("title",b)},200)}var b,d,g=[],h=[],f=!1,k=function(){var b=Object.keys(g).length;a(b);return $('<div id="new-post-activity">'+b+" question"+(1<b?"s":"")+" with new activity</div>").click(function(){StackExchange.realtime.expandActiveQuestions()})},
j=new EventEmitter;return{init:function(a){b=a;if("WebSocket"in window||"MozWebSocket"in window){if(d)try{console.log("closing WebSocket"),d.close()}catch(c){}d||(console.log("opening WebSocket"),d="WebSocket"in window?new WebSocket(b):new MozWebSocket(b),d.onopen=function(){if(!f){f=!0;for(var a=0,b=h.length;a<b;a++)console.log("sending: "+h[a]),d.send(h[a]);h=[]}console.log("WebSocket opened");e()},d.onmessage=function(a){a=jQuery.parseJSON(a.data);j.emit(a.action,a.data)},d.onclose=function(){d=
null;console.log("WebSocket closed")},d.onerror=function(){console.log("WebSocket failed");d=null})}},expandActiveQuestions:function(){$("#new-post-activity").remove();for(var b in g)$("#question-summary-"+b).remove(),$(g[b]).prependTo("#question-mini-list").hide().fadeIn();a(0);null!=StackExchange.options.user.accountId&&StackExchange.tagPreferences.applyPrefs(!0);"undefined"!=typeof MathJax&&MathJax.Hub.Queue(["Typeset",MathJax.Hub]);g=[]},subscribeToActiveQuestions:function(a){a+="-home-active";
c(a);j.on(a,function(a){a=jQuery.parseJSON(a);null!=StackExchange.options.user.accountId&&StackExchange.tagPreferences.isIgnored(a.body)||(g[a.id]=a.body,$("#new-post-activity").remove(),$("#question-mini-list").prepend(k))})},subscribeToInboxNotifications:function(){if(null!=StackExchange.options.user.accountId){var a=StackExchange.options.user.accountId+"-inbox";c(a);j.on(a,function(a){$(".unreadCount").remove();var b=$('<a class="unreadCount" title="unread messages in your inbox">'+a+"</a>").insertAfter(".genu");
$("#portalLink .unreadCount").css({marginTop:b.css("margin-top"),opacity:1},2E3);genuwine.setUnreadCount(a)})}}}}();"use strict";StackExchange.anonymous={};
var gauth=function(){return{informStackAuth:function(e){if(gauth.enabled()){var c=document.domain;"meta."==c.substr(0,5)&&(c=c.substr(4,c.length-4));var a=$.cookie("gauth");if(null==a)$.cookie("gauth",null,{path:"/",domain:c}),$.cookie("gauth",null,{path:"/",domain:document.domain});else{"."!=c.charAt(0)&&(c="."+c);$.cookie("gauth",null,{path:"/",domain:c});$.cookie("gauth",null,{path:"/",domain:document.domain});var b=a.indexOf(":"),c=a.substr(0,b),a=a.substr(b+1),d=e+"/auth/global/write?authToken="+
encodeURIComponent(c)+"&nonce="+encodeURIComponent(a);$(document).ready(function(){$("#footer").append("<iframe style='display:none' src='"+d+"'></iframe>")})}}},checkStackAuth:function(e){if(gauth.enabled()&&null==$.cookie("gauthed")){$.cookie("gauthed","1",{path:"/"});var c=function(a){if(a.origin==e)if("No Local Storage"==a.data)gauth.noGAuthStorage();else if("No Session"==a.data)gauth.noGAuthSession();else{var b=a.data.substr(0,a.data.indexOf(",")),a=a.data.substr(a.data.indexOf(",")+1);$.post("/users/login/global",
{authToken:b,nonce:a},function(a){gauth.globallyAuthed(a)},"json")}};window.attachEvent?window.attachEvent("onmessage",c):window.addEventListener("message",c,!1);$.post("/users/login/global/request","",function(a){var b=e+"/auth/global/read?request="+encodeURIComponent(a.token)+"&nonce="+encodeURIComponent(a.nonce);$(document).ready(function(){$("#footer").append("<iframe id='global-auth-frame' style='display:none' src='"+b+"'></iframe>")})},"json")}},enabled:function(){$.cookie("enabledCheck","1");
if(null==$.cookie("enabledCheck"))return!1;$.cookie("enabledCheck",null);return"undefined"==typeof localStorage?!1:!0},noGAuthStorage:function(){},noGAuthSession:function(){},globallyAuthed:function(e){if(e&&e.Message){var e=e.Message+" ",c,a=!1,b=""+window.location,d=b.indexOf("returnurl=");if(-1!=d){var g=b.indexOf("&",d);-1==g&&(g=b.length);c=decodeURIComponent(b.substring(d+10,g));c=/^(?:http:\/\/|\/)/.test(c)?c.replace(/[^-a-z0-9+&@#\/%?=~_|!:,.;()]/g,""):null}-1!=b.indexOf("/users/login")&&
(a=!0,c=c||"/");StackExchange.helpers.showFancyOverlay({message:a?e+"<br>You are being redirected...":e+(c?"<a href=\"javascript:window.location='"+c+"'\">Click here</a> to return to your last location.":'<a href="javascript:location.reload(true)">Click here</a> to refresh the page.'),showClose:!a,complete:function(){a&&(window.location=c)}})}}}}(),genuwine=function(){var e,c="",a,b=function(){return $(".genu").hasClass("genu-on")},d=function(){var b=$(".genu"),d=$("#seWrapper");if(0==d.length){g();
var d=$("#seWrapper"),c;0<a?(c=$("#seTabInbox"),i(c)):(c=$("#seTabHot"),h(c));c.addClass("seCurrent")}(c=b.hasClass("genu-on"))?($(".unreadCountTab").hide(),$(".itemBoxNew").removeClass("itemBoxNew"),d.fadeOut("fast")):(d.fadeIn("fast"),$(".unreadCount").hide());b.toggleClass("genu-on",!c);-1==a&&$(b).ready(function(){$("#seTabInbox").hide()})},g=function(){var a='<div id="seWrapper" style="position:absolute; display:none;"><div class="seIntro"><a href="'+c+'">Stack Exchange</a> is a network of free, community-driven Q&A sites.</div><div class="seNav"><ul class="seNavLinks"><li><a id="seTabHot">Hot Questions</a></li><li><a id="seTabSites">All Sites</a></li><li><a id="seTabInbox">Inbox</a></li></ul></div><div class="seContainer"></div><div class="seFooter"><div id="seTabEmail" class="seEmailAccount"><a>email settings</a></div><a id="seClose">close</a></div></div>',
b=$("#hlinks"),b=b.height()+b.offset().top+5;$(a).appendTo("#portalLink").css({top:b}).find("ul.seNavLinks a, #seTabEmail").click(function(){var a=$(this);$(".seNavLinks a").removeClass("seCurrent");a.addClass("seCurrent");switch(a.attr("id")){case "seTabHot":h(a);$("#seContainerSites, #seContainerInbox, #seContainerEmail").hide();$("#seContainerHot").fadeIn("fast");break;case "seTabSites":0==$("#seContainerSites").length&&m(a,c+"/genuwine/sites?callback=?&host="+document.location.host+(e?"&accountId="+
e:""),"jsonp",j);$("#seContainerHot, #seContainerInbox, #seContainerEmail").hide();$("#seContainerSites").fadeIn("fast");break;case "seTabInbox":i(a);$("#seContainerHot, #seContainerSites, #seContainerEmail").hide();$("#seContainerInbox").fadeIn("fast");break;case "seTabEmail":0==$("#seContainerEmail").length&&f(a),$("#seContainerHot, #seContainerSites, #seContainerInbox").hide(),$("#seContainerEmail").fadeIn("fast")}});$("#seClose").live("click",d)},h=function(a){0==$("#seContainerHot").length&&
m(a,c+"/genuwine?callback=?","jsonp",k)},f=function(a){m(a,"/accounts/email-settings","json",function(a,b){function c(){$("#email-save").removeAttr("disabled");$("#email-confirmation").html("")}l(a,'<div id="seContainerEmail" style="display:none; font-size:11px;"><div class="itemBox" style="border-bottom: 0px"><p>Would you like to receive unread inbox notifications via email?</p><div>Email: <input id="email-notify" name="email-notify" style="width:300px;" value="'+b.verifiedEmail+'"></input></div><div><input type="radio" name="optIn" value="true" id="email-enable"'+
(!0==b.optIn?'checked="checked"':"")+'"> <label for="email-enable">Email me my unread inbox messages </label> <select id="email-freq"><option value="3">every 3 hours</option><option value="24">daily</option><option value="168">weekly</option></select> </div><div><input type="radio" name="optIn" value="false" id="email-disable"'+(!0!=b.optIn?'checked="checked"':"")+'"> <label for="email-disable">Do not email me inbox messages</label></input></div><div><input type="button" name="save" id="email-save" value="Save" disabled="disabled"></input></div><div id="email-confirmation" style="display:none;"></div></div></div>');
$("#email-freq").val(b.freq).on("click focus",function(){$("#email-enable").prop("checked",!0)});$("#email-notify").focus().keyup(c);$("#email-enable, #email-disable, #email-freq").change(c);$("#email-save").click(function(){p();$.post("/accounts/verified-email-set",{email:$("#email-notify").val(),fkey:StackExchange.options.user.fkey,optin:$("input[name=optIn]:checked").val(),freq:$("#email-freq").val()},function(a){StackExchange.helpers.removeSpinner();$("#email-confirmation").html(a.message).fadeIn();
a.success&&$("#email-save").attr("disabled","disabled")},"json")})},!0)},k=function(a,b){for(var c=$("<div/>"),d='<div id="seContainerHot" style="display:none">',f=0;f<b.length;f++)var g=b[f],i=g.SiteId,h='href="http://'+i+"/q/"+g.Id+'?hq=1"',e=parseInt(g.DisplayScore,10),d=d+('<div class="itemBox"><a '+h+' class="seNumAnswer">'+e+'</a><div class="siteInfo"><p><a '+h+">"+c.text(g.Title).html()+'</a></p><a href="http://'+i+'" class="siteLink">'+i+"</a></div></div>");l(a,d+"</div>")},j=function(a,b){for(var c=
'<div id="seContainerSites" style="display:none">',d=0;d<b.length;d++)var f=b[d],g=f.Name,i='href="http://'+f.Id+'?as=1"',c=c+('<div class="itemBox"><a '+i+' class="siteFavicon"><img src="'+f.FaviconUrl+'" alt="'+g+'"></a><div class="siteInfo"><p><a '+i+">"+g+"</a></p><a "+i+' class="siteLink">'+f.Description+"</a></div></div>");l(a,c+"</div>")},i=function(b){-1!=a&&(0==$("#seContainerInbox").length&&m(b,"/inbox/genuwine","json",n,!0),0<a&&0==b.find(".unreadCountTab").length&&b.prepend('<span class="unreadCountTab">'+
a+"</span>"))},n=function(a,b){for(var c='<div id="seContainerInbox" style="display:none">',d=0;d<b.length;d++){var f=b[d],g='href="'+f.Url+'"',i='title="'+f.CreationDate+'"',h=f.Count,c=c+('<div class="itemBox'+(f.IsNew?" itemBoxNew":"")+'"><a '+g+' class="siteLinkFavicon"><img src="'+f.FaviconUrl+'" alt="'+f.SiteUrl+'"></a><div class="siteInfo">');"careers message"==f.Type?c+="<p><a "+g+' style="font-weight:normal"><b>'+f.Title+"</b> wants to contact you on <b>Stack Overflow Careers</b></a></p>":
"invitation"==f.Type?(i=f.Count,c+="<p><a "+g+' style="font-weight:normal"><b>'+i+"</b> "+("invitation"+(1<i?"s":""))+" awarded on <b>Stack Overflow Careers</b></a></p>"):c+="<p>"+(1<h?h+" ":"")+f.Type+" on <a "+g+" "+i+">"+f.Title+"</a></p>";c+='<p class="inboxSummary">'+(f.Summary||"")+"</p></div></div>"}e&&5<=b.length&&(c+='<div class="itemMoreContainer"><div class="seIntro"><a href="http://stackexchange.com/users/'+e+'?tab=inbox">more inbox messages &hellip;</a></div></div>');l(a,c+"</div>")},
o={},m=function(a,b,c,d,f){var g=a.attr("id");if(o[g])p();else{o[g]=!0;p();var i=function(){o[g]=!1;StackExchange.helpers.showErrorPopup($(".seContainer"),"An error occurred while loading - please try again.")};$.ajax({type:"GET",url:b,dataType:c,success:function(b){b&&(0<b.length||f)?d(a,b):i()},error:i,complete:StackExchange.helpers.removeSpinner()})}},l=function(a,b){var c=$(b);c.appendTo(".seContainer");a.hasClass("seCurrent")&&c.fadeIn("fast")},p=function(){StackExchange.helpers.removeSpinner();
StackExchange.helpers.addSpinner(".seContainer",{position:"relative",left:"10px",top:"10px"})},r=function(){var a=$("#portalLink .unreadCount"),b=a.css("margin-top");a.css({marginTop:-20,opacity:0}).show().animate({marginTop:b,opacity:1},2E3)};return{isVisible:b,click:d,setUnreadCount:function(b){a=b;0<b?($("#portalLink .unreadCount").text(a).click(function(){$(".genu").click()}).show(),r()):$("#portalLink .unreadCount").text("").hide()},animateInbox:r,init:function(f,g){var i=$(".genu");1<=i.length&&
(i[0].onclick=null);e=f;c=i.attr("href");a=g;i.removeAttr("href").add(".unreadCount").click(d);$(document).click(function(a){b()&&!$.contains($("#portalLink")[0],a.target)&&d()})}}}();
StackExchange.notify=function(){function e(a,b){var c=$("#dismissed-messages");c.val(c.val()+"~"+a+(b?" "+b:"")+"~")}function c(a,b){var c=$("#dismissed-messages").val();return!c?!1:RegExp("~"+a+(b?" "+b:"")+"~").test(c)}function a(a,b,c){var d=parseInt($("body").css("margin-top").match(/\d+/)),a=b*d/a;c?$("body:not(.no-message-slide)").animate({marginTop:a+"px"},"fast","linear"):$("body:not(.no-message-slide)").css("marginTop",a+"px")}var b=0,d=function(c,d){var f=$("#notify-"+c+(d?"-"+d:""));-1==
c?h():-1<c&&$.post("/messages/mark-as-read",{messagetypeid:c,id:d?d:null});e(c,d);b--;f.fadeOut("fast",function(){a(b+1,b,!0);f.remove()})},g=function(a){b++;if(c(a.messageTypeId,a.id))return!1;var f="";a.messageTypeId&&(f=' id="notify-'+a.messageTypeId+(a.id?"-"+a.id:"")+'"');f="<div"+f+' style="display:none"><span class="notify-close"><a title="dismiss this notification">&times;</a></span><span class="notify-text">'+a.text+"</span>";if(a.showProfile)var g=encodeURIComponent("/users/"+a.userId+"?tab=activity"),
f=f+(' See your <a href="/messages/mark-as-read?messagetypeid='+a.messageTypeId+"&returnurl="+g+'">profile</a>.');f=$(f+"</div>");f.find(".notify-close").click(function(){a.close&&a.close();d(a.messageTypeId,a.id)});$("#notify-container").append(f);return!0},h=function(a){$.cookie("m",a?a:"0",{expires:90,path:"/"})},f=function(){$("#notify-container div").fadeIn("slow")},k=function(){$(".module.newuser:not(.sidebar-help)").show()},j=function(a,b){var c=$('<div class="link-more"><a>view '+a+" more notification"+
(1!=a?"s":"")+"</a></div>");$("#notify-container").append(c);c.click(function(){c.detach();for(var a=0;a<b.length;a++)g(b[a]);f()})};return{showFirstTime:function(){if($.cookie("m")){var a=parseInt($.cookie("m"));isNaN(a)&&(a=0);5>a&&(k(),h(++a))}else k()},showMessages:function(c,d){for(var h=0,e=d?2:c.length,k=0;k<e&&k<c.length;k++)g(c[k])&&h++;a(b,h,!1);f();d&&h<c.length&&(e=c.slice(e),j(c.length-h,e))},show:function(a,b){$("body:not(.no-message-slide)").animate({marginTop:"2.5em"},"fast","linear");
g({text:a,messageTypeId:b});f()},close:d,getMessageText:function(a){return $("#notify-"+a+" .notify-text").text()}}}();function moveScroller(){var e=$("#scroller").width(),c=function(){var a=$(window).scrollTop(),b=$("#scroller-anchor").offset().top,c=$("#scroller");a>b?c.height()>$(window).height()?c.css({position:"fixed",top:"",bottom:"0px",width:e}):c.css({position:"fixed",top:"0px",bottom:"",width:e}):a<=b&&c.css({position:"relative",top:"",bottom:""})};$(window).scroll(c).resize(c);c()}
var styleCode=function(){return function(){"undefined"!=typeof MathJax&&MathJax.Hub.Queue(["Typeset",MathJax.Hub]);var e=!1;$("pre code").parent().each(function(){$(this).hasClass("prettyprint-override")&&($(this).removeClass("prettyprint-override").addClass("prettyprint"),e=!0);var c;if(c=!$(this).hasClass("prettyprint")){c=$(this);var a=$("#prettify-lang").text();""!=a?(c.addClass(a),c=!0):c=!1}c&&($(this).addClass("prettyprint"),e=!0)});e&&("undefined"!=typeof jtab?jtab.renderimplicit():StackExchange.using("prettify",
function(){StackExchange.prettify.applyCodeStyling()}))}}();
StackExchange.helpers.MagicPopup=function(e){function c(b,c){var f=$("<div id='"+e.id+"'/>").html(c),g=$("<div />").css({overflow:"hidden",position:"absolute",width:1,height:1,top:0,left:0}).append(f).appendTo("body"),h=e.showing(b,f),m={left:h.left};h.hasOwnProperty("bottom")?(m.bottom=h.bottom,m.top="auto"):m.top=h.top;var l;e.shown&&(l=function(){e.shown(b,f)});g.css(m).animate({height:f.outerHeight()+8,width:f.outerWidth()+8},300,l);a=function(){g.stop().remove();e.removed&&e.removed(b,f);a=d=
null};d=StackExchange.helpers.DelayedReaction(a,5);m=g;h.additional&&(m=m.add(h.additional));m.hover(d.cancel,d.trigger)}var a,b,d,g,h={},f=StackExchange.helpers.DelayedReaction(function(b,f){if(!g&&b){var d;e.cache&&"c_"+b in h?d=$.Deferred().resolve(h["c_"+b]):(d=$.ajax({type:"GET",url:b,dataType:"html"}),e.cache&&d.done(function(a){h["c_"+b]=a}));d.done(function(b){a&&a();""!=b&&c(f,b)})}},500);$(document).delegate(e.selector,{mouseenter:function(){if(d&&this===b)d.cancel();else return b=this,
f.trigger(e.getUrl(this),this),g=!1},mouseleave:function(){g=!0;f.cancel();d&&d.trigger()}})};
StackExchange.tagmenu=function(){function e(a){var a=$(a),b=a.attr("href");if(!b||"/"!=b.charAt(0))return null;b=a.text();if(-1<b.indexOf("*"))return null;a.attr("title","");return"/tags/"+encodeURIComponent(b)+"/subscriber-info"}function c(a,b){var c=$(a),f=c.offset(),e=c.outerHeight(),c={left:f.left},j=f.top+e,e=f.left+b.outerWidth();b.height()+j>$(window).height()+$(window).scrollTop()?c.bottom=$(window).height()-f.top-8:c.top=j;f=Math.max(1024,$(window).width());e>f&&(c.left-=e-f);return c}var a,
b;return{init:function(d){a=d;b||(b=!0,StackExchange.options.isMobile||(StackExchange.helpers.MagicPopup({selector:".post-tag:not(.user-tag)",id:"tag-menu",getUrl:e,showing:c,shown:function(b,c){a&&a(c,$(b).text())}}),$("#interesting-tags .post-tag").addClass("user-tag")))}}}();
StackExchange.usermenu=function(){function e(a,c){var e=$(a).find("img:first"),f=e.offset(),k=e.height(),j=e.width(),i=Math.max(j,k),n=64*k/i,i=64*j/i,o=c.find("img:first").css({width:i,height:n}),m=o.offset();o.css("visibility","hidden");b=e.clone().css({position:"absolute",zIndex:300,left:f.left,top:f.top,width:j,height:k}).appendTo("body");var l=function(){o[0].complete?(o.css("visibility","visible"),b.fadeOutAndRemove()):setTimeout(l,500)};b.animate({width:i,height:n,top:f.top+m.top},200,l);return{top:f.top,
left:f.left-m.left,additional:b}}function c(){b.remove()}var a,b;return{init:function(){a||(a=!0,StackExchange.options.isMobile||StackExchange.helpers.MagicPopup({selector:".user-hover .user-gravatar48, .user-hover .user-gravatar32",getUrl:function(a){a=/\/users\/([^/]+).*$/.exec($(a).closest(".user-hover").find(".user-details a").attr("href"));return!a?null:"/users/user-info/"+a[1]},cache:!0,id:"user-menu",showing:e,removed:c}))}}}();
StackExchange.chatAd=function(){function e(){var a=$(".question .post-taglist .post-tag");return!a.length?null:a.map(function(a,b){return $(b).text()}).get().join(" ")}function c(a){return 10>a?"0"+a:a}function a(a){var b=new Date;b.setTime(1E3*a);return[b.getUTCFullYear(),"-",c(b.getUTCMonth()+1),"-",c(b.getUTCDate())," ",c(b.getUTCHours()),":",c(b.getUTCMinutes()),":",c(b.getUTCSeconds()),"Z"].join("")}function b(a){var b=Math.floor((new Date).getTime()/1E3)-a,f=b%60,d=Math.floor(b/60),g=Math.floor(b/
3600);if(1>b)return"just now";if(60>b)return 1==f?"1 sec ago":f+" secs ago";if(3600>b)return 1==d?"1 min ago":d+" mins ago";if(86400>b)return 1==g?"1 hour ago":g+" hours ago";b=Math.floor(b/86400);if(1==b)return"yesterday";if(2>=b)return b+" days ago";a=new Date(1E3*a);return l[a.getMonth()]+" "+a.getDate()+" at "+a.getHours()+":"+c(a.getMinutes())}function d(a){var b=$("<div />");b.text(a);return b.html().replace('"',"&quot;")}function g(){$.get(i,null,function(a,b,c){k(a,b,c)})}function h(a){for(var c=
$('<div class="ad502-users" />'),f=0;f<a.length&&7>f;f++){var d=a[f],g=d.name;d.lastPost&&(g+=": "+b(d.lastPost));var e="http://www.gravatar.com/avatar/"+d.emailhash+"?s=23&d=identicon&r=PG",d=$('<a href="'+(j+"/users/"+d.id)+'" />');$("<img />").attr("title",g).attr("src",e).appendTo(d);c.append(d)}return c}function f(a){var b=a.user;return(a=a.userid)?'<a href="'+j+"/users/"+a+'">'+d(b)+"</a>":d(b)}function k(c){var e=$("#ad502-rooms");if(!c.error){e.html("");for(var i=c.rooms,k=0;k<i.length&&2>
k;k++){var l=i[k],t=j+"/rooms/"+l.id,q=$('<div class="ad502-room"></div>');q.append($('<h3 class="ad502-room-h3"><span class="ad502-room-title" title="'+d(l.name)+'"><a href="'+t+'">'+d(l.name)+"</a></span></h3>"));l.messages&&0<l.messages.length&&q.append($('<span title="'+a(l.lastPost)+'" class="ad502-last-message">'+b(l.lastPost)+" - "+f(l.messages[0])+"</span><br>"));l.singleImage?q.append($('<div class="ad502-users"><img src="'+j+"/rooms/users/"+l.id+'.jpeg" /></div>')):q.append(h(l.users));
e.append(q)}1<c.activeUsers?$("#h-chat-link").text(c.activeUsers+" People Chatting"):$("#h-chat-link").text("Visit Chat");$("#h-chat-link").attr("title",c.activeUsers+" users active in "+c.activeRooms+" rooms the last 60 minutes")}n<=m&&window.setTimeout(g,1E3*n);n+=o}var j,i,n=180,o=30,m=480,l="Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");/^\/questions\/\d+/i.test(window.location.pathname)&&(m=0);return{init:function(a){j=a.chatUrl;i=a.reloadUrl;if(a.tagBased){var b=e();if(!b)return;
i+=(/\?/.test(i)?"&":"?")+"tags="+encodeURIComponent(b)}null===a.preloadData?g():k(a.preloadData,null,null)}}}();
StackExchange.helpers.noDiacritics=function(){var e={"\u00e0\u00e5\u00e1\u00e2\u00e4\u00e3\u00e5\u0105":"a","\u00e8\u00e9\u00ea\u00eb\u0119":"e","\u00ec\u00ed\u00ee\u00ef\u0131":"i","\u00f2\u00f3\u00f4\u00f5\u00f6\u00f8\u0151":"o","\u00f9\u00fa\u00fb\u00fc":"u","\u00e7\u0107\u010d":"c","\u017c\u017a\u017e":"z","\u015b\u015f\u0161":"s","\u00f1\u0144":"n","\u00fd\u0178":"y","\u0142":"l","\u0111":"d","\u00df":"ss","\u011f":"g","\u00de":"th"};return function(c){for(var a in e)e.hasOwnProperty(a)&&(c=
c.replace(RegExp("["+a+"]"),e[a]));return c}}();function sanitizeAndSplitTags(e,c){for(var e=$.trim(e).replace(/([A-Za-z0-9])\+(?=[A-Za-z0-9])/g,"$1 "),a=e.split(/[\s|,;]+/),b=[],d=0;d<a.length;d++){var g=StackExchange.helpers.noDiacritics(a[d].toLowerCase()).replace(/_/g,"-"),g=g.replace(RegExp("[^a-z0-9.#+"+(c?"*":"")+"-]","g"),""),g=g.replace(/^[#+-]+/,""),g=g.replace(/[.-]+$/,"");0<g.length&&-1==$.inArray(g,b)&&b.push(g)}return b}
StackExchange.question=function(){var e=function(a,b){var c=null!=a;a||(a=$('div.question div.post-menu a:contains("link")'));var d=a.closest(".post-menu, .help-menu");if(a.hasClass("share-link"))d.find(".close-share-tip").click();else{a.addClass("share-link");var g=a.attr("id").substring(10),e=a.closest(".col-section").length?"section":a.closest("div.question").length?"question":"answer",h=$('<div class="share-tip" style="display:none">share a link to this '+e+'<input type="text" value="http://'+
document.location.host+a.attr("href")+'" style="display:block; width:292px;"><a class="close-share-tip" style="float:right">close</a></div>');b&&h.find(".close-share-tip").before('<a id="link-post-'+g+'" style="float:left">cite</a>');h.appendTo(d).fadeIn(c?"fast":0).bind("removing",function(){a.removeClass("share-link")}).find(".close-share-tip").click(function(){h.fadeOutAndRemove()}).end().find("input[type=text]").select()}},c=function(a){var b=$("#post-form h2:first"),c=b.wrap("<div />").parent(),
d=c.wrap("<div />").parent(),g=$("<div />").prependTo(d),e=d.height(),h=$("<div />"),a=$(a),l=parseInt(b.css("margin-bottom")),p=$("#content"),r=$("#wmd-input").outerWidth(),s=p.offset().left>b.offset().left-5&&"visible"!=p.css("overflow-x");h.css({height:0,overflowY:"hidden"}).appendTo(c).append(a);d.css({height:e,position:"relative"});c.css({position:"absolute",bottom:-l,width:r});g.addClass("answer-help-background").css({position:"absolute",bottom:-l,height:0,width:r});s&&(g.css("left",0),c.animate({paddingLeft:5},
1E3));h.animate({height:a.height()+l+10},1E3);g.animate({height:a.height()+l+10+e},1E3);$("<div style='float:right;margin-top:10px;'><a href='#'>ok</a></div>").hide().prependTo(c).fadeIn(1E3).find("a").one("click",function(a){var d=$(this).parent();setTimeout(function(){d.remove()},1);h.animate({height:0},1E3,function(){h.add(g).remove();b.unwrap().unwrap()});g.animate({height:0},1E3);s&&c.animate({paddingLeft:0},1E3);a.preventDefault()})},a=function(){$.get("/posts/answer-help").then(c)},b,d=function(){var a=
window.location.href;0>a.indexOf("#")||(a=a.match(/#(\d+|comment(\d+)_(\d+))/i))&&(a[2]?g(a[2],a[3]):h($(".answer[data-answerid="+a[1]+"]")))},g=function(a,b){var c="#comment-"+a,d=$(c);d.length?h(d):StackExchange.comments.loadAll($("#comments-link-"+b)).done(function(){h($(c))})},h=function(a){var c=a.css("background-color");a.css({backgroundColor:b}).animate({backgroundColor:c},2E3,"linear",function(){$(this).css("background-color","")});a.is(".comment")&&a[0].scrollIntoView(!0)};return{showShareTip:e,
getQuestionId:function(a){a=(a?a.closest(".question"):$(".question")).data("questionid");if(!a)throw Error("getQuestionId could not find an id");return a},highlightComment:g,init:function(c){StackExchange.question.fullInit?StackExchange.question.fullInit(c):StackExchange.question.bindAnonymousVoteDisclaimers();StackExchange.comments.init({autoShowCommentHelp:c.autoShowCommentHelp});c.showShareTip&&e();$("input.anon-vote").live("click",function(){var a=$(this),b=a.postId(),c=a.parent();c.closest(".question,.answer").unbind("mouseenter.helpful").unbind("mouseleave.helpful");
c.text("sending feedback ...");setTimeout(function(){c.text("Thank you for your feedback.")},500);$.ajax({type:"POST",url:"/vote/anon/"+b,data:{votetypeid:"Yes"==a.val()?2:3},complete:function(){}})});var g=$(".was-this-helpful"),h=g.css("color"),i=$(".post-text").css("color");g.each(function(){var a=$(this),b=a.text();a.closest(".answer, .question").bind("mouseenter.helpful",function(){a.html("Was this post useful to you? &nbsp;&nbsp;<input style='display:none;' class='anon-vote' type='button' value='Yes'/> &nbsp;<input style='display:none;' class='anon-vote' type='button' value='No'/>").animate({color:i},
"fast","linear").find("input").fadeIn("fast")}).bind("mouseleave.helpful",function(){a.text(b).animate({color:h},"fast","linear")})});$('.post-menu a:contains("link")').live("click",function(a){if(!a.ctrlKey&&!a.metaKey)return e($(this),c.showCitation),!1});if(c.showAnswerHelp)$("#wmd-input").one("focus",a);c.showCitation&&$("div.share-tip a[id^='link-post-']").live("click",function(){$(this).closest(".post-menu").find(".close-share-tip").click();citation.show($(this))});b=c.highlightColor;d(c)}}}();
StackExchange.question.bindAnonymousVoteDisclaimers=function(){function e(c){return function(a){var b='Please <a href="/users/login?returnurl='+escape(document.location)+'">login or register</a> to '+c+" this post.";StackExchange.helpers.showErrorPopup($(this).parent(),b);var b="",d=$(this).prop("className"),g=$(this).closest(".answer").length?"answer":"question";/vote-up/.test(d)?b="?vote=up&type="+g:/vote-down/.test(d)?b="?vote=down&type="+g:/star/.test(d)&&(b="?vote=favorite");StackExchange.helpers.fireAndForget("/analytics/user/try-vote"+
b);a.preventDefault()}}$(".vote-up-off, .vote-down-off").click(e("vote for"));$("div.post-menu a[id^='flag-post-']").unbind("click").click(e("flag"));$(".star-off:not(.disabled)").live("click",e("favorite"))};
StackExchange.comments=function(){function e(a,b){this.postId=a;this.jDiv=b;this.jCommentsLink=$("#comments-link-"+a)}function c(a){var c=(a.constructor===$?a:$(a)).closest(".question, .answer, div[id^='post-']").find(".comments"),a=c.attr("id").replace(/^comments-/,"");if(b[a])return b[a];c=new e(a,c);return b[a]=c}function a(){if(0!=$(".question[data-questionid]").length){var a=StackExchange.question.getQuestionId();$(".comment .comment-date > span").each(function(){var b=$(this),c=b.closest(".answer"),
c=c&&c.length?c.data("answerid"):0,d=b.closest(".comment").attr("id").substr(8);b.wrap('<a class="comment-link" onclick="StackExchange.question.highlightComment({cid}, {aid})" href="{hash}"></a>'.format({hash:"#comment"+d+"_"+(c?c:a),cid:d,aid:c}))})}}var b={},d=function(){};e.prototype={checkDiscussion:d,ensureInput:d,commentsShown:function(){this.jCommentsLink.hide()},addShow:function(a){var b=this;this.loadAllComments().done(function(){b.jCommentsLink.hide();b.checkDiscussion()});var c=this.ensureInput();
c&&!a&&c.focus()},ajax:function(a,b,c,d){c&&!d&&StackExchange.helpers.addSpinner(c,{"margin-left":"10px"});var e=this;return $.ajax(a).fail(function(a){$(".error-notification").fadeOut("fast",function(){$(this).remove()});a=a.responseText;if(!a||100<=a.length)a="An error occured"+(b?" "+b:"");StackExchange.helpers.showErrorPopup(c||e.jDiv,a);c&&!d&&StackExchange.helpers.removeSpinner()}).done(StackExchange.helpers.removeSpinner).promise()},showComments:function(b){this.jDiv.find(" > table > tbody").html(b);
this.jCommentsLink.text("add comment");"undefined"!=typeof MathJax&&MathJax.Hub.Queue(["Typeset",MathJax.Hub]);a();this.commentsShown()},loadAllComments:function(a){this.jDiv.removeClass("dno");if(!a&&!/more comment/.test($("#comments-link-"+this.postId).text()))return $.Deferred().resolve().promise();var b=this;return this.ajax({type:"GET",url:"/posts/"+this.postId+"/comments",dataType:"html"},"while fetching comments").done(function(a){b.showComments(a)}).promise()}};return{init:function(b){b=b&&
b.post||document;$("a[id^='comments-link-']",b).click(function(){var a=/more comment/.test($(this).text());c(this).addShow(a)});b==document&&a()},loadAll:function(a){return c(a).loadAllComments(!0)},extendPostUi:function(a){for(var b in a)a.hasOwnProperty(b)&&(e.prototype[b]=a[b])},uiForPost:c}}();
StackExchange.share=function(){function e(a,b,c){window.open(a,b,c)||(window.location.href=a)}function c(a,b){var c=a.indexOf("?"),e=a.indexOf("#");return-1==c?-1==e?a+"?"+b:a.substring(0,e)+"?"+b+a.substring(e):-1==e?a+"&"+b:a.substring(0,e)+"&"+b+a.substring(e)}return{gplus:function(a,b){b=c(b,"sgp=1");a.click(function(){e("https://plus.google.com/share?url="+b,"sharegplus","toolbar=1,status=1,resizable=1,scrollbars=1,width=600,height=500")})},twitter:function(a,b,d){b=c(b,"stw=1");a.click(function(){e("http://twitter.com/share?url="+
b+"&ref=twitbtn&text="+d,"sharetwitter","toolbar=1,status=1,resizable=1,scrollbars=1,width=800,height=526")})},facebook:function(a,b,d){b=c(b,"sfb=1");a.click(function(){e("http://www.facebook.com/sharer.php?u="+b+"&ref=fbshare&t="+d,"sharefacebook","toolbar=1,status=1,resizable=1,scrollbars=1,width=626,height=436")})}}}();
function initTagRenderer(e,c){window.tagRenderer||(window.tagRendererRaw=function(a,b){var b=b||"",d="";b||(e&&-1<$.inArray(a,e)?d=" required-tag":c&&-1<$.inArray(a,c)&&(d=" moderator-tag"));return"<a class='post-tag"+d+"' href='"+b+"/questions/tagged/"+encodeURIComponent(a)+"' title=\"show questions tagged '"+a+"'\" rel='tag'>"+a+"</a>"},window.tagRenderer=function(a,b){return $(tagRendererRaw(a,b))})}
function showFadingHelpText(e){e.wrap('<div class="dno" />').show().parent().fadeIn("slow",function(){$(this).children().unwrap()})}
function initFadingHelpText(){var e={"wmd-input":"#how-to-format",tagnames:"#how-to-tag","tag-editor":"#how-to-tag",title:"#how-to-title"},c=$("#wmd-input, #tagnames, #title, .tag-editor input"),a=function(a){return $(a).parent().hasClass("tag-editor")?e["tag-editor"]:e[$(a).attr("id")]};c.focus(function(){var b=a(this);c.each(function(){var c=a(this);c!=b&&$(c).hide()});var d=$(b);d.is(":visible")||showFadingHelpText(d)})}
$.fn.extend({postId:function(){var e=this.first();if(!e.hasClass("answer")||!e.hasClass("question"))e=e.closest(".answer, .question");return parseInt(e.find(".vote input")[0].value)}});
StackExchange.newsletterAd=function(){function e(a){a=$('<div id="lightbox-panel" class="popup" style="display:block"></div>').append('<div class="popup-close"><a title="close this popup (or hit Esc)">&times;</a></div>').append(a);$('<div id="lightbox"></div>').appendTo($("body")).css("height",$(document).height()).fadeIn("fast");a.appendTo($("body")).center().fadeIn("fast").find(".popup-close").click(function(){$("#lightbox, #lightbox-panel").fadeOutAndRemove()})}function c(){var a=StackExchange.options.site.name,
b=$(['<div style="text-align: left;">','<h2 style="margin-bottom: 15px;">Subscribe to the '+a+" weekly newsletter</h2>",'<p><strong><a href="/users/login?returnurl=/newsletter/signup/redirect">Create an account on '+a+'</a> or <a href="/users/login?returnurl=/newsletter/signup/redirect">log in</a> if you already have one.</strong></p>','<form><label for="newsletter-email-input">Or, send newsletter emails to:</label> <input type="text" id="newsletter-email-input" maxlength="100" title="your email address" /> <input type="submit" value="Subscribe" id="newsletter-email-submit" /></form></div>'].join(""));
b.find("form").submit(function(){var a=$(this),c=$.trim(b.find("#newsletter-email-input").val());if(0==c.length)return!1;StackExchange.helpers.addSpinner(a);$.ajax({url:"/newsletter/signup/anon",type:"POST",dataType:"json",data:{email:c},success:function(b){"confirmed"==b.status&&!b.error?(a.find("#newsletter-email-input").attr("disabled",!0),a.find("#newsletter-email-submit").replaceWith('<span style="line-height: 120%; text-align: center;"><strong>Subscribed!</strong></span>'),$("#newsletter-signup-container").replaceWith('<div style="line-height: 200%; text-align: center;"><strong>Subscribed!</strong></div>')):
"unconfirmed"==b.status&&!b.error?(a.find("#newsletter-email-input").attr("disabled",!0),a.find("#newsletter-email-submit").replaceWith('<span style="line-height: 120%; text-align: center;"><strong>Subscribed!</strong></span>'),a.append("<br /><br/><p><em>Please click the link in the confirmation email to activate your subscription.</em></p>"),$("#newsletter-signup-container").replaceWith('<span style="line-height: 120%;"><strong>Success!</strong> Please click the link in the confirmation email to activate your subscription.</span>')):
a.showErrorPopup(b.error||"there was a problem signing up for the newsletter<br />please try again later")},error:function(){a.showErrorPopup("there was a problem signing up for the newsletter<br />please try again later")},complete:function(){StackExchange.helpers.removeSpinner(a)}});return!1});e(b)}return{init:function(){$("#newsletter-signup").click(function(){var a=$(this);if(StackExchange.options.user.isAnonymous)return c(),!1;StackExchange.helpers.addSpinner("#newsletter-signup-container");
$.ajax({url:"/newsletter/signup",type:"POST",dataType:"json",success:function(b){b.url?window.location.href=b.url:"confirmed"==b.status?$("#newsletter-signup-container").replaceWith('<div style="line-height: 200%; text-align: center;"><strong>Subscribed!</strong></div>'):"unconfirmed"==b.status?$("#newsletter-signup-container").replaceWith('<span style="line-height: 120%;"><strong>Success!</strong> Please click the link in the confirmation email to activate your subscription.</span>'):a.parent().showErrorPopup("there was a problem signing up for the newsletter<br />please try again later")},
error:function(){a.parent().showErrorPopup("there was a problem signing up for the newsletter<br />please try again later")},complete:function(){StackExchange.helpers.removeSpinner("#newsletter-signup-container")}})});$("#newsletter-preview").click(function(){var a=$(window).height(),a=Math.min(600,a-100),a=['<div id="newsleter-preview-pane" style="overflow: hidden; width: 660px; height: ',a,'px;"><iframe src="',$(this).attr("href"),'" width="660" height="',a,'" frameborder="0"></iframe></div>'].join("");
e(a);return!1})}}}();
(function(e,c,a,b){e.fn.caret=function(d,g){var h,f,k=this[0],j=e.browser.msie;"object"===typeof d&&"number"===typeof d.start&&"number"===typeof d.end?(h=d.start,f=d.end):"number"===typeof d&&"number"===typeof g?(h=d,f=g):"string"===typeof d?-1<(h=k.value.indexOf(d))?f=h+d[c]:h=null:"[object RegExp]"===Object.prototype.toString.call(d)&&(d=d.exec(k.value),null!=d&&(h=d.index,f=h+d[0][c]));if("undefined"!=typeof h)return j?(j=this[0].createTextRange(),j.collapse(!0),j.moveStart("character",h),j.moveEnd("character",
f-h),j.select()):(this[0].selectionStart=h,this[0].selectionEnd=f),this[0].focus(),this;if(j)if(f=document.selection,"textarea"!=this[0].tagName.toLowerCase()){j=this.val();h=f[a]()[b]();h.moveEnd("character",j[c]);var i=""==h.text?j[c]:j.lastIndexOf(h.text);h=f[a]()[b]();h.moveStart("character",-j[c]);var n=h.text[c]}else h=f[a](),f=h[b](),f.moveToElementText(this[0]),f.setEndPoint("EndToEnd",h),i=f.text[c]-h.text[c],n=i+h.text[c];else i=k.selectionStart,n=k.selectionEnd;h=k.value.substring(i,n);
return{start:i,end:n,text:h,replace:function(a){return k.value.substring(0,i)+a+k.value.substring(n,k.value[c])}}}})(jQuery,"length","createRange","duplicate");
