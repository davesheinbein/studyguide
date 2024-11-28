/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
	let left = 0; // Initialize the left pointer
	let right = height.length - 1; // Initialize the right pointer
	let maxArea = 0; // Variable to store the maximum area found

	while (left < right) {
		// Calculate the current area
		const currentHeight = Math.min(
			height[left],
			height[right]
		);
		const currentWidth = right - left;
		const currentArea = currentHeight * currentWidth;

		// Update maxArea if the current area is larger
		maxArea = Math.max(maxArea, currentArea);

		// Move the pointer pointing to the shorter line
		if (height[left] < height[right]) {
			left++;
		} else {
			right--;
		}
	}

	return maxArea;
};

// Examples:
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
// Output: 49

console.log(maxArea([1, 1]));
// Output: 1

console.log(maxArea([4, 3, 2, 1, 4]));
// Output: 16

console.log(maxArea([1, 2, 1]));
// Output: 2

/*
Explanation:
1. Two-pointer Approach:
   - Start with two pointers, one at the beginning (`left`) and one at the end (`right`) of the array.
   - Calculate the area between the two lines as:
     \[
     \text{Area} = \min(\text{height}[left], \text{height}[right]) \times (\text{right} - \text{left})
     \]

2. Move the Pointer:
   - To maximize the area, the shorter line is the limiting factor.
   - Move the pointer pointing to the shorter line inward, as it might lead to a taller line and potentially a larger area.

3. Update maxArea:
   - Keep track of the largest area found so far.

4. Stop Condition:
   - The loop stops when the two pointers meet.

Complexity:
- Time Complexity: \(O(n)\), where \(n\) is the length of the `height` array. Each element is processed at most once.
- Space Complexity: \(O(1)\), as only a few variables are used.

Example Walkthrough:

Example 1:
Input: `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`
- Initial: `left = 0`, `right = 8`
- Iterations:
  - Calculate area between heights `1` and `7`: \( \min(1, 7) \times 8 = 8 \).
  - Move `left` to `1`, as `height[left] < height[right]`.
  - Calculate area between `8` and `7`: \( \min(8, 7) \times 7 = 49 \).
  - Update `maxArea` to `49`.
  - Continue shrinking the window.
- Output: `49`

Example 2:
Input: `height = [1, 1]`
- Initial: `left = 0`, `right = 1`
- Calculate area: \( \min(1, 1) \times 1 = 1 \).
- Output: `1`

*/
