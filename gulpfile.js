/* gulpfile.js
 * Criado por Tommy Medeiros */

var cached        = require("gulp-cached"),
    cleanhtml     = require("gulp-cleanhtml"),
    coffee        = require("gulp-coffee"),
    concat        = require("gulp-concat"),
    ext           = require("gulp-ext"),
    ftp           = require("gulp-ftp"),
    gulp          = require("gulp"),
    gutil         = require("gulp-util"),
    haml          = require("gulp-ruby-haml"),
    imagemin      = require("gulp-imagemin"),
    livereload    = require("gulp-livereload"),
    plumber       = require("gulp-plumber"),
    sass          = require("gulp-ruby-sass"),
    uglify        = require("gulp-uglify"),
    path          = {
              haml: ["haml/componentes/_1_paragrafo.haml",
                     "haml/componentes/_2_paragrafos.haml",
                     "haml/componentes/_3_paragrafos.haml",
                     "haml/componentes/_galeria.haml",
                     "haml/componentes/_head.haml",
                     "haml/componentes/_informacoes.haml",
                     "haml/componentes/_links_artigos.haml",
                     "haml/componentes/_modal.haml",
                     "haml/componentes/_pesquisa.haml",
                     "haml/componentes/_scripts.haml",
                     "haml/componentes/_sidebar.haml",
                     "haml/404.haml",
                     "haml/artigo.haml",
                     "haml/index.haml",
                     "haml/resultados.haml",
                     "haml/resultados_cases.haml",
                     "haml/resultados_pesquisas.haml",
                     "haml/resultados_relatorios.haml",
                     "haml/trabalho.haml",
                     "haml/trabalho_dg.haml",
                     "haml/trabalho_di.haml",
                     "haml/trabalho_gestao.haml",
                     "haml/unite.haml",
                     "haml/unite_membro.haml",
                     "haml/unite_estrutura.haml",
                     "haml/unite_pessoas.haml"],
       componentes: [],
           paginas: [],
              sass: "sass/*",
      coffeeScript: "coffee_script/*",
         polyfills: ["scripts/html5shiv.js",
                     "scripts/respond.js"],
           scripts: ["scripts/jquery-2.1.1.js",
                     "scripts/jquery.scrollTo.js",
                     "scripts/classie.js",
                     "scripts/uisearch.js",
                     "scripts/holder.js",
                     "scripts/scripts.js"],
           imagens: ["imagens/*",
                     "imagens/**/*"],
             local: "D:/Bitnami WAMP Stack/apache2/htdocs/comunidade_colaborativa_unite",
               ftp: "/testes/comunidade_colaborativa_unite"
    },
    onError = function(err) {
      gutil.beep();
      console.log(err);
    },
    i = 0;

for (i; i <= 10; i++) {
  path.componentes.push(path.haml[i]);
}
for (i++; i < path.haml.length; i++) {
  path.paginas.push(path.haml[i]);
}

// Compila o Haml e otimiza o PHP dos componentes
gulp.task("componentes", function() {
  return gulp.src(path.componentes)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cached("gulp_cache"))
    .pipe(haml({
      doubleQuote: true}))
    .pipe(cleanhtml())
    .pipe(ext.replace("php"))
    .pipe(gulp.dest(path.local + "/componentes"))
    .pipe(ftp({
      host: "moodle.bhe.serpro",
      user: "05154604601",
      pass: "05154604601",
      remotePath: path.ftp + "/componentes"
    }));
});

// Compila o Haml e otimiza o PHP das paginas
gulp.task("paginas", ["componentes"], function() {
  return gulp.src(path.paginas)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cached("gulp_cache"))
    .pipe(haml({
      doubleQuote: true}))
    .pipe(cleanhtml())
    .pipe(ext.replace("php"))
    .pipe(gulp.dest(path.local))
    .pipe(livereload())
    .pipe(ftp({
      host: "moodle.bhe.serpro",
      user: "05154604601",
      pass: "05154604601",
      remotePath: path.ftp
    }));
});

// Compila o Sass e otimiza as folhas de estilo
gulp.task("sass", ["paginas"],function() {
  return gulp.src(path.sass)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cached("gulp_cache"))
    .pipe(sass({
      cacheLocation: "sass_cache",
      style: "compressed",
      trace: true
    }))
    .pipe(concat("estilos.min.css"))
    .pipe(gulp.dest(path.local + "/estilos"))
    .pipe(livereload())
    .pipe(ftp({
      host: "moodle.bhe.serpro",
      user: "05154604601",
      pass: "05154604601",
      remotePath: path.ftp + "/estilos"
    }));
});

// Compila o CoffeeScript
gulp.task("coffeeScript", ["sass"], function() {
  return gulp.src(path.coffeeScript)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cached("gulp_cache"))
    .pipe(coffee({
      bare: true
    }))
    .pipe(gulp.dest("scripts"));
});

// Otimizacao os polyfills
gulp.task("polyfills", ["coffeeScript"], function() {
  return gulp.src(path.polyfills)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(uglify())
    .pipe(concat("polyfills.min.js"))
    .pipe(gulp.dest(path.local + "/scripts"))
    .pipe(livereload())
    .pipe(ftp({
      host: "moodle.bhe.serpro",
      user: "05154604601",
      pass: "05154604601",
      remotePath: path.ftp + "/scripts"
    }));
});

// Otimiza os scripts
gulp.task("scripts", ["coffeeScript"],function() {
  return gulp.src(path.scripts)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(uglify())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest(path.local + "/scripts"))
    .pipe(livereload())
    .pipe(ftp({
      host: "moodle.bhe.serpro",
      user: "05154604601",
      pass: "05154604601",
      remotePath: path.ftp + "/scripts"
    }));
});

// Otimiza as imagens
gulp.task("imagens", ["scripts"],function() {
  return gulp.src(path.imagens)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cached("gulp_cache"))
    .pipe(imagemin())
    .pipe(gulp.dest(path.local + "/imagens"))
    .pipe(livereload())
    .pipe(ftp({
     host: "moodle.bhe.serpro",
     user: "05154604601",
     pass: "05154604601",
     remotePath: path.ftp + "/imagens"
    }));
});

// Observa alteracoes e roda tarefas
gulp.task("watch", ["componentes",
                    "paginas",
                    "sass",
                    "coffeeScript",
                    "polyfills",
                    "scripts",
                    "imagens"],
  function() {
    gulp.watch(path.componentes, ["componentes"]);
    gulp.watch(path.paginas, ["paginas"]);
    gulp.watch(path.sass, ["sass"]);
    gulp.watch(path.coffeeScript, ["coffeeScript"]);
    gulp.watch(path.polyfills, ["polyfills"]);
    gulp.watch(path.scripts, ["scripts"]);
    gulp.watch(path.imagens, ["imagens"]);
  }
);

// Tarefa padrao
gulp.task("default", ["componentes",
                      "paginas",
                      "sass",
                      "coffeeScript",
                      "polyfills",
                      "scripts",
                      "imagens",
                      "watch"]);
