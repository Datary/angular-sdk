/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyWorkingDirService', factory);
    
    factory.$inject = ['$q', '$http', 'dyBaseApiUrl'];
    
    function factory($q, $http, dyBaseApiUrl){
        return function(id){
            this._id = id;
            this.describe = function (){
                return describeWorkingDir(id);
            };
            this.stageChange = function(change){
                return stageChangeOnWorkingDir(change, id);
            };
        };
        
        
        
        /**************************************************************
         * @description 
         * 
         * @param {ObjectId} workingDir: _id del WorkingDir del que se 
         * solicita informacion
         * 
         * @return {} devuelvo un objeto con la info 
         */
        function describeWorkingDir(workingDir){
            return (
                $http
                    .get(dyBaseApiUrl + workingDir)
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
         * @param {Object} change: info sobre el cambio. Esta compuesto 
         * de las siguientes propiedades:
         *  #action: ["add", "modify", "rename", "remove"]
         *  #filtype: "file" o "folder"
         *  #basename: nombre del fichero (no se permite al igual
         * que en Git, agregar una carpeta sin contenido). Esto es,
         * `pathname` == `dirname` + '/' + `basename`.
         *  #dirname: directorio en que se guarda el archivo
         *  #content: variable segun `action` y `filetype`. En general, 
         * sera un String que contiene el dataset a almacenar. Es un 
         * String ya que es un objeto JSON serializado, !!!!! 
         *  #pattern: ["dataset", "datainfo", "dataschema"]
         * @param {ObjectId} workingDir: _id del WorkingDir al que se 
         * agrega el change. 
         * 
         * @return {} devuelvo el _id de workingDir
         */
        function stageChangeOnWorkingDir(change, workingDir){
            return (
                $http
                    .post(dyBaseApiUrl + workingDir + '/changes', change)
                    .then(
                        function(r){
                            return (r.status);
                        },
                        function(e){
                            return $q.reject(e);
                        }
                    )
            );
        }
    }
})();
