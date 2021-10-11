// ==UserScript==
// @name         google dict shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/search?*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==
(function() {
    function search_el() {
        var inputs = document.getElementsByTagName('input');
        var el = null;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].placeholder && inputs[i].placeholder === 'Search for a word') {
                el = inputs[i];
                break;
            }
        }
        return el;
    }

    function save2list(remove) {
        var val = search_el().value;
        var store = window.localStorage;
        store.setItem('l:' + val, val);
        var el = document.querySelector("span[data-dobid='hdw']");
        var txt = el.innerText;
        if (el && txt[txt.length - 1] === '❤') {
            if (remove) {
                el.innerText = txt.slice(0, txt.length - 1);
            }
        } else {
            el.innerText += '❤';
        }
    }

    function abs_offset(element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);

        return {
            top: top,
            left: left
        };
    }

    function pretty_page() {
        var el = search_el();
        if (!el) {
            return;
        }
        var absoff = abs_offset(search_el());
        if (absoff.top > 0) {
            window.scroll(0, absoff.top);
        }

        el = document.getElementById('searchform');
        if (el) {
            el.remove();
        }
    }

    // document.body.style.backgroundColor= '#e6e6e6';
    // shortcuts for Google dictionary
    document.addEventListener('keydown', function(event) {
        if (!event.ctrlKey && !event.altKey) {
            return;
        }
        if ((event.key === 'a' || event.key === 'o')) {
            event.preventDefault();
            document.getElementsByTagName('audio')[0].click();
            save2list(false);
        } else if ((event.key === 's' || event.key === 'l')) {
            event.preventDefault();
            save2list(true);
        } else if ((event.key === 'f' || event.key === 'p')) {
            event.preventDefault();
            var inputs = document.getElementsByTagName('input');
            var el2 = search_el();
            el2.focus();
            el2.select();
            pretty_page();
        }
    });
    setTimeout(pretty_page, 500);
    document.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            setTimeout(pretty_page, 200);
        }
    });
})();
