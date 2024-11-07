var calendarEl;
var calendar;

document.addEventListener('DOMContentLoaded', function() {
    calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      events: []
    });
    calendar.render();
});

async function getSchedules(){
    const response = await fetch('http://localhost:5000/get-schedules-by-id');
    schedule = await response.json();  
    const events = schedule.map(event => ({
        title: 'Staff ' + event.staffid + ' Schedule',
        start: event.date + 'T' + event.start_time,
        end: event.date + 'T' + event.end_time
    }));    
    calendar.addEventSource(events)
    calendar.render();
}

getSchedules();

