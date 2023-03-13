// GRABBING ELEMENTS FROM THE DOM
var descriptionEl = $(".description");
var timeBlockEl = $(".time-block");
var hourEl = $(".hour");
var pastEl = $(".past");
var presentEl = $(".present");
var futureEl = $(".future");
var saveBtnEl = $(".save-btn");
var currentDayEl = $("#currentDay");
var containerEl = $(".container");
var clearButton = $("<button>");
var clearMessage = $("<p>");

//DEFINING TIME USING MOMENT.JS THEN FORMATTING IT
var today = moment();
$(currentDayEl).text(today.format("dddd, MMMM Do"));

$("header").append(clearButton)
$(clearButton).text("Clear Schedule")
$(clearButton).on("click", function()
{
  localStorage.clear();
  location.reload();
})

// CREATES BOOTSTRAP ROW
var row = $("<div>");
$(containerEl).append(row);
$(row).addClass("row");

// Created 8 rows (9am-5pm)
for (let i = 0; i <= 8; i++) 
{
  var newDiv = $("<div>");
  var newTxtArea = $("<textarea>");
  var newButton = $("<button>");
  var newImg = $("<i>");
  var newP = $("<p>");
  var time = moment().hour(i + 9).format("h A");
  var tempNow = moment().set({ hour: 14, minute: 0, second: 0 }).format("h A");
  var now = moment().format("h A");
  var timeCompare = moment(time, "h:mma");
  var tempNowCompare = moment(now, "h:mma");

  $(row).append(newDiv);
  $(newDiv).addClass("hour col-1");
  $(newDiv).text(time);


  $(row).append(newTxtArea);
  $(newTxtArea).addClass("description col-10");
  var taskInfo = localStorage.getItem(i); 
  // Save Button
  $(row).append(newButton);
  $(newButton).addClass("saveBtn col-1");
  $(newButton).append(newImg);
  $(newImg).addClass("fas fa-save");

  // Saving to local Storage
  $(newButton).on("click", function () {
    let textarea = $(this).prev();
    let text = textarea.val();
    localStorage.setItem(i, text);
    $("header").append(newP)
    newP.addClass("taskAdded")
    newP.text("Time block edited successfully!")

  });

// Color coding depeding on the time
  if (moment(timeCompare).isBefore(tempNowCompare)) {
    newTxtArea.addClass("past");
  } else if (moment(timeCompare).isAfter(tempNowCompare)) {
    newTxtArea.addClass("future");
  } else {
    newTxtArea.addClass("present");
  }
}
