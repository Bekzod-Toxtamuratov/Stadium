// let numRabbits = function (rabbits) {
//   let result = 0;
//   const types = {};

//   for (let rabbit of rabbits) {
//     if (!types[rabbit] || types[rabbit] === 0) {
//       result += rabbit + 1;
//       types[rabbit] = rabbit;
//     } else {
//       types[rabbit] -= 1;
//     }
//   }
//   return result;
// };

// 561 letcode problems
function arrayPairSum(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let sum: number = 0;
  for (let i = 0; i < nums.length; i += 2) {
    sum += nums[i];
  }
  return sum;
}
