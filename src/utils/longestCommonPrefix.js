
var longestCommonPrefix = function (strs) {
	if (strs.length === 0) return ''; // Handle edge case with empty input.

	// Assume the first string is the initial prefix.
	let prefix = strs[0];

	// Iterate through the remaining strings in the array.
	for (let i = 1; i < strs.length; i++) {
		// While the current string does not start with the prefix, reduce the prefix.
		while (!strs[i].startsWith(prefix)) {
			// Remove the last character from the prefix.
			prefix = prefix.slice(0, -1);

			// If the prefix becomes empty, there is no common prefix.
			if (prefix === '') return '';
		}
	}

	return prefix; // Return the final longest common prefix.
};

// Examples:
console.log(
	longestCommonPrefix(['flower', 'flow', 'flight'])
);
// Output: "fl"

console.log(longestCommonPrefix(['dog', 'racecar', 'car']));
// Output: ""

console.log(
	longestCommonPrefix([
		'interstellar',
		'internet',
		'interval',
	])
);
// Output: "inte"

console.log(longestCommonPrefix(['a']));
// Output: "a"

console.log(longestCommonPrefix(['']));
// Output: ""

console.log(
	longestCommonPrefix(['prefix', 'prefixing', 'prefecture'])
);
// Output: "prefix"