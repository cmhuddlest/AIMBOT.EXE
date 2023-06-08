//store currently selected element, default to 0 so there is a default loadout selected from array
let selectedLoadout = 0;

//select div
const loadoutSelector = document.querySelector('#loadout-selector');
//create buttons for loadout selection
loadouts.forEach(function (l, index) {
	let loadoutBtn = document.createElement('button');

	if (index === selectedLoadout) loadoutBtn.classList.add('active');

	//https://www.w3schools.com/js/js_string_templates.asp
	loadoutBtn.innerHTML = `
		<img src="weapon images/${l.loadoutImage}" />
	`;

	// console.log(l); check if pulling array properly
	//set selected loadout as active on click
	loadoutBtn.addEventListener('click', function (e) {
		//remove active class on all buttons
		document.querySelectorAll('.active').forEach(function (element) {
			element.classList.remove('active');
		});
		//add class active on button clicked
		loadoutBtn.classList.add('active');

		selectedLoadout = index;
	});

	loadoutSelector.append(loadoutBtn);
});

//set startBtn to button id of start
const startBtn = document.querySelector('#start');

startBtn.addEventListener('click', function (e) {
	//? = query parameters, window.location.href takes you to the game.html on click
	window.location.href = `game.html?loadout=${selectedLoadout}`; //&map=${selectedMap}`;
});

//wanted to add map selector here as well, using same array from loadout.js with additional items in objects
//in each object have background image and input enemy positions/sizes here as well to be custom to each map

//start audio on page load
let startup = new Audio(`audio/radiobotstart07.wav`);
startup.volume = .1;
startup.play();