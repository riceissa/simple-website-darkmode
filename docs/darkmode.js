// Simple Website Darkmode
// Author: Issa Rice
// License: CC0 https://creativecommons.org/publicdomain/zero/1.0/

// We use a self-executing anonymous function to create a separate namespace
// called darkmode. This way any functions we define here won't affect
// other scripts. See https://stackoverflow.com/a/5947280/3422337 . (The
// version here is a bit different because we aren't using jQuery so we don't
// have to pass that as an argument, and modern versions of JavaScript don't
// allow you to redefine undefined so we don't need to keep that as an argument
// either.)
(function(darkmode) {
    // local storage: blank (meaning auto), "auto", "light", or "dark"
    // color argument for the functions below: "auto", "light", or "dark"

    function set_root_color_scheme(color) {
        if (color === "dark") {
            // If the user has specifically chosen this particular website to
            // be in dark mode, then honor that over the OS/browser-level
            // preference.
            document.documentElement.style.setProperty("color-scheme", "dark");
        } else if (color === "light") {
            document.documentElement.style.setProperty("color-scheme", "light");
        } else {
            document.documentElement.style.setProperty("color-scheme", "light dark");
        }
    }

    function set_visual_feedback_color(color) {
        var options_list = ["auto", "light", "dark"];
        var el = document.getElementById(color + "-menu-option");
        el.style.textDecoration = "underline";
        options_list = options_list.filter(x => x !== color);
        options_list.forEach((c) => document.getElementById(c + "-menu-option").style.textDecoration = "none");
    }

    function add_darkmode_menu() {
        document.getElementById('darkmode-menu').innerHTML = `
            Set color scheme to:
            <span id="auto-menu-option" style="cursor: pointer;" class="unselectable" onclick="darkmode.set_color('auto')">auto</span>,
            <span id="light-menu-option" style="cursor: pointer;" class="unselectable" onclick="darkmode.set_color('light')">light</span>,
            <span id="dark-menu-option" style="cursor: pointer;" class="unselectable" onclick="darkmode.set_color('dark')">dark</span>
        `;
    }

    function set_theme_from_local_storage() {
        add_darkmode_menu();
        const site_specific_preferred_color = localStorage.getItem("color") || "auto";
        set_root_color_scheme(site_specific_preferred_color);
        set_visual_feedback_color(site_specific_preferred_color);
    }

    // This function runs every time the menu buttons (auto/light/dark) are
    // clicked.
    darkmode.set_color = function (color) {
        set_root_color_scheme(color);
        localStorage.setItem("color", color);
        set_visual_feedback_color(color);
    };

    // This function runs once on each page load.
    darkmode.initialize = function () {
        add_darkmode_menu();
        set_theme_from_local_storage();
    };

    function set_body_class(color) {
        if (color === "dark") {
            if (!document.body.classList.contains("dark")) {
                document.body.classList.add("dark");
            }
        } else {
            if (document.body.classList.contains("dark")) {
                document.body.classList.remove("dark");
            }
        }
    }

    function recompute_body_class() {
        const site_color_scheme = getComputedStyle(document.documentElement).getPropertyValue('color-scheme').trim();
        if (site_color_scheme === "dark" || site_color_scheme === "light") {
            set_body_class(site_color_scheme);
        } else {
            // site_color_scheme is auto, so fall back to the OS preference
            const os_prefers_dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            set_body_class(os_prefers_dark ? "dark" : "light");
        }
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                recompute_body_class();
            }
        });
    });

    // This fires whenever the :root { color-scheme } value changes, i.e.
    // whenever the user clicks on the darkmode menu on the site.
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style']
    });

    const darkmode_preference = window.matchMedia("(prefers-color-scheme: dark)");
    // This fires whenever the OS/browser preference changes. This might happen
    // for example when someone has their OS color scheme set to the movement
    // of the sun, so that e.g. at sunset the OS theme gets changed to dark
    // mode.
    darkmode_preference.addEventListener("change", e => recompute_body_class());
}(window.darkmode = window.darkmode || {}));
