/**
 * @param {string} s
 * @return {number}
 */

var romanToInt = function (s) {
	// Define a mapping of Roman numerals to their integer values.
	const romanMap = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};

	let total = 0; // Initialize total to 0.

	// Iterate through the string, checking each numeral.
	for (let i = 0; i < s.length; i++) {
		const current = romanMap[s[i]]; // Get the value of the current Roman numeral.
		const next = romanMap[s[i + 1]]; // Get the value of the next Roman numeral (if it exists).

		// If the current numeral is smaller than the next, subtract it. Otherwise, add it.
		if (next && current < next) {
			total -= current; // Subtract current from total.
		} else {
			total += current; // Add current to total.
		}
	}

	return total; // Return the computed total.
};

/*
Explanation:

The function `romanToInt` converts a Roman numeral string into its integer representation by following these steps:

1. Mapping Roman Numerals to Values:
   - A dictionary `romanMap` is used to map each Roman numeral to its corresponding integer value.

2. Iterating Through the Input String:
   - The function loops through each character in the Roman numeral string.
   - For each character, it retrieves the value of the current numeral (`current`) and the value of the next numeral (`next`).

3. Handling Subtractive Notation:
   - If the current numeral is smaller than the next numeral (e.g., `I` before `V` in "IV"), it represents a subtractive case.
   - In such cases, subtract the `current` value from the total.

4. Adding Standard Values:
   - If the current numeral is not part of a subtractive pair, add its value to the total.

5. Returning the Result:
   - After completing the loop, the accumulated total is returned, representing the integer value of the Roman numeral.

Example Walkthrough:

Example 1:
Input: `"III"`

- `current = 1`, `next = 1`. Add `1`.
- `current = 1`, `next = 1`. Add `1`.
- `current = 1`, no `next`. Add `1`.

Output: `3`.

---

Example 2:
Input: `"LVIII"`

- `L = 50`, `V = 5`. Add `50`.
- `V = 5`, `I = 1`. Add `5`.
- `I = 1`, `I = 1`. Add `1`.
- `I = 1`, no `next`. Add `1`.

Output: `58`.

---

Example 3:
Input: `"MCMXCIV"`

- `M = 1000`, `C = 100`. Add `1000`.
- `C = 100`, `M = 1000`. Subtract `100`.
- `M = 1000`, `X = 10`. Add `900`.
- `X = 10`, `C = 100`. Subtract `10`.
- `C = 100`, `I = 1`. Add `90`.
- `I = 1`, `V = 5`. Subtract `1`.
- `V = 5`, no `next`. Add `4`.

Output: `1994`.

---

Complexity:

- Time Complexity: \(O(n)\), where \(n\) is the length of the input string, as we iterate through it once.
- Space Complexity: \(O(1)\), since the memory usage is constant regardless of input size (only the `romanMap` and a few variables are used).
*/
