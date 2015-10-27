/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyLumpService', service);
    
    service.$inject = ['$q', '$http', 'dyBaseApiUrl'];
    
    function service($q, $http, dyBaseApiUrl){
        return function(id){
            this._id = id;
            this.retrievePreview = function(){
                return retrievePreviewFromLump(id);
            };
            this.retrieveExtract = function(){
                return retrieveExtractFromLump(id);
            };
            this.retrieveOriginal = function(){
                return retrieveOriginalFromLump(id);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {ObjectId} lump: _id del lump que se consulta
         * 
         * @return {}:
         */
        function retrieveContentPreviewFromLump(lump){
            return (
                $http
                    .get(dyBaseApiUrl + lump + '/preview')
                    .then(
                        function(r){
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {ObjectId} lump: _id del lump que se consulta
         * 
         * @return {}:
         */
        function retrieveContentExtractFromLump(lump){
            return (
                $http
                    .get(dyBaseApiUrl + lump + '/extract')
                    .then(
                        function(r){
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {ObjectId} lump: _id del lump que se consulta
         * 
         * @return {}:
         */
        function retrieveOriginalFromLump(lump){
            return (
                $http
                    .get(dyBaseApiUrl + lump + '/original')
                    .then(
                        function(r){
                            return (r.data);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
    }
})();