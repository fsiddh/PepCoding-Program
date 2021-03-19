#include <iostream>
#include <vector>

using namespace std;

void display(vector< vector<int> >board){
    for(int i=0; i<board.size(); i++){
        for(int j=0; j<board[0].size(); j++){
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
}

bool isValid(vector< vector<int> > board, int x, int y, int po){
    for(int j=0; j<board[0].size(); j++){
        if(board[x][j] == po){
            return false;
        }
    }

    for(int i=0; i<board.size(); i++){
        if(board[i][y] == po){
            return false;
        }
    }

    int smi = x / 3 * 3;
    int smj = y / 3 * 3;
    for(int i=0; i<3; i++){
        for(int j=0; j<3; j++){
            if(board[smi+i][smj+j] == po){
                return false;
            }
        }
    }

    return true;
}

void solveSudoku(vector< vector<int> > &board, int i, int j){
    
    if(i == board.size()){
        display(board);
        return;
    }

    int ni = 0;
    int nj = 0;
    if(j == board[0].size()-1){
        ni = i+1;
        nj = 0;
    }
    else{
        ni = i;
        nj = j+1;
    }

    if(board[i][j] != 0){
        solveSudoku(board, ni, nj);
    }
    else{
        for(int po=1; po<=9; po++){
            if(isValid(board, i, j, po) == true){
                board[i][j] = po;
                solveSudoku(board, ni, nj);
                board[i][j] = 0;
            }
        }
    }
}

int main(){
    int n = 9;
    int m = 9;
    vector< vector<int> > board(n, vector<int>(m, 0));

    for(int i=0; i<n; i++){
        for(int j=0; j<m; j++){
            cin >> board[i][j];
        }
    }
    
    solveSudoku(board, 0, 0);
}