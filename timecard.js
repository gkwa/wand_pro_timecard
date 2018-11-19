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
  "use strict";

  var $ = window.jQuery;
  $(document).ready(function() {
    function setShiftType(
      billingDetailItems,
      billingTimeSpans,
      timeEntrySpanType
    ) {
      var s = `#billingDetailItems${billingDetailItems}\\2e billingTimeSpans${billingTimeSpans}\\2e timeEntrySpanType`;
      $(s).val(timeEntrySpanType);
    }

    function addTimeEntry(
      billingDetailItems,
      billingTimeSpans,
      start_or_end,
      hour,
      minute,
      ampm
    ) {
      var s;

      s = `#billingDetailItems${billingDetailItems}\\2e billingTimeSpans${billingTimeSpans}\\2e ${start_or_end}HourM`;
      $(s).val(hour);
      s = `#billingDetailItems${billingDetailItems}\\2e billingTimeSpans${billingTimeSpans}\\2e ${start_or_end}Minute`;
      $(s).val(minute);
      s = `#billingDetailItems${billingDetailItems}\\2e billingTimeSpans${billingTimeSpans}\\2e ${start_or_end}Meridiem`;
      $(s).val(ampm);
    }

    var day;
    var amPmEnum = {
      AM: 0,
      PM: 1
    };

    for (day = 0; day <= 4; day++) {
      // morning shift
      addTimeEntry(day, 0, "start", 9, 0, amPmEnum.AM);
      addTimeEntry(day, 0, "end", 12, 0, amPmEnum.PM);
      setShiftType(day, 0, "Labor");

      // lunch
      addTimeEntry(day, 1, "start", 12, 0, amPmEnum.PM);
      addTimeEntry(day, 1, "end", 1, 0, amPmEnum.PM);
      setShiftType(day, 1, "Lunch");

      // afternoon shift
      addTimeEntry(day, 2, "start", 1, 0, amPmEnum.PM);
      addTimeEntry(day, 2, "end", 6, 0, amPmEnum.PM);
      setShiftType(day, 2, "Labor");
    }
  });
})();
