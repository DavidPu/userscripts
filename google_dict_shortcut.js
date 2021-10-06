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

    // shortcuts for Google dictionary
    document.addEventListener('keydown', function(event) {
     if (!event.ctrlKey) {
         return;
     }
     event.preventDefault();
     if (event.ctrlKey && (event.key === 'a' || event.key === 'o')) {
       document.getElementsByTagName('audio')[0].click();
     } else if (event.ctrlKey && (event.key === 's' || event.key === 'l')) {
        var val = search_el().value;
        var store = window.localStorage;
        store.setItem('l:' + val, val);
        var el = document.querySelector("span[data-dobid='hdw']");
        var txt = el.innerText;
        if (el && txt[txt.length - 1] === '❤') {
            el.innerText = txt.slice(0, txt.length - 1);
        } else {
            el.innerText += '❤';
        }
     } else if (event.ctrlKey && (event.key === 'f' || event.key === 'p')) {
        var inputs = document.getElementsByTagName('input');
        var el2 = search_el();
        el2.focus();
        el2.select();
     }
    });

})();
