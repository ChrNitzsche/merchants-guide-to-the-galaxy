const { translateKauderwelsch } = require('../src/m-guide-to-the-galaxy');

const aliasesArr = [
  { name: 'glob', roman: 'I' },
  { name: 'prok', roman: 'V' },
  { name: 'pish', roman: 'X' },
  { name: 'tegj', roman: 'L' }
];

console.warn('##################################### Kauderwelsch ###');
it("Testing null's and empty's", () => {
    expect(translateKauderwelsch(null, aliasesArr)).toBeNull();
    expect(translateKauderwelsch(undefined, aliasesArr)).toBeNull();
    expect(translateKauderwelsch('', aliasesArr)).toBeNull();
    expect(translateKauderwelsch(null, null)).toBeNull();
    expect(translateKauderwelsch(null, undefined)).toBeNull();
    expect(translateKauderwelsch(null, [])).toBeNull();
    expect(translateKauderwelsch('glob', [])).toBeNull();
    expect(translateKauderwelsch('glob', null)).toBeNull();
    expect(translateKauderwelsch('glob', undefined)).toBeNull();
});

it("normal tests", () => {
  expect(translateKauderwelsch('glob', aliasesArr)).toEqual(1);
  expect(translateKauderwelsch('glob glob glob', aliasesArr)).toEqual(3);
  expect(translateKauderwelsch('prok', aliasesArr)).toEqual(5);
  expect(translateKauderwelsch('glob prok', aliasesArr)).toEqual(4);
  expect(translateKauderwelsch('prok glob', aliasesArr)).toEqual(6);
  expect(translateKauderwelsch('pish', aliasesArr)).toEqual(10);
  expect(translateKauderwelsch('tegj', aliasesArr)).toEqual(50);
});

it("spaces", () => {
  expect(translateKauderwelsch('glob    glob', aliasesArr)).toEqual(2);
  expect(translateKauderwelsch('tegj ', aliasesArr)).toEqual(50);
  expect(translateKauderwelsch(' tegj', aliasesArr)).toEqual(50);
  expect(translateKauderwelsch('tegj           ', aliasesArr)).toEqual(50);
  expect(translateKauderwelsch('           tegj', aliasesArr)).toEqual(50);
});

it("invalid input", () => {
  expect(translateKauderwelsch('glob glob glob glob', aliasesArr)).toBeNull();
  expect(translateKauderwelsch('asdf', aliasesArr)).toBeNull();
  expect(translateKauderwelsch('asdf glob', aliasesArr)).toBeNull();
  expect(translateKauderwelsch('glob asdf', aliasesArr)).toBeNull();
  expect(translateKauderwelsch('prokglob', aliasesArr)).toBeNull();
  expect(translateKauderwelsch('glob    asdf', aliasesArr)).toBeNull();
});