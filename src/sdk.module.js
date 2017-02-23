/******************************************************************************
 * @description 
 * 
 *****************************************************************************/
(function(){
	var DEPENDENCIES = ['ngFileUpload'];
	
    angular.module('dy.sdk', DEPENDENCIES)
        .constant('dy.sdk.baseApiUrl', "https://api.datary.io/");
})();