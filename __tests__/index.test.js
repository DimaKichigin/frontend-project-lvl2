import genDiff from "./..src/index.js";

import expected from "./..__fixtures__/index.txt";

test("correctness of comparing flat json files", () => {
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});
