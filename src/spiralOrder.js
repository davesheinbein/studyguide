
var spiralOrder = function(matrix) {
    const result = []; // To store elements in spiral order

    if (!matrix || matrix.length === 0) return result; // Handle edge case where matrix is empty

    // Define the boundaries of the matrix
    let top = 0,
        bottom = matrix.length - 1,
        left = 0,
        right = matrix[0].length - 1;

    // Traverse the matrix in a spiral pattern
    while (top <= bottom && left <= right) {
        // Step 1: Traverse from left to right along the top boundary
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++; // Move the top boundary downward

        // Step 2: Traverse from top to bottom along the right boundary
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--; // Move the right boundary leftward

        // Step 3: Traverse from right to left along the bottom boundary (if still valid)
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            bottom--; // Move the bottom boundary upward
        }

        // Step 4: Traverse from bottom to top along the left boundary (if still valid)
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++; // Move the left boundary rightward
        }
    }

    return result;
};

// Examples:
console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])); // Output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]