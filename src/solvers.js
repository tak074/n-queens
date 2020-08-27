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

// this.togglePiece(row, col) to turn a piece on/off
// this.rows() to get the current matrix
// this.hasAnyRooksConflicts() checks to see if the placed rook has any conflicts
// hasRowConflictAt(rowIndex)
// hasColConflictAt(colIndex)
window.findNRooksSolution = function(n) {
  // var solution = matrix
  var board = new Board({'n': n});
  var matrix = board.rows();
  // var rooksCounter = 0
  var rooksCounter = 0;

  var placeRook = function(currentMatrix, rowIndex, cIndex) {
    var colIndex = cIndex || 0;

    if (rooksCounter < n) {
      if (!board._isInBounds(rowIndex, colIndex)) {
        if (rowIndex > n) {
          rowIndex = 0;
        }
      }
      // start off with empty matrix of n
      // starting at currentIndex, place a rook
      board.togglePiece(rowIndex, colIndex);

      if (board.hasRowConflictAt(rowIndex) || board.hasColConflictAt(colIndex)) {
        //toggle off
        board.togglePiece(rowIndex, colIndex);
      } else {
        rooksCounter++;
      }

      return placeRook(currentMatrix, rowIndex + 1, colIndex + 1);
    }

    return true;
  };

  for (var i = 0; i < n; i++) {
    // if it returns true (found a solution)
    // return matrix right away
    if (placeRook(matrix, i)) {
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
      return matrix;
    }
  }

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //find n!through reduce.
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
// if n is 3 or less, there are no solutions
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
