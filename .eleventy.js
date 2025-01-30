'use strict';

import htmlmin from 'html-minifier';

export default async function(eleventyConfig) {
    console.log('Running Eleventy config...');
    eleventyConfig.addPassthroughCopy({ 'images/output': 'images' });

    eleventyConfig.addPassthroughCopy({ 'images/svg': 'images' });

    eleventyConfig.addPassthroughCopy('fonts');

    eleventyConfig.addPassthroughCopy('favicon.*');

    eleventyConfig.addPassthroughCopy('robots.txt');
    
    eleventyConfig.addTransform('htmlmin', function(page, outputPath) {
        if(outputPath.endsWith('.html')) {
            const newContent = htmlmin.minify(page, {
                useShortDoctype: true,
                collapseWhitespace: true,
                preserveLineBreaks: true
            });
            return newContent;
        }
        return page;
    })

    return {
        dir: {
            input: 'pages',
            output: 'build',
            layouts: '../_layouts',
            includes: '../_includes'
        }
    };
}
