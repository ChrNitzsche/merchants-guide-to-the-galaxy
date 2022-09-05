const { cmdHowMuch } = require('../src/m-guide-to-the-galaxy');
const result = { 
  isMatch: false, 
  output: null 
};

it ('test', () => {
  const res = { ...result, 
    isMatch: true
  }

  expect(cmdHowMuch('how much is pish tegj glob glob ?')).toEqual({...res, output: 'pish tegj glob glob is 42 Credits'});
  expect(cmdHowMuch('how much is pish tegj glob glob?')).toEqual({...res, output: 'pish tegj glob glob is 42 Credits'});
  expect(cmdHowMuch('How Much Is Pish Tegj Glob Glob?')).toEqual({...res, output: 'pish tegj glob glob is 42 Credits'});
});

it ("null's and empty's", () => {
  expect(cmdHowMuch(null)).toEqual({...result});
  expect(cmdHowMuch(undefined)).toEqual({...result});
  expect(cmdHowMuch('')).toEqual({...result});
  expect(cmdHowMuch()).toEqual({...result});
});