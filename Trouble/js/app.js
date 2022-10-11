import Board from "./Board.js";


class PlayerPiece {
    constructor(team) {
        this.team = team;

        //Move this piece into the player's home based on team. It has no "space" until left start
        this.space = null;

        //Starts in Start
        this.inStart = true;
        this.inFinish = false;
    }

    MoveToSpace(x) {
        //Check if x == 6 and inStart. If so run leaveStart and return it's value.
        //Use x to determine how many spaces to move, and use the board's nextSpace function to figure out how many spaces actually count. 
        //Then, check the destination to see if it's a valid landing space. If so, move and return true. If not, return false.
    }

    LeaveStart() {
        //Check the start space, if clear move this onto that space and return true. Else return false.
        //Called by MoveXSpaces()
    }

    GoToStart() {
        //Go back to start if bumped by another piece from a different team. 
        //Called by MoveXSpaces()
    }
}

class Space {
    constructor(team, position) {
        this.team = team;
        this.position = position;
        this.isOccupied = false;
        this.occupier = null;
    }
}

let playerInput = document.getElementById("PlayerCountInput");
console.log(playerInput);
let gameBoard = null;
function CreateGame() {
    gameBoard = new Board(playerInput.value);
    console.log(gameBoard);
    playerInput.remove();
    document.getElementById("PlayerCountButton").remove();
}