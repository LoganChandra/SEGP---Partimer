// Function to change the id status.
if (localStorage.getItem("dark_theme") == "enabled")
{
	document.getElementById("dark_theme").disabled = false;
}
else
{
	document.getElementById("dark_theme").disabled = true;
}

// Function to toggle theme change.
function theme_toggle() {
	var darkTheme = document.getElementById("dark_theme");
	if (darkTheme.disabled)
	{
		darkTheme.disabled = false;
		localStorage.setItem("dark_theme", "enabled");
	}
	else
	{
		darkTheme.disabled = true;
		localStorage.setItem("dark_theme", "disabled");
	}
}

// Functions to update the theme toggle according to which theme is chosen.
function toggleDisplay() {
	let darkTheme = document.getElementById("dark_theme");
	if (darkTheme.disabled)
	{
		document.getElementById("themeToggle").checked = false;
	}
	else
	{
		document.getElementById("themeToggle").checked = true;
	}
}

window.setInterval(toggleDisplay, 100);

// Function to open the theme settings dropdown.
function openThemeSettings() {
	document.getElementById("topnavDropDown").classList.toggle("show");
}

// Function to open the daily pool settings dropdown.
function openReschedule() {
	document.getElementById("RescheduleDropdown").classList.toggle("show");
}

// Non-functional code. Supposed to give the ability to click anywhere to close the dropdown.
// window.onclick = function(e) {
//   if (!e.target.matches('.dropdown')) {
//   var myDropdown = document.getElementById("dropdown");
//     if (myDropdown.classList.contains('show')) {
//       myDropdown.classList.remove('show');
//     }
//   }
// }