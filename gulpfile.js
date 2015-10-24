/******************************************************************************
 * This file is used to build dySDK from `src/*`
 *
 * Installation:
 * 1. Install Gulp (`npm install -g gulp`)
 *
 * Build:
 * Execute `grunt` from root directory of this directory (where gulpfile.js is)
 *
 * Result:
 * building dySDK will create files:
 *  - dist/dySDK.js
 *  - dist/dySDK.min.js
 *
 * See http://
 ******************************************************************************/
var gulp            = require('gulp')
,   argv            = require('yargs').argv
,   jshint          = require('gulp-jshint')
,   concat          = require('gulp-concat')
,   uglify          = require('gulp-uglify')
,   fs              = require('fs')
,   AWS             = require('aws-sdk')
;



//############ CONFIG
//http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Disk
AWS.config.loadFromPath('./.awsrc');
AWS.config.update({region: 'us-west-2'});
var $SRC_FILES = ["src/*.js"];
//ficheros ordenados 
var $ORD_SRC_FILES = [
    "src/dy-sdk.module.js",
    "src/token-interceptor.service.js",
    "src/datary.service.js",
    "src/search.service.js",
    "src/connection.service.js",
    "src/member.service.js",
    "src/repo.service.js",
    "src/working-dir.service.js",
    "src/commit.service.js",
    "src/tree.service.js",
    "src/lump.service.js",
    "src/tag.service.js",
    "src/head.service.js",
];
var $ORD_DEP_FILES = [
    "bower_packages/ng-file-upload/ng-file-upload.min.js",
];
var $ORD_ALL = $ORD_DEP_FILES.concat($ORD_SRC_FILES);
var $DIST_FOLDER = "./dist/";



//############ TASKS
/******************************************************************************
* @name lint
* @type task
* @description
*/
gulp
    .task(
        'lint', 
        [],
        function(){
            console.log("@@@ Running Lint Task @@@");
            gulp
                .src($SRC_FILES)
                .pipe(jshint("./.jshintrc"))
                .pipe(jshint.reporter('default'));
        }//END task lint
);



/******************************************************************************
* @name distify
* @type task
* @description
* Conjunto de actividades destinadas a preparar los archivos para un entorno 
* de produccion; es decir, a crear las versiones `dist` de los archivos usados 
* en la aplicacion. 
*/
gulp
    .task(
        'distify', 
        [],
        function(){
            console.log("@@@ Running Distify task @@@");
            
            //----- concateno los components del modulo y minifico
            try {
                gulp
                    .src($ORD_ALL)
                    //.pipe(concat("dy-sdk-angular.min.js"))
                    //.pipe(uglify())
                    .pipe(concat("dy-angular-sdk.js"))
                    .pipe(
                        gulp.dest($DIST_FOLDER)
                    );
            } catch(err) {
                throw new Error("Error on @Vanilla JS");
            }
        }
    );



/******************************************************************************
* @name publish
* @type task
* @description
*/
gulp
    .task(
        'publish', 
        [],
        function(){
            console.log("@@@ Running Publish task @@@");
            var $VERSION;
            
            //version de la release
            if (!argv["version"]) {
                $VERSION = require("./package.json").version;
                console.log("Using package version: %s", $VERSION);
            } else {
                $VERSION = argv["version"];
                console.log("Using specified version: %s", $VERSION);
            }
            
            //AWS configuration
            var s3 = new AWS.S3();
            var $PARAMS = {
                Bucket: "datary-media-rtm-us2-a",
                ACL: "public-read",
                Key: "libs/dy-angular-sdk/" + $VERSION + "/dy-angular-sdk.js",
                Body: null,
            };
            
            // Read in the file, convert it to base64, store to S3
            fs.readFile('./dist/dy-angular-sdk.js', function (err, data) {
                    if (err) { throw err; }
                    //creo un buffer
                    var $B64_DATA = new Buffer(data, 'binary');
                    //configuro los params con el buffer
                    $PARAMS.Body = $B64_DATA;
                    //envio la peticion
                    s3.putObject($PARAMS, function(err, data) {
                            if (err) {
                                console.log(err, err.stack); // an error occurred
                            } else {
                                console.log(data);           // successful response
                            }
                        }
                    );
                }
            );
        }
    );