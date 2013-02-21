function Tris(player1Name, player2Name) {

    this.player1 = new Player(player1Name, 1);
    this.player2 = new Player(player2Name, 2);
    this.board = undefined;
    this.currentPlayer = this.player1;
    this.lastWonPlayer = undefined;
    this.state = undefined;

    this.newGame = function () {
        this.board = [[0, 0, 0],
                      [0, 0, 0],
                      [0, 0, 0]];

        // starts who loses, the first game goes to player1
        if (this.lastWonPlayer != undefined) {
            if (this.lastWonPlayer == this.player1)
                this.currentPlayer = this.player2;
            else
                this.currentPlayer = this.player1;
        }

        this.state = GameState.InGame;
    };

    this.doMove = function (move) {
        if(this.state != GameState.InGame)
            throw "Game is end";
        if (!this.isMoveAllowed(move))
            throw "Not allowed move!";

        this.board[move.x, move.y] = this.currentPlayer.number;
        this.updateGameState();

        switch(this.state){
            case GameState.InGame:
                this.changePlayer();
                break;
            case GameState.Won:
                this.lastWonPlayer = this.currentPlayer;
                break;
            case GameState.Draw) 
                break;
            default:
                throw "Not valid state";
                break;
        }
    };

    this.isMoveAllowed = function (move) {
        var currentState = this.board[move.x, move.y];
        if (currentstate == 0)
            return true;
        else
            return false;
    }

    this.isCurrentPlayerWin = function () {
        this.currentPlayer
    }

    this.updateGameState = function () {
        var result = GameState.InGame;

        for(var i=0; i<3; i++){
            if(this.board[i,0] == this.board[i,1] == this.board[i,2] ||
               this.board[0,i] == this.board[1,i] == this.board[2,i])
                result = GameState.Won;
        }
        if(this.board[0,0] == this.board[1,1] == this.board[2,2] ||
           this.board[0,2] == this.board[1,1] == this.board[2,0])
            result = GameState.Won;

        if(result != games.Won){        
            var noMove = true;
            for(var i in this.board){
                if(this.board[i] == 0){
                    noMove = true;
                    break;
                }
            }
            if(noMove)
                result = games.Draw;
        }
        return result;
    }

    this.newGame();
}

function Player(name, number) {
    this.score = 0;
    this.number = number;
}

function Move(x, y) {
    if (x < 0 || x > 2)
        throw "x not valid";
    if (y < 0 || y > 2)
        throw "y not valid";

    this.x = x;
    this.y = y;
}

GameState = {
    Won: "won",
    Draw: "draw",
    InGame: "inGame"
}