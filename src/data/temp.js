var WordDictionary = function () {
	this.root = {}; // The root of the Trie
};

/**
 * @param {string} word
 * @return {void}
 */

WordDictionary.prototype.addWord = function (word) {
	let currentNode = this.root;

	// Insert each character of the word into the Trie
	for (const char of word) {
		if (!currentNode[char]) {
			currentNode[char] = {}; // Create a new node if it doesn't exist
		}
		currentNode = currentNode[char];
	}

	// Mark the end of the word
	currentNode.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */

WordDictionary.prototype.search = function (word) {
	// Helper function for recursive search with dot handling
	const searchHelper = (node, index) => {
		// If we have reached the end of the word, check if it's a valid word
		if (index === word.length) {
			return node.isEnd === true;
		}

		const char = word[index];

		// If the character is a dot, recursively check all possible children
		if (char === '.') {
			for (const key in node) {
				// Skip the `isEnd` property to avoid checking it while iterating over children
				if (
					key !== 'isEnd' &&
					searchHelper(node[key], index + 1)
				) {
					return true;
				}
			}
		} else {
			// If it's a regular character, check the corresponding child node
			if (
				node[char] &&
				searchHelper(node[char], index + 1)
			) {
				return true;
			}
		}

		return false;
	};

	return searchHelper(this.root, 0);
};

/*
Explanation:

*/

/**
  Example usage:
  var obj = new WordDictionary();
  obj.addWord("bad");
  obj.addWord("dad");
  obj.addWord("mad");
  console.log(obj.search("pad")); // false
  console.log(obj.search("bad")); // true
  console.log(obj.search(".ad")); // true
  console.log(obj.search("b..")); // true
 */
