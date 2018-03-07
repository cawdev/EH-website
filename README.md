# Escape Hatch Website

## Local Development

After cloning the repository, run `npm install` to gather your dependencies. 

Within the projects root directory, run `gulp watch`. 

This task will `watch` for changes to your `css/*.css` and `js/*.js` files within the these directories. Any change to these files will automatically run the minfication and concatenation tasks.

All changes to the to unminified CSS files will be minified and concatenated to `style.min.css` file. 

All changes to the unminifed JS files will be minified and concatenated to the `scripts.min.js` file.