/**
 * @param {number[]} nums
 * @return {number}
 */

var findPeakElement = function (nums) {
	let left = 0,
		right = nums.length - 1;

	// Perform binary search
	while (left < right) {
		const mid = Math.floor((left + right) / 2);

		// Check if middle element is a peak
		if (nums[mid] > nums[mid + 1]) {
			// We are in a descending part of the array, so the peak must be on the left half or at mid
			right = mid; // Move search space to the left half
		} else {
			// We are in an ascending part of the array, so the peak must be on the right half
			left = mid + 1; // Move search space to the right half
		}
	}

	// The left pointer will be at the peak element
	return left;
};

/*
Explanation:

1. Binary search is used to find the peak element.
   - If the middle element is greater than its right neighbor, we know that the peak lies on the left half of the array or at the middle element.
   - Otherwise, the peak lies on the right half.

2. The binary search continues halving the search space until `left == right`, at which point we return the index of the peak.

Examples

Example 1:
Input: nums = [1,2,3,1]
Output: 2
Explanation: The peak element is 3, which is greater than both its neighbors (2 and 1). The function returns index 2.

Example 2:
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: There are multiple peaks: 2 at index 1, and 6 at index 5. The function can return either index, but it returns 5.

Time Complexity:
- The time complexity is \(O(\log n)\) because we are using binary search to halve the search space at each step.

Space Complexity:
- The space complexity is \(O(1)\) since we only use a constant amount of extra space for indices `left`, `right`, and `mid`.

*/
