/*!
 * CanJS - 2.0.3
 * http://canjs.cn/
 * Copyright (c) 2013 Boooo/毕加波
 * Wed Dec 18 2013 23:59:17 GMT+0800 (CST)
 * mail: hu@cafa.me
 */
(function(can) {
    "use strict";

    if (window.history && history.pushState) {
        can.sRoute={
        	set:function (route,type,callback){
        		window.location.hash='!'+can.route.param(route);
                can.route.attr(route);
                type===undefined?can.sRoute.setType='set':can.sRoute.setType=type;
        		if(callback!==undefined){
	        		callback(route);
        		}
        	},
        	get:function (){
        		var route=can.route.deparam(window.location.hash.replace(/^\#\!/,''));
                return route;
        	}
        };
        window.onhashchange=function(){
            can.sRoute.set(can.sRoute.get(),'hashchange');
        };
    }

    return can;
})(can);