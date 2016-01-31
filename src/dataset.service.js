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
        return function(guid){
            this.guid = guid;
            this.retrieveOriginal = function(){
                return retrieveOriginalFromDataset(guid);
            };
            this.retrievePreview = function(){
                return retrievePreviewFromDataset(guid);
            };
            this.retrieveSample = function(){
                return retrieveSampleFromDataset(guid);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {String} guid: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrieveOriginalFromDataset(guid){
            return (
                $http
                    .get(baseApiUrl + guid + '/original')
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
         * @param {String} guid: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrievePreviewFromDataset(guid){
            return (
                $http
                    .get(baseApiUrl + guid + '/preview')
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
         * @param {String} guid: sha1 del dataset que se consulta
         * 
         * @return {}:
         */
        function retrieveSampleFromDataset(guid){
            return (
                $http
                    .get(baseApiUrl + guid + '/sample')
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