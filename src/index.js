const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
//.score querySelector()
const score = document.querySelector('#score');
//.timer querySelector()
const timerDisplay = document.querySelector('#timer');

//const score; // Use querySelector() to get the score element
//const timerDisplay; // use querySelector() to get the timer element.

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
 function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  // TODO: Write your code here.
  //let delay = setDelay; 

  //map difficulty
  if (difficulty === 'easy') {
    return 1500; // 1.5 seconds for easy
  } else if (difficulty === 'normal') {
    return 1000; // 1 seconds for normal
  } else if (difficulty === 'hard') {
    return 800; // less than 1 second for hard
  } else {
    throw new Error("Invalid difficulty level. Choose 'easy', 'normal', or 'hard'.");
  }
}

// setTimeout(() => {
//   console.log(`Action executed with a ${difficulty} difficulty delay of ${delay / 1000} seconds`);
// }, delay);


// Example usage:
// setDelay('easy');   // Delay by 1 seconds
// setDelay('normal'); // Delay by 1.5 seconds
// setDelay('hard');   // Delay by less than 1 second

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//let lastHole; (to keep track of the last chosen hole)

function chooseHole(holes) {
    // Step 1: Generate a random index from 0 to 8
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index]; // Step 2: Choose the hole at that index

    // Step 3: Check if the chosen hole is the same as the last hole
    if (hole === lastHole) {
        return chooseHole(holes); // Call the function again if it’s the same hole
    }

    // Step 4: Update lastHole and return the new hole
    lastHole = hole;
    return hole;
}


/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  showUp();
  if (time > 0) {
      // Call showUp and store the returned timeout ID (should be a number)
      const timeoutId = showUp();
      //console.log("timeoutId", timeoutId)
      return timeoutId; // Return the timeout ID if the game continues
  } else {
      // Call stopGame if time is 0 and return "game stopped"
     // stopGame();
      return stopGame();
  }
}


/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  //const timeoutId = showAndHide(hole, delay);
  return showAndHide(hole, delay); // Ensure this returns the `setTimeout` ID
}


/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay) {
  // Step 1: Call toggleVisibility to add the 'show' class
  toggleVisibility(hole);

  // Step 2: Use setTimeout with the provided delay to hide the hole
  const timeoutID = setTimeout( () => {
      // Call toggleVisibility again to remove the 'show' class
      toggleVisibility(hole);
      if(stopGame){
       hole.classList.remove("show") 
      gameOver(); // Call gameOver or other functions as necessary
      }
    }, delay); // Use the delay parameter instead of 0

  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.
  
  hole.classList.toggle('show');

  return hole;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  // TODO: Write your code here
 // Step 1: Increment the points global variable
 points += 1;
 //console.log("score", score)
 // Step 2: Update the scoreboard text in the HTML
// const score = document.getElementById('score'); // Get the score element
 //if (score) {
   score.textContent = points; // Update the score display
 //}
 //document.getElementById('score').innerText = points.toString();
 // Return the updated points value
 return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  // Step 1: Reset points to 0
  points = 0;

  // Step 2: Update the scoreboard to reflect the cleared score
  score.textContent = points;

  // Step 3: Return the updated points (which is now 0)
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  // Check if there’s still time left
  if (time > 0) {
      // Decrement the time
      time -= 1;

      // Update the control board display
      //const timerDisplay = document.querySelector('#timer'); // Assume the timer display has the ID 'timer'
      timerDisplay.textContent = time; // Update the display with the current time
  }
  // Return the updated time
  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  // TODO: Write your code here
   timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack() {
  // Call updateScore to increment the points
  updateScore();

  // Return the updated points value
  return points;
}


/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners() {
  
  moles.forEach(mole => {
      mole.addEventListener('click', whack);
  });
}


/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame(){
  
  setDuration(30);
  showUp();
  setEventListeners();
  startTimer();
  //showUp(); 
  clearScore();
  return "game started";
}

startButton.addEventListener('click', startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
