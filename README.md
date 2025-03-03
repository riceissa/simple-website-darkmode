# Simple Website Darkmode

[Demo](https://riceissa.github.io/simple-website-darkmode/)

To use Simple Website Darkmode on your website, follow the steps:

1. In your CSS, define all of your colors using [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark). You do not need to write `:root { color-scheme: light dark; }` in your CSS; the `darkmode.js` script takes care of that for you. See [`style.css`](docs/style.css) for an example of what your CSS will look like.

2. Serve the [`darkmode.js`](docs/darkmode.js) script from your site. Below, we will assume it exists at `./darkmode.js`.

3. In your HTML, make the following changes:

   In the `<head>` tag, add the following line (change `./darkmode.js` to wherever the script is located on your site):

   ```html
   <script src="./darkmode.js"></script>
   ```

   Early in the `<body>` tag (e.g. immediately after it opens), add the following two lines:

   ```html
   <div id="darkmode-menu"></div>
   <script>darkmode.initialize();</script>
   ```

   Wherever you add the `<div>` tag is where the color scheme changing menu appears.

   See [`index.html`](docs/index.html) for an example of what your HTML will look like.
