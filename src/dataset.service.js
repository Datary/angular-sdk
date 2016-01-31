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
        function retrieveOriginalFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/original";
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
        function retrievePreviewFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/preview";
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
        function retrieveSampleFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/sample";
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
        function retrieveMetadataFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/metadata";
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
        function retrieveBlobFromDataset(dataset, namespace){
            var URI = baseApiUrl + dataset + "/blob";
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