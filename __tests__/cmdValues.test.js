const { cmdValues } = require('../src/m-guide-to-the-galaxy');

const initObj = { 
  isMatch: true, 
  output: null
};

it('Testing null and empty', () => {
    expect(cmdValues(null)).toBeNull();
    expect(cmdValues(undefined)).toBeNull();
    expect(cmdValues('')).toBeNull();
});


it('Testing invalid commands', () => {
  const result = { ...initObj, isMatch: false };
  expect(cmdValues('how much is glob ?')).toEqual({...result});
  expect(cmdValues('how much is pish tegj glob glob ?')).toEqual({...result});
  expect(cmdValues('how much wood could a woodchuck chuck if a woodchuck could chuck wood ?')).toEqual({...result});
  expect(cmdValues('glob glob Silver is XX Credits')).toEqual({...result});
  expect(cmdValues('glob glob Silver is 34')).toEqual({...result});
  expect(cmdValues('glob glob Silver is 34?')).toEqual({...result});
  expect(cmdValues('glob glob Silver is Credits')).toEqual({...result});
});


it('Testing valid commands', () => {
  expect(cmdValues('glob glob Silver is 34 Credits')).toEqual({ ...initObj });
  expect(cmdValues('  Silver is 34 Credits')).toEqual({ ...initObj });
  expect(cmdValues('glob glob Silver is 34 Credits   ')).toEqual({ ...initObj });
  expect(cmdValues('glub Silver is 34 Credits')).toEqual({ ...initObj });
});