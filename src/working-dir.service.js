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
         * El tipo de cambio mas complejo operativamente es el 'add'. En 
         * estos supuestos, 
         * 
         * 
         * @param {Object} change: info sobre el cambio. Esta compuesto 
         * de las siguientes propiedades:
         * #action: ["add", "modify", "rename", "remove"]
         * #filtype: "file" o "folder"
         * #basename: nombre del fichero (no se permite al igual
         * que en Git, agregar una carpeta sin contenido). Esto es,
         * `pathname` == `dirname` + '/' + `basename`.
         * #dirname: directorio en que se guarda el archivo
         * #content: variable segun `action` y `filetype`. En general, 
         * sera un String que contiene el dataset a almacenar. Es un 
         * String ya que es un objeto JSON serializado, !!!!! 
         * #pattern: ["dataset", "datainfo", "dataschema"]
         * @param {ObjectId} workingDir: _id del WorkingDir al que se 
         * agrega el change. 
         * 
         * @return {} devuelvo el _id de workingDir
         */
        function stageChangeOnWorkingDir(change, workingDir){
            
            //############ ADD
            if (change.add){
                if (typeof change.content !== "string"){
                    if (change.content.size < 3*1024*1024 ) {
                        var reader = new FileReader();
                        var $RAW_DATASET;               //dataset tras pasarle el `reader`
                        var $DATASET;                   //dataset formateado
                        
                        //----- Configuracion del Reader
                        reader.onload = function(e){
                            $RAW_DATASET = reader.result;
                            //parseo
                            try {
                                $DATASET = JSON.parse($RAW_DATASET);
                            } catch (e) {
                                alert("Imported file does not conforms to JSON format");
                                return;
                            }
                            //stringify
                            $_DATASET = JSON.stringify($_DATASET);
                            //stageChange
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
                        };
                        
                        //----- Read in the dataset file as a text string.
                        reader.readAsText(change.content, "UTF-8");
                        
                    
                    //----- Upload a Datary (si filesize > 1mb)
                    } else {
                        Upload
                            .upload(
                                {
                                    method: 'POST',
                                    url: dyBaseApiUrl + workingDir + '/changes',
                                    //headers: "",
                                    fields: {
                                        action: change.action,
                                        filetype: change.filetype,
                                        dirname: change.dirname,
                                        basename: change.basename,
                                        content: null,              //el content esta en file
                                        pattern: change.pattern
                                    },
                                    //!!!!IMPORTANTE
                                    file: change.content,           //es de tipo File
                                }
                            )
                            .progress(function(evt){
                                    console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
                                }
                            );
                    }
                }
            
            
            
            //############ MODIFY, RENAME, DELETE
            } else {
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
            }//END modify, rename, delete
            
        }
    }
})();
