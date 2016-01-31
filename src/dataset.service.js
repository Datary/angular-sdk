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
            
            this.retrieveOriginal = function(){
                return retrieveOriginalFromDataset(guid, namespace);
            };
            this.retrievePreview = function(){
                return retrievePreviewFromDataset(guid, namespace);
            };
            this.retrieveSample = function(){
                return retrieveSampleFromDataset(guid, namespace);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} dataset: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrieveOriginalFromDataset(dataset){
            var URI = baseApiUrl;
            URI += dataset + "/original";
            if (namespace) { URI += "?namespace=" + namespace }
            
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
         * @param {String} dataset: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrievePreviewFromDataset(dataset){
            var URI = baseApiUrl;
            URI += dataset + "/preview";
            if (namespace) { URI += "?namespace=" + namespace }
            
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
         * @param {String} dataset: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrieveSampleFromDataset(dataset){
            var URI = baseApiUrl;
            URI += dataset + "/sample";
            if (namespace) { URI += "?namespace=" + namespace }
            
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
    }
})();