define("imm-client/0.1.5/src/imm",[],function(e,t){function n(){console.log("connection open!")}function o(){console.log("connection closed!"),v=!1}function r(e){var t=e.data;try{var n=JSON.parse(t)}catch(e){console.error("wrong format json from node server!")}u(n);for(var o=0;o<g.length;o++){var r=g[o];n.type==r.type&&r.action(n.content)}}function i(e,t){return v||t?void p.send(e):void m.push(e)}function a(){var e=c();i(e,!0)}function u(e){var t=_.msgType,n=_.msgContent;switch(e.type){case t.connection:e.flag?(e.msg&&console.log(e.msg),e.msg==n.firstConnection?a():e.msg==n.connectionSetUp&&(console.log("init Connection Success!"),v=!0,s(),f())):e.msg&&console.error(e.msg);break;case t.system:e.flag?console.log(e.msg):e.msg&&console.error(e.msg);break;case t.onlineCount:y=e.count}}function s(){for(var e=0;e<m.length;e++)i(m[e]);m=[]}function c(){var e=_.action,t={action:e.connect,channel:d};return JSON.stringify(t)}function f(){var e=function(){var e={action:_.action.onlineCount,channel:d};i(e)};setInterval(e,b),e()}var l,d,p,h=e("imm-client/0.1.5/src/sockjs-0.3"),_=e("imm-client/0.1.5/src/fb-common/enum/common"),v=!1,m=[],g=[],y=0,b=3e4,w=function(e,t){l=e,d=t},S=function(){if(p)return void console.warn("connection already set up!");try{p=new h(l),p.onopen=n,p.onclose=o,p.onmessage=r}catch(e){return void console.error("init SockJS connection failed!")}},O=function(e){return l&&d?void g.push(e):void console.error("imm-client is not initialized!")},x=function(){return y};t.init=w,t.setUpConnection=S,t.registerMsgHandler=O,t.getOnlineCount=x}),define("imm-client/0.1.5/src/sockjs-0.3",[],function(require,exports,module){var JSON;JSON||(JSON={}),function(){function str(e,t){var n,o,r,i,a,u=gap,s=t[e];switch(s&&"object"==typeof s&&"function"==typeof s.toJSON&&(s=s.toJSON(e)),"function"==typeof rep&&(s=rep.call(t,e,s)),typeof s){case"string":return quote(s);case"number":return isFinite(s)?String(s):"null";case"boolean":case"null":return String(s);case"object":if(!s)return"null";if(gap+=indent,a=[],"[object Array]"===Object.prototype.toString.apply(s)){for(i=s.length,n=0;i>n;n+=1)a[n]=str(n,s)||"null";return r=0===a.length?"[]":gap?"[\n"+gap+a.join(",\n"+gap)+"\n"+u+"]":"["+a.join(",")+"]",gap=u,r}if(rep&&"object"==typeof rep)for(i=rep.length,n=0;i>n;n+=1)"string"==typeof rep[n]&&(o=rep[n],r=str(o,s),r&&a.push(quote(o)+(gap?": ":":")+r));else for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(r=str(o,s),r&&a.push(quote(o)+(gap?": ":":")+r));return r=0===a.length?"{}":gap?"{\n"+gap+a.join(",\n"+gap)+"\n"+u+"}":"{"+a.join(",")+"}",gap=u,r}}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function f(e){return 10>e?"0"+e:e}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(e,t,n){var o;if(gap="",indent="","number"==typeof n)for(o=0;n>o;o+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,!t||"function"==typeof t||"object"==typeof t&&"number"==typeof t.length)return str("",{"":e});throw new Error("JSON.stringify")}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(e,t){var n,o,r=e[t];if(r&&"object"==typeof r)for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(o=walk(r,n),void 0!==o?r[n]=o:delete r[n]);return reviver.call(e,t,r)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),SockJS=function(){var e=document,t=window,n={},o=function(){};o.prototype.addEventListener=function(e,t){this._listeners||(this._listeners={}),e in this._listeners||(this._listeners[e]=[]);var o=this._listeners[e];-1===n.arrIndexOf(o,t)&&o.push(t)},o.prototype.removeEventListener=function(e,t){if(this._listeners&&e in this._listeners){var o=this._listeners[e],r=n.arrIndexOf(o,t);return-1!==r?void(o.length>1?this._listeners[e]=o.slice(0,r).concat(o.slice(r+1)):delete this._listeners[e]):void 0}},o.prototype.dispatchEvent=function(e){var t=e.type,n=Array.prototype.slice.call(arguments,0);if(this["on"+t]&&this["on"+t].apply(this,n),this._listeners&&t in this._listeners)for(var o=0;o<this._listeners[t].length;o++)this._listeners[t][o].apply(this,n)};var r=function(e,t){if(this.type=e,"undefined"!=typeof t)for(var n in t)t.hasOwnProperty(n)&&(this[n]=t[n])};r.prototype.toString=function(){var e=[];for(var t in this)if(this.hasOwnProperty(t)){var n=this[t];"function"==typeof n&&(n="[function]"),e.push(t+"="+n)}return"SimpleEvent("+e.join(", ")+")"};var i=function(e){var t=this;t._events=e||[],t._listeners={}};i.prototype.emit=function(e){var t=this;if(t._verifyType(e),!t._nuked){var n=Array.prototype.slice.call(arguments,1);if(t["on"+e]&&t["on"+e].apply(t,n),e in t._listeners)for(var o=0;o<t._listeners[e].length;o++)t._listeners[e][o].apply(t,n)}},i.prototype.on=function(e,t){var n=this;n._verifyType(e),n._nuked||(e in n._listeners||(n._listeners[e]=[]),n._listeners[e].push(t))},i.prototype._verifyType=function(e){var t=this;-1===n.arrIndexOf(t._events,e)&&n.log("Event "+JSON.stringify(e)+" not listed "+JSON.stringify(t._events)+" in "+t)},i.prototype.nuke=function(){var e=this;e._nuked=!0;for(var t=0;t<e._events.length;t++)delete e[e._events[t]];e._listeners={}};var a="abcdefghijklmnopqrstuvwxyz0123456789_";n.random_string=function(e,t){t=t||a.length;var n,o=[];for(n=0;e>n;n++)o.push(a.substr(Math.floor(Math.random()*t),1));return o.join("")},n.random_number=function(e){return Math.floor(Math.random()*e)},n.random_number_string=function(e){var t=(""+(e-1)).length,o=Array(t+1).join("0");return(o+n.random_number(e)).slice(-t)},n.getOrigin=function(e){e+="/";var t=e.split("/").slice(0,3);return t.join("/")},n.isSameOriginUrl=function(e,n){return n||(n=t.location.href),e.split("/").slice(0,3).join("/")===n.split("/").slice(0,3).join("/")},n.getParentDomain=function(e){if(/^[0-9.]*$/.test(e))return e;if(/^\[/.test(e))return e;if(!/[.]/.test(e))return e;var t=e.split(".").slice(1);return t.join(".")},n.objectExtend=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e};var u="_jp";n.polluteGlobalNamespace=function(){u in t||(t[u]={})},n.closeFrame=function(e,t){return"c"+JSON.stringify([e,t])},n.userSetCode=function(e){return 1e3===e||e>=3e3&&4999>=e},n.countRTO=function(e){var t;return t=e>100?3*e:e+200},n.log=function(){t.console&&console.log&&console.log.apply&&console.log.apply(console,arguments)},n.bind=function(e,t){return e.bind?e.bind(t):function(){return e.apply(t,arguments)}},n.flatUrl=function(e){return-1===e.indexOf("?")&&-1===e.indexOf("#")},n.amendUrl=function(t){var o=e.location;if(!t)throw new Error("Wrong url for SockJS");if(!n.flatUrl(t))throw new Error("Only basic urls are supported in SockJS");return 0===t.indexOf("//")&&(t=o.protocol+t),0===t.indexOf("/")&&(t=o.protocol+"//"+o.host+t),t=t.replace(/[/]+$/,"")},n.arrIndexOf=function(e,t){for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1},n.arrSkip=function(e,t){var o=n.arrIndexOf(e,t);if(-1===o)return e.slice();var r=e.slice(0,o);return r.concat(e.slice(o+1))},n.isArray=Array.isArray||function(e){return{}.toString.call(e).indexOf("Array")>=0},n.delay=function(e,t){return"function"==typeof e&&(t=e,e=0),setTimeout(t,e)};var s,c=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,f={"\x00":"\\u0000","":"\\u0001","":"\\u0002","":"\\u0003","":"\\u0004","":"\\u0005","":"\\u0006","":"\\u0007","\b":"\\b","	":"\\t","\n":"\\n","":"\\u000b","\f":"\\f","\r":"\\r","":"\\u000e","":"\\u000f","":"\\u0010","":"\\u0011","":"\\u0012","":"\\u0013","":"\\u0014","":"\\u0015","":"\\u0016","":"\\u0017","":"\\u0018","":"\\u0019","":"\\u001a","":"\\u001b","":"\\u001c","":"\\u001d","":"\\u001e","":"\\u001f",'"':'\\"',"\\":"\\\\","":"\\u007f","":"\\u0080","":"\\u0081","":"\\u0082","":"\\u0083","":"\\u0084","":"\\u0085","":"\\u0086","":"\\u0087","":"\\u0088","":"\\u0089","":"\\u008a","":"\\u008b","":"\\u008c","":"\\u008d","":"\\u008e","":"\\u008f","":"\\u0090","":"\\u0091","":"\\u0092","":"\\u0093","":"\\u0094","":"\\u0095","":"\\u0096","":"\\u0097","":"\\u0098","":"\\u0099","":"\\u009a","":"\\u009b","":"\\u009c","":"\\u009d","":"\\u009e","":"\\u009f","­":"\\u00ad","؀":"\\u0600","؁":"\\u0601","؂":"\\u0602","؃":"\\u0603","؄":"\\u0604","܏":"\\u070f","឴":"\\u17b4","឵":"\\u17b5","‌":"\\u200c","‍":"\\u200d","‎":"\\u200e","‏":"\\u200f","\u2028":"\\u2028","\u2029":"\\u2029","‪":"\\u202a","‫":"\\u202b","‬":"\\u202c","‭":"\\u202d","‮":"\\u202e"," ":"\\u202f","⁠":"\\u2060","⁡":"\\u2061","⁢":"\\u2062","⁣":"\\u2063","⁤":"\\u2064","⁥":"\\u2065","⁦":"\\u2066","⁧":"\\u2067","⁨":"\\u2068","⁩":"\\u2069","⁪":"\\u206a","⁫":"\\u206b","⁬":"\\u206c","⁭":"\\u206d","⁮":"\\u206e","⁯":"\\u206f","﻿":"\\ufeff","￰":"\\ufff0","￱":"\\ufff1","￲":"\\ufff2","￳":"\\ufff3","￴":"\\ufff4","￵":"\\ufff5","￶":"\\ufff6","￷":"\\ufff7","￸":"\\ufff8","￹":"\\ufff9","￺":"\\ufffa","￻":"\\ufffb","￼":"\\ufffc","�":"\\ufffd","￾":"\\ufffe","￿":"\\uffff"},l=/[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,d=JSON&&JSON.stringify||function(e){return c.lastIndex=0,c.test(e)&&(e=e.replace(c,function(e){return f[e]})),'"'+e+'"'},p=function(e){var t,n={},o=[];for(t=0;65536>t;t++)o.push(String.fromCharCode(t));return e.lastIndex=0,o.join("").replace(e,function(e){return n[e]="\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4),""}),e.lastIndex=0,n};n.quote=function(e){var t=d(e);return l.lastIndex=0,l.test(t)?(s||(s=p(l)),t.replace(l,function(e){return s[e]})):t};var h=["websocket","xdr-streaming","xhr-streaming","iframe-eventsource","iframe-htmlfile","xdr-polling","xhr-polling","iframe-xhr-polling","jsonp-polling"];n.probeProtocols=function(){for(var e={},t=0;t<h.length;t++){var n=h[t];e[n]=x[n]&&x[n].enabled()}return e},n.detectProtocols=function(e,t,n){var o={},r=[];t||(t=h);for(var i=0;i<t.length;i++){var a=t[i];o[a]=e[a]}var u=function(e){var t=e.shift();o[t]?r.push(t):e.length>0&&u(e)};return n.websocket!==!1&&u(["websocket"]),o["xhr-streaming"]&&!n.null_origin?r.push("xhr-streaming"):!o["xdr-streaming"]||n.cookie_needed||n.null_origin?u(["iframe-eventsource","iframe-htmlfile"]):r.push("xdr-streaming"),o["xhr-polling"]&&!n.null_origin?r.push("xhr-polling"):!o["xdr-polling"]||n.cookie_needed||n.null_origin?u(["iframe-xhr-polling","jsonp-polling"]):r.push("xdr-polling"),r};var _="_sockjs_global";n.createHook=function(){var e="a"+n.random_string(8);if(!(_ in t)){var o={};t[_]=function(e){return e in o||(o[e]={id:e,del:function(){delete o[e]}}),o[e]}}return t[_](e)},n.attachMessage=function(e){n.attachEvent("message",e)},n.attachEvent=function(n,o){"undefined"!=typeof t.addEventListener?t.addEventListener(n,o,!1):(e.attachEvent("on"+n,o),t.attachEvent("on"+n,o))},n.detachMessage=function(e){n.detachEvent("message",e)},n.detachEvent=function(n,o){"undefined"!=typeof t.addEventListener?t.removeEventListener(n,o,!1):(e.detachEvent("on"+n,o),t.detachEvent("on"+n,o))};var v={},m=!1,g=function(){for(var e in v)v[e](),delete v[e]},y=function(){m||(m=!0,g())};n.attachEvent("unload",y),n.unload_add=function(e){var t=n.random_string(8);return v[t]=e,m&&n.delay(g),t},n.unload_del=function(e){e in v&&delete v[e]},n.createIframe=function(t,o){var r,i,a=e.createElement("iframe"),u=function(){clearTimeout(r);try{a.onload=null}catch(e){}a.onerror=null},s=function(){a&&(u(),setTimeout(function(){a&&a.parentNode.removeChild(a),a=null},0),n.unload_del(i))},c=function(e){a&&(s(),o(e))},f=function(e,t){try{a&&a.contentWindow&&a.contentWindow.postMessage(e,t)}catch(n){}};return a.src=t,a.style.display="none",a.style.position="absolute",a.onerror=function(){c("onerror")},a.onload=function(){clearTimeout(r),r=setTimeout(function(){c("onload timeout")},2e3)},e.body.appendChild(a),r=setTimeout(function(){c("timeout")},15e3),i=n.unload_add(s),{post:f,cleanup:s,loaded:u}},n.createHtmlfile=function(e,o){var r,i,a,s=new ActiveXObject("htmlfile"),c=function(){clearTimeout(r)},f=function(){s&&(c(),n.unload_del(i),a.parentNode.removeChild(a),a=s=null,CollectGarbage())},l=function(e){s&&(f(),o(e))},d=function(e,t){try{a&&a.contentWindow&&a.contentWindow.postMessage(e,t)}catch(n){}};s.open(),s.write('<html><script>document.domain="'+document.domain+'";</script></html>'),s.close(),s.parentWindow[u]=t[u];var p=s.createElement("div");return s.body.appendChild(p),a=s.createElement("iframe"),p.appendChild(a),a.src=e,r=setTimeout(function(){l("timeout")},15e3),i=n.unload_add(f),{post:d,cleanup:f,loaded:c}};var b=function(){};b.prototype=new i(["chunk","finish"]),b.prototype._start=function(e,o,r,i){var a=this;try{a.xhr=new XMLHttpRequest}catch(u){}if(!a.xhr)try{a.xhr=new t.ActiveXObject("Microsoft.XMLHTTP")}catch(u){}(t.ActiveXObject||t.XDomainRequest)&&(o+=(-1===o.indexOf("?")?"?":"&")+"t="+ +new Date),a.unload_ref=n.unload_add(function(){a._cleanup(!0)});try{a.xhr.open(e,o,!0)}catch(s){return a.emit("finish",0,""),void a._cleanup()}if(i&&i.no_credentials||(a.xhr.withCredentials="true"),i&&i.headers)for(var c in i.headers)a.xhr.setRequestHeader(c,i.headers[c]);a.xhr.onreadystatechange=function(){if(a.xhr){var e=a.xhr;switch(e.readyState){case 3:try{var t=e.status,n=e.responseText}catch(e){}1223===t&&(t=204),n&&n.length>0&&a.emit("chunk",t,n);break;case 4:var t=e.status;1223===t&&(t=204),a.emit("finish",t,e.responseText),a._cleanup(!1)}}},a.xhr.send(r)},b.prototype._cleanup=function(e){var t=this;if(t.xhr){if(n.unload_del(t.unload_ref),t.xhr.onreadystatechange=function(){},e)try{t.xhr.abort()}catch(o){}t.unload_ref=t.xhr=null}},b.prototype.close=function(){var e=this;e.nuke(),e._cleanup(!0)};var w=n.XHRCorsObject=function(){var e=this,t=arguments;n.delay(function(){e._start.apply(e,t)})};w.prototype=new b;var S=n.XHRLocalObject=function(e,t,o){var r=this;n.delay(function(){r._start(e,t,o,{no_credentials:!0})})};S.prototype=new b;var O=n.XDRObject=function(e,t,o){var r=this;n.delay(function(){r._start(e,t,o)})};O.prototype=new i(["chunk","finish"]),O.prototype._start=function(e,t,o){var r=this,i=new XDomainRequest;t+=(-1===t.indexOf("?")?"?":"&")+"t="+ +new Date;var a=i.ontimeout=i.onerror=function(){r.emit("finish",0,""),r._cleanup(!1)};i.onprogress=function(){r.emit("chunk",200,i.responseText)},i.onload=function(){r.emit("finish",200,i.responseText),r._cleanup(!1)},r.xdr=i,r.unload_ref=n.unload_add(function(){r._cleanup(!0)});try{r.xdr.open(e,t),r.xdr.send(o)}catch(u){a()}},O.prototype._cleanup=function(e){var t=this;if(t.xdr){if(n.unload_del(t.unload_ref),t.xdr.ontimeout=t.xdr.onerror=t.xdr.onprogress=t.xdr.onload=null,e)try{t.xdr.abort()}catch(o){}t.unload_ref=t.xdr=null}},O.prototype.close=function(){var e=this;e.nuke(),e._cleanup(!0)},n.isXHRCorsCapable=function(){return t.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest?1:t.XDomainRequest&&e.domain?2:H.enabled()?3:4};var x=function(e,o,r){if(this===t)return new x(e,o,r);var i,a=this;a._options={devel:!1,debug:!1,protocols_whitelist:[],info:void 0,rtt:void 0},r&&n.objectExtend(a._options,r),a._base_url=n.amendUrl(e),a._server=a._options.server||n.random_number_string(1e3),a._options.protocols_whitelist&&a._options.protocols_whitelist.length?i=a._options.protocols_whitelist:(i="string"==typeof o&&o.length>0?[o]:n.isArray(o)?o:null,i&&a._debug('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.')),a._protocols=[],a.protocol=null,a.readyState=x.CONNECTING,a._ir=F(a._base_url),a._ir.onfinish=function(e,t){a._ir=null,e?(a._options.info&&(e=n.objectExtend(e,a._options.info)),a._options.rtt&&(t=a._options.rtt),a._applyInfo(e,t,i),a._didClose()):a._didClose(1002,"Can't connect to server",!0)}};x.prototype=new o,x.version="0.3.4",x.CONNECTING=0,x.OPEN=1,x.CLOSING=2,x.CLOSED=3,x.prototype._debug=function(){this._options.debug&&n.log.apply(n,arguments)},x.prototype._dispatchOpen=function(){var e=this;e.readyState===x.CONNECTING?(e._transport_tref&&(clearTimeout(e._transport_tref),e._transport_tref=null),e.readyState=x.OPEN,e.dispatchEvent(new r("open"))):e._didClose(1006,"Server lost session")},x.prototype._dispatchMessage=function(e){var t=this;t.readyState===x.OPEN&&t.dispatchEvent(new r("message",{data:e}))},x.prototype._dispatchHeartbeat=function(){var e=this;e.readyState===x.OPEN&&e.dispatchEvent(new r("heartbeat",{}))},x.prototype._didClose=function(e,t,o){var i=this;if(i.readyState!==x.CONNECTING&&i.readyState!==x.OPEN&&i.readyState!==x.CLOSING)throw new Error("INVALID_STATE_ERR");i._ir&&(i._ir.nuke(),i._ir=null),i._transport&&(i._transport.doCleanup(),i._transport=null);var a=new r("close",{code:e,reason:t,wasClean:n.userSetCode(e)});if(!n.userSetCode(e)&&i.readyState===x.CONNECTING&&!o){if(i._try_next_protocol(a))return;a=new r("close",{code:2e3,reason:"All transports failed",wasClean:!1,last_event:a})}i.readyState=x.CLOSED,n.delay(function(){i.dispatchEvent(a)})},x.prototype._didMessage=function(e){var t=this,n=e.slice(0,1);switch(n){case"o":t._dispatchOpen();break;case"a":for(var o=JSON.parse(e.slice(1)||"[]"),r=0;r<o.length;r++)t._dispatchMessage(o[r]);break;case"m":var o=JSON.parse(e.slice(1)||"null");t._dispatchMessage(o);break;case"c":var o=JSON.parse(e.slice(1)||"[]");t._didClose(o[0],o[1]);break;case"h":t._dispatchHeartbeat()}},x.prototype._try_next_protocol=function(t){var o=this;for(o.protocol&&(o._debug("Closed transport:",o.protocol,""+t),o.protocol=null),o._transport_tref&&(clearTimeout(o._transport_tref),o._transport_tref=null);;){var r=o.protocol=o._protocols.shift();if(!r)return!1;if(x[r]&&x[r].need_body===!0&&(!e.body||"undefined"!=typeof e.readyState&&"complete"!==e.readyState))return o._protocols.unshift(r),o.protocol="waiting-for-load",n.attachEvent("load",function(){o._try_next_protocol()}),!0;if(x[r]&&x[r].enabled(o._options)){var i=x[r].roundTrips||1,a=(o._options.rto||0)*i||5e3;o._transport_tref=n.delay(a,function(){o.readyState===x.CONNECTING&&o._didClose(2007,"Transport timeouted")});var u=n.random_string(8),s=o._base_url+"/"+o._server+"/"+u;return o._debug("Opening transport:",r," url:"+s," RTO:"+o._options.rto),o._transport=new x[r](o,s,o._base_url),!0}o._debug("Skipping transport:",r)}},x.prototype.close=function(e,t){var o=this;if(e&&!n.userSetCode(e))throw new Error("INVALID_ACCESS_ERR");return o.readyState!==x.CONNECTING&&o.readyState!==x.OPEN?!1:(o.readyState=x.CLOSING,o._didClose(e||1e3,t||"Normal closure"),!0)},x.prototype.send=function(e){var t=this;if(t.readyState===x.CONNECTING)throw new Error("INVALID_STATE_ERR");return t.readyState===x.OPEN&&t._transport.doSend(n.quote(""+e)),!0},x.prototype._applyInfo=function(t,o,r){var i=this;i._options.info=t,i._options.rtt=o,i._options.rto=n.countRTO(o),i._options.info.null_origin=!e.domain;var a=n.probeProtocols();i._protocols=n.detectProtocols(a,r,t)};var C=x.websocket=function(e,o){var r=this,i=o+"/websocket";i="https"===i.slice(0,5)?"wss"+i.slice(5):"ws"+i.slice(4),r.ri=e,r.url=i;var a=t.WebSocket||t.MozWebSocket;r.ws=new a(r.url),r.ws.onmessage=function(e){r.ri._didMessage(e.data)},r.unload_ref=n.unload_add(function(){r.ws.close()}),r.ws.onclose=function(){r.ri._didMessage(n.closeFrame(1006,"WebSocket connection broken"))}};C.prototype.doSend=function(e){this.ws.send("["+e+"]")},C.prototype.doCleanup=function(){var e=this,t=e.ws;t&&(t.onmessage=t.onclose=null,t.close(),n.unload_del(e.unload_ref),e.unload_ref=e.ri=e.ws=null)},C.enabled=function(){return!(!t.WebSocket&&!t.MozWebSocket)},C.roundTrips=2;var N=function(){};N.prototype.send_constructor=function(e){var t=this;t.send_buffer=[],t.sender=e},N.prototype.doSend=function(e){var t=this;t.send_buffer.push(e),t.send_stop||t.send_schedule()},N.prototype.send_schedule_wait=function(){var e,t=this;t.send_stop=function(){t.send_stop=null,clearTimeout(e)},e=n.delay(25,function(){t.send_stop=null,t.send_schedule()})},N.prototype.send_schedule=function(){var e=this;if(e.send_buffer.length>0){var t="["+e.send_buffer.join(",")+"]";e.send_stop=e.sender(e.trans_url,t,function(t,n){e.send_stop=null,t===!1?e.ri._didClose(1006,"Sending error "+n):e.send_schedule_wait()}),e.send_buffer=[]}},N.prototype.send_destructor=function(){var e=this;e._send_stop&&e._send_stop(),e._send_stop=null};var E=function(t,o,r){var i=this;if(!("_send_form"in i)){var a=i._send_form=e.createElement("form"),u=i._send_area=e.createElement("textarea");u.name="d",a.style.display="none",a.style.position="absolute",a.method="POST",a.enctype="application/x-www-form-urlencoded",a.acceptCharset="UTF-8",a.appendChild(u),e.body.appendChild(a)}var a=i._send_form,u=i._send_area,s="a"+n.random_string(8);a.target=s,a.action=t+"/jsonp_send?i="+s;var c;try{c=e.createElement('<iframe name="'+s+'">')}catch(f){c=e.createElement("iframe"),c.name=s}c.id=s,a.appendChild(c),c.style.display="none";try{u.value=o}catch(l){n.log("Your browser is seriously broken. Go home! "+l.message)}a.submit();var d=function(){c.onerror&&(c.onreadystatechange=c.onerror=c.onload=null,n.delay(500,function(){c.parentNode.removeChild(c),c=null}),u.value="",r(!0))};return c.onerror=c.onload=d,c.onreadystatechange=function(){"complete"==c.readyState&&d()},d},j=function(e){return function(t,n,o){var r=new e("POST",t+"/xhr_send",n);return r.onfinish=function(e){o(200===e||204===e,"http status "+e)},function(e){o(!1,e)}}},k=function(t,o){var r,i,a=e.createElement("script"),u=function(e){i&&(i.parentNode.removeChild(i),i=null),a&&(clearTimeout(r),a.parentNode.removeChild(a),a.onreadystatechange=a.onerror=a.onload=a.onclick=null,a=null,o(e),o=null)},s=!1,c=null;if(a.id="a"+n.random_string(8),a.src=t,a.type="text/javascript",a.charset="UTF-8",a.onerror=function(){c||(c=setTimeout(function(){s||u(n.closeFrame(1006,"JSONP script loaded abnormally (onerror)"))},1e3))},a.onload=function(){u(n.closeFrame(1006,"JSONP script loaded abnormally (onload)"))},a.onreadystatechange=function(){if(/loaded|closed/.test(a.readyState)){if(a&&a.htmlFor&&a.onclick){s=!0;try{a.onclick()}catch(e){}}a&&u(n.closeFrame(1006,"JSONP script loaded abnormally (onreadystatechange)"))}},"undefined"==typeof a.async&&e.attachEvent)if(/opera/i.test(navigator.userAgent))i=e.createElement("script"),i.text="try{var a = document.getElementById('"+a.id+"'); if(a)a.onerror();}catch(x){};",a.async=i.async=!1;else{try{a.htmlFor=a.id,a.event="onclick"}catch(f){}a.async=!0}"undefined"!=typeof a.async&&(a.async=!0),r=setTimeout(function(){u(n.closeFrame(1006,"JSONP script loaded abnormally (timeout)"))},35e3);var l=e.getElementsByTagName("head")[0];return l.insertBefore(a,l.firstChild),i&&l.insertBefore(i,l.firstChild),u},T=x["jsonp-polling"]=function(e,t){n.polluteGlobalNamespace();var o=this;o.ri=e,o.trans_url=t,o.send_constructor(E),o._schedule_recv()};T.prototype=new N,T.prototype._schedule_recv=function(){var e=this,t=function(t){e._recv_stop=null,t&&(e._is_closing||e.ri._didMessage(t)),e._is_closing||e._schedule_recv()};e._recv_stop=M(e.trans_url+"/jsonp",k,t)},T.enabled=function(){return!0},T.need_body=!0,T.prototype.doCleanup=function(){var e=this;e._is_closing=!0,e._recv_stop&&e._recv_stop(),e.ri=e._recv_stop=null,e.send_destructor()};var M=function(e,o,r){var i="a"+n.random_string(6),a=e+"?c="+escape(u+"."+i),s=0,c=function(e){switch(s){case 0:delete t[u][i],r(e);break;case 1:r(e),s=2;break;case 2:delete t[u][i]}},f=o(a,c);t[u][i]=f;var l=function(){t[u][i]&&(s=1,t[u][i](n.closeFrame(1e3,"JSONP user aborted read")))};return l},J=function(){};J.prototype=new N,J.prototype.run=function(e,t,n,o,r){var i=this;i.ri=e,i.trans_url=t,i.send_constructor(j(r)),i.poll=new Z(e,o,t+n,r)},J.prototype.doCleanup=function(){var e=this;e.poll&&(e.poll.abort(),e.poll=null)};var I=x["xhr-streaming"]=function(e,t){this.run(e,t,"/xhr_streaming",ot,n.XHRCorsObject)};I.prototype=new J,I.enabled=function(){return t.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest&&!/opera/i.test(navigator.userAgent)},I.roundTrips=2,I.need_body=!0;var R=x["xdr-streaming"]=function(e,t){this.run(e,t,"/xhr_streaming",ot,n.XDRObject)};R.prototype=new J,R.enabled=function(){return!!t.XDomainRequest},R.roundTrips=2;var A=x["xhr-polling"]=function(e,t){this.run(e,t,"/xhr",ot,n.XHRCorsObject)};A.prototype=new J,A.enabled=I.enabled,A.roundTrips=2;var X=x["xdr-polling"]=function(e,t){this.run(e,t,"/xhr",ot,n.XDRObject)};X.prototype=new J,X.enabled=R.enabled,X.roundTrips=2;var H=function(){};H.prototype.i_constructor=function(e,t,o){var r=this;r.ri=e,r.origin=n.getOrigin(o),r.base_url=o,r.trans_url=t;var i=o+"/iframe.html";r.ri._options.devel&&(i+="?t="+ +new Date),r.window_id=n.random_string(8),i+="#"+r.window_id,r.iframeObj=n.createIframe(i,function(e){r.ri._didClose(1006,"Unable to load an iframe ("+e+")")}),r.onmessage_cb=n.bind(r.onmessage,r),n.attachMessage(r.onmessage_cb)},H.prototype.doCleanup=function(){var e=this;if(e.iframeObj){n.detachMessage(e.onmessage_cb);try{e.iframeObj.iframe.contentWindow&&e.postMessage("c")}catch(t){}e.iframeObj.cleanup(),e.iframeObj=null,e.onmessage_cb=e.iframeObj=null}},H.prototype.onmessage=function(e){var t=this;if(e.origin===t.origin){var n=e.data.slice(0,8),o=e.data.slice(8,9),r=e.data.slice(9);if(n===t.window_id)switch(o){case"s":t.iframeObj.loaded(),t.postMessage("s",JSON.stringify([x.version,t.protocol,t.trans_url,t.base_url]));break;case"t":t.ri._didMessage(r)}}},H.prototype.postMessage=function(e,t){var n=this;n.iframeObj.post(n.window_id+e+(t||""),n.origin)},H.prototype.doSend=function(e){this.postMessage("m",e)},H.enabled=function(){var e=navigator&&navigator.userAgent&&-1!==navigator.userAgent.indexOf("Konqueror");return("function"==typeof t.postMessage||"object"==typeof t.postMessage)&&!e};var L,P=function(e,o){parent!==t?parent.postMessage(L+e+(o||""),"*"):n.log("Can't postMessage, no parent window.",e,o)},U=function(){};U.prototype._didClose=function(e,t){P("t",n.closeFrame(e,t))},U.prototype._didMessage=function(e){P("t",e)},U.prototype._doSend=function(e){this._transport.doSend(e)},U.prototype._doCleanup=function(){this._transport.doCleanup()},n.parent_origin=void 0,x.bootstrap_iframe=function(){var o;L=e.location.hash.slice(1);var r=function(e){if(e.source===parent&&("undefined"==typeof n.parent_origin&&(n.parent_origin=e.origin),e.origin===n.parent_origin)){var r=e.data.slice(0,8),i=e.data.slice(8,9),a=e.data.slice(9);if(r===L)switch(i){case"s":var u=JSON.parse(a),s=u[0],c=u[1],f=u[2],l=u[3];if(s!==x.version&&n.log('Incompatibile SockJS! Main site uses: "'+s+'", the iframe: "'+x.version+'".'),!n.flatUrl(f)||!n.flatUrl(l))return void n.log("Only basic urls are supported in SockJS");if(!n.isSameOriginUrl(f)||!n.isSameOriginUrl(l))return void n.log("Can't connect to different domain from within an iframe. ("+JSON.stringify([t.location.href,f,l])+")");o=new U,o._transport=new U[c](o,f,l);break;case"m":o._doSend(a);break;case"c":o&&o._doCleanup(),o=null}}};n.attachMessage(r),P("s")};var D=function(e,t){var o=this;n.delay(function(){o.doXhr(e,t)})};D.prototype=new i(["finish"]),D.prototype.doXhr=function(e,t){var o=this,r=(new Date).getTime(),i=new t("GET",e+"/info"),a=n.delay(8e3,function(){i.ontimeout()});i.onfinish=function(e,t){if(clearTimeout(a),a=null,200===e){var n=(new Date).getTime()-r,i=JSON.parse(t);"object"!=typeof i&&(i={}),o.emit("finish",i,n)}else o.emit("finish")},i.ontimeout=function(){i.close(),o.emit("finish")}};var q=function(t){var o=this,r=function(){var e=new H;e.protocol="w-iframe-info-receiver";var n=function(t){if("string"==typeof t&&"m"===t.substr(0,1)){var n=JSON.parse(t.substr(1)),r=n[0],i=n[1];o.emit("finish",r,i)}else o.emit("finish");e.doCleanup(),e=null},r={_options:{},_didClose:n,_didMessage:n};e.i_constructor(r,t,t)};e.body?r():n.attachEvent("load",r)};q.prototype=new i(["finish"]);var G=function(){var e=this;n.delay(function(){e.emit("finish",{},2e3)})};G.prototype=new i(["finish"]);var F=function(e){if(n.isSameOriginUrl(e))return new D(e,n.XHRLocalObject);switch(n.isXHRCorsCapable()){case 1:return new D(e,n.XHRLocalObject);case 2:return new D(e,n.XDRObject);case 3:return new q(e);default:return new G}},W=U["w-iframe-info-receiver"]=function(e,t,o){var r=new D(o,n.XHRLocalObject);r.onfinish=function(t,n){e._didMessage("m"+JSON.stringify([t,n])),e._didClose()}};W.prototype.doCleanup=function(){};var z=x["iframe-eventsource"]=function(){var e=this;e.protocol="w-iframe-eventsource",e.i_constructor.apply(e,arguments)};z.prototype=new H,z.enabled=function(){return"EventSource"in t&&H.enabled()},z.need_body=!0,z.roundTrips=3;var B=U["w-iframe-eventsource"]=function(e,t){this.run(e,t,"/eventsource",Q,n.XHRLocalObject)};B.prototype=new J;var V=x["iframe-xhr-polling"]=function(){var e=this;e.protocol="w-iframe-xhr-polling",e.i_constructor.apply(e,arguments)};V.prototype=new H,V.enabled=function(){return t.XMLHttpRequest&&H.enabled()},V.need_body=!0,V.roundTrips=3;var $=U["w-iframe-xhr-polling"]=function(e,t){this.run(e,t,"/xhr",ot,n.XHRLocalObject)};$.prototype=new J;var Y=x["iframe-htmlfile"]=function(){var e=this;e.protocol="w-iframe-htmlfile",e.i_constructor.apply(e,arguments)};Y.prototype=new H,Y.enabled=function(){return H.enabled()},Y.need_body=!0,Y.roundTrips=3;var K=U["w-iframe-htmlfile"]=function(e,t){this.run(e,t,"/htmlfile",nt,n.XHRLocalObject)};K.prototype=new J;var Z=function(e,t,n,o){var r=this;r.ri=e,r.Receiver=t,r.recv_url=n,r.AjaxObject=o,r._scheduleRecv()};Z.prototype._scheduleRecv=function(){var e=this,t=e.poll=new e.Receiver(e.recv_url,e.AjaxObject),n=0;t.onmessage=function(t){n+=1,e.ri._didMessage(t.data)},t.onclose=function(n){e.poll=t=t.onmessage=t.onclose=null,e.poll_is_closing||("permanent"===n.reason?e.ri._didClose(1006,"Polling error ("+n.reason+")"):e._scheduleRecv())}},Z.prototype.abort=function(){var e=this;e.poll_is_closing=!0,e.poll&&e.poll.abort()};var Q=function(e){var t=this,o=new EventSource(e);o.onmessage=function(e){t.dispatchEvent(new r("message",{data:unescape(e.data)}))},t.es_close=o.onerror=function(e,i){var a=i?"user":2!==o.readyState?"network":"permanent";
t.es_close=o.onmessage=o.onerror=null,o.close(),o=null,n.delay(200,function(){t.dispatchEvent(new r("close",{reason:a}))})}};Q.prototype=new o,Q.prototype.abort=function(){var e=this;e.es_close&&e.es_close({},!0)};var et,tt=function(){if(void 0===et)if("ActiveXObject"in t)try{et=!!new ActiveXObject("htmlfile")}catch(e){}else et=!1;return et},nt=function(e){var o=this;n.polluteGlobalNamespace(),o.id="a"+n.random_string(6,26),e+=(-1===e.indexOf("?")?"?":"&")+"c="+escape(u+"."+o.id);var i,a=tt()?n.createHtmlfile:n.createIframe;t[u][o.id]={start:function(){i.loaded()},message:function(e){o.dispatchEvent(new r("message",{data:e}))},stop:function(){o.iframe_close({},"network")}},o.iframe_close=function(e,n){i.cleanup(),o.iframe_close=i=null,delete t[u][o.id],o.dispatchEvent(new r("close",{reason:n}))},i=a(e,function(){o.iframe_close({},"permanent")})};nt.prototype=new o,nt.prototype.abort=function(){var e=this;e.iframe_close&&e.iframe_close({},"user")};var ot=function(e,t){var n=this,o=0;n.xo=new t("POST",e,null),n.xo.onchunk=function(e,t){if(200===e)for(;;){var i=t.slice(o),a=i.indexOf("\n");if(-1===a)break;o+=a+1;var u=i.slice(0,a);n.dispatchEvent(new r("message",{data:u}))}},n.xo.onfinish=function(e,t){n.xo.onchunk(e,t),n.xo=null;var o=200===e?"network":"permanent";n.dispatchEvent(new r("close",{reason:o}))}};return ot.prototype=new o,ot.prototype.abort=function(){var e=this;e.xo&&(e.xo.close(),e.dispatchEvent(new r("close",{reason:"user"})),e.xo=null)},x.getUtils=function(){return n},x.getIframeTransport=function(){return H},x}(),"_sockjs_onload"in window&&setTimeout(_sockjs_onload,1),module.exports=SockJS}),define("imm-client/0.1.5/src/fb-common/enum/common",[],function(e,t,n){var o={action:{connect:"connect",disconnect:"disconnect",broadcast:"broadcast",broadcastAction:"broadcastaction",firstShakeHand:"firstShakeHand",onlineCount:"onlineCount",autoUpdateIMM:"autoUpdateIMM"},msgType:{system:"system",connection:"connection",msg:"msg",action:"action",onlineCount:"onlineCount"},msgContent:{firstConnection:"first shake hand",connectionSetUp:"connection set up"},mail:{MAINTAINER:"max@vzhibo.tv"}};n.exports=o});