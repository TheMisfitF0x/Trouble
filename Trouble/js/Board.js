export default class Board {

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

        this.moveIndicator.setAttribute("opacity", "1");

        //Create Space References
        this.spaces = [];
        for (var teams = 0; teams < 4; teams++) {
            for (var positions = 0; positions < 12; positions++) {
                this.spaces += new Space(teams, positions);
            }
        }

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