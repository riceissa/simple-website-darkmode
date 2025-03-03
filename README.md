# Simple Website Darkmode

[Demo](https://riceissa.github.io/simple-website-darkmode/)

To use Simple Website Darkmode on your website, follow the steps:

1. In your CSS, define all of your colors using
   [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark).

   Your CSS should probably start with the following:

   ```css
   :root {
       color-scheme: light dark;
   }
   ```

   The reason is that if the user has JavaScript disabled, then `darkmode.js`
   will never run, so the site will by default just use light mode. But if your
   CSS contains the above, then site will be in "auto" mode, so that even
   though the user won't be able to set a _site-specific_ color preference,
   they can still set a browser/OS-specific color preference, and the site will
   just use that preference.

   See [`style.css`](docs/style.css) for an example of what your CSS will look
   like.

2. Serve the [`darkmode.js`](docs/darkmode.js) script from your site ([raw download link](https://raw.githubusercontent.com/riceissa/simple-website-darkmode/refs/heads/master/docs/darkmode.js)). Below, we will assume it exists at `./darkmode.js`.

3. In your HTML, make the following changes:

   In the `<head>` tag, add the following line (change `./darkmode.js` to
   wherever the script is located on your site):

   ```html
   <script src="./darkmode.js"></script>
   ```

   Early in the `<body>` tag (e.g. immediately after it opens), add the
   following two lines:

   ```html
   <div id="darkmode-menu"></div>
   <script>darkmode.initialize();</script>
   ```

   The `<div>` tag must come before the `<script>` tag. Wherever you add the
   `<div>` tag is where the color scheme changing menu appears.

   See [`index.html`](docs/index.html) for an example of what your HTML will
   look like.

See the [demo](https://riceissa.github.io/simple-website-darkmode/) for what
the end result will look like.
