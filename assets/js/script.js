$(document).ready(function (){
var saveBtn = $('.saveBtn');
var currentDayEl = $('#currentDay')
var currentDay = moment().format('dddd, MMM Do');
// render current date to title
currentDayEl.text(currentDay);
var savedEvent = JSON.parse(localStorage.getItem("savedEvent"));
if (savedEvent == null){
console.log("There is no event data in local storage, creating a blank array");
savedEvent = [];
}
else{
    handleFillEvents();
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

saveBtn.on("click", handleSave)

























})