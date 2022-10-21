class PlayerPiece {
    constructor(team, element, board) {
        this.team = team;
        this.element = element;
        this.board = board;

        this.space = null;
        this.destination = null;

        //Starts in Start
        this.inStart = true;
        this.inFinish = false;
    }

    MoveToSpace() {
        console.log(this);
        //Set space to destination, set my element position to equal destination's position

        if (this.board.hasPlayed == false) {
            if (this.space != null) {
                this.space.isOccupied = false;
            }
            this.space = this.destination;
            this.destination.isOccupied = true;
            this.element.setAttribute("cx", this.destination.element.dataset.x);
            this.element.setAttribute("cy", this.destination.element.dataset.y);
            this.board.hasPlayed = true;
            if (this.destination.position > 3 && this.destination.position < 8) {
                this.inFinish == true;
            }
            this.board.NextTurn();
            console.log("Moved");
            if (this.inStart == true) {
                this.inStart = false;
            }
        }

    }

    AddListener() {
        this.element.addEventListener("click", (event) => { this.MoveToSpace() });
    }

    RemoveListener() {
        this.element.removeEventListener("click", (event) => { this.MoveToSpace() });
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
                newSpaceEl.dataset.x = spaceLocations[teams][positions].x;
                newSpaceEl.dataset.y = spaceLocations[teams][positions].y;

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
                this.pieces[createdTeams][createdPieces] = new PlayerPiece(createdTeams, newPieceEl, this);
                this.pieces[createdTeams][createdPieces].destination = this.spaces[createdTeams][8];
                offset++;
            }
        }

        this.hasPopped = false;
        this.hasPlayed = true;

        //Set the max players
        this.playerAmt = Number(playerCount);
        console.log(this.playerAmt);

        //Set the active player
        this.currentPlayer = 0;

        //Create Local Listeners
        for (var x = 0; x < this.pieces[this.currentPlayer].length; x++) {
            this.pieces[this.currentPlayer][x].AddListener();
        }

        this.popperText.innerText = "Player " + (this.currentPlayer + 1) + "'s turn. Press the popper!";
    }

    FindLandingSpaces(spacesToMove) {
        //First, check the pieces to see if any can move out of start. If so, mark the current players start square as an option.
        let validMoveFound = false;
        if (spacesToMove == 6) {
            for (var piece = 0; piece < this.pieces[this.currentPlayer].length; piece++) {
                if (this.pieces[this.currentPlayer][piece].inStart == true && this.spaces[this.currentPlayer][8].isOccupied == false) {
                    this.spaces[this.currentPlayer][8].element.classList.add("selectedspace");
                    //this.spaces[this.currentPlayer][8].element.addEventListener("click", piece.MoveToSpace); //piece.MoveToSpace(this.spaces[this.currentPlayer][8]))
                    validMoveFound = true;
                    console.log("Start is an option")
                    break;
                }
            }
        }

        //Next, check all the player's pieces (out of start) to ensure they have a place they can land.
        for (var piece = 0; piece < this.pieces[this.currentPlayer].length; piece++) {
            if (this.pieces[this.currentPlayer][piece].inStart == false && this.pieces[this.currentPlayer][piece].inFinish == false) {
                console.log("Piece " + piece + " is out of start")
                var startSpace = this.pieces[this.currentPlayer][piece].space;
                var validSpacesFound = 0;
                var spaceOffset = 1;
                var teamOffset = 0;
                while (validSpacesFound < spacesToMove) {
                    if (startSpace.position + spaceOffset >= 11)//Check if the next space is in the next section of the board
                    {
                        console.log("Next Team Area");
                        spaceOffset -= 11;
                        teamOffset++;
                    }

                    if (startSpace.team + teamOffset == 4) {
                        console.log("SetBackTeams");
                        teamOffset -= 4;
                    }

                    //Check if the evaluated space is a finish space. if the team's good, do nothing. If not, add 4 to the offset to skip all finish spaces, then continue.
                    if (startSpace.position + spaceOffset == 4) {
                        if (startSpace.team + teamOffset != this.currentPlayer) {
                            spaceOffset += 4;
                            console.log("Skipping foreign finish");
                            continue;
                        }
                    }

                    validSpacesFound++;
                    //Check if this is the final spot (spaceToMove - 1). If it is, check if it's occupied. If so, do nothing. If not, set a listener and set valid spot found to true
                    if (validSpacesFound == spacesToMove && this.spaces[startSpace.team + teamOffset][startSpace.position + spaceOffset].isOccupied == false) {
                        validMoveFound = true;
                        this.pieces[this.currentPlayer][piece].destination = this.spaces[startSpace.team + teamOffset][startSpace.position + spaceOffset];
                        this.spaces[startSpace.team + teamOffset][startSpace.position + spaceOffset].element.classList.add("selectedspace");
                    }

                    spaceOffset++;
                }
            }
        }

        if (validMoveFound == false) {
            this.hasPlayed = true;
            this.NextTurn();
            console.log("Skipping");
        }
    }

    //Generates a new move amt and updates the popper in the middle of the board. Only do this if the current player has moved.
    Pop() {
        if (this.hasPopped == false && this.hasPlayed == true) {
            let newVal = 0;

            do {//Generate random numberes till I get one that isn't zero.
                newVal = Math.round(Math.random() * 6);
            } while (newVal == 0)

            this.currentMoveAmt = newVal;
            this.hasPopped = true;
            this.hasPlayed = false;
            this.popperText.innerText = "Player " + (this.currentPlayer + 1) + "'s turn. Move: " + this.currentMoveAmt;
            console.log("Move Rolled: " + newVal);
            this.FindLandingSpaces(newVal);
        }
    }

    //Sets the new currentPlayer to the next player in line and prompt to pop
    NextTurn() {
        for (var x = 0; x < this.spaces.length; x++) {
            for (var y = 0; y < this.spaces[x].length; y++) {
                this.spaces[x][y].element.classList.remove("selectedspace");
            }
        }
        for (var x = 0; x < this.pieces[this.currentPlayer].length; x++) {
            this.pieces[this.currentPlayer][x].RemoveListener();
        }
        this.currentPlayer++;
        if (this.currentPlayer == this.playerAmt) {
            this.currentPlayer = 0;
        }
        for (var x = 0; x < this.pieces[this.currentPlayer].length; x++) {
            this.pieces[this.currentPlayer][x].AddListener();
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
    playerInput.remove();
    document.getElementById("PlayerCountButton").remove();
}