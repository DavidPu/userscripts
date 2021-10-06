// ==UserScript==
// @name         Merriam-webster
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.merriam-webster.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {

    // shortcuts for https://www.merriam-webster.com/dictionary
    function save2list() {
        var el = document.querySelector('#save-to-list-link');
        if (el && el.innerText != 'Saved!') {
            document.querySelector('#save-to-list-link').click();
        }
    }

    document.addEventListener('keydown', function(event) {
     if (!event.ctrlKey) {
         return;
     }
     if (event.ctrlKey && (event.key === 'a' || event.key === 'o')) {
       event.preventDefault();
       document.getElementsByClassName('play-pron')[0].click();
       save2list();
     } else if (event.ctrlKey && (event.key === 's' || event.key === 'l')) {
        event.preventDefault();
        save2list();
        var txt = document.querySelector('#s-term').value;
        window.localStorage.setItem('l:' + txt, txt);
     } else if (event.ctrlKey && (event.key === 'f' || event.key === 'p')) {
        event.preventDefault();
        document.querySelector('#s-term').focus();
        document.querySelector('#s-term').select();
     }

    });
})();
