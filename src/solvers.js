/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// I: number
// O: matrix
// E: what to return when there's no solution?

window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});
  var matrix = board.rows();
  var rooksCounter = 0;

  var placeRook = function(currentMatrix, rowIndex, cIndex) {
    var colIndex = cIndex || 0;

    if (rooksCounter < n) {
      if (!board._isInBounds(rowIndex, colIndex)) {
        if (rowIndex > n) {
          rowIndex = 0;
        }
      }

      board.togglePiece(rowIndex, colIndex);

      if (board.hasRowConflictAt(rowIndex) || board.hasColConflictAt(colIndex)) {
        board.togglePiece(rowIndex, colIndex);
      } else {
        rooksCounter++;
      }
      return placeRook(currentMatrix, rowIndex + 1, colIndex + 1);
    }

    return true;
  };

  for (var i = 0; i < n; i++) {
    if (placeRook(matrix, i)) {
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
      return matrix;
    }
  }

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if ( n === 0) {
    return 0;
  }

  var solutionCount = _.reduce(_.range(1, n + 1), function(memo, element) {
    return memo * element;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 2) {
    return {'n': 2};
  }

  if (n === 3) {
    return {'n': 3};
  }

  var solution = findSolution(n, 'hasAnyQueensConflicts');

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutions = findSolution(n, 'hasAnyQueensConflicts');

  console.log('Number of solutions for ' + n + ' queens:', solutions.length);
  return solutions.length;
};

window.findSolution = function(n, helperFunc) {
  var board = new Board({'n': n});
  var matrix = board.rows();
  var solutions = [];

  var recurse = function(n, row) {
    if (row === n) {
      var copy = _.map(matrix, function(row) {
        return row.slice();
      });
      solutions.push(copy);
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board[helperFunc](row, i)) {
        recurse(n, row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  recurse(n, 0);

  return solutions;
};