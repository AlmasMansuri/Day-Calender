let date = dayjs().format("dddd, DD MMM YYYY ");

let hr = dayjs().format("h A ");

console.log(hr);
$("#currentDay").text(date);
setInterval(function () {
  $("#currentDay").text(date);
}, 1000);

var planWorkday = [
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 AM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
];

var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
  planWorkday = workEvents;
}

planWorkday.forEach(function (timeBlock, index) {
  var timeLabel = timeBlock.time;
  var blockColor = colorRow(timeLabel);
  var row =
    '<div class="time-block" id="' +
    index +
    '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
    timeLabel +
    '</div><textarea class="form-control ' +
    blockColor +
    '">' +
    timeBlock.event +
    '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

  /* Adding rows to container div */
  $(".container").append(row);
});

function colorRow(time) {
  var planNow = dayjs(hr, "H A");
  var planEntry = dayjs(time, "H A");
  if (planNow.isBefore(planEntry) === true) {
    return "future";
  } else if (planNow.isAfter(planEntry) === true) {
    return "past";
  } else {
    return "present";
  }
}

$(".saveBtn").on("click", function () {
  var blockID = parseInt($(this).closest(".time-block").attr("id"));
  var userEntry = $.trim($(this).parent().siblings("textarea").val());
  planWorkday[blockID].event = userEntry;

  /* Set local storage */
  localStorage.setItem("workDay", JSON.stringify(planWorkday));
});
