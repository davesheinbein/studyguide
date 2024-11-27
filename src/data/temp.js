/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */

var convert = function (s, numRows) {
	if (numRows === 1 || s.length <= numRows) return s; // Handle edge cases.

	// Create an array to store strings for each row.
	const rows = Array.from({ length: numRows }, () => '');
	let currentRow = 0; // Track the current row.
	let goingDown = false; // Direction flag.

	// Iterate through each character in the string.
	for (let char of s) {
		rows[currentRow] += char; // Add the character to the current row.

		// Change direction at the top and bottom rows.
		if (currentRow === 0 || currentRow === numRows - 1) {
			goingDown = !goingDown;
		}

		// Move to the next row.
		currentRow += goingDown ? 1 : -1;
	}

	// Combine all rows to form the final zigzag string.
	return rows.join('');
};

console.log(convert('PAYPALISHIRING', 3));
// Output: "PAHNAPLSIIGYIR"

console.log(convert('PAYPALISHIRING', 4));
// Output: "PINALSIGYAHRPI"

console.log(convert('A', 1));
// Output: "A"

console.log(convert('HELLO', 2));
// Output: "HLOEL"

console.log(convert('ABCDEF', 5));
// Output: "ABDFC"

/*
Explanation:

1. Handle Edge Cases:
   - If `numRows` is 1 or the string length is less than or equal to `numRows`, return the string directly.

2. Create Row Storage:
   - Use an array of strings, where each string corresponds to a row in the zigzag pattern.

3. Traverse the String:
   - Iterate through each character in the input string.
   - Append the character to the appropriate row based on the current row index.

4. Adjust Row Direction:
   - Use a flag `goingDown` to track whether the row index should increase or decrease.
   - Flip the direction at the topmost (`currentRow === 0`) and bottommost (`currentRow === numRows - 1`) rows.

5. Combine the Rows:
   - After constructing the zigzag pattern, concatenate all rows to produce the final result.

Example Walkthrough:

Example 1:
Input: `s = "PAYPALISHIRING"`, `numRows = 3`
- Rows: ["P   A   H   N", "A P L S I I G", "Y   I   R"]
- Output: `"PAHNAPLSIIGYIR"`

Example 2:
Input: `s = "PAYPALISHIRING"`, `numRows = 4`
- Rows: ["P     I    N", "A   L S  I G", "Y A   H R", "P     I"]
- Output: `"PINALSIGYAHRPI"`

Example 3:
Input: `s = "A"`, `numRows = 1`
- Rows: ["A"]
- Output: `"A"`

Complexity:
- Time Complexity: \(O(n)\), where \(n\) is the length of the string. Each character is visited once.
- Space Complexity: \(O(n)\), for storing the rows.

Console Log Examples:
*/
