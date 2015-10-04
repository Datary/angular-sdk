/*******************************************************************************
 * @description
 * 
 * 
 ******************************************************************************/
(function(){
    angular
        .module('dySdk')
        .factory('DyWorkingDirService', factory);
    
    factory.$inject = ['$q', '$http', 'dyBaseApiUrl', 'dyConnectionService', 'Upload'];
    
    function factory($q, $http, dyBaseApiUrl, dyConnectionService, Upload){
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
            if (change.action === "add"){
                if (typeof change.content !== "string"){
                    //----- Subida a S3
                    uploadFileToS3(change.content);
                    
                    //----- Parse and Upload to Datary
                    if (change.content.size < 3*1024*1024 ) {
                        var READER = new FileReader();
                        var $RAW_DATASET;               //dataset tras pasarle el `reader`
                        var $DATASET;                   //dataset formateado
                        
                        //----- Configuracion del Reader
                        READER.onload = function(e){
                            $RAW_DATASET = READER.result;
                            //parseo y stringify
                            try {
                                $DATASET = JSON.stringify(JSON.parse($RAW_DATASET));
                            } catch (e) {
                                alert("Imported file does not conforms to JSON format");
                                return;
                            }
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
                        READER.readAsText(change.content, "UTF-8");
                    
                    //----- Direct Upload to Datary
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
                    }//END (change.content.size)
                }//END (typeof change.content)
            
            
            
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
            }//END (change.action)
        }//END stageChangeOnWorkingDir
        
        
        
        /***************************************************************
         * @description
         * Funcion que realiza la subida directa del `dataset` del 
         * `user` a AWS S3 sin pasar por el backend, para lo que 
         * requiere haber obtenido previamente una firma valida de 
         * dicha peticion, pues de otro modo AWS rechazaria la solicitud.
         * 
         * @vid http://aws.amazon.com/articles/1434/
         * @vid https://github.com/danialfarid/angular-file-upload [for more options (headers, withCredentials...)]
         * 
         * @param {File} file:
         */
        function uploadFileToS3(file){
            //----- Construccion de la `solicitud de firma`
            var REQUEST = {
                operation: "importFile",
                basename: file.name,
                contentType: (file.type === null || file.type === '') ? 
                        'application/octet-stream' : 
                        file.type,
            };
            
            //----- Firma y Subidas
            var CONNECTION = new dyConnectionService();
            CONNECTION
                .signRequest(REQUEST)
                .then(
                    //
                    function(result){
                        return (
                            Upload
                                .upload(
                                    {
                                        method: 'POST',
                                        url: 'https://'+ result.bucket +'.s3.amazonaws.com/',
                                        //headers: "",
                                        /**datos complementarios que en un 'form' tradicional
                                         * se corresponde con los inputs. Son datos exigidos
                                         * por AWS*/
                                        fields: {
                                            key: result.key,                            //the key to store the file on S3
                                            AWSAccessKeyId: result.AwsAccessKeyId,
                                            acl: result.acl,
                                            policy: result.b64Policy,                   //base64-encoded json policy
                                            signature: result.signature,                //base64-encoded signature based on policy string
                                            'Content-Type': result.contentType,
                                        },
                                        file: file,
                                    }
                                )
                        );
                    },
                    //
                    function(reason){return reason;}
                );
        }//END uploadFileToS3
    
    }
})();