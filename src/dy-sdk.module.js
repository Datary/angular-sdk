/******************************************************************************
 * @description 
 * 
 *****************************************************************************/
(function(){
	var DEPENDENCIES = ['ngFileUpload'];
    angular.module('dy.sdk', DEPENDENCIES)
        .constant('baseApiUrl', "https://api.datary.io/");
})();