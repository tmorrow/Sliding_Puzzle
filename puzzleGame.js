/*
	 Taylor Morrow - 300189738
	 Sliding Puzzle Lab exercise
*/

var puzzle = new Array(16);
var puzzleImg = new Array(16);
var puzzleSize = 16;
var number = 0;


function clickCounter(){ //simple click counter to tally your total clicks.
	number ++;
	document.getElementById("clicks").innerHTML = number;

	switch (number){
		case 1:
			document.getElementById("message").innerHTML = "Good luck!";
			break;
		case 25:
			document.getElementById("message").innerHTML = "Keep trying!";
			break;
		case 50:
			document.getElementById("message").innerHTML = "You'll get there eventually!";
			break;
		case 75:
			document.getElementById("message").innerHTML = "Sooner or later... right?!";
			break;
		case 100:
			document.getElementById("message").innerHTML = "...Almost done?";
			break;
		case 150:
			document.getElementById("message").innerHTML = "Did you give up? :(";
			break;	
	}
}

function shuffle(){ //shuffle the images
	var count = 0;

	for (var x = 0; x < puzzleImg.length; x++){
		puzzleImg[x] = false; 
		//creates a truly shuffled array with false values for all images
	}

	while(count < puzzleSize){
		var rnd = Math.floor(Math.random() * 16);
		var index = rnd;
		var temp = puzzle[index];

		puzzle[index] = puzzle[count];
		puzzle[count] = temp;
		count++
	}
	refresh(); //each time the "Start!" button is clicked, refresh() is called
}

function start(){ //initialization of the webpage
	var count = 0;
	
	while(count < puzzleSize){
		puzzleImg[count] = true;
		puzzle[count] = count;
		count++;
	}
	puzzle[15]="blank";
	refresh();
}

function refresh(){ //refresh the page
	var index = new Array(16);
	var imgPath = 'images/';

	for(var i = 0; i < puzzleSize; i++){
		index[i] = document.getElementById(i);
		index[i].src = imgPath + puzzle[i] + ".jpg";
	}
}

function errorZero(){ //If the value of current is 0 or negative, return [0]
	if(arguments[0] < 0)
		return 0;

	else return arguments[0];
}

function swap(){
	var index, check, temp;

	index = arguments[0];
	check = arguments[1];
	temp = puzzle[index];

	puzzle[index] = puzzle[check];
	puzzle[check] = temp;

	refresh();
}

function swapBlank(){
	var current, toSwap;

	current = arguments[0];
	toSwap = arguments[1];

	//swap the current index'd picture (via move()) and the blank image if they are beside each other
	//location of blank swap determined by moveUp, moveDown, moveLeft, moveRight
	if(puzzle[toSwap] == "blank")
		swap(current, toSwap);

	else { return; }

	clickCounter(); // +1 everytime the blank img is swapped
}

function move(){
	var current = parseInt(arguments[0]);
	var moveUp, moveDown, moveLeft, moveRight;

	//Position tracker & error catching for moving the blank tile.
	moveUp = errorZero(current -4); moveDown = errorZero(current +4);
	moveLeft = errorZero(current -1); moveRight = errorZero(current +1);

	//if the current click of the mouse is equal to the id of the puzzle[image]
	if(current == puzzle[current]){
		puzzleImg[current] = true;
	}
	
	//swap the image with the blank
	swapBlank(current, moveUp); swapBlank(current, moveDown);
	swapBlank(current, moveLeft); swapBlank(current, moveRight);

}
