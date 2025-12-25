const newActivityFormEl = document.getElementsByTagName("form")[0];
const startDateInputEl = document.getElementById("start-date");
const endDateInputEl = document.getElementById("end-date");
const pastActivityContainer = document.getElementById("past-activities");

// Add the storage key as an app-wide constant

// Add the storage key as an app-wide constant
const STORAGE_KEY = "activity-tracker";

function storeNewActivity(startDate, endDate) {
  // Get data from storage.
  const activities = getAllStoredActivities();

  // Add the new period object to the end of the array of period objects.
  activities.push({ startDate, endDate });

  // Sort the array so that periods are ordered by start date, from newest
  // to oldest.
  activities.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  // Store the updated array back in the storage.
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

function getAllStoredActivities() {
  // Get the string of period data from localStorage
  const data = window.localStorage.getItem(STORAGE_KEY);

  // If no periods were stored, default to an empty array
  // otherwise, return the stored data as parsed JSON
  const activities = data ? JSON.parse(data) : [];

  return activities;
}


//

//const STORAGE_KEY = "activity-tracker";

// Listen to form submissions.
newActivityFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const startDate = startDateInputEl.value;
  const endDate = endDateInputEl.value;
  if (checkDatesInvalid(startDate, endDate)) {
    return;
    console.log("checkDates");
  }
  storeNewActivity(startDate, endDate);
  renderPastActivities();
  newActivityFormEl.reset();
});

function checkDatesInvalid(startDate, endDate) {
  if (!startDate || !endDate || startDate > endDate) {
    newActivityFormEl.reset();
    return true;
  }
  return false;
}
/*
function storeNewActivity(startDate, endDate) {
  const activities = getAllStoredActivities();
  activities.push({ startDate, endDate });
  activities.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

function getAllStoredActivities() {
  const data = window.localStorage.getItem(STORAGE_KEY);
  const activities = data ? JSON.parse(data) : [];
  console.dir(activities);
  console.log(activities);
  return activities;
}
*/
//Render Past Act8vities oeiginal
/*
function renderPastActivities() {
  const pastActivityHeader = document.createElement("h2");
  const pastActivitiesList = document.createElement("ul");
  const activities = getAllStoredActivities();
  if (activities.length === 0) {
    return;
  }
  pastActivityContainer.textContent = "";
  pastActivityHeader.textContent = "Past activities";
  activities.forEach((activity) => {
    const activityEl = document.createElement("li");
    activityEl.textContent = `From ${formatDate(
      activity.startDate,
    )} to ${formatDate(activity.endDate)}`;
    pastActivityList.appendChild(activityEl);
  });

  pastActivityContainer.appendChild(pastActivityHeader);
  pastActivityContainer.appendChild(pastActivityList);
}
*/
//format date orig8nal
/*
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}
*/
//renderPastActivities();

function renderPastActivities() {
  // get the parsed string of periods, or an empty array.
  const activities = getAllStoredActivities();

  // exit if there are no periods
  if (activities.length === 0) {
    return;
  }

  // Clear the list of past periods, since we're going to re-render it.
  pastActivityContainer.textContent = "";

  const pastActivityHeader = document.createElement("h2");
  pastActivityHeader.textContent = "Past activities";

  const pastActivityList = document.createElement("ul");

  // Loop over all periods and render them.
  activities.forEach((activity) => {
    const activityEl = document.createElement("li");
    activityEl.textContent = `From ${formatDate(
      activity.startDate,
    )} to ${formatDate(activity.endDate)}`;
    pastActivityList.appendChild(activityEl);
  });

  pastActivityContainer.appendChild(pastActivityHeader);
  pastActivityContainer.appendChild(pastActivityList);
}

function formatDate(dateString) {
  // Convert the date string to a Date object.
  const date = new Date(dateString);

  // Format the date into a locale-specific string.
  // include your locale for better user experience
  return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}
renderPastActivities();
