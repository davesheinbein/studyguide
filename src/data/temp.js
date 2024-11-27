/**
 * @param {string[]} words - An array of words to be justified.
 * @param {number} maxWidth - The maximum width of each line.
 * @return {string[]} - Array of fully justified lines.
 */
var fullJustify = function (words, maxWidth) {
	const result = []; // Stores the fully justified lines.
	let line = []; // Keeps track of words in the current line.
	let lineLength = 0; // Tracks the total length of characters in the current line (excluding spaces).

	// Iterate over each word in the input array.
	for (let word of words) {
		// Check if adding the next word plus necessary spaces would exceed maxWidth.
		if (lineLength + line.length + word.length > maxWidth) {
			// Distribute extra spaces for the current line.
			for (let i = 0; i < maxWidth - lineLength; i++) {
				// Add an extra space to each gap, cycling through gaps cyclically.
				// If there is only one word in the line, add spaces to its end.
				line[i % (line.length - 1 || 1)] += ' ';
			}

			// Add the justified line to the result.
			result.push(line.join(''));
			// Reset the line and lineLength for the next line.
			line = [];
			lineLength = 0;
		}

		// Add the current word to the line and update lineLength.
		line.push(word);
		lineLength += word.length;
	}

	// Handle the last line: left-justified.
	// Words are joined with a single space, and trailing spaces are added to match maxWidth.
	result.push(
		line.join(' ') +
			' '.repeat(maxWidth - lineLength - (line.length - 1))
	);

	return result;
};

// Examples:
console.log(
	fullJustify(
		[
			'This',
			'is',
			'an',
			'example',
			'of',
			'text',
			'justification.',
		],
		16
	)
);
// Output:
// [
//   "This    is    an",
//   "example  of text",
//   "justification.  "
// ]

console.log(
	fullJustify(
		['What', 'must', 'be', 'acknowledgment', 'shall', 'be'],
		16
	)
);
// Output:
// [
//   "What   must   be",
//   "acknowledgment  ",
//   "shall be        "
// ]

console.log(
	fullJustify(
		[
			'Science',
			'is',
			'what',
			'we',
			'understand',
			'well',
			'enough',
			'to',
			'explain',
			'to',
			'a',
			'computer.',
			'Art',
			'is',
			'everything',
			'else',
			'we',
			'do',
		],
		20
	)
);
// Output:
// [
//   "Science  is  what we",
//   "understand      well",
//   "enough to explain to",
//   "a  computer.  Art is",
//   "everything  else  we",
//   "do                  "
// ]

/*
Explanation:

1. Line Construction:
   - Words are added to a line until adding another word would exceed `maxWidth`.
   - `lineLength` tracks the total number of characters in the current line, excluding spaces.

2. Space Distribution:
   - For fully justified lines:
     - Calculate the total extra spaces needed: `maxWidth - lineLength`.
     - Distribute these spaces evenly between words:
       - Use the `%` operator to cycle through gaps when distributing unevenly.
     - For lines with only one word, all extra spaces are added to the end.

3. Last Line:
   - The last line is left-justified:
     - Words are joined with a single space.
     - Remaining spaces are added to the end to match `maxWidth`.

4. Output:
   - Once all words are processed, the `result` contains all justified lines.

Complexity:

- Time Complexity: \(O(n)\), where \(n\) is the total number of characters in `words`. Each word is processed once.
- Space Complexity: \(O(1)\) additional space, excluding the output array.
*/
