class Space {
    constructor(team, position) {
        this.team = team;
        this.position = position;
        this.isOccupied = false;
        this.occupier = null;
    }
}