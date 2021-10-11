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
    // https://www.merriam-webster.com/lapi/v1/wordlist/search?search=&sort=newest&filter=dt&page=1&perPage=10000
    function save2list() {
        var el = document.querySelector('#save-to-list-link');
        if (el && el.innerText != 'Saved!') {
            document.querySelector('#save-to-list-link').click();
        }
        el = document.querySelector('#s-term');
        if (el) {
            var txt = el.value;
            window.localStorage.setItem('l:' + txt, txt);
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

    document.body.style.backgroundColor= '#e6e6e6';
    var el = document.querySelector('#definition-fixed-wrapper');
    if (el) el.remove();

    document.addEventListener('keydown', function(event) {
        if (!event.ctrlKey && !event.altKey) {
            return;
        }
        if ((event.key === 'a' || event.key === 'o')) {
            event.preventDefault();
            document.getElementsByClassName('play-pron')[0].click();
            save2list();
        } else if ((event.key === 's' || event.key === 'l')) {
            event.preventDefault();
            save2list();
        } else if ((event.key === 'f' || event.key === 'p')) {
            event.preventDefault();
            document.querySelector('#s-term').focus();
            document.querySelector('#s-term').select();
        } else if (event.key === 'e') {
            event.preventDefault();
            // Thesaurus
            document.querySelector('div.thesaurus-tab').click();
        } else if (event.key === 'd') {
            // Dictionary
            event.preventDefault();
            document.querySelector('div.dictionary-tab').click()
        } else if (event.key === 'm') {
            // more-definitions-anchor
            event.preventDefault();
            var absoff = abs_offset(document.querySelector('#more-definitions-anchor'));
            window.scroll(0, absoff.top);
        } else if (event.key === 'z') {
            // elementary-entry-1
            event.preventDefault();
            var v = abs_offset(document.querySelector('#elementary-entry-1'));
            window.scroll(0, v.top);
            setTimeout(() => {
                document.querySelector('#spotim-specific-conversation').remove();
            }, 200);
        }
    });
})();
