const { input, cmdAlias } = require('../src/');

it('Testing null and empty', () => {
    expect(cmdAlias(null)).toBeNull();
    expect(cmdAlias()).toBeNull();
});

const initObj = { 
  isMatch: true,
  output: null
};

it('Testing items', () => {
    expect(cmdAlias('glob is I')).toEqual({ ...initObj });
    expect(cmdAlias('prok is V')).toEqual({ ...initObj });
    expect(cmdAlias('pish is X')).toEqual({ ...initObj });
    expect(cmdAlias('tegj is L')).toEqual({ ...initObj });
    expect(cmdAlias('sdfsdlkfjsdlkjflksdjflk is I')).toEqual({ ...initObj, isMatch: true });

    expect(cmdAlias('glob glob Silver is 34 Credits')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('how much is pish tegj glob glob ?')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('how many Credits is glob prok Gold ?')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('how much wood could a woodchuck chuck if a woodchuck could chuck wood ?')).toEqual({ ...initObj, isMatch: false });
});

it('No Roman Numbers', () => { // IVXLCDM
    expect(cmdAlias('glob is Z')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('asdf is i')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('fooo is v')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('glob is A')).toEqual({ ...initObj, isMatch: false });
});

it('Testing case of "is"', () => { // IVXLCDM
    expect(cmdAlias('glob iS X')).toEqual({ ...initObj });
    expect(cmdAlias('glao Is L')).toEqual({ ...initObj });
    expect(cmdAlias('dasd is V')).toEqual({ ...initObj });
    expect(cmdAlias('asdf IS D')).toEqual({ ...initObj });
});

it('Testinging multiple roman numbers', () => { // IVXLCDM
    expect(cmdAlias('glob is IVXLCDM')).toEqual({ ...initObj });
    expect(cmdAlias('glao is ivxlcdm')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('dasd is IVALCDM')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('asdf is iaxlcdm')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('asdf is iaxlcdm')).toEqual({ ...initObj, isMatch: false });
    expect(cmdAlias('asdf is I V')).toEqual({ ...initObj, isMatch: false });
});