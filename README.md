# Simple Website Darkmode

A simple darkmode color scheme script for your website, with a three-state menu
(auto/light/dark).

## Basic setup

Near the end of your `<head>` tag (in particular, after any of your own CSS),
add the following two lines:

```html
<script src="https://cdn.jsdelivr.net/gh/riceissa/simple-website-darkmode/docs/darkmode.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/riceissa/simple-website-darkmode/docs/darkmode-overrides.css">
```

Early in the `<body>` tag (e.g. immediately after it opens), add the following
two lines:

```html
<div id="darkmode-menu"></div>
<script>darkmode.initialize();</script>
```

That's it! See the
[basic demo page](https://riceissa.github.io/simple-website-darkmode/basic-demo.html)
([source](https://github.com/riceissa/simple-website-darkmode/blob/master/docs/basic-demo.html))
for what the end result will look like. This basic setup will only work for
simple websites that don't use a lot of styling/custom classes. If this basic
setup doesn't produce the result you want, then move onto the more advanced
setup below.

## More advanced setup (if the basic setup doesn't fit your needs)

For the more advanced setup, you will have to:

- Update your CSS styling to add a darkmode to it
- Optionally serve the `darkmode.js` JavaScript
- Update your HTML to add the theme-changing menu and to initialize the script

We will go through each of these in turn.
See the [demo](https://riceissa.github.io/simple-website-darkmode/) for what
the end result will look like after all of the steps above.

### Update your CSS styling to add a darkmode to it

For defining your darkmode color scheme, you have two choices.

Option A (recommended): In your CSS, you can define all of your colors using
[`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark). Your CSS will look like:

```css
a:link { color: light-dark(rgb(0, 102, 204), #f0ca35); }
a:visited { color: light-dark(#551A8B, #ca7d39); }
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
body.dark a:visited { color: #ca7d39; }
```

See [`style.css`](docs/style.css) for an example of what your CSS will look
like.

(Optional; only works if you picked Option A above.) Your CSS should also
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

(Optional) If you want your images to also be darkmode-friendly, you can add
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
    filter: brightness(85%);
}
body.dark img.darkmode-invert {
    filter: grayscale(50%) invert(100%) brightness(95%) hue-rotate(180deg);
}
```

### (Optional) Serve the `darkmode.js` JavaScript

Serve the [`darkmode.js`](docs/darkmode.js) script from your site ([raw download link](https://raw.githubusercontent.com/riceissa/simple-website-darkmode/refs/heads/master/docs/darkmode.js)). Below, we will assume it exists at `./darkmode.js`. If you don't want to serve the script yourself, you can also use the jsDelivr CDN (see below).

### Update your HTML to add the theme-changing menu and to initialize the script

In your HTML, make the following changes:

In the `<head>` tag (anywhere in it), add the following line (change
`./darkmode.js` to wherever the script is located on your site):

```html
<script src="./darkmode.js"></script>
```

If you want to use the jsDelivr CDN rather than hosting the script yourself,
then add the following instead:

```html
<script src="https://cdn.jsdelivr.net/gh/riceissa/simple-website-darkmode/docs/darkmode.js"></script>
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
