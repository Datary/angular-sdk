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