#include <iostream>
#include <vector>
#include <climits>

using namespace std;

void goldmine(vector<vector<int>> &board, vector<vector<bool>> &visited, int i, int j, vector<int> &bag){
    if (i<0 || j<0 || i>board.size()-1 || j>board[0].size()-1 ||
        board[i][j] == 0 || visited[i][j] == true){
            return;
        }

    bag.push_back(board[i][j]);
    visited[i][j] = true;

    goldmine(board, visited, i-1, j, bag);
    goldmine(board, visited, i, j-1, bag);
    goldmine(board, visited, i+1, j, bag);
    goldmine(board, visited, i, j+1, bag);
}

int main(){
    int n; cin >> n;
    int m; cin >> m;
    vector< vector<int> > board(n, vector<int>(m, 0));
    vector< vector<bool> > visited(n, vector<bool>(m, false));

    for(int i=0; i<n; i++){
        for(int j=0; j<m; j++){
            cin >> board[i][j];
        }
    }

    int max_gold = INT_MIN;
    for(int i=0; i<board.size(); i++){
        for(int j=0; j<board[0].size(); j++){
            if (board[i][j] != 0 || visited[i][j] == false){
                vector<int> bag;
                goldmine(board, visited, i, j, bag);

                int current_bag_gold = 0;
                for(int gold: bag){
                    current_bag_gold += gold;
                }

                if(current_bag_gold > max_gold)
                    max_gold = current_bag_gold;
            }
        }
    }
    
    cout << max_gold;
}