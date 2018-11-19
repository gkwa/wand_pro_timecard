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

    function createShifts(count) {
      var t;
      $("td")
        .filter(function(index) {
          return (
            $(this)
              .text()
              .replace(/\u00A0/g, "") === "Total Hrs"
          );
        })
        .each(function() {
          $(this)
            .closest("table")
            .each(function() {
              var z = $(this).find($('a:contains("Default")'));
              z.click().delay(2000);

              // https://api.jquery.com/find
              var x = $(this).find($('a:contains("Delete")'));
              var y = $(this).find($('a:contains("Add New")'));
              var delCount = x.length;
              while (delCount <= count) {
                y.click();
                delCount += 1;
              }
            });
        });
    }
    // createShifts(3);

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
