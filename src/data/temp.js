/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

var isIsomorphic = function (s, t) {
	// Step 1: Ensure the strings have the same length
	if (s.length !== t.length) {
		return false; // If lengths are different, they cannot be isomorphic.
	}

	// Step 2: Create two maps to track character mappings
	const forwardMapping = new Map(); // Maps characters from s to t
	const reverseMapping = new Map(); // Maps characters from t to s

	// Step 3: Iterate through both strings simultaneously
	for (let i = 0; i < s.length; i++) {
		const currentSource = s[i]; // Current character from s
		const currentTarget = t[i]; // Current character from t

		// Check the mapping from s to t
		if (forwardMapping.has(currentSource)) {
			if (
				forwardMapping.get(currentSource) !== currentTarget
			) {
				return false; // Mismatch in mapping
			}
		} else {
			forwardMapping.set(currentSource, currentTarget); // Add mapping from s to t
		}

		// Check the mapping from t to s
		if (reverseMapping.has(currentTarget)) {
			if (
				reverseMapping.get(currentTarget) !== currentSource
			) {
				return false; // Mismatch in mapping
			}
		} else {
			reverseMapping.set(currentTarget, currentSource); // Add mapping from t to s
		}
	}

	// If we complete the loop without conflicts, the strings are isomorphic
	return true;
};

// Examples
// Example 1: "egg" and "add" should return true
console.log(isIsomorphic('egg', 'add')); // Output: true

// Example 2: "foo" and "bar" should return false
console.log(isIsomorphic('foo', 'bar')); // Output: false

// Example 3: "paper" and "title" should return true
console.log(isIsomorphic('paper', 'title')); // Output: true

/*
Explanation:
- This function checks if two strings `s` and `t` are isomorphic.
- Two strings are isomorphic if each character in `s` can be uniquely mapped to a character in `t`, 
  preserving the order, and vice versa.
  
Approach:
- Use two hash maps (or dictionaries):
  - `forwardMapping`: Maps characters from `s` to `t`.
  - `reverseMapping`: Maps characters from `t` to `s`.
- Iterate through the characters of both strings simultaneously:
  1. If a character in `s` is already mapped, check if it matches the current character in `t`.
  2. Similarly, ensure that characters in `t` are consistently mapped back to `s`.
  3. If any mismatch occurs, return `false`.
- If the iteration completes without inconsistencies, the strings are isomorphic.

Edge Cases:
- Strings of different lengths are not isomorphic and should return `false`.
- Empty strings are trivially isomorphic.

Complexity:
- Time Complexity: O(n), where `n` is the length of the strings. We traverse the strings once.
- Space Complexity: O(1) since the hash maps have a maximum of 128 entries (one for each ASCII character).
 */
