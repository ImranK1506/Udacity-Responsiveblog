/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
        dev: {
          options: {
          engine: 'gm',   // GraphicsMagick
            sizes: [{
            width: '1600',
            suffix: '_large_2x',
            quality: 30
          }, {
            width: '800',
            suffix: '_large_1x',
            quality: 60
          }, {
            width: '1000',
            suffix: '_medium_2x',
            quality: 30
          }, {
            width: '500',
            suffix: '_medium_1x',
            quality: 60
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images', 'images_src/fixed'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* concat */
    concat: {
        dist: {
          files: {
          'js/concat.js': '*.js'      // destination: source
        }
      }
    },

    /* Grunticon */
    grunticon: {
      myIcons: {
        files: [{
          expand: true,
          src: ['*.svg', '*.png'],
          cwd: 'images/svg/svg_in',
          dest: 'images/svg/svg_out'
        }],
        options: {
          loadersnippet: 'grunticon.loader.js',
        }
      }
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'images_src/fixed/*.{gif,jpg,png}',
          dest: 'images/'
        }]
      },
    },
  });
  
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'clean',
    'mkdir',
    'copy',
    'responsive_images',
    'concat',
    'grunticon:myIcons'
  ]);
};
