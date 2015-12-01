//Canvas variables
var canvas = document.getElementById("function");
var maze = document.getElementById("maze");
var ctx2 = maze.getContext("2d");
var WIDTH = 482;
var HEIGHT = 482;
var ctx = canvas.getContext("2d");
var src, last_src= "_";
var dx = 12;			//Change in the x postion when an arrow key is pressed
var dy = 12;			//Change in the y postion when an arrow key is pressed
var player_x = 0;		//Players x coordinate
var player_y = 0;		//Players y coordinate
var player_score = 0;   //Players score

var answer;				//Correct answer to the equation

//Variables to store where each possible answer is displayed on the maze
var possAnswer1, possAnswer2, possAnswer3, possAnswer4;

//Variable to determine what maze was picked
var maze_type;

//Arrays hold the coordinates for each maze
var maze1_x_fraction = [49, 9, 9, 162, 275, 276, 314, 353, 125, 9, 163, WIDTH], maze1_y_fraction = [108, 372, 220, 219, 330, 145, 220, 108, 68, 23, 333, HEIGHT];
var maze1_x = [55, 20, 20, 172, 285, 287, 327, 364, 133, 20, 172, WIDTH], maze1_y = [108, 372, 220, 219, 330, 145, 220, 108, 68, 23, 333, HEIGHT];

var maze2_x_fraction = [273, 199, 311, 15, 311, 170, 48, 275, 199, WIDTH], maze2_y_fraction = [295, 375, 334, 370, 110, 110, 258, 35, 294, HEIGHT];
var maze2_x = [284, 212, 323, 15, 323, 175, 64, 280, 211, WIDTH], maze2_y= [295, 375, 334, 370, 110, 110, 258, 35, 294, HEIGHT];

var maze3_x_fraction = [84, 52, 235, 352, 352, 276, 312, 161, 123, 274, 316, WIDTH], maze3_y_fraction = [218, 105, 28, 180, 258, 147, 103, 175, 338, 294, 374, HEIGHT];
var maze3_x = [101, 52, 253, 364, 364, 287, 329, 173, 135, 289, 316, WIDTH], maze3_y =[218, 105, 28, 180, 258, 147, 103, 175, 338, 294, 374, HEIGHT];

var collision = 0;

var img = new Image();
src = "http:i.imgur.com/tgg9TNH.gif";
img.crossOrigin = "anonymous";

//Game variables
var hit_Miss = [0, 0];	//Variable to store the number of times hitting the correct answer and how many times missing the answer

var possibleAnswers = ["11/9", "1/22","3/11", "10/9" ]; //Array to store values generated that could be possible answers to the question

var answered;						//Variable to store whether or not the user has selected an answer

var algebraQuestion = [0, '', '', 0, '=', 0]; //Array that stores the equation.          Note: takes the form Ax +(-) b = c

//API declaration
var visAnswers = new test();
visAnswers.structure("array")
		.location("#answersDiv")
		.data(possibleAnswers)
		.visualize();
		
var visEquation = new test();
visEquation.structure("array")
		.location("#equationDiv")
		.data(algebraQuestion)
		.visualize();
		
function init(){
	answered = false;				//Initially the user has not selected an answer
	
	generateEquation();				//Function to generate the algebraic question/find the solution using the library algebra.js
	
	chooseMaze();					//Function to pick a maze
	
	find_Possible_Answers_Coordinates();	//Calculate/store the coordinates where each possible answer will appear on the maze
	
	last_src = src;					//Store the last maze (used in chooseMaze)
	img.src = src;
	
	requestAnimationFrame(draw);	//Draw the game

}

function chooseMaze(){
	var temp = Math.floor(Math.random() * 3) + 1;
		

	while(true){
		if(temp == 1){
			player_x = 136;
			player_y = 368;
			src = "http://i.imgur.com/FmvdAsu.gif";		//Maze 1
			maze_type = 1;
		}
		
		else if(temp == 2){
			player_x = 160;
			player_y = 20;
			src = "http://i.imgur.com/HbEh7Oy.gif";		//Maze 2
			maze_type = 2;
		}
		
		else if(temp == 3){
			player_x = 148;
			player_y = 128;
			src = "http://i.imgur.com/9w2FfaR.gif";		//Maze 3
			maze_type = 3;
		}
		
		else{
			src = "http://i.imgur.com/SYgYZ8L.gif";		//Maze 4
			maze_type = 4;
		}
		
		if(src == last_src){		//The new maze is the same as the old maze
			temp = Math.floor(Math.random() * 3) + 1;
		}
		
		else{ break;}				//The same maze wasn't used two times in a row
	}
	
}

function drawEquation(){
	ctx.font = "25px Verdana";
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	ctx.fillText(algebraQuestion[0], 0, 20);
	ctx.fillText(algebraQuestion[1], 20, 20);	
	ctx.fillText(algebraQuestion[2], 45, 20);
	ctx.fillText(algebraQuestion[3], 65, 20);
	ctx.fillText(algebraQuestion[4], 105, 20);
	ctx.fillText(algebraQuestion[5], 125, 20);
}

function drawAnswers(){		
		//Set the font/size
		ctx2.font = "bold 12px Verdana";
		var temp = possibleAnswers[0].toString(),
			temp2 = possibleAnswers[1].toString(),
			temp3 = possibleAnswers[2].toString(),
			temp4 = possibleAnswers[3].toString();
		
		if(maze_type == 1){
			
			if(temp.length > 2){ 
				ctx2.fillText(possibleAnswers[0], maze1_x_fraction[possAnswer1-1], maze1_y_fraction[possAnswer1-1]); 
			}
			
			else{ ctx2.fillText(possibleAnswers[0], maze1_x[possAnswer1-1], maze1_y[possAnswer1-1]); }
			
			//Is the answer a fraction?
			if(temp2.length > 2){
				ctx2.fillText(possibleAnswers[1], maze1_x_fraction[possAnswer2-1], maze1_y_fraction[possAnswer2-1]);
			}
			
			else{ ctx2.fillText(possibleAnswers[1], maze1_x[possAnswer2-1], maze1_y[possAnswer2-1]); }

			//Is the answer a fraction?
			if(temp3.length > 2){
				ctx2.fillText(possibleAnswers[2], maze1_x_fraction[possAnswer3-1], maze1_y_fraction[possAnswer3-1]);
			}
			
			else{ ctx2.fillText(possibleAnswers[2], maze1_x[possAnswer3-1], maze1_y[possAnswer3-1]); }
			
			//Is the answer a fraction?
			if(temp4.length > 2){
				ctx2.fillText(possibleAnswers[3], maze1_x_fraction[possAnswer4-1], maze1_y_fraction[possAnswer4-1]);
			}
			
			else{ ctx2.fillText(possibleAnswers[3], maze1_x[possAnswer4-1], maze1_y[possAnswer4-1]); }
			
		}//End of maze 1
		
		//Looking at maze 2
		if(maze_type == 2){									
			//Is the answer a fraction?
			if(temp.length > 2){ 
				ctx2.fillText(possibleAnswers[0], maze2_x_fraction[possAnswer1-1], maze2_y_fraction[possAnswer1-1]); 
			}
			
			else{ ctx2.fillText(possibleAnswers[0], maze2_x[possAnswer1-1], maze2_y[possAnswer1-1]); }
			
			//Is the answer a fraction?
			if(temp2.length > 2){
				ctx2.fillText(possibleAnswers[1], maze2_x_fraction[possAnswer2-1], maze2_y_fraction[possAnswer2-1]);
			}
			
			else{ ctx2.fillText(possibleAnswers[1], maze2_x[possAnswer2-1], maze2_y[possAnswer2-1]); }

			//Is the answer a fraction?
			if(temp3.length > 2){
				ctx2.fillText(possibleAnswers[2], maze2_x_fraction[possAnswer3-1], maze2_y_fraction[possAnswer3-1]);
			}
			
			else{ ctx2.fillText(possibleAnswers[2], maze2_x[possAnswer3-1], maze2_y[possAnswer3-1]); }
			
			//Is the answer a fraction?
			if(temp4.length > 2){
				ctx2.fillText(possibleAnswers[3], maze2_x_fraction[possAnswer4-1], maze2_y_fraction[possAnswer4-1]);
			}
			
			else{ ctx2.fillText(possibleAnswers[3], maze2_x[possAnswer4-1], maze2_y[possAnswer4-1]); }			
		}
		
		if(maze_type == 3){
			//Is the answer a fraction?
			if(temp.length > 2){ 
				ctx2.fillText(possibleAnswers[0], maze3_x_fraction[possAnswer1-1], maze3_y_fraction[possAnswer1-1]); 
			}
			
			else{ ctx2.fillText(possibleAnswers[0], maze3_x[possAnswer1-1], maze3_y[possAnswer1-1]); }
			
			//Is the answer a fraction?
			if(temp2.length > 2){
				ctx2.fillText(possibleAnswers[1], maze3_x_fraction[possAnswer2-1], maze3_y_fraction[possAnswer2-1]);
			}
			
			else{ ctx2.fillText(possibleAnswers[1], maze3_x[possAnswer2-1], maze3_y[possAnswer2-1]); }

			//Is the answer a fraction?
			if(temp3.length > 2){
				ctx2.fillText(possibleAnswers[2], maze3_x_fraction[possAnswer3-1], maze3_y_fraction[possAnswer3-1]);
			}
			
			else{ ctx2.fillText(possibleAnswers[2], maze3_x[possAnswer3-1], maze3_y[possAnswer3-1]); }
			
			//Is the answer a fraction?
			if(temp4.length > 2){
				ctx2.fillText(possibleAnswers[3], maze3_x_fraction[possAnswer4-1], maze3_y_fraction[possAnswer4-1]);
			}
			
			else{ ctx2.fillText(possibleAnswers[3], maze3_x[possAnswer4-1], maze3_y[possAnswer4-1]); }
		}
}

function draw(){
		clear();
		//ctx2.fillStyle = "purple";
		rect(player_x, player_y, 15,15);	
		//Create a new equation if the user has answered

		drawEquation();						//Draws the equation to the screen
	
		drawAnswers();

		ctx2.fillText("Hit:", 395, 10);
		ctx2.fillText(hit_Miss[0], 440, 10);
		ctx2.fillText("Miss:", 395, 25);
		ctx2.fillText(hit_Miss[1], 440, 25);

		requestAnimationFrame(draw);
}

function rect(x,y,w,h) {
	ctx2.beginPath();
	ctx2.rect(x,y,w,h);
	ctx2.closePath();
	ctx2.fill();
	
	//console.log("X = ", x);
	//console.log("Y = ", y);
	
}

function clear() {
	ctx2.clearRect(0, 0, WIDTH, HEIGHT);
	ctx2.drawImage(img, 0, 0);
}


function doKeyDown(evt){
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
			if (player_y - dy > 0){
				player_y -= dy;
				clear();
				checkcollision();
				if (collision == 1){
					player_y += dy;
					collision = 0;
				}
				else{
					checkForAnswer();
				}
			}

		break;
		case 40:  /* Down arrow was pressed */
			if (player_y + dy < HEIGHT ){
				player_y += dy;
				clear();
				checkcollision();
				if (collision == 1){
					player_y -= dy;
					collision = 0;
				}
				else{
					checkForAnswer();
				}
			}

		break;
		case 37:  /* Left arrow was pressed */
			if (player_x - dx > 0){
				player_x -= dx;
				clear();
				checkcollision();
				if (collision == 1){
					player_x += dx;
					collision = 0;
				}
				else{
					checkForAnswer();
				}
			}
		break;
		case 39:  /* Right arrow was pressed */
			if (player_x + dx < WIDTH){
				player_x += dx;
				clear();
				checkcollision();
				if (collision == 1){
					player_x -= dx;
					collision = 0;
				}
				else{
					checkForAnswer();
				}
			}
		break;
	}
}

function checkcollision() {
	var imgData = ctx2.getImageData(player_x, player_y, 15, 15);
	var pix = imgData.data;
	for (var i = 0; n = pix.length, i < n; i += 4) {
		if (pix[i] == 0) {
			collision = 1;
		}
    }
}

function checkForAnswer(){
	var temp = possibleAnswers[0].toString(),
		temp2 = possibleAnswers[1].toString(),
		temp3 = possibleAnswers[2].toString(),
		temp4 = possibleAnswers[3].toString();

	console.log("Player x = " ,player_x);
	console.log("Player y = " ,player_y);
	console.log("PossAnswer 1 = " ,maze3_x[possAnswer1-1], " ", maze3_y[possAnswer1-1]);
	console.log("PossAnswer 2 = " ,maze3_x[possAnswer2-1], " ", maze3_y[possAnswer2-1]);
	console.log("PossAnswer 3 = " ,maze3_x[possAnswer3-1], " ", maze3_y[possAnswer3-1]);
	console.log("PossAnswer 4 = " ,maze3_x[possAnswer4-1], " ", maze3_y[possAnswer4-1]);
	//console.log(possAnswer1);
		
	if(maze_type == 1){ 
		if(((player_x <= maze1_x_fraction[possAnswer1-1] && player_x+16 >= maze1_x_fraction[possAnswer1-1] ) && 		
		(player_y <= maze1_y_fraction[possAnswer1-1] && player_y+16 >= maze1_y_fraction[possAnswer1-1])) ||
		   ((player_x <= maze1_x[possAnswer1-1] && player_x+16 >= maze1_x[possAnswer1-1]) && 
		   	(player_y <= maze1_y[possAnswer1-1] && player_y+16 >= maze1_y[possAnswer1-1]))) {
			if(answer == temp){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer1 = 12;	//Sets the possAnswer value to the last index to be printed off screen
			}
			
		}
		if(((player_x <= maze1_x_fraction[possAnswer2-1] && player_x+16 >= maze1_x_fraction[possAnswer2-1] ) && 
			(player_y <= maze1_y_fraction[possAnswer2-1] && player_y+16 >= maze1_y_fraction[possAnswer2-1])) ||
		   ((player_x <= maze1_x[possAnswer2-1] && player_x+16 >= maze1_x[possAnswer2-1]) && 
		   	(player_y <= maze1_y[possAnswer2-1] && player_y+16 >= maze1_y[possAnswer2-1]))) {
			if(answer == temp2){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer2 = 12;	//Sets the possAnswer value to the last index to be printed off screen
			}
			
		}
		if(((player_x <= maze1_x_fraction[possAnswer3-1] && player_x+16 >= maze1_x_fraction[possAnswer3-1] ) && 
			(player_y <= maze1_y_fraction[possAnswer3-1] && player_y+16 >= maze1_y_fraction[possAnswer3-1])) ||
		   ((player_x <= maze1_x[possAnswer3-1] && player_x+16 >= maze1_x[possAnswer3-1]) && 
		   	(player_y <= maze1_y[possAnswer3-1] && player_y+16 >= maze1_y[possAnswer3-1]))) {
			if(answer == temp3){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer3 = 12;	//Sets the possAnswer value to the last index to be printed off screen
			}	
		}
		if(((player_x <= maze1_x_fraction[possAnswer4-1] && player_x+16 >= maze1_x_fraction[possAnswer4-1] ) && 
			(player_y <= maze1_y_fraction[possAnswer4-1] && player_y+16 >= maze1_y_fraction[possAnswer4-1])) ||
		   ((player_x <= maze1_x[possAnswer4-1] && player_x+16 >= maze1_x[possAnswer4-1]) && 
		   	(player_y <= maze1_y[possAnswer4-1] && player_y+16 >= maze1_y[possAnswer4-1]))) {
			if(answer == temp4){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer4 = 12;	//Sets the possAnswer value to the last index to be printed off screen
			}
		}
	}
	else if(maze_type == 2){
		if(((player_x <= maze2_x_fraction[possAnswer1-1] && player_x+15 >= maze2_x_fraction[possAnswer1-1] ) && 
			(player_y <= maze2_y_fraction[possAnswer1-1] && player_y+15 >= maze2_y_fraction[possAnswer1-1])) ||
		   ((player_x <= maze2_x[possAnswer1-1] && player_x+15 >= maze2_x[possAnswer1-1]) && 
		   	(player_y <= maze2_y[possAnswer1-1] && player_y+15 >= maze2_y[possAnswer1-1]))) {
			if(answer == temp){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer1 = 10;	//Sets the possAnswer value to the last index to be printed off screen
			}
		}
		if(((player_x <= maze2_x_fraction[possAnswer2-1] && player_x+15 >= maze2_x_fraction[possAnswer2-1] ) && 
			(player_y <= maze2_y_fraction[possAnswer2-1] && player_y+15 >= maze2_y_fraction[possAnswer2-1])) ||
		   ((player_x <= maze2_x[possAnswer2-1] && player_x+15 >= maze2_x[possAnswer2-1]) && 
		   	(player_y <= maze2_y[possAnswer2-1] && player_y+15 >= maze2_y[possAnswer2-1]))) {
			if(answer == temp2){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer2 = 10;	//Sets the possAnswer value to the last index to be printed off screen
			}
		}
		if(((player_x <= maze2_x_fraction[possAnswer3-1] && player_x+15 >= maze2_x_fraction[possAnswer3-1] ) && 
			(player_y <= maze2_y_fraction[possAnswer3-1] && player_y+15 >= maze2_y_fraction[possAnswer3-1])) ||
		   ((player_x <= maze2_x[possAnswer3-1] && player_x+15 >= maze2_x[possAnswer3-1]) && 
		   	(player_y <= maze2_y[possAnswer3-1] && player_y+15 >= maze2_y[possAnswer3-1]))) {
			if(answer == temp3){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer3 = 10;	//Sets the possAnswer value to the last index to be printed off screen
			}
		}
		if(((player_x <= maze2_x_fraction[possAnswer4-1] && player_x+15 >= maze2_x_fraction[possAnswer4-1] ) && 
			(player_y <= maze2_y_fraction[possAnswer4-1] && player_y+15 >= maze2_y_fraction[possAnswer4-1])) ||
		   ((player_x <= maze2_x[possAnswer4-1] && player_x+15 >= maze2_x[possAnswer4-1]) && 
		   	(player_y <= maze2_y[possAnswer4-1] && player_y+15 >= maze2_y[possAnswer4-1]))) {
			if(answer == temp4){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer4 = 10;	//Sets the possAnswer value to the last index to be printed off screen
			}
			
		}
	}
	else if(maze_type == 3){
		if(((player_x <= maze3_x_fraction[possAnswer1-1] && player_x+15 >= maze3_x_fraction[possAnswer1-1] ) && 
			(player_y <= maze3_y_fraction[possAnswer1-1] && player_y+15 >= maze3_y_fraction[possAnswer1-1])) ||
		   ((player_x <= maze3_x[possAnswer1-1] && player_x+15 >= maze3_x[possAnswer1-1]) && 
		   	(player_y <= maze3_y[possAnswer1-1] && player_y+15 >= maze3_y[possAnswer1-1]))) 
		{
			if(answer == temp){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer1 = 12;	//Sets the possAnswer value to the last index to be printed off screen
			}
			
		}
		if(((player_x <= maze3_x_fraction[possAnswer2-1] && player_x+15 >= maze3_x_fraction[possAnswer2-1] ) && 
			(player_y <= maze3_y_fraction[possAnswer2-1] && player_y+15 >= maze3_y_fraction[possAnswer2-1])) ||
		   ((player_x <= maze3_x[possAnswer2-1] && player_x+15 >= maze3_x[possAnswer2-1]) && 
		   	(player_y <= maze3_y[possAnswer2-1] && player_y+15 >= maze3_y[possAnswer2-1]))) {
			if(answer == temp2){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer2 = 12;	//Sets the possAnswer value to the last index to be printed off screen
			}
			
		}
		if(((player_x <= maze3_x_fraction[possAnswer3-1] && player_x+15 >= maze3_x_fraction[possAnswer3-1] ) && 
			(player_y <= maze3_y_fraction[possAnswer3-1] && player_y+15 >= maze3_y_fraction[possAnswer3-1])) ||
		   ((player_x <= maze3_x[possAnswer3-1] && player_x+15 >= maze3_x[possAnswer3-1]) && 
		   	(player_y <= maze3_y[possAnswer3-1] && player_y+15 >= maze3_y[possAnswer3-1]))) {
			if(answer == temp3){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer3 = 12;	//Sets the possAnswer value to the last index to be printed off screen
			}	
			
		}
		if(((player_x <= maze3_x_fraction[possAnswer4-1] && player_x+15 >= maze3_x_fraction[possAnswer4-1] ) && 
			(player_y <= maze3_y_fraction[possAnswer4-1] && player_y+15 >= maze3_y_fraction[possAnswer4-1])) ||
		   ((player_x <= maze3_x[possAnswer4-1] && player_x+15 >= maze3_x[possAnswer4-1]) && 
		   	(player_y <= maze3_y[possAnswer4-1] && player_y+15 >= maze3_y[possAnswer4-1]))) {
			if(answer == temp4){
				player_score += 1;
				hit_Miss[0] += 1;
				init();
			}
			else{
				hit_Miss[1] +=1;
				possAnswer4 = 12;	//Sets the possAnswer value to the last index to be printed off screen
			}
			
		}
	}
	
}





function find_Possible_Answers_Coordinates(){
	//Looking at maze 1
	if(maze_type == 1 || maze_type == 3){
		possAnswer1 = Math.floor(Math.random() * 11) + 1;
		possAnswer2 = Math.floor(Math.random() * 11) + 1;
		possAnswer3 = Math.floor(Math.random() * 11) + 1;
		possAnswer4 = Math.floor(Math.random() * 11) + 1;
		
		//While loops will run until all four indices are different
		while(possAnswer2 == possAnswer1){
			possAnswer2 = Math.floor(Math.random() * 11) + 1;
		}
	
		while(possAnswer3 == possAnswer1 || possAnswer3 == possAnswer2){
			possAnswer3 = Math.floor(Math.random() * 11) + 1;
		}
	
		while(possAnswer4 == possAnswer1 || possAnswer4 == possAnswer2 || possAnswer4 == possAnswer3){
			possAnswer4 = Math.floor(Math.random() * 11) + 1;
		}
		
		console.log(possAnswer1, possAnswer2, possAnswer3, possAnswer4);
	}//end of maze 1
	
	
	//Looking at maze 2
	if(maze_type == 2){
		possAnswer1 = Math.floor(Math.random() * 9) + 1;
		possAnswer2 = Math.floor(Math.random() * 9) + 1;
		possAnswer3 = Math.floor(Math.random() * 9) + 1;
		possAnswer4 = Math.floor(Math.random() * 9) + 1;
		
		//While loops will run until all four indices are different
		while(possAnswer2 == possAnswer1){
			possAnswer2 = Math.floor(Math.random() * 9) + 1;
		}
	
		while(possAnswer3 == possAnswer1 || possAnswer3 == possAnswer2){
			possAnswer3 = Math.floor(Math.random() * 9) + 1;
		}
	
		while(possAnswer4 == possAnswer1 || possAnswer4 == possAnswer2 || possAnswer4 == possAnswer3){
			possAnswer4 = Math.floor(Math.random() * 9) + 1;
		}
		
		console.log(possAnswer1, possAnswer2, possAnswer3, possAnswer4);
	}//end of maze 2
	
}

function generateEquation(){
	var variable = random_character();					//Random character between a-z and A-Z	Note: this is the variable in the equation
	var const1 = Math.floor(Math.random() * 9) + 1;	//Random integer between 1 and 9       Note: this is the coefficient of the variable
	var const2 = Math.floor(Math.random() * 20) + 1;	//Random integer between 1 and 20		Note: this is the constant that is subtracted/added
	var operator = Math.floor(Math.random() * 2) + 1;	//Random integer between 1 and 2		Note: this will either be + or -
	var const3 = Math.floor(Math.random() * 25) + 1;	//Random integer between 1 and 50		Note: this is the constant on the right hand side of the equal sign
	
	if(operator == 1){
		while( (const3 - const2) % const1 != 0 ){
			//const1 = Math.floor(Math.random() * 9) + 1;
			const2 = Math.floor(Math.random() * 20) + 1;
			const3 = Math.floor(Math.random() * 25) + 1;
		}
	}
		
	else{
		while( (const3 + const2) % const1 != 0 ){
			//const1 = Math.floor(Math.random() * 9) + 1;
			const2 = Math.floor(Math.random() * 20) + 1;
			const3 = Math.floor(Math.random() * 25) + 1;
		}
	}
	
	/*
	//Eliminates negative solution to the problem
	while(operator == 1 && const3 < const2){
		const3 = Math.floor(Math.random() * 25) + 1;
	}
	*/
	
	//Below this uses algebra.js
		var expr = new Expression(variable.toString());		//Creates a new expression using the variable generated above
	
		for(var i = 0; i < const1 - 1; ++i){
			expr = expr.add(variable.toString());			//Will set the leading coefficient of the equation   
		}													//For example: if const1 == 5 -> loop runs 4 times (we already have one from above) ^												
	
		if(operator == 1){									//Randomly picking whether the equation has subtraction or addition
			operator = '+';
			expr = expr.add(const2);
		}
	
		else{
			operator = String.fromCharCode(8211);
			expr = expr.subtract(const2);
		}
	
		var equ = new Equation(expr, const3);				//Creates an equation of the form       const1*variable <operator> const2 = const3
	
		var solve = equ.solveFor(variable);					//Solves the equation for the variable

		answer = solve.toString();
	
	//Store the algebraic expression into the array
	algebraQuestion[0] = const1;
	algebraQuestion[1] = variable;
	algebraQuestion[2] = operator;
	algebraQuestion[3] = const2;
	algebraQuestion[5] = const3;
	
	//Update API visualization
	visEquation.update(algebraQuestion);
	
	var rand_ = Math.floor(Math.random() * 4) + 1;			//Generate a random number between 1 and 4
															//This will be used to randomly place the correct solution into the
															//solutions array
															
	possibleAnswers[rand_ - 1] = answer;			//Stores the correct answer 	Note: the other three should be wrong answers
	
	fillWrongAnswers(rand_);								//This function will fill the possibleAnswers array with random numbers
}

function fillWrongAnswers(solutionIndex){
	var incorrectIndex1, incorrectIndex2, incorrectIndex3; 		//Indices to store the three incorrect solutions
	incorrectIndex1 = incorrectIndex2 = incorrectIndex3 = solutionIndex;
	
	//While loops will run until all four indices are different
	while(incorrectIndex1 == solutionIndex){
		incorrectIndex1 = Math.floor(Math.random() * 4) + 1;
	}
	
	while(incorrectIndex2 == solutionIndex || incorrectIndex2 == incorrectIndex1){
		incorrectIndex2 = Math.floor(Math.random() * 4) + 1;
	}
	
	while(incorrectIndex3 == solutionIndex || incorrectIndex3 == incorrectIndex1 || incorrectIndex3 == incorrectIndex2){
		incorrectIndex3 = Math.floor(Math.random() * 4) + 1;
	}
	
	//Generate the actual values to be stored at each index
	var numer, denom, ans;
	var fractChance = Math.floor(Math.random() * 2) + 1;		//50% chance incorrectIndex1 will contain a 
																//fractional answer
	//Generate a solution to be stored at incorrectIndex1
	//Note: this if statement fails when fractChance == 1
	if(fractChance - 1){
		//Create a fractional solution to be stored in possibleAnswers array
		numer = Math.floor(Math.random() * 9) + 1;
		denom = Math.floor(Math.random() * 9) + 1;
		
		if(numer == denom){
			ans = 1;
		}
		
		else{ 
			ans = new Fraction(numer, denom);
		}
		
		possibleAnswers[incorrectIndex1 - 1] = ans.toString();
	}	
	
	else{
		//Randomly generate an integer
		ans = Math.floor(Math.random() * 10) + 1;
		possibleAnswers[incorrectIndex1 - 1] = ans;
	}
	
	//Generate a solution to be stored at incorrectIndex2
	ans = Math.floor(Math.random() * 10) + 1;
	possibleAnswers[incorrectIndex2 - 1] = ans;
	
	//Generate a solution to be stored at incorrectIndex3
	//Note: the value stored at possibleAnswers[incorrectIndex3 - 1] will always be a fraction
	numer = Math.floor(Math.random() * 9) + 1;
	denom = Math.floor(Math.random() * 9) + 1;
	
	while(numer.toString().length == 2 && denom.toString().length == 2){
			numer = Math.floor(Math.random() * 9) + 1;
			denom = Math.floor(Math.random() * 9) + 1;
	}
	
	//Check if numer = denom => answer is 1
	if(numer == denom){
		ans = 1;
	}
	//Otherwise create a new fraction
	else{
		ans = new Fraction(numer, denom);
	}	
	
	possibleAnswers[incorrectIndex3 - 1] = ans.toString();
	
	//console.log(possibleAnswers);
	
	//Update API visualization
	visAnswers.update(possibleAnswers);	//Update the API visualization
}

//Function that will generate a random variable from the alphabet in the equation
function random_character() {
    var chars = "abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
    return chars.substr( Math.floor(Math.random() * 52), 1);
}


init();				//Function call to start the game

window.addEventListener('keydown',doKeyDown,true);