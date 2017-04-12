var gulp = require("gulp");
var less = require("gulp-less");
var cssmin = require("gulp-cssmin");
var autoprefixer = require("gulp-autoprefixer");
var rev = require("gulp-rev");
var rename  =require("gulp-rename");
var imagemin = require("gulp-imagemin");
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var gulpif = require("gulp-if");
var htmlmin = require("gulp-htmlmin");
var collector = require("gulp-rev-collector");
var base64 = require("gulp-base64");

//处理css
gulp.task("css",function(){
	return gulp.src("./public/less/main.less")
	.pipe(less())
	.pipe(autoprefixer())
	.pipe(cssmin())
	.pipe(base64())//将图片地址进行解析
	.pipe(rev())
	.pipe(gulp.dest("./release/public/css"))
	.pipe(rev.manifest())
	.pipe(rename("css-manifest.json"))
	.pipe(gulp.dest("./release/rev"))
});

//处理图片
gulp.task("image",function(){
	return gulp.src(["./public/images/**/*","./uploads/*"],{base:"./"})
	.pipe(imagemin())
	.pipe(rev())
	.pipe(gulp.dest("./release"))
	.pipe(rev.manifest())
	.pipe(rename("image-manifest.json"))
	.pipe(gulp.dest("./release/rev"))
});

//处理js
gulp.task("useref",function(){
	return gulp.src("./index.html")
	.pipe(useref())
	.pipe(gulpif("*.js",uglify()))
	.pipe(gulpif("*.js",rev()))
	.pipe(gulp.dest("./release"))
	.pipe(rev.manifest())
	.pipe(rename("js-manifest.json"))
	.pipe(gulp.dest("./release/rev"))
});

//处理html
gulp.task("html",function(){
	gulp.src("./views/*.html")
	.pipe(htmlmin({
		collapseWhitespace:true
	}))
	.pipe(gulp.dest("./release/views"))
});

//其他
gulp.task("other",function(){
	gulp.src(["./api/*.php","./public/fonts/*","./favicon.ico"],{base:"./"})
	.pipe(gulp.dest("./release"));
});

//替换路径
gulp.task("rev",["css","useref","image"],function(){
	gulp.src(["./release/rev/*.json","./release/index.html"])
	.pipe(collector())
	.pipe(gulp.dest("./release"));

});

gulp.task("release",["rev","other","html"]);

