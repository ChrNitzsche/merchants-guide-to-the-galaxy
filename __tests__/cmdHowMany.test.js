const { cmdHowMany } = require('../src/m-guide-to-the-galaxy');

const resultYes = { 
  isMatch: true, 
  output: null 
};

const resultNo = { 
  isMatch: false, 
  output: null 
};

it("Null's and empty's", () => {
  expect(cmdHowMany('')).toEqual({isMatch: false, output: null});
  expect(cmdHowMany(undefined)).toEqual({isMatch: false, output: null});
  expect(cmdHowMany(null)).toEqual({isMatch: false, output: null});
})

it ('valid tests', () => {
  expect(cmdHowMany('how many Credits is glob prok Gold ?'))
    .toEqual({...resultYes, output: 'glob prok Gold is 57800 Credits'});
  expect(cmdHowMany('how many Credits is glob prok Gold?'))
    .toEqual({...resultYes, output: 'glob prok Gold is 57800 Credits'});
  expect(cmdHowMany('How Many credits Is glob prok Gold ?'))
    .toEqual({...resultYes, output: 'glob prok Gold is 57800 Credits'});
  expect(cmdHowMany('how many Credits is Glob Prok Gold ?'))
    .toEqual({...resultYes, output: 'glob prok Gold is 57800 Credits'});
  expect(cmdHowMany('how many Credits is Glob Prok Gold ?'))
    .toEqual({...resultYes, output: 'glob prok Gold is 57800 Credits'});
  expect(cmdHowMany('How Many credits Is glob    prok Gold ?'))
    .toEqual({...resultYes, output: 'glob prok Gold is 57800 Credits'});
  });
  
  
  it ('invalid tests', () => {
  expect(cmdHowMany('how many Credits is   Gold ?'))
    .toEqual({...resultYes, output: null});
  expect(cmdHowMany('how many Credits is asdf Gold?'))
    .toEqual({...resultNo, isMatch: true });
});