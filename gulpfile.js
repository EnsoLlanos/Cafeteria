const { src, dest, watch,series } = require('gulp'); 
const sass =  require('gulp-sass')(require('sass')); 
const plumber = require('gulp-plumber'); 

//imagenes

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
 
function css(done) {     
    src('src/scss/**/*.scss')   // identificar el archivos de SASS         
        .pipe(plumber())         
        .pipe(sass()) // Compilarlo         
        .pipe(dest("build/css"))  // Almacenar en el disco duro     
    done(); // callback que avisa a gulp cuando lleguemos al final 
} 

function imagenes ( ){
    const opciones = {
        quality:50
    }
    return src('src/img/**/*')
        .pipe( imagemin( {optimizationLevel:3 }))
        .pipe( dest('build/img'));
}

function versionWebp () {
    const opciones = {
        quality:50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp() )
        .pipe( dest ('build/img') )

}

function versionAvif () {
    return src('src/img/**/*.{png,jpg}')
      .pipe ( avif() )
      .pipe ( dest ('build/img') )
}

function dev () {     
    watch("src/scss/**/*.scss", css);
    watch('src/img/**/*', imagenes);

    
} 
 
exports.css = css; 
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = series( imagenes, versionWebp, versionAvif, css, dev);

