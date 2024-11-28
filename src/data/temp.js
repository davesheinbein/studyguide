/**
 * @param {string} s - The input string in which we are searching for the substring.
 * @param {string} t - The string containing characters that must be included in the substring.
 * @return {string} - The minimum window substring of `s` that contains all characters of `t`. Returns an empty string if no such substring exists.
 */

var minWindow = function (s, t) {
	// If `s` is shorter than `t`, it is impossible to form a valid substring.
	if (s.length < t.length) return '';

	// Step 1: Create a frequency map for characters in `t`
	const tMap = new Map();
	for (let char of t) {
		tMap.set(char, (tMap.get(char) || 0) + 1);
	}

	// Variables for sliding window technique
	let left = 0, // Left pointer for the sliding window
		right = 0; // Right pointer for the sliding window
	let required = tMap.size; // Number of unique characters in `t` that need to be matched
	let formed = 0; // Count of unique characters in the current window that satisfy the required frequency
	const windowCounts = new Map(); // Frequency map for characters in the current sliding window
	let minLength = Infinity; // Length of the smallest valid window
	let result = [0, 0]; // Indices of the smallest valid window

	// Step 3: Expand the sliding window by moving the `right` pointer
	while (right < s.length) {
		const char = s[right]; // Add the current character to the window
		windowCounts.set(
			char,
			(windowCounts.get(char) || 0) + 1
		);

		// If the current character's frequency in the window matches `tMap`, increment `formed`
		if (
			tMap.has(char) &&
			windowCounts.get(char) === tMap.get(char)
		) {
			formed++;
		}

		// Step 4: Shrink the window from the left while it contains all required characters
		while (formed === required) {
			const windowSize = right - left + 1; // Current window size
			if (windowSize < minLength) {
				minLength = windowSize; // Update minimum window size
				result = [left, right]; // Update the indices of the smallest window
			}

			// Remove the character at the `left` pointer from the window
			const leftChar = s[left];
			windowCounts.set(
				leftChar,
				windowCounts.get(leftChar) - 1
			);

			// If removing this character breaks the condition for `formed`, decrement `formed`
			if (
				tMap.has(leftChar) &&
				windowCounts.get(leftChar) < tMap.get(leftChar)
			) {
				formed--;
			}
			left++; // Move the left pointer to shrink the window
		}

		// Expand the window by moving the `right` pointer
		right++;
	}

	// If no valid window is found, return an empty string; otherwise, return the smallest window
	return minLength === Infinity
		? ''
		: s.slice(result[0], result[1] + 1);
};

// Examples:
console.log(minWindow('ADOBECODEBANC', 'ABC')); // Output: "BANC"
console.log(minWindow('a', 'a')); // Output: "a"
console.log(minWindow('a', 'aa')); // Output: ""

/*
Explanation:
1. Goal:
   - Find the smallest substring in `s` that contains all characters of `t` (including duplicates).

2. Approach:
   - Use the sliding window technique with two pointers (`left` and `right`).
   - Maintain a frequency map (`tMap`) for characters in `t`.
   - Track the number of unique characters in the current window that match the required frequency using `formed`.

3. Steps:
   - Expand the window by moving the `right` pointer.
   - When all characters in `t` are present in the window (`formed === required`), try shrinking the window by moving the `left` pointer.
   - Update the result when a smaller valid window is found.

4. Time Complexity:
   - \(O(m + n)\): Iterating over `s` with `right` and at most once with `left`, plus constructing `tMap`.

5. Space Complexity:
   - \(O(m + n)\): Space for `tMap` and `windowCounts`.

6. Edge Cases:
   - If `s` is shorter than `t`, return an empty string.
   - If characters in `t` are not in `s`, return an empty string.

7. Walkthrough:
   - Input: `s = "ADOBECODEBANC", t = "ABC"`
   - Initial `tMap`: `{A: 1, B: 1, C: 1}`
   - Sliding window:
     - Expand: `ADOBE` (not valid)
     - Expand: `ADOBEC` (valid, size = 6)
     - Shrink: `DOBEC` (still valid, size = 5)
     - Expand: Continue until finding `BANC` (size = 4).
   - Output: `"BANC"`.
*/
