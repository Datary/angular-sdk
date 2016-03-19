/*! 9.0.3 */
!window.XMLHttpRequest||window.FileAPI&&FileAPI.shouldLoad||(window.XMLHttpRequest.prototype.setRequestHeader=function(a){return function(b,c){if("__setXHR_"===b){var d=c(this);d instanceof Function&&d(this)}else a.apply(this,arguments)}}(window.XMLHttpRequest.prototype.setRequestHeader));var ngFileUpload=angular.module("ngFileUpload",[]);ngFileUpload.version="9.0.3",ngFileUpload.service("UploadBase",["$http","$q","$timeout",function(a,b,c){function d(d){function g(a){j.notify&&j.notify(a),k.progressFunc&&c(function(){k.progressFunc(a)})}function h(a){return null!=d._start&&f?{loaded:a.loaded+d._start,total:d._file.size,type:a.type,config:d,lengthComputable:!0,target:a.target}:a}function i(){a(d).then(function(a){f&&d._chunkSize&&!d._finished?(g({loaded:d._end,total:d._file.size,config:d,type:"progress"}),e.upload(d)):(d._finished&&delete d._finished,j.resolve(a))},function(a){j.reject(a)},function(a){j.notify(a)})}d.method=d.method||"POST",d.headers=d.headers||{};var j=d._deferred=d._deferred||b.defer(),k=j.promise;return d.disableProgress||(d.headers.__setXHR_=function(){return function(a){a&&a instanceof XMLHttpRequest&&(d.__XHR=a,d.xhrFn&&d.xhrFn(a),a.upload.addEventListener("progress",function(a){a.config=d,g(h(a))},!1),a.upload.addEventListener("load",function(a){a.lengthComputable&&(a.config=d,g(h(a)))},!1))}}),f?d._chunkSize&&d._end&&!d._finished?(d._start=d._end,d._end+=d._chunkSize,i()):d.resumeSizeUrl?a.get(d.resumeSizeUrl).then(function(a){d._start=d.resumeSizeResponseReader?d.resumeSizeResponseReader(a.data):parseInt((null==a.data.size?a.data:a.data.size).toString()),d._chunkSize&&(d._end=d._start+d._chunkSize),i()},function(a){throw a}):d.resumeSize?d.resumeSize().then(function(a){d._start=a,i()},function(a){throw a}):i():i(),k.success=function(a){return k.then(function(b){a(b.data,b.status,b.headers,d)}),k},k.error=function(a){return k.then(null,function(b){a(b.data,b.status,b.headers,d)}),k},k.progress=function(a){return k.progressFunc=a,k.then(null,null,function(b){a(b)}),k},k.abort=k.pause=function(){return d.__XHR&&c(function(){d.__XHR.abort()}),k},k.xhr=function(a){return d.xhrFn=function(b){return function(){b&&b.apply(k,arguments),a.apply(k,arguments)}}(d.xhrFn),k},k}var e=this;this.isResumeSupported=function(){return window.Blob&&Blob instanceof Function&&(new Blob).slice};var f=this.isResumeSupported();this.rename=function(a,b){return a.ngfName=b,a},this.jsonBlob=function(a){var b=new Blob([a],{type:"application/json"});return b._ngfBlob=!0,b},this.json=function(a){return angular.toJson(a)},this.upload=function(a){function b(a){return null!=a&&a instanceof Blob||a.flashId&&a.name&&a.size}function c(b,c){if(b._ngfBlob)return b;if(a._file=a._file||b,null!=a._start&&f){a._end&&a._end>=b.size&&(a._finished=!0,a._end=b.size);var d=b.slice(a._start,a._end||b.size);return d.name=b.name,d.ngfName=b.ngfName,a._chunkSize&&(c.append("_chunkSize",a._end-a._start),c.append("_chunkNumber",Math.floor(a._start/a._chunkSize)),c.append("_totalSize",a._file.size)),d}return b}function g(d,e,f){if(void 0!==e)if(angular.isDate(e)&&(e=e.toISOString()),angular.isString(e))d.append(f,e);else if(b(e)){var h=c(e,d),i=f.split(",");i[1]&&(h.ngfName=i[1].replace(/^\s+|\s+$/g,""),f=i[0]),a._fileKey=a._fileKey||f,d.append(f,h,h.ngfName||h.name)}else if(angular.isObject(e)){if(e.$$ngfCircularDetection)throw"ngFileUpload: Circular reference in config.data. Make sure specified data for Upload.upload() has no circular reference: "+f;e.$$ngfCircularDetection=!0;try{for(var j in e)if(e.hasOwnProperty(j)&&"$$ngfCircularDetection"!==j){var k=null==a.objectKey?"[i]":a.objectKey;e.length&&parseInt(j)>-1&&(k=null==a.arrayKey?k:a.arrayKey),g(d,e[j],f+k.replace(/[ik]/g,j))}}finally{delete e.$$ngfCircularDetection}}else d.append(f,e)}function h(){a._chunkSize=e.translateScalars(a.resumeChunkSize),a._chunkSize=a._chunkSize?parseInt(a._chunkSize.toString()):null,a.headers=a.headers||{},a.headers["Content-Type"]=void 0,a.transformRequest=a.transformRequest?angular.isArray(a.transformRequest)?a.transformRequest:[a.transformRequest]:[],a.transformRequest.push(function(b){var c,d=new FormData;b=b||a.fields||{},a.file&&(b.file=a.file);for(c in b)if(b.hasOwnProperty(c)){var e=b[c];a.formDataAppender?a.formDataAppender(d,c,e):g(d,e,c)}return d})}return a._isDigested||(a._isDigested=!0,h()),d(a)},this.http=function(b){return b.transformRequest=b.transformRequest||function(b){return window.ArrayBuffer&&b instanceof window.ArrayBuffer||b instanceof Blob?b:a.defaults.transformRequest[0].apply(this,arguments)},b._chunkSize=e.translateScalars(b.resumeChunkSize),b._chunkSize=b._chunkSize?parseInt(b._chunkSize.toString()):null,d(b)},this.translateScalars=function(a){if(angular.isString(a)){if(a.search(/kb/i)===a.length-2)return parseFloat(1e3*a.substring(0,a.length-2));if(a.search(/mb/i)===a.length-2)return parseFloat(1e6*a.substring(0,a.length-2));if(a.search(/gb/i)===a.length-2)return parseFloat(1e9*a.substring(0,a.length-2));if(a.search(/b/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/s/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/m/i)===a.length-1)return parseFloat(60*a.substring(0,a.length-1));if(a.search(/h/i)===a.length-1)return parseFloat(3600*a.substring(0,a.length-1))}return a},this.setDefaults=function(a){this.defaults=a||{}},this.defaults={},this.version=ngFileUpload.version}]),ngFileUpload.service("Upload",["$parse","$timeout","$compile","UploadResize",function(a,b,c,d){function e(a,b){null==b||a.$dirty||(a.$setDirty?a.$setDirty():a.$dirty=!0)}function f(a,b,c,d){var e=h.attrGetter("ngfResize",b,c);if(!e||!h.isResizeSupported())return d();for(var f=a.length,g=function(){f--,0===f&&d()},i=function(b){return function(c){a.splice(b,1,c),g()}},j=function(a){return function(b){g(),a.$error="resize",a.$errorParam=(b?(b.message?b.message:b)+": ":"")+(a&&a.name)}},k=0;k<a.length;k++){var l=a[k];0===l.type.indexOf("image")?h.resize(l,e.width,e.height,e.quality).then(i(k),j(l)):g()}}function g(a,b,c,d){var e=[],f=h.attrGetter("ngfKeep",c,d);if(f===!0){if(!a||!a.length)return;var g=!1;if(h.attrGetter("ngfKeepDistinct",c,d)===!0){for(var i=b.length,j=0;j<a.length;j++){for(var k=0;i>k;k++)if(a[j].name===b[k].name){e.push(a[j]);break}k===i&&(b.push(a[j]),g=!0)}if(!g)return;a=b}else a=b.concat(a)}return{files:a,dupFiles:e,keep:f}}var h=d;return h.getAttrWithDefaults=function(a,b){return null!=a[b]?a[b]:null==h.defaults[b]?h.defaults[b]:h.defaults[b].toString()},h.attrGetter=function(b,c,d,e){if(!d)return this.getAttrWithDefaults(c,b);try{return e?a(this.getAttrWithDefaults(c,b))(d,e):a(this.getAttrWithDefaults(c,b))(d)}catch(f){if(b.search(/min|max|pattern/i))return this.getAttrWithDefaults(c,b);throw f}},h.shouldUpdateOn=function(a,b,c){var d=h.attrGetter("ngModelOptions",b,c);return d&&d.updateOn?d.updateOn.split(" ").indexOf(a)>-1:!0},h.updateModel=function(c,d,i,j,k,l,m){function n(f,g,k,m,n){var o=f&&f.length?f[0]:null;c&&(e(c,f),angular.forEach(c.$ngfValidations,function(a){c.$setValidity(a.name,a.valid)}),c&&c.$setViewValue(n?o:f)),j&&a(j)(i,{$files:f,$file:o,$newFiles:k,$duplicateFiles:m,$invalidFiles:g,$event:l});var p=h.attrGetter("ngfModelInvalid",d);p&&b(function(){a(p).assign(i,g)}),b(function(){})}var o=k,p=(c&&c.$modelValue||d.$$ngfPrevFiles||[]).slice(0),q=g(k,p,d,i);k=q.files;var r=q.dupFiles,s=!h.attrGetter("ngfMultiple",d,i)&&!h.attrGetter("multiple",d)&&!q.keep;d.$$ngfPrevFiles=k,h.validate(k,c,d,i,h.attrGetter("ngfValidateLater",d),function(){if(m)n(k,[],o,r,s);else{var a=h.attrGetter("ngModelOptions",d,i);if(!a||!a.allowInvalid){var c=[],e=[];angular.forEach(k,function(a){a.$error?e.push(a):c.push(a)}),k=c}f(k,d,i,function(){b(function(){n(k,e,o,r,s)},a&&a.debounce?a.debounce.change||a.debounce:0)})}});for(var t=p.length;t--;){var u=p[t];window.URL&&u.blobUrl&&(URL.revokeObjectURL(u.blobUrl),delete u.blobUrl)}},h}]),ngFileUpload.directive("ngfSelect",["$parse","$timeout","$compile","Upload",function(a,b,c,d){function e(a){var b=a.match(/Android[^\d]*(\d+)\.(\d+)/);if(b&&b.length>2){var c=d.defaults.androidFixMinorVersion||4;return parseInt(b[1])<4||parseInt(b[1])===c&&parseInt(b[2])<c}return-1===a.indexOf("Chrome")&&/.*Windows.*Safari.*/.test(a)}function f(a,b,c,d,f,h,i,j){function k(){return"input"===b[0].tagName.toLowerCase()&&c.type&&"file"===c.type.toLowerCase()}function l(){return t("ngfChange")||t("ngfSelect")}function m(b){if(j.shouldUpdateOn("change",c,a)){for(var e=b.__files_||b.target&&b.target.files,f=[],g=0;g<e.length;g++)f.push(e[g]);j.updateModel(d,c,a,l(),f.length?f:null,b)}}function n(a){if(b!==a)for(var c=0;c<b[0].attributes.length;c++){var d=b[0].attributes[c];"type"!==d.name&&"class"!==d.name&&"id"!==d.name&&"style"!==d.name&&((null==d.value||""===d.value)&&("required"===d.name&&(d.value="required"),"multiple"===d.name&&(d.value="multiple")),a.attr(d.name,d.value))}}function o(){if(k())return b;var a=angular.element('<input type="file">');return n(a),a.css("visibility","hidden").css("position","absolute").css("overflow","hidden").css("width","0px").css("height","0px").css("border","none").css("margin","0px").css("padding","0px").attr("tabindex","-1"),g.push({el:b,ref:a}),document.body.appendChild(a[0]),a}function p(c){if(b.attr("disabled")||t("ngfSelectDisabled",a))return!1;var d=q(c);return null!=d?d:(r(c),e(navigator.userAgent)?setTimeout(function(){w[0].click()},0):w[0].click(),!1)}function q(a){var b=a.changedTouches||a.originalEvent&&a.originalEvent.changedTouches;if("touchstart"===a.type)return v=b?b[0].clientY:0,!0;if(a.stopPropagation(),a.preventDefault(),"touchend"===a.type){var c=b?b[0].clientY:0;if(Math.abs(c-v)>20)return!1}}function r(b){j.shouldUpdateOn("click",c,a)&&w.val()&&(w.val(null),j.updateModel(d,c,a,l(),null,b,!0))}function s(a){if(w&&!w.attr("__ngf_ie10_Fix_")){if(!w[0].parentNode)return void(w=null);a.preventDefault(),a.stopPropagation(),w.unbind("click");var b=w.clone();return w.replaceWith(b),w=b,w.attr("__ngf_ie10_Fix_","true"),w.bind("change",m),w.bind("click",s),w[0].click(),!1}w.removeAttr("__ngf_ie10_Fix_")}var t=function(a,b){return j.attrGetter(a,c,b)},u=[];u.push(a.$watch(t("ngfMultiple"),function(){w.attr("multiple",t("ngfMultiple",a))})),u.push(a.$watch(t("ngfCapture"),function(){w.attr("capture",t("ngfCapture",a))})),c.$observe("accept",function(){w.attr("accept",t("accept"))}),u.push(function(){c.$$observers&&delete c.$$observers.accept});var v=0,w=b;k()||(w=o()),w.bind("change",m),k()?b.bind("click",r):b.bind("click touchstart touchend",p),-1!==navigator.appVersion.indexOf("MSIE 10")&&w.bind("click",s),d&&d.$formatters.push(function(a){return(null==a||0===a.length)&&w.val()&&w.val(null),a}),a.$on("$destroy",function(){k()||w.remove(),angular.forEach(u,function(a){a()})}),h(function(){for(var a=0;a<g.length;a++){var b=g[a];document.body.contains(b.el[0])||(g.splice(a,1),b.ref.remove())}}),window.FileAPI&&window.FileAPI.ngfFixIE&&window.FileAPI.ngfFixIE(b,w,m)}var g=[];return{restrict:"AEC",require:"?ngModel",link:function(e,g,h,i){f(e,g,h,i,a,b,c,d)}}}]),function(){function a(a){return"img"===a.tagName.toLowerCase()?"image":"audio"===a.tagName.toLowerCase()?"audio":"video"===a.tagName.toLowerCase()?"video":/./}function b(b,c,d,e,f,g,h,i){function j(a){var g=b.attrGetter("ngfNoObjectUrl",f,d);b.dataUrl(a,g)["finally"](function(){c(function(){var b=(g?a.$ngfDataUrl:a.$ngfBlobUrl)||a.$ngfDataUrl;i?e.css("background-image","url('"+(b||"")+"')"):e.attr("src",b),b?e.removeClass("ngf-hide"):e.addClass("ngf-hide")})})}c(function(){var c=d.$watch(f[g],function(c){var d=h;if("ngfThumbnail"===g&&(d||(d={width:e[0].clientWidth,height:e[0].clientHeight}),0===d.width&&window.getComputedStyle)){var f=getComputedStyle(e[0]);d={width:parseInt(f.width.slice(0,-2)),height:parseInt(f.height.slice(0,-2))}}return angular.isString(c)?(e.removeClass("ngf-hide"),i?e.css("background-image","url('"+c+"')"):e.attr("src",c)):void(!c||!c.type||0!==c.type.search(a(e[0]))||i&&0!==c.type.indexOf("image")?e.addClass("ngf-hide"):d&&b.isResizeSupported()?b.resize(c,d.width,d.height,d.quality).then(function(a){j(a)},function(a){throw a}):j(c))});d.$on("$destroy",function(){c()})})}ngFileUpload.service("UploadDataUrl",["UploadBase","$timeout","$q",function(a,b,c){var d=a;return d.base64DataUrl=function(a){if(angular.isArray(a)){var b=c.defer(),e=0;return angular.forEach(a,function(c){d.dataUrl(c,!0)["finally"](function(){if(e++,e===a.length){var c=[];angular.forEach(a,function(a){c.push(a.$ngfDataUrl)}),b.resolve(c,a)}})}),b.promise}return d.dataUrl(a,!0)},d.dataUrl=function(a,d){if(d&&null!=a.$ngfDataUrl||!d&&null!=a.$ngfBlobUrl){var e=c.defer();return b(function(){e.resolve(d?a.$ngfDataUrl:a.$ngfBlobUrl,a)}),e.promise}var f=d?a.$$ngfDataUrlPromise:a.$$ngfBlobUrlPromise;if(f)return f;var g=c.defer();return b(function(){if(window.FileReader&&a&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 8")||a.size<2e4)&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 9")||a.size<4e6)){var c=window.URL||window.webkitURL;if(c&&c.createObjectURL&&!d){var e;try{e=c.createObjectURL(a)}catch(f){return void b(function(){a.$ngfBlobUrl="",g.reject()})}b(function(){a.$ngfBlobUrl=e,e&&g.resolve(e,a)})}else{var h=new FileReader;h.onload=function(c){b(function(){a.$ngfDataUrl=c.target.result,g.resolve(c.target.result,a)})},h.onerror=function(){b(function(){a.$ngfDataUrl="",g.reject()})},h.readAsDataURL(a)}}else b(function(){a[d?"dataUrl":"blobUrl"]="",g.reject()})}),f=d?a.$$ngfDataUrlPromise=g.promise:a.$$ngfBlobUrlPromise=g.promise,f["finally"](function(){delete a[d?"$$ngfDataUrlPromise":"$$ngfBlobUrlPromise"]}),f},d}]);var c=angular.element("<style>.ngf-hide{display:none !important}</style>");document.getElementsByTagName("head")[0].appendChild(c[0]),ngFileUpload.directive("ngfSrc",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){b(a,c,d,e,f,"ngfSrc",a.attrGetter("ngfResize",f,d),!1)}}}]),ngFileUpload.directive("ngfBackground",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){b(a,c,d,e,f,"ngfBackground",a.attrGetter("ngfResize",f,d),!0)}}}]),ngFileUpload.directive("ngfThumbnail",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){var g=a.attrGetter("ngfSize",f,d);b(a,c,d,e,f,"ngfThumbnail",g,a.attrGetter("ngfAsBackground",f,d))}}}])}(),ngFileUpload.service("UploadValidate",["UploadDataUrl","$q","$timeout",function(a,b,c){function d(a){var b="",c=[];if(a.length>2&&"/"===a[0]&&"/"===a[a.length-1])b=a.substring(1,a.length-1);else{var e=a.split(",");if(e.length>1)for(var f=0;f<e.length;f++){var g=d(e[f]);g.regexp?(b+="("+g.regexp+")",f<e.length-1&&(b+="|")):c=c.concat(g.excludes)}else 0===a.indexOf("!")?c.push("^((?!"+d(a.substring(1)).regexp+").)*$"):(0===a.indexOf(".")&&(a="*"+a),b="^"+a.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]","g"),"\\$&")+"$",b=b.replace(/\\\*/g,".*").replace(/\\\?/g,"."))}return{regexp:b,excludes:c}}var e=a;return e.validatePattern=function(a,b){if(!b)return!0;var c=d(b),e=!0;if(c.regexp&&c.regexp.length){var f=new RegExp(c.regexp,"i");e=null!=a.type&&f.test(a.type)||null!=a.name&&f.test(a.name)}for(var g=c.excludes.length;g--;){var h=new RegExp(c.excludes[g],"i");e=e&&(null==a.type||h.test(a.type))&&(null==a.name||h.test(a.name))}return e},e.validate=function(a,b,c,d,f,g){function h(c,d,e){if(a){for(var f="ngf"+c[0].toUpperCase()+c.substr(1),g=a.length,h=null;g--;){var i=a[g],k=j(f,{$file:i});null==k&&(k=d(j("ngfValidate")||{}),h=null==h?!0:h),null!=k&&(e(i,k)||(i.$error=c,i.$errorParam=k,a.splice(g,1),h=!1))}null!==h&&b.$ngfValidations.push({name:c,valid:h})}}function i(c,d,e,f,h){if(a){var i=0,l=!1,m="ngf"+c[0].toUpperCase()+c.substr(1);a=void 0===a.length?[a]:a,angular.forEach(a,function(a){if(0!==a.type.search(e))return!0;var n=j(m,{$file:a})||d(j("ngfValidate",{$file:a})||{});n&&(k++,i++,f(a,n).then(function(b){h(b,n)||(a.$error=c,a.$errorParam=n,l=!0)},function(){j("ngfValidateForce",{$file:a})&&(a.$error=c,a.$errorParam=n,l=!0)})["finally"](function(){k--,i--,i||b.$ngfValidations.push({name:c,valid:!l}),k||g.call(b,b.$ngfValidations)}))})}}b=b||{},b.$ngfValidations=b.$ngfValidations||[],angular.forEach(b.$ngfValidations,function(a){a.valid=!0});var j=function(a,b){return e.attrGetter(a,c,d,b)};if(f)return void g.call(b);if(b.$$ngfValidated=!0,null==a||0===a.length)return void g.call(b);if(a=void 0===a.length?[a]:a.slice(0),h("pattern",function(a){return a.pattern},e.validatePattern),h("minSize",function(a){return a.size&&a.size.min},function(a,b){return a.size>=e.translateScalars(b)}),h("maxSize",function(a){return a.size&&a.size.max},function(a,b){return a.size<=e.translateScalars(b)}),h("validateFn",function(){return null},function(a,b){return b===!0||null===b||""===b}),!a.length)return void g.call(b,b.$ngfValidations);var k=0;i("maxHeight",function(a){return a.height&&a.height.max},/image/,this.imageDimensions,function(a,b){return a.height<=b}),i("minHeight",function(a){return a.height&&a.height.min},/image/,this.imageDimensions,function(a,b){return a.height>=b}),i("maxWidth",function(a){return a.width&&a.width.max},/image/,this.imageDimensions,function(a,b){return a.width<=b}),i("minWidth",function(a){return a.width&&a.width.min},/image/,this.imageDimensions,function(a,b){return a.width>=b}),i("ratio",function(a){return a.ratio},/image/,this.imageDimensions,function(a,b){for(var c=b.toString().split(","),d=!1,e=0;e<c.length;e++){var f=c[e],g=f.search(/x/i);f=g>-1?parseFloat(f.substring(0,g))/parseFloat(f.substring(g+1)):parseFloat(f),Math.abs(a.width/a.height-f)<1e-4&&(d=!0)}return d}),i("maxDuration",function(a){return a.duration&&a.duration.max},/audio|video/,this.mediaDuration,function(a,b){return a<=e.translateScalars(b)}),i("minDuration",function(a){return a.duration&&a.duration.min},/audio|video/,this.mediaDuration,function(a,b){return a>=e.translateScalars(b)}),i("validateAsyncFn",function(){return null},/./,function(a,b){return b},function(a){return a===!0||null===a||""===a}),k||g.call(b,b.$ngfValidations)},e.imageDimensions=function(a){if(a.$ngfWidth&&a.$ngfHeight){var d=b.defer();return c(function(){d.resolve({width:a.$ngfWidth,height:a.$ngfHeight})}),d.promise}if(a.$ngfDimensionPromise)return a.$ngfDimensionPromise;var f=b.defer();return c(function(){return 0!==a.type.indexOf("image")?void f.reject("not image"):void e.dataUrl(a).then(function(b){function d(){var b=h[0].clientWidth,c=h[0].clientHeight;h.remove(),a.$ngfWidth=b,a.$ngfHeight=c,f.resolve({width:b,height:c})}function e(){h.remove(),f.reject("load error")}function g(){c(function(){h[0].parentNode&&(h[0].clientWidth?d():i>10?e():g())},1e3)}var h=angular.element("<img>").attr("src",b).css("visibility","hidden").css("position","fixed");h.on("load",d),h.on("error",e);var i=0;g(),angular.element(document.getElementsByTagName("body")[0]).append(h)},function(){f.reject("load error")})}),a.$ngfDimensionPromise=f.promise,a.$ngfDimensionPromise["finally"](function(){delete a.$ngfDimensionPromise}),a.$ngfDimensionPromise},e.mediaDuration=function(a){if(a.$ngfDuration){var d=b.defer();return c(function(){d.resolve(a.$ngfDuration)}),d.promise}if(a.$ngfDurationPromise)return a.$ngfDurationPromise;var f=b.defer();return c(function(){return 0!==a.type.indexOf("audio")&&0!==a.type.indexOf("video")?void f.reject("not media"):void e.dataUrl(a).then(function(b){function d(){var b=h[0].duration;a.$ngfDuration=b,h.remove(),f.resolve(b)}function e(){h.remove(),f.reject("load error")}function g(){c(function(){h[0].parentNode&&(h[0].duration?d():i>10?e():g())},1e3)}var h=angular.element(0===a.type.indexOf("audio")?"<audio>":"<video>").attr("src",b).css("visibility","none").css("position","fixed");h.on("loadedmetadata",d),h.on("error",e);var i=0;g(),angular.element(document.body).append(h)},function(){f.reject("load error")})}),a.$ngfDurationPromise=f.promise,a.$ngfDurationPromise["finally"](function(){delete a.$ngfDurationPromise}),a.$ngfDurationPromise},e}]),ngFileUpload.service("UploadResize",["UploadValidate","$q","$timeout",function(a,b,c){var d=a,e=function(a,b,c,d){var e=Math.min(c/a,d/b);return{width:a*e,height:b*e}},f=function(a,c,d,f,g){var h=b.defer(),i=document.createElement("canvas"),j=document.createElement("img");return 0===c&&(c=j.width,d=j.height),j.onload=function(){try{var a=e(j.width,j.height,c,d);i.width=a.width,i.height=a.height;var b=i.getContext("2d");b.drawImage(j,0,0,a.width,a.height),h.resolve(i.toDataURL(g||"image/WebP",f||1))}catch(k){h.reject(k)}},j.onerror=function(){h.reject()},j.src=a,h.promise},g=function(a){for(var b=a.split(","),c=b[0].match(/:(.*?);/)[1],d=atob(b[1]),e=d.length,f=new Uint8Array(e);e--;)f[e]=d.charCodeAt(e);return new Blob([f],{type:c})};return d.isResizeSupported=function(){var a=document.createElement("canvas");return window.atob&&a.getContext&&a.getContext("2d")},d.resize=function(a,e,h,i){var j=b.defer();return 0!==a.type.indexOf("image")?(c(function(){j.resolve("Only images are allowed for resizing!")}),j.promise):(d.dataUrl(a,!0).then(function(b){f(b,e,h,i,a.type).then(function(b){var c=g(b);c.name=a.name,j.resolve(c)},function(){j.reject()})},function(){j.reject()}),j.promise)},d}]),function(){function a(a,c,d,e,f,g,h,i,j){function k(){return c.attr("disabled")||o("ngfDropDisabled",a)}function l(a,b,c,d){var e=o("ngfDragOverClass",a,{$event:c}),f="dragover";if(angular.isString(e))f=e;else if(e&&(e.delay&&(s=e.delay),e.accept||e.reject)){var g=c.dataTransfer.items;if(null!=g&&g.length)for(var h=e.pattern||o("ngfPattern",a,{$event:c}),j=g.length;j--;){if(!i.validatePattern(g[j],h)){f=e.reject;break}f=e.accept}else f=e.accept}d(f)}function m(a,b,c,d){function e(a,b,c){if(null!=b)if(b.isDirectory){var d=(c||"")+b.name;a.push({name:b.name,type:"directory",path:d});var f=b.createReader(),g=[];i++;var h=function(){f.readEntries(function(d){try{if(d.length)g=g.concat(Array.prototype.slice.call(d||[],0)),h();else{for(var f=0;f<g.length;f++)e(a,g[f],(c?c:"")+b.name+"/");i--}}catch(j){i--,console.error(j)}},function(){i--})};h()}else i++,b.file(function(b){try{i--,b.path=(c?c:"")+b.name,a.push(b)}catch(d){i--,console.error(d)}},function(){i--})}var f=[],i=0,j=a.dataTransfer.items;if(j&&j.length>0&&"file"!==h.protocol())for(var k=0;k<j.length;k++){if(j[k].webkitGetAsEntry&&j[k].webkitGetAsEntry()&&j[k].webkitGetAsEntry().isDirectory){var l=j[k].webkitGetAsEntry();if(l.isDirectory&&!c)continue;null!=l&&e(f,l)}else{var m=j[k].getAsFile();null!=m&&f.push(m)}if(!d&&f.length>0)break}else{var n=a.dataTransfer.files;if(null!=n)for(var o=0;o<n.length&&(f.push(n.item(o)),d||!(f.length>0));o++);}var p=0;!function q(a){g(function(){if(i)10*p++<2e4&&q(10);else{if(!d&&f.length>1){for(k=0;"directory"===f[k].type;)k++;f=[f[k]]}b(f)}},a||0)}()}var n=b(),o=function(a,b,c){return i.attrGetter(a,d,b,c)};if(o("dropAvailable")&&g(function(){a[o("dropAvailable")]?a[o("dropAvailable")].value=n:a[o("dropAvailable")]=n}),!n)return void(o("ngfHideOnDropNotAvailable",a)===!0&&c.css("display","none"));var p,q=null,r=f(o("ngfStopPropagation")),s=1;c[0].addEventListener("dragover",function(b){if(!k()){if(b.preventDefault(),r(a)&&b.stopPropagation(),navigator.userAgent.indexOf("Chrome")>-1){var e=b.dataTransfer.effectAllowed;b.dataTransfer.dropEffect="move"===e||"linkMove"===e?"move":"copy"}g.cancel(q),p||(p="C",l(a,d,b,function(a){p=a,c.addClass(p)}))}},!1),c[0].addEventListener("dragenter",function(b){k()||(b.preventDefault(),r(a)&&b.stopPropagation())},!1),c[0].addEventListener("dragleave",function(){k()||(q=g(function(){p&&c.removeClass(p),p=null},s||1))},!1),c[0].addEventListener("drop",function(b){if(!k()&&i.shouldUpdateOn("drop",d,a)){b.preventDefault(),r(a)&&b.stopPropagation(),p&&c.removeClass(p),p=null;var f=b.dataTransfer&&b.dataTransfer.getData&&b.dataTransfer.getData("text/html");if(f){var g;f.replace(/<img .*src *=\"([^\"]*)\"/,function(a,b){g=b}),g&&j({url:g,method:"get",responseType:"arraybuffer"}).then(function(c){var f=new Uint8Array(c.data),g=c.headers("content-type")||"image/jpg",h=new Blob([f],{type:g});i.updateModel(e,d,a,o("ngfChange")||o("ngfDrop"),[h],b)})}else m(b,function(c){i.updateModel(e,d,a,o("ngfChange")||o("ngfDrop"),c,b)},o("ngfAllowDir",a)!==!1,o("multiple")||o("ngfMultiple",a))}},!1),c[0].addEventListener("paste",function(b){if(!k()&&i.shouldUpdateOn("paste",d,a)){var c=[],f=b.clipboardData||b.originalEvent.clipboardData;if(f&&f.items){for(var g=0;g<f.items.length;g++)-1!==f.items[g].type.indexOf("image")&&c.push(f.items[g].getAsFile());i.updateModel(e,d,a,o("ngfChange")||o("ngfDrop"),c,b)}}},!1)}function b(){var a=document.createElement("div");return"draggable"in a&&"ondrop"in a&&!/Edge\/12./i.test(navigator.userAgent)}ngFileUpload.directive("ngfDrop",["$parse","$timeout","$location","Upload","$http",function(b,c,d,e,f){return{restrict:"AEC",require:"?ngModel",link:function(g,h,i,j){a(g,h,i,j,b,c,d,e,f)}}}]),ngFileUpload.directive("ngfNoFileDrop",function(){return function(a,c){b()&&c.css("display","none")}}),ngFileUpload.directive("ngfDropAvailable",["$parse","$timeout","Upload",function(a,c,d){return function(e,f,g){if(b()){var h=a(d.attrGetter("ngfDropAvailable",g));c(function(){h(e),h.assign&&h.assign(e,!0)})}}}])}();
/******************************************************************************
 * @description 
 * 
 *****************************************************************************/
(function(){
    angular
        .module('dySdk', 
            [
                'ngFileUpload'
            ]
        ).constant('baseApiUrl', "https://belerofonte.azurewebsites.net/");
})();
/*******************************************************************************
 * @description
 * https://docs.angularjs.org/api/ng/service/$http
 * Se inyecta en las `apps`, no en los `controllers` particulares
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('dyTokenInterceptor', factory);
    
    factory.$inject = ['$q', '$location', '$window'];
    
    function factory($q, $location, $window){
        return {
            'request': function(config){
                //https://docs.angularjs.org/api/ng/service/$http#usage
                //https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Requests_with_credentials
                //config.withCredentials = false
                config.headers = config.headers || {};
                if (
                    $window.localStorage.authToken 
                    && $window.localStorage.authToken !== "undefined"
                    && $window.localStorage.authToken !== "null"
                ) {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.authToken;
                }
                return config;
            },
            'response': function(response){
                switch (response.status) {
                    case 300:   //Multiple Choices
                    case 301:   //Moved Permanently
                        console.log("Successful API call. Redirecting.");
                        break;
                    case 200:   //OK
                    case 201:   //Created
                    case 204:   //No content
                        console.log("Successful API call.");
                        break;
                    default:
                        console.log("Successful API call.");
                        break;
                }
                return response;
            },
            //4xx y 5xx (no 3xx)
            'responseError': function(response){
                switch (response.status) {
                    case 401:   //Unauthorized 
                    case 403:   //Forbidden
                        console.log("Unsuccessful API call. Authentication/Authorization failed.");
                        break;
                    case 404:   //Not found
                        console.log("Unsuccessful API call. Document not found.");
                        break;
                    case 500:   //Not found
                        console.log("Unsuccessful API call. Internal server error.");
                        break;
                    default:
                        console.log("Unsuccessful API call.");
                        break;
                }
                
                /**
                 * Se devuelve el contenido de la respuesta(response.data), 
                 * que normalmente, por tratarse de una peticion erronea, 
                 * se habra implementado en el controller correspondiente 
                 * como un JSON con propiedades, entre otras, como 
                 * httpStatusCode, rejectionCode... lo que permite un 
                 * tratamiento granular de la Promise.
                 */
                response.data = response.data || {};    //prevents null if no content is returned
                return $q.reject(response.data);
            }
        };//END return
    }
})();
/*******************************************************************************
 * @description
 * Algunas convenciones: 
 * El valor devuelto por peticiones de informacion (que por lo mismo se apoyan
 * en `http request` de tipo GET) es logicamente un `object` con tal informacion
 * El valor devuelto por peticiones de eliminacion o actualizacion de un nodo 
 * (apoyadas en metodos PUT y DELETE) devuelven el _id del nodo eliminado 
 * o actualizado. 
 * El valor de peticiones que realizan agregacion de elementos a otros nodos
 * (usando POST por tanto) devuelven el valor del nodo creado.
 * El valor de peticones list* es un array de `ObjectIds`, es decir, los 
 * objetos a que representan no han sido `populados`. 
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y091
 * https://github.com/johnpapa/angular-styleguide#naming
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('Datary', factory);
    
    factory.$inject = ['$q', '$http', 'ConnectionService', 'searchFactory', 
                    'MemberService', 'RepoService', 'WorkingDirService', 
                    'CommitService', 'TreeService', 'DatasetService'];
    
    function factory($q, $http, ConnectionService, searchFactory, 
                    MemberService, RepoService, WorkingDirService,
                    CommitService, TreeService, DatasetService){
        return {
            connection: function(){
                return (new ConnectionService());
            },
            search: function(category, path, pattern, limit, offset){
                return searchFactory(category, path, pattern, limit, offset);
            },
            member: function(guid){
                return (new MemberService(guid));
            },
            repo:function(guid){
                return (new RepoService(guid));
            },
            workingDir: function(guid){
                return (new WorkingDirService(guid));
            },
            commit: function(guid, namespace){
                return (new CommitService(guid, namespace));
            },
            tree: function(guid, namespace){
                return (new TreeService(guid, namespace));
            },
            dataset: function(guid, namespace){
                return (new DatasetService(guid, namespace));
            }
        };
    }
})();
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('searchFactory', factory );
    
    factory.$inject = ['$q', '$http', 'baseApiUrl'];
    
    /**************************************************************
     * @description 
     * 
     * @param 
     * 
     * @return 
     */
    function factory($q, $http, baseApiUrl){
        return function(category, path, hint, limit, offset){
            /////// Defaults
            var CATEGORY = (category)? category.toString() : "members";
            var PATH = (path)? path.toString() : "username";
            var HINT = (hint)? hint.toString() : ".*";
            var LIMIT = (limit)? limit.toString() : "25";
            var OFFSET = (offset)? offset.toString() : "0";
            
            /////// Validacion
            
            /////// Request build
            var URI =  baseApiUrl + "search";
            URI += "/" + CATEGORY;
            URI += "?" + "path=" + PATH;
            URI += "&" + "hint=" + HINT;
            URI += "&" + "limit=" + LIMIT;
            URI += "&" + "offset=" + OFFSET;
            
            /////// Request
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        };
    }
})();
/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y024
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('ConnectionService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(){
            this.signUp = function(user){
                return signUp(user);
            };
            this.activate = function(credentials){
                return activate(credentials);
            };
            this.signIn = function(credentials){
                return signIn(credentials);
            };
            this.recover = function(email){
                return recover(email);
            };
            this.reset = function(credentials){
                return reset(credentials);
            };
            this.signOut = function(){
                return signOut();
            };
            this.signRequest = function(request){
                return signRequest(request);
            };
        };
        
        
        
        /**************************************************************
         * @name signUp
         * @type method
         * @description 
         * 
         * @param {Object} credentials:
         * 
         * @return 
         */
        function signUp(user){
            return (
                $http
                    .post(baseApiUrl + "connection/signUp", user)
                    .then( function(r){return (r.data) })
                    .catch( function(e){return $q.reject(e)} )
            );
        }
        
        
        /**************************************************************
         * @name activate
         * @type method
         * @description 
         * 
         * @param {Object} credentials:
         * 
         * @return 
         */
        function activate(credentials){
            return (
                $http
                    .post(baseApiUrl + "connection/activate", credentials)
                    .then( function(r){return (r.data)} )
                    .catch(function(e){return $q.reject(e)} )
            );
        }
        
        
        
        /**************************************************************
         * @name signIn
         * @type method
         * @description 
         * logueo todo el payload (data, status, headers, config)
         * 
         * @param {Object} credentials:
         * 
         * @return {promise}: 
         */
        function signIn(credentials){
            return (
                $http
                    .post(baseApiUrl + "connection/signIn", credentials)
                    .then(function(r){
                            var TOKEN = null;
                            //busco token en headers
                            if (r.headers('X-Set-Token')) {
                                TOKEN = r.headers('X-Set-Token');   //!!headers(..), no headers[..]
                                return TOKEN;
                            //busco token en el body
                            } else if (r.data && r.data.authToken) {
                                TOKEN = r.data.authToken;
                                return TOKEN;
                            } else {
                                console.log("Could not parse token from HTTP reponse.");
                                return $q.reject(e);
                            }
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @name recover
         * @type method
         * @description 
         * 
         * @param {String} email:
         * 
         * @return 
         */
        function recover(email){
            return (
                $http
                    .post(baseApiUrl + "connection/recover", {email: email})
                    .then( function(r){return (r.data)} )
                    .catch(function(e){return $q.reject(e)} )
            );
        }
        
        
        
        /**************************************************************
         * @name reset
         * @type method
         * @description 
         * 
         * @param {Object} credentials:
         * 
         * @return 
         */
        function reset(credentials){
            return (
                $http
                    .post(baseApiUrl + "connection/reset", credentials)
                    .then( function(r){return (r.data)} )
                    .catch(function(e){return $q.reject(e)} )
            );
        }
        
        
        
        /**************************************************************
         * @name signOut
         * @type method
         * @description 
         */
        function signOut(){
            return (
                $http
                    .get(baseApiUrl + "connection/signOut")
                    .then( function(r){return r.status} )
                    .catch( function(e){return $q.reject(e)} )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {Object} request:
         * provider: s3, catalyst
         * operation: retrieve, add 
         * 
         * @return 
         */
        function signRequest(request){
            var URI = baseApiUrl + "connection/signRequest";
            URI += "&operation=" + request.operation;
            URI += "&basename=" + request.basename;
            URI += "&contentType=" + request.contentType;
            return (
                $http
                    .get(URI)
                    .then(function(r){return (r.data)})
                    .catch(function(e){return $q.reject(e)})
            );
        }
    }
})();
/*******************************************************************************
 * @description
 * 
 * https://github.com/johnpapa/angular-styleguide#style-y024
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('MemberService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(guid){
            this.guid = guid;
            this.describe = function(){
                return describeMember(guid);
            };
            this.retrieveRepos = function(){
                return retrieveReposFromMember(guid);
            };
            this.retrieveDisclosedRepos = function(){
                return retrieveDisclosedReposFromMember(guid);
            };
            this.retrievePrivateRepos = function(){
                return retrievePrivateReposFromMember(guid);
            };
            this.retrieveActivity = function(){
                return retrieveActivityFromMember(guid);
            };
            this.retrievePublicActivity = function(){
                return retrievePublicActivityFromMember(guid);
            };
            this.retrieveSessions = function(){
                return retrieveSessionsFromMember(guid);
            };
            this.createRepo = function(repo){
                return createRepoForMember(repo, guid);
            };
            this.updateProfile = function(profile){
                return updateProfileOfMember(profile, guid);
            };
            this.changeUsername = function(username){
                return changeUsernameOfMember(username, guid);
            };
            this.changePassword = function(oldPassword, newPassword){
                return changePasswordOfMember(oldPassword, newPassword, guid);
            };
            this.remove = function(){
                return removeMember(guid);
            };
            this.removeSession = function(session){
                return removeSessionFromMember(session, guid);
            };
        };
        
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function describeMember(member){
            var URI = baseApiUrl + member;
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveReposFromMember(member){
            var URI = baseApiUrl + member + "/repos";
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos publicos y comerciales del
         * usuario a la API.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveDisclosedReposFromMember(member){
            var URI = baseApiUrl + member + "/disclosedRepos";
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos privados del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrievePrivateReposFromMember(member){
            var URI = baseApiUrl + member + "/privateRepos";
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos visibles del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveActivityFromMember(member){
            var URI = baseApiUrl + member + "/activity";
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos visibles del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrievePublicActivityFromMember(member){
            var URI = baseApiUrl + member + "/publicActivity";
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Realiza la peticion de los repos visibles del usuario a la
         * API, y se almacena en una variable.
         * 
         * @param 
         * 
         * @return 
         */
        function retrieveSessionsFromMember(member){
            var URI = baseApiUrl + member + "/sessions";
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function createRepoForMember(repo, member){
            var URI = baseApiUrl + member + '/repos';
            return  (
                $http
                    .post(URI, repo)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {Object} profile:
         * 
         * @return 
         */
        function updateProfileOfMember(profile, member){
            var URI = baseApiUrl + member;
            return (
                $http
                    .put(URI, profile)
                    .then(function(r){
                            return (r);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} username:
         * @param {ObjectId} user:
         * 
         * @return 
         */
        function changeUsernameOfMember(username, member){
            var URI = baseApiUrl + member + "/username";
            return (
                $http
                    .put(URI, member)
                    .then(function(r){
                            return (r);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} oldPassword:
         * @param {String} newPassword:
         * @param {ObjectId} user:
         * 
         * @return 
         */
        function changePasswordOfMember(oldPassword, newPassword, member){
            var URI = baseApiUrl + member + "/password";
            var BODY = {
                oldPassword: oldPassword,
                newPassword: newPassword,
            };
            
            return (
                $http
                    .put(URI, BODY)
                    .then(function(r){
                            return (r);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return {} devuelvo el _id del user eliminado 
         */
        function removeMember(member){
            var URI = baseApiUrl + member;
            return (
                $http
                    .delete(URI)
                    .then(function(r){
                            return (member);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /***********************************************************************
         * @description 
         * Realiza una peticion con un Array consistente en todos los JWT (en 
         * sentido estricto, sus codificaciones segun la norma de la ITF) que 
         * desean conservarse. Para ello genera una lista resultado de sustraer
         * de los token del usuario aquel que desea eliminarse y que le es 
         * pasado como argumento (identificado por su jti)
         * 
         * @param {String} session: jti representativo del JWT que desea eliminarse
         * 
         * 
         * @return {}:
         */
        function removeSessionFromMember(session, member){
            return (
                retrieveSessionsFromMember
                    .then(
                        function(result){
                            //indice de la session que desea eliminarse
                            var INDEX = result.map( function(e){return e.jti} ).indexOf(session);
                            //elimino la session correspondiente al jti
                            result.splice(INDEX, 1);
                            //genero el array de sessiones tal cual debe almacenarse
                            var ARR = result.map(function(e, i, a){return e.encoding;});
                            return ARR;
                        },
                        function(reason){
                            return ($q.reject(e));
                        }
                    ).then(
                        function(result){
                            var SESSIONS = result;
                            return ($http
                                        .put(baseApiUrl + member + "/sessions", SESSIONS)
                                        .then(
                                            function(result){
                                                return (result);
                                            },
                                            function(reason){
                                                return (reason);
                                            }
                                        )
                            );
                        }
                    )
            );
        }
    }
})();
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('RepoService', service );
    
    service.$inject = ['$q', '$http', 'baseApiUrl', 'WorkingDirService', 'CommitService'];
    
    function service($q, $http, baseApiUrl, WorkingDirService, CommitService){
        return function(guid){
            this.guid = guid;
            this.describe = function(){
                return describeRepo(guid);
            };
            this.retrieveWorkingDir = function(){
                return retrieveWorkingDirFromRepo(guid);
            };
            this.retrieveApexFiletree = function(){
                return retrieveApexFiletreeFromRepo(guid);
            };
            this.retrieveReadme = function(){
                return retrieveReadmeFromRepo(guid);
            };
            this.retrieveLicense = function(){
                return retrieveLicenseFromRepo(guid);
            };
            this.retrieveHeads = function(){
                return retrieveHeadsFromRepo(guid);
            };
            this.retrieveTags = function(){
                return retrieveTagsFromRepo(guid);
            };
            this.retrieveRefs = function(){
                return retrieveRefsFromRepo(guid);
            };
            this.retrieveObject = function(object, modifiers){
                return retrieveObjectFromRepo(object, guid, modifiers);
            };
            this.commitIndex = function(details){
                return commitIndexOnRepo(details, guid);
            };
            this.updateReadme = function(readme){
                return updateReadmeOfRepo(readme, guid);
            };
            this.updateDetails = function(details){
                return updateDetailsOfRepo(details, guid);
            };
            this.remove = function(){
                return removeRepo(guid);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return {}
         */
        function describeRepo(repo){
            return (
                $http
                    .get(baseApiUrl + repo)
                    .then(function(r) {
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * A tal fin se realizan las operaciones:
         * # Consulta la informacion del repositorio, entre la que 
         * se encuentra el campo `workingDir`, cuyo valor es el _id de 
         * dicho `workingDir`.
         * # Se lanza una consulta sobre el `workingDir` cuyo _id
         * se obtuvo en el paso anterior.
         * 
         * @return {Promise}: 
         */
        function retrieveWorkingDirFromRepo(repo){
            return (
                describeRepo(repo)
                    .then(function(r){
                            return ( new WorkingDirService(r.workingDir).describe() );
                        }
                    ).then(function(r){
                            return (r);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @name 
         * @description
         */
        function retrieveApexFiletreeFromRepo(repo){
            return ( 
                describeRepo(repo)
                    .then(function(r){
                            return ( new CommitService(r.apex.commit, repo).retrieveFiletree() );
                        }
                    ).then(function(r){
                            return (r); 
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `heads` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveReadmeFromRepo(repo){
            var URI = baseApiUrl + repo + '/readme';
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `heads` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveLicenseFromRepo(repo){
            var URI = baseApiUrl + repo + '/license';
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `heads` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveHeadsFromRepo(repo){
            var URI = baseApiUrl + repo + '/heads';
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `tags` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveTagsFromRepo(repo){
            var URI = baseApiUrl + repo + '/tags';
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de los `tags` de un repositorio 
         * a la API, y se almacena en una variable
         */
        function retrieveRefsFromRepo(repo){
            var URI = baseApiUrl + repo + '/refs';
            return (
                $http
                    .get(URI)
                    .then(
                        function(r){
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {Object} modifiers:
         * 
         * @return 
         */
        function retrieveObjectFromRepo(object, repo, modifiers){
            var URI =  baseApiUrl + object;
            if (repo || modifiers) { URI += "/?" }
            if (repo) { URI += "namespace=" + repo + "&"}
            if (modifiers) { for(var key in modifiers){URI += key + "=" + modifiers[key] +"&"} }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function commitIndexOnRepo(details, repo){
            var URI = baseApiUrl + repo + "/index";
            return (
                $http
                    .post(URI, details)
                    .then(function(r){
                            return (repo);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} readme: 
         * 
         * @return 
         */
        function updateReadmeOfRepo(readme, repo){
            var URI = baseApiUrl + repo + "/readme";
            return (
                $http
                    .put(URI, readme)
                    .then(function(r){
                            return (r);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return 
         */
        function updateDetailsOfRepo(details, repo){
            var URI = baseApiUrl + repo;
            return (
                $http
                    .put(URI, details)
                    .then(function(r){
                            return (repo);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param 
         * 
         * @return {} devuelvo el _id del repo 
         */
        function removeRepo(repo){
            var URI = baseApiUrl + repo;
            return (
                $http
                    .delete(URI)
                    .then(function(r){
                            return (repo);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('WorkingDirService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl', 'ConnectionService', 'Upload'];
    
    function service($q, $http, baseApiUrl, ConnectionService, Upload){
        return function(guid){
            this.guid = guid;
            this.describe = function (){
                return describeWorkingDir(guid);
            };
            this.listChanges = function (){
                return listChangesOnWorkinDir(guid);
            };
            this.retrieveFiletree = function (){
                return retrieveFiletreeOfWorkingDir(guid);
            };
            this.stageChange = function(change){
                return stageChangeOnWorkingDir(change, guid);
            };
            this.unstageChange = function(change){
                return unstageChangeFromWorkingDir(change, guid);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} workingDir: uuid del WorkingDir del que se 
         * solicita informacion
         * 
         * @return {} devuelvo un objeto con la info 
         */
        function describeWorkingDir(workingDir){
            return (
                $http
                    .get(baseApiUrl + workingDir)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return ($q.reject(e));
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} workingDir: uuid del WorkingDir del que se 
         * solicita informacion
         * 
         * @return {} devuelvo un objeto con la info 
         */
        function listChangesOnWorkinDir(workingDir){
            var URI = baseApiUrl + workingDir + "/changes";
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return ($q.reject(e));
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} workingDir: uuid del WorkingDir del que se 
         * solicita informacion
         * 
         * @return {} devuelvo un objeto con la info 
         */
        function retrieveFiletreeOfWorkingDir(workingDir){
            var URI = baseApiUrl + workingDir + "/filetree";
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return ($q.reject(e));
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * El tipo de cambio mas complejo operativamente es el 'add'. En 
         * estos supuestos, 
         * 
         * 
         * @param {Object} change: info sobre el cambio. Esta compuesto 
         * de las siguientes propiedades:
         * #action: ["add", "modify", "rename", "remove"]
         * #filtype: "file" o "folder"
         * #basename: nombre del fichero (no se permite al igual
         * que en Git, agregar una carpeta sin contenido). Esto es,
         * `pathname` == `dirname` + '/' + `basename`.
         * #dirname: directorio en que se guarda el archivo
         * #content: variable segun `action` y `filetype`.
         * En general, 
         * sera un String que contiene el dataset a almacenar. Es un 
         * String ya que es un objeto JSON serializado, !!!!! 
         * #pattern: ["dataset", "datainfo", "dataschema"]
         * @param {ObjectId} workingDir: _id del WorkingDir al que se 
         * agrega el change. 
         * 
         * @return {} devuelvo el _id de workingDir
         */
        function stageChangeOnWorkingDir(change, workingDir){
            var URI = baseApiUrl + workingDir + '/changes';
            
            //############ ADD
            var DATA_AS_OBJ = {};
            var DATA_AS_BUFFER;
            if (change.action === "add"){
                if (change.filemode === 40000) {
                    return (
                        $http
                            .post(URI, change)
                            .then(function(r){
                                    return (r);
                                }
                            ).catch(function(e){
                                    return $q.reject(e);
                                }
                            )
                    );
                } else if (typeof change.content === "object" && !(change.content instanceof File)) {
                    //no se require transformacion alguna
                    //sera el backend el que parsee lo stringified por angular http trasform
                    //http://www.bennadel.com/blog/2615-posting-form-data-with-http-in-angularjs.htm
                    return (
                        $http
                            .post(URI, change)
                            .then(function(result){
                                    return (result);
                                }
                            ).catch(function(reason){
                                    return $reject(reason);
                                }
                            )
                    );
                } else if (typeof change.content === "string") {
                    try {
                        DATA_AS_OBJ = JSON.parse(change.content);
                    } catch (e) {
                        return $q.reject(new Error("Imported file does not conforms to JSON format"));
                    }
                    change.content = DATA_AS_OBJ;
                    return (
                        $http
                            .post(URI, change)
                            .then(function(result){
                                    return (result);
                                }
                            ).catch(function(reason){
                                    return $reject(reason);
                                }
                            )
                    );
                } else if (typeof change.content === "object" && change.content instanceof File) {
                    /////// Parse and Upload to Datary
                    if (change.content.size < 10*1024*1024 ) {
                        var READER = new FileReader();
                        var DEFERRED = $q.defer();
                        //configuracion del Reader
                        READER.onload = function(){
                            DATA_AS_BUFFER = READER.result;
                            try {
                                DATA_AS_OBJ = JSON.parse(DATA_AS_BUFFER);
                            } catch (e) {
                                return DEFERRED.reject(new Error("Imported file does not conforms to JSON format"));
                            }
                            change.content = DATA_AS_OBJ;
                            ($http
                                .post(URI, change)
                                .then(function(result){
                                        DEFERRED.resolve(result.status);
                                    }
                                ).catch(function(reason){
                                        DEFERRED.reject(reason);
                                    }
                                )
                            );
                        };
                        //read in the dataset file as a text string.
                        READER.readAsText(change.content, "UTF-8");
                        //
                        return DEFERRED.promise;
                    /////// Direct Upload to Datary
                    } else {
                        return (
                            Upload
                                .upload(
                                    {
                                        method: 'POST',
                                        url: baseApiUrl + workingDir + '/changes',
                                        //headers: "",
                                        fields: {
                                            action: change.action,
                                            filetype: change.filetype,
                                            dirname: change.dirname,
                                            basename: change.basename,
                                            content: null,              //el content esta en file
                                            pattern: change.pattern
                                        },
                                        //!!!!IMPORTANTE
                                        file: change.content,           //es de tipo File
                                    }
                                )
                        );
                    
                    }//END (change.content.size)
                }//END (typeof change.content)
            
            
            
            //############ MODIFY, RENAME, DELETE
            } else {
                return (
                    $http
                        .post(URI, change)
                        .then(function(r){
                                return (r);
                            }
                        ).catch(function(e){
                                return $q.reject(e);
                            }
                        )
                );
            }//END (change.action)
        }//END stageChangeOnWorkingDir
        
        
        
        /***************************************************************
         * @description
         * Funcion que realiza la subida directa del `dataset` del 
         * `user` a AWS S3 sin pasar por el backend, para lo que 
         * requiere haber obtenido previamente una firma valida de 
         * dicha peticion, pues de otro modo AWS rechazaria la solicitud.
         * 
         * Upload.upload() carga a traves de `fields` datos complementarios 
         * que en un 'form' tradicional se corresponde con los inputs. Son 
         * datos exigidospor AWS
         * 
         * @vid http://aws.amazon.com/articles/1434/
         * @vid https://github.com/danialfarid/angular-file-upload [for more options (headers, withCredentials...)]
         * 
         * @param {File} file:
         */
        function uploadFileToS3(file){
            // Construccion de la `solicitud de firma`
            var REQUEST = {
                operation: "importFile",
                basename: file.name,
                contentType: (file.type === null || file.type === '')? 'application/octet-stream' : file.type,
            };
            
            // Firma y Subidas
            var CONNECTION = new ConnectionService();
            return (
                CONNECTION
                    .signRequest(REQUEST)
                    .then(function(result){
                            return (
                                //@vid 
                                Upload.upload(
                                    {
                                        method: 'POST',
                                        url: 'https://'+ result.bucket +'.s3.amazonaws.com/',
                                        //headers: "",
                                        fields: {
                                            key: result.key,                            //the key to store the file on S3
                                            AWSAccessKeyId: result.AwsAccessKeyId,
                                            acl: result.acl,
                                            policy: result.b64Policy,                   //base64-encoded json policy
                                            signature: result.signature,                //base64-encoded signature based on policy string
                                            'Content-Type': result.contentType,
                                        },
                                        file: file,
                                    }
                                )
                            );
                        }
                    ).catch(function(reason){
                            return reason;
                        }
                    )
            );
        }//END uploadFileToS3
        
        
        
        /***********************************************************************
         * @description
         * 
         * @param {ObjectId} change:
         * @param {ObjectId} workingDir:
         */
        function unstageChangeFromWorkingDir(change, workingDir){
            return (
                listChangesOnWorkinDir
                    .then(function(result){
                        }
                    ).catch(function(reason){
                        }
                    ).then(
                        function(result){
                            var CHANGES = result;
                            return ($http
                                        .put(baseApiUrl + workingDir + "/changes", CHANGES)
                                        .then(function(result){
                                                return (result);
                                            }
                                        ).catch(function(reason){
                                                return (reason);
                                            }
                                        )
                            );
                        }
                    )
            );
        }
    
    }
})();
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('CommitService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(guid, namespace){
            this.guid = guid;
            this.namespace = namespace;
            
            this.describeCommit = function(){
                return describeCommit(guid, namespace);
            };
            this.retrieveBranch = function(){
                return retrieveBranchFromCommit(guid, namespace);
            };
            this.retrieveFiletree = function(){
                return retrieveFiletreeFromCommit(guid, namespace);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * La llamada devuelve un objeto con la info de un commit, es
         * decir, con campos 
         * 
         * @param {String} tree: sha1 del commit que se consulta
         * 
         * @return {}:
         */
        function describeCommit(commit, namespace){
            var URI = baseApiUrl;
            URI += commit;
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http.get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         */
        function retrieveBranchFromCommit(commit, namespace){
            var URI = baseApiUrl;
            URI += commit + "/branch";
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * Se realiza la peticion de la info del `tree` correspondiente 
         * a un commit, y se almacena en una variable.
         * 
         * @return {} devuelvo la `info` del tree 
         */
        function retrieveFiletreeFromCommit(commit, namespace){
            var URI = baseApiUrl;
            URI += commit + "/filetree";
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('TreeService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(guid, namespace){
            this.guid = guid;
            this.namespace = namespace;
            
            this.describe = function(){
                return describeTree(guid, namespace);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * La llamada devuelve un objeto con la info de un tree, es
         * decir, con campos 
         * 
         * @param {String} tree: sha1 del tree que se consulta
         * 
         * @return {}:
         */
        function describeTree(tree, namespace){
            var URI = baseApiUrl + tree;
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();
/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .service('DatasetService', service);
    
    service.$inject = ['$q', '$http', 'baseApiUrl'];
    
    function service($q, $http, baseApiUrl){
        return function(guid, namespace){
            this.guid = guid;
            this.namespace = namespace;
            
            this.describe = function(){
                return describe(guid, namespace);
            };
            this.retrieveOriginal = function(){
                return retrieveOriginalFromDataset(guid, namespace);
            };
            this.retrievePreview = function(){
                return retrievePreviewFromDataset(guid, namespace);
            };
            this.retrieveSample = function(){
                return retrieveSampleFromDataset(guid, namespace);
            };
            this.retrieveMetadata = function(){
                return retrieveMetadataFromDataset(guid, namespace);
            };
            this.retrieveBlob = function(){
                return retrieveBlobFromDataset(guid, namespace);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} dataset: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function describe(dataset, namespace){
            var URI = baseApiUrl + dataset;
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} dataset: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrieveOriginalFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/original";
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} dataset: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrievePreviewFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/preview";
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} dataset: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrieveSampleFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/sample";
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} dataset: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrieveMetadataFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/metadata";
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} dataset: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrieveBlobFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/blob";
            if (namespace) { URI += "?namespace=" + namespace }
            
            return (
                $http
                    .get(URI)
                    .then(function(r){
                            return (r.data);
                        }
                    ).catch(function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();