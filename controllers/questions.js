const questions = [
  {
    id: "q1",

    topic: "arrays",

    difficulty: "easy",

    title: "Find Maximum",

    description: "Given an array of integers, find the maximum element.",

    starterCode: `function solve(arr) {
  // write your code here
}`,

    solution: `function solve(arr) {
  return Math.max(...arr);
}`,

    testCases: [
      {
        input: [1, 2, 3],
        output: 3
      },
      {
        input: [-1, -2, -3],
        output: -1
      }
    ]
  }
];

module.exports = questions;