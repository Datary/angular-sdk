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
        ).constant('baseApiUrl', "https://datary-apiserver-rtm-us1-a.azurewebsites.net/");
})();