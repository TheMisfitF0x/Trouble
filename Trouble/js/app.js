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
    moveIndicator = document.getElementById("MoveAmountIndicator");
    colors = ["#c30000", "#1200b3", "#fccb00", "#008b02"];

    constructor(playerCount) {
        //Create board base
        let newBoard = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        newBoard.classList.add("gameBoard");
        this.gameZone.appendChild(newBoard);

        let popper = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        popper.classList.add("popper");
        this.gameZone.appendChild(popper);

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
            for (var positions = 0; positions < 11; positions++) {
                let newSpaceEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                newSpaceEl.classList.add("space");
                newSpaceEl.setAttribute("cx", spaceLocations[teams][positions].x);
                newSpaceEl.setAttribute("cy", spaceLocations[teams][positions].y);

                this.gameZone.appendChild(newSpaceEl);
                newSpaceEl.style.stroke = this.colors[teams];
                this.spaces += new Space(teams, positions, newSpaceEl);
            }
        }

        console.log(this.spaces[0].element);

        //Create pieces
        this.pieces = [];
        for (var createdTeams = 0; createdTeams < playerCount; createdTeams++) {
            for (var createdPieces = 0; createdPieces < 4; createdPieces++) {
                this.pieces += new PlayerPiece(createdTeams);
            }
        }

        //Get the first move amt.
        this.currentMoveAmt = this.Pop();

        //Set the max players
        this.playerAmt = Number(playerCount);
        console.log(this.playerAmt);

        //Set the active player
        this.currentPlayer = 0;
    }

    ValidateLandingSpace(piece, currentSpace, spacesToMove) {
        //Checks the space spacesToMove away from the provided one, returns true if it is a valid place to land and false if not.
        //Uses team from provided piece to determine if finish line and other pieces are valid landing spots.
    }

    //Generates a new move amt and updates the popper in the middle of the board.
    Pop() {
        let newVal = Math.round(Math.random() * 6);
        //Update the popper in the middle with new value
        return newVal;
    }

    //Sets the new currentPlayer to the next player in line and generates a new move amt for them.
    NextTurn() {
        this.currentPlayer++;
        if (this.currentPlayer == this.playerAmt) {
            this.currentPlayer = 0;
        }
        this.currentMoveAmt = this.Pop();
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