/**
 *
 * files:{
 *    expend:true,  boolean 是否动态处理src和desc之间的映射
 *    cwd:'path',  源文件路径
 *    src:'filename',  对应文件名 支持array 如['file1.css','file2.css']
 *    desc:'exportFile',	导出文件夹
 *    ext:'fileFormate',	导出文件格式，如.css .min.css
 *    extDot:'first',		从何处开始执行,如index.pak.html 填写first时以上demo执行出的是index.html  value:first;last
 * }
 */
'use strict';
module.exports=function(grunt){
  grunt.initConfig({
      pkg:grunt.file.readJSON('package.json'),
      clean: {
        target:{
            src:'build'
        },
        remove:{
            src:'build/babel'
        }
      },
      copy:{
        target:{
            files:[{
                expand:true,
                cwd:'turntable/',
                src:['**','!**/*.js','!**/*.css','!**/*.png','!**/*.jpg','!**/*.jpeg'],
                dest:'build/',
                flatten:false,    //是否重置目录结构
                filter:'isFile'
            }]
        }
      },
      babel: {
          options: {
              sourceMap: false,
              presets: ['babel-preset-es2015']

          },
          target: {
              files: [{
                  expand:true,
                  cwd:'turntable/js', //js目录下
                  src:['*.js'], //所有js文件
                  dest:'build/babel/'  //输出到此目录下
              }]
          }
      },
      uglify: {
        target:{
	   options:{
              mangle: true, //混淆变量名
              comments: true //false（删除全部注释），some（保留@preserve @license @cc_on等注释）
          },
          files:[{
              expand:true,
              cwd:'build/babel',
              src:['*.js'],
              dest:'build/js/',
              ext:'.min.js',
              // rename:function (dst,src) {
              //     return dst + '/' + src.replace('.js', '.min.js');
              //     // return src;
              // }
          }]
        },
        areaTest:{
	  options:{
	      	mangle: true, //混淆变量名
              	comments: 'false' //false（删除全部注释），some（保留@preserve @license @cc_on等注释）
	      },
	      files:[{
              expand:true,
              cwd:'turntable',
              src:['*.js'],
              dest:'build/js/',
              ext:'.js',
              // rename:function (dst,src) {
              //     return dst + '/' + src.replace('.js', '.min.js');
              //     // return src;
              // }
          }]
		}
      },

      cssmin:{
        target:{
          files:{
            'build/css/main.min.css':['turntable/css/*.min.css']
          }
        }
      },
      imagemin: {
        target:{
          options:{
              optimizationLevel:3	//png图片优化水平
          },
          files:[{
              expand:true,
              cwd:'turntable/img',
              src:['**/*.png','**/*.jpg','**/*.jpeg'],
              dest:'build/img'
          }]
        }
      },
      htmlmin: {
        target:{
          options:{
              removeComments:true,  //移除代码注释
              collapseWhitespace:true  //删除空格
          },
          files:[{
              expand:true,
              cwd:'template/',
              src:['**/*.htm'],
              dest:'build/template',
              ext:'.htm',
          }]
        }
      },
      webfont:{

      }
  });
  // 加载提供"uglify"任务的插件
  //   npm install grunt-contrib-clean --save
    grunt.loadNpmTasks('grunt-contrib-clean');
    // npm install grunt-contrib-copy --save
    grunt.loadNpmTasks('grunt-contrib-copy');
	// npm install grunt-babel --save
    // npm install babel-core --save
    // npm install babel-preset-es2015 --save
    grunt.loadNpmTasks('grunt-babel');
    // npm install grunt-contrib-uglify --save
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // npm install grunt-contrib-concat --save
    grunt.loadNpmTasks('grunt-contrib-concat');
    // npm install grunt-contrib-cssmin --save
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // npm install grunt-contrib-htmlmin --save
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // npm install grunt-contrib-imagemin --save
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // npm install grunt-contrib-watch --save
    grunt.loadNpmTasks('grunt-contrib-watch');
	
    //https://www.npmjs.com/package/grunt-webfont
    //npm install grunt-webfont --save-dev
    //Then install ttfautohint (optional).
    //Then install fontforge.
    //Add C:\Program Files (x86)\FontForgeBuilds\bin to system PATH
    // grunt.loadNpmTasks('grunt-webfont');
	
	
    grunt.registerTask('default',['clean:target','copy:target','babel:target' ,'uglify:target','cssmin:target','imagemin:target','htmlmin:target','clean:remove'])
    //grunt.registerTask('default',['uglify:target'])
}
