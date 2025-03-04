# Simple Website Darkmode

## Basic setup

Near the end of your `<head>` tag (in particular, after any of your own CSS),
add the following two lines:

```html
<script src="https://cdn.jsdelivr.net/gh/riceissa/simple-website-darkmode@latest/docs/darkmode.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/riceissa/simple-website-darkmode@latest/docs/darkmode-overrides.css">
```

Early in the `<body>` tag (e.g. immediately after it opens), add the following
two lines:

```html
<div id="darkmode-menu"></div>
<script>darkmode.initialize();</script>
```

That's it! This basic setup will only work for simple websites that don't use a
lot of styling/custom classes. If this basic setup doesn't produce the result
you want, then move onto the more advanced setup below.

## More advanced setup (if the basic setup doesn't fit your needs)

[Demo](https://riceissa.github.io/simple-website-darkmode/)

To use Simple Website Darkmode on your website, follow the steps:

1. For defining your darkmode color scheme, you have two choices.

   Option A: In your CSS, you can define all of your colors using
   [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark). Your CSS will look like:

   ```css
   a:link { color: light-dark(rgb(0, 102, 204), #f0ca35); }
   a:visited { color: light-dark(#551A8B, #d04a09); }
   ```

   Option B: You can define your light color scheme normally, then at the
   bottom of your CSS you can define your darkmode overrides, like this:

   ```css
   /* Light color scheme, defined as usual */
   a:link { color: rgb(0, 102, 204); }
   a:visited { color: #551A8B; }

   /* ... rest of your styling goes here ... */

   /* Darkmode overrides: */
   body.dark a:link { color: #f0ca35; }
   body.dark a:visited { color: #d04a09; }
   ```

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

4. (Optional; only works if you picked Option A above.) Your CSS should also
   probably start with the following:

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

5. (Optional) If you want your images to also be darkmode-friendly, you can add
   the class `darkmode-invert` to the images you want to invert, and
   `darkmode-dim` to the images you don't want to invert but still
   dim down for darkmode. If you don't add either class, the image will be
   untouched. For example, your `<img>` tags will look like:

   ```html
   <img src="bar-graph.png" width="500" class="darkmode-invert" />
   <img src="geddes.jpg" width="500" class="darkmode-dim" />
   ```

   If you want to automate classifying the images, you can use
   [this website's API](https://invertornot.com/) (I didn't create that site,
   nor have I actually used it myself except on a couple of images, so I don't
   know how well it works).

   Then, in your CSS, add the following:

   ```css
   /* The CSS below is modified from https://invertornot.com/ */
   body.dark img.darkmode-dim {
       filter: grayscale(50%) brightness(85%);
   }
   body.dark img.darkmode-invert {
       filter: grayscale(50%) invert(100%) brightness(95%) hue-rotate(180deg);
   }
   ```

See the [demo](https://riceissa.github.io/simple-website-darkmode/) for what
the end result will look like after all of the steps above.
