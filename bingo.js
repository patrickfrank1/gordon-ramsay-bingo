function random_range(lower, upper) {
	return lower + Math.floor((upper - lower) * Math.random());
}

function extract_random_element(array_) {
	index = random_range(0, array_.length);
	return array_.splice(index, 1)[0];
}

var VERSION = "v2";

onLoad = function() {
	cells = document.querySelectorAll("td");

	// Load and store state in local storage
	state = localStorage.getItem(VERSION);
	if (!state) {
		tropes = [];
		trope_indexes = [];
		all_tropes.forEach(function (_, i) {
			trope_indexes.push(i);
		});
		for (var i = 0; i < cells.length; i++) {
			// Randomize content
			tropes.push(extract_random_element(trope_indexes));
		}
		state = {
			"tropes": tropes,
			"checked": []
		}
		localStorage.setItem(VERSION, JSON.stringify(state));
	} else {
		state = JSON.parse(state);
		for (var i = 0; i < cells.length; i++) {
			if (state.checked[i]) {
				cells[i].classList.add("checked");
			}
		}
	}

	state.tropes.forEach(function(_, i) {
		cells[i].textContent = all_tropes[state.tropes[i]];
		// Set up click listener to toggle "checked" class on target element
		cells[i].addEventListener("click", function (event) {
			event.currentTarget.classList.toggle("checked");
			state.checked[i] = event.currentTarget.classList.contains("checked");
			localStorage.setItem(VERSION, JSON.stringify(state));
			ga('send', 'event',
				'Cell',
				event.currentTarget.classList.contains("checked") ? 'check' : 'uncheck',
				event.currentTarget.textContent);
		});
	});

	document.querySelector("#reset").addEventListener("click", function(event) {
		localStorage.clear();
		location.reload();
		ga('send', 'event',
			'Reset');
	});
};

document.addEventListener('DOMContentLoaded', onLoad, false);

all_tropes = [
	"Fuck off will ya!",
	"Yes chef!",
	"It’s fucking raw!",
	"Beautiful!",
	"You you you you you you!",
	"Mushy!",
	"It's really really dry!",
	"Bland!",
	"Where is the lamb sauce?",
	"It’s delicious!",
	"Olive oil!",
	"Get out!",
	"Donkey!",
	"Disgusting!",
	"You fat pig!",
	"Done!",
	"Stop eating the fish!",
	"The meat is dry!",
	"Dreadful!",
	"I could cry!",
	"Are you expecting a pasta rush?",
	"Come here!",
	"Listen up!",
	"What did you just say?",
	"Jean Philippe.",
	"Do me a favour and fuck off!",
	"Go go go go!",
	"What is going on?",
	"You think you’re tough?",
	"What the hell is that?",
	"I feel bad!",
	"Try this!",
	"You’re fucking it!",
	"This sucks!",
	"Ahhhhhhhhh!",
	"I’ll take over!",
	"You’re burning it!",
	"Are you serious?",
	"That’s terrible!",
	"Let’s go!",
	"Jesus Christ!",
	"Who cooked this?",
	"Could you taste that?",
	"Keep it together!",
	"Are you done?",
	"You’re shit!",
	"Where are the scallops?",
	"Just touch that!",
	"Dickface!",
	"Bounce back!",
	"Has that been microwaved?",
	"It's cold in the middle!",
	"this place is dirty!",
	"Raw meat next to cooked meat!",
	"Do you have any idea how long that has been in here?",
	"You could kill someone with that!",
	"That's chewy!",
	"Are you kidding me?"
]
