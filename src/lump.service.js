/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyLumpService', service);
    
    service.$inject = ['$q', '$http'];
    
    function service($q, $http){
        return function(id){
            this._id = id;
            this.retrieveContentPreview = function(){
                return retrieveContentPreviewFromLump(id);
            };
            this.retrieveContentExtract = function(){
                return retrieveContentExtractFromLump(id);
            };
            this.retrieveContentWhole = function(){
                return retrieveContentWholeFromLump(id);
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
                    .get('//api.datary.io/' + lump + 'preview')
                    .then(
                        function(r){
                            //console.log("eoeoeo 33",r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
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
                    .get('//api.datary.io/' + lump + '/extract')
                    .then(
                        function(r){
                            //console.log("eoeoeo 13", r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
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
        function retrieveContentWholeFromLump(lump){
            return (
                $http
                    .get('//api.datary.io/' + lump + '/whole')
                    .then(
                        function(r){
                            //console.log("eoeoeo 31", r);
                            return (r.data);
                        },
                        function(e){
                            //console.log("eoeoeo 89", e);
                            return $q.reject(e);
                        }
                    )
            );//END return
        }
    }
})();
