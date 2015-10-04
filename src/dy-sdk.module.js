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
        ).constant('dyBaseApiUrl', "https://datary-apiserver-rtm-us1-a.azurewebsites.net/");
})();