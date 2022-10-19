class PlayerPiece {
    constructor(team, element) {
        this.team = team;
        this.element = element;

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
        //Called by MoveToSpace
    }

    GoToStart() {
        //Go back to start if bumped by another piece from a different team. 
        //Called by MoveToSpace
    }
}

class Space {
    constructor(team, position, element) {
        this.team = team;
        this.position = position;
        this.element = element;
        this.isOccupied = false;
        this.occupier = null;
    }
}

class Board {
    gameZone = document.getElementById("gameZone");
    popperText = document.getElementById("message");
    colors = ["#c30000", "#1200b3", "#fccb00", "#008b02"];

    constructor(playerCount) {
        //Create board base
        let newBoard = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        newBoard.classList.add("gameBoard");
        this.gameZone.appendChild(newBoard);

        let popper = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        popper.classList.add("popper");
        popper.addEventListener("click", (event) => { this.Pop() })
        this.gameZone.appendChild(popper);

        //Create locations... lots' of locations.
        let spaceLocations = [
            [
                { x: 500, y: 300 },
                { x: 500, y: 350 },
                { x: 500, y: 400 },
                { x: 500, y: 450 },
                { x: 450, y: 450 },
                { x: 420, y: 420 },
                { x: 390, y: 390 },
                { x: 360, y: 360 },
                { x: 450, y: 500 },
                { x: 400, y: 500 },
                { x: 350, y: 500 }
            ],
            [
                { x: 300, y: 500 },
                { x: 250, y: 500 },
                { x: 200, y: 500 },
                { x: 150, y: 500 },
                { x: 150, y: 450 },
                { x: 180, y: 420 },
                { x: 210, y: 390 },
                { x: 240, y: 360 },
                { x: 100, y: 450 },
                { x: 100, y: 400 },
                { x: 100, y: 350 }
            ],
            [
                { x: 100, y: 300 },
                { x: 100, y: 250 },
                { x: 100, y: 200 },
                { x: 100, y: 150 },
                { x: 150, y: 150 },
                { x: 180, y: 180 },
                { x: 210, y: 210 },
                { x: 240, y: 240 },
                { x: 150, y: 100 },
                { x: 200, y: 100 },
                { x: 250, y: 100 }
            ],
            [
                { x: 300, y: 100 },
                { x: 350, y: 100 },
                { x: 400, y: 100 },
                { x: 450, y: 100 },
                { x: 450, y: 150 },
                { x: 420, y: 180 },
                { x: 390, y: 210 },
                { x: 360, y: 240 },
                { x: 500, y: 150 },
                { x: 500, y: 200 },
                { x: 500, y: 250 }
            ]

        ]

        //Create Space References
        this.spaces = [];
        for (var teams = 0; teams < 4; teams++) {
            this.spaces[teams] = [];
            for (var positions = 0; positions < 11; positions++) {
                let newSpaceEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                newSpaceEl.classList.add("space");
                newSpaceEl.setAttribute("cx", spaceLocations[teams][positions].x);
                newSpaceEl.setAttribute("cy", spaceLocations[teams][positions].y);

                this.gameZone.appendChild(newSpaceEl);
                newSpaceEl.style.stroke = this.colors[teams];
                this.spaces[teams][positions] = new Space(teams, positions, newSpaceEl);
            }
        }



        //Create pieces
        this.pieces = [];
        var offset = 0;
        for (var createdTeams = 0; createdTeams < playerCount; createdTeams++) {
            this.pieces[createdTeams] = [];
            for (var createdPieces = 0; createdPieces < 4; createdPieces++) {
                let newPieceEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                newPieceEl.classList.add("piece")
                var newX = (25 * offset) + 10;
                var newY = 580;
                newPieceEl.setAttribute("cx", newX);
                newPieceEl.setAttribute("cy", newY);
                newPieceEl.style.fill = this.colors[createdTeams];
                this.gameZone.appendChild(newPieceEl);
                this.pieces[createdTeams][createdPieces] = new PlayerPiece(createdTeams);

                offset++;
            }
        }

        this.hasPopped = false;
        this.hasPlayed = false;

        //Set the max players
        this.playerAmt = Number(playerCount);
        console.log(this.playerAmt);

        //Set the active player
        this.currentPlayer = 0;

        this.popperText.innerText = "Player " + (this.currentPlayer + 1) + "'s turn. Press the popper!";
    }

    FindLandingSpaces(spacesToMove) {
        //First, check the pieces to see if any can move out of start. If so, mark the current players start square as an option.
        let validMoveFound = true;
        if (spacesToMove == 6) {
            for (var piece = 0; piece < this.pieces[this.currentPlayer].length; pieces++) {
                if (this.pieces[this.currentPlayer][piece].inStart == true) {
                    this.spaces[this.currentPlayer][8].classList.add("selectedspace");
                    //Create listener for this space.
                    validMoveFound == true;
                    break;
                }
            }
        }

        //Next, check all the player's pieces (out of start) to ensure they have a place they can land.
        for (var piece = 0; piece < this.pieces[this.currentPlayer].length; pieces++) {
            if (this.pieces[this.currentPlayer][piece].inStart == false) {
                var startSpace = this.pieces[this.currentPlayer][piece].space;
                for (var validSpaces = 1; validSpaces < spacesToMove; validSpaces++) {
                    let validSpaceFound = false;
                    while (validSpaceFound = false) {

                    }
                }
            }
        }

        //Checks the space spacesToMove away from the provided one, returns true if it is a valid place to land and false if not.
        //Uses team from provided piece to determine if finish line and other pieces are valid landing spots.
    }

    //Generates a new move amt and updates the popper in the middle of the board. Only do this if the current player has moved.
    Pop() {
        if (this.hasPopped == false) {
            let newVal = 0;

            do {//Generate random numberes till I get one that isn't zero.
                newVal = Math.round(Math.random() * 6);
            } while (newVal == 0)

            this.currentMoveAmt = newVal;
            this.hasPopped = true;
            this.popperText.innerText = "Player " + (this.currentPlayer + 1) + "'s turn. Move: " + this.currentMoveAmt;
            this.FindLandingSpaces(newVal);
        }
    }

    //Sets the new currentPlayer to the next player in line and prompt to pop
    NextTurn() {
        this.currentPlayer++;
        if (this.currentPlayer == this.playerAmt) {
            this.currentPlayer = 0;
        }
        this.hasPopped = false;
        this.popperText.innerText = "Player " + (this.currentPlayer + 1) + "'s turn. Press the popper!";
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