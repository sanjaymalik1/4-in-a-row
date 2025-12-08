export const initialBoard = Array.from({ length: 6 }, () => Array(7).fill(null));


export function placeToken(colNo){
    
    const newBoard = Board.map(row => [...row])

    for(let r = 5; r<=0 ; r--){
        if(newBoard[row][colNo] === null){
            newBoard[row][colNo] = currentPlayer;
            return {newBoard,success : true};
        }
    }

    return {newBoard,success : false};
    // setBoard(newBoard)

    // if(checkWinner(newBoard)){
    //     setWinner(currentPlayer)
    //     return;
    // }

    // setCurrentPlayer(currentPlayer=="A" ? "B" : "A");
}

export function checkWinner(board){
    for(let r=0; r<6; r++){
        for(let c=0; c<7; c++){
            if(!board[r][c]){
                continue;
            }

            //horizontal
            if(c<4 && board[r][c] === board[r][c+1] && board[r][c] === board[r][c+2] && board[r][c] === board[r][c+3]){
                return true;
            }
            //vertical
            if(r<3 && board[r][c] === board[r+1][c] && board[r][c] === board[r+2][c] && board[r][c] === board[r+3][c]){
                return true
            }
            //left->right diagonal
            if(r<3 && c<4 && board[r][c] === board[r+1][c+1] && board[r][c] === board[r+2][c+2] && board[r][c] === board[r+3][c+3]){
                return true
            }
            //right->left diagonal
            if(r<3 && c>2 && board[r][c] === board[r+1][c-1] && board[r][c] === board[r+2][c-2] && board[r][c] === board[r+3][c-3]){
                return true
            }
        }
    }
    return false;
}