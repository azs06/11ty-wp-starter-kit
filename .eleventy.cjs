'use strict';

const htmlmin = require('html-minifier');
module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksShortcode('access', function(array, index) {
        return array[index];
    });
    eleventyConfig.addNunjucksFilter( 'json', function ( value ) {
        let str = JSON.stringify(value)
        return str?.replace(/(<svg.*?<\/svg>)/g,"raw svg load from db")
    } )

    eleventyConfig.addPassthroughCopy('videos');
    
    eleventyConfig.addPassthroughCopy({ 'images/output': 'images' });

    eleventyConfig.addPassthroughCopy({ 'images/svg': 'images' });

    eleventyConfig.addPassthroughCopy('fonts');

    eleventyConfig.addPassthroughCopy('favicon.*');

    eleventyConfig.addPassthroughCopy('robots.txt');
    
    eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
        if(outputPath.endsWith('.html')) {
            const newContent = htmlmin.minify(content, {
                useShortDoctype: true,
                collapseWhitespace: true,
                preserveLineBreaks: true
            });
            return newContent;
        }
        return content;
    })

    return {
        dir: {
            output: 'build',
            input: 'pages',
            layouts: '_layouts',
            includes: '_includes'
        }
    };
}
