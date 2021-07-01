$(document).ready(function (){
var saveBtn = $('.saveBtn');
var clearBtn = $('.clearBtn');
var currentDayEl = $('#currentDay')
var currentDay = moment().format('dddd, MMM Do');
var savedEvent = JSON.parse(localStorage.getItem("savedEvent"));
// var timeBlock = $('.time-block');

// render current date to title
currentDayEl.text(currentDay);
// on page load run init
init();
compareTime();

// check for an array of saved event data, if there is not one, create one
function init () {
    if (savedEvent == null){
        console.log("There is no event data in local storage, creating a blank array");
        savedEvent = [];
        }
    // if there is an array, run the function
     else{
            handleFillEvents();
        }
};

function compareTime (){
    // get current hour using moment.js
    var currentHour = moment().hour();
    currentHour = 9;

    console.log(currentHour);
    // loop through each time-block element
    $('.time-block').each(function(){
        // get value of this hour
       var hourRowVal = $(this).data('hour');
       // target the text area of this iteration
       var textArea = $(this).children('textarea');
       console.log(hourRowVal); 
       // compare current hour from moment.js to the data-hour value of each row
       if (currentHour > hourRowVal){
           // hour has passed, no change to color of textarea
       }
       else if (currentHour == hourRowVal){
           // this is the current hour
           textArea.css("background-color", "var(--current)")
       }
       else {
           // future hour
           textArea.css("background-color", "var(--future)")
       }
    });
}

// get value from local storage and load them on page load
function handleFillEvents (){
    console.log(savedEvent);
    // loop through the savedEvent array
    for (let i = 0; i < savedEvent.length; i++) {
    var savedHour = savedEvent[i].time;
    // get element by ID for each hour in the array
    var hour = $(`#${savedHour}`);
    // write the event value to the page
    hour.children('.description').text(savedEvent[i].event);
}
};

// save to local storage function
function handleSave (){
    var value = $(this).siblings('.description').val().trim();
    var time = $(this).parent().attr('id');
    // create object which will be stored in the array
        var currentEvent = 
        {
        time: time,
        event: value,
        };
        // push this to the array
            console.log("pushing to array");
            savedEvent.push(currentEvent);
    // else textbox is blank, type something in the box please

    //write event array to local storage
    localStorage.setItem("savedEvent", JSON.stringify(savedEvent));

};

function handleClear () {
    // clear savedEvent array
    savedEvent = [];
    // save to local storage
    localStorage.setItem("savedEvent", JSON.stringify(savedEvent));
    // refresh page to show changes immediately
    location.reload();
};

saveBtn.on("click", handleSave)
clearBtn.on("click", handleClear)

})