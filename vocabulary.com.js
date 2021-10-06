// ==UserScript==
// @name         vocabulary.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.vocabulary.com/*
// @icon         https://www.google.com/s2/favicons?domain=vocabulary.com
// @grant        none
// ==/UserScript==

(function() {
    function save2list(w) {
        var addwords = encodeURIComponent(JSON.stringify([{"word":w,"lang":"en"}]))
        var id = 8060599;
        var req = `addwords=${addwords}&id=${id}`
        fetch('https://www.vocabulary.com/lists/save.json', {
              method: 'post',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              body: req
            }).then(res => res.json())
              .then(res => console.log(res));
    }

    document.addEventListener('keydown', function(event) {
     if (!event.ctrlKey) {
         return;
     }
     if (event.ctrlKey && (event.key === 'a' || event.key === 'o')) {
       event.preventDefault();
       document.getElementsByClassName('audio')[0].click();
     } else if (event.ctrlKey && (event.key === 's' || event.key === 'l')) {
        event.preventDefault();
        save2list();
        document.querySelector('.addtolist').innerHTML = '<a style="color:red">❤ Saved! ❤</a>';
        var txt = document.querySelector('#search').value;
        window.localStorage.setItem('l:' + txt, txt);
     } else if (event.ctrlKey && (event.key === 'f' || event.key === 'p')) {
        event.preventDefault();
        document.querySelector('#search').focus();
        document.querySelector('#search').select();
     }

    });
})();
