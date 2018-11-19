// ==UserScript==
// @name         Wand Pro timecard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Taylor Monacelli
// @match        https://prowand.pro-unlimited.com/worker/standard/billing/billingedit/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var $ = window.jQuery;
    $(document).ready(function() {
        alert('WINNING');
    });
})();
