const { input, cmdAlias } = require('../src/m-guide-to-the-galaxy');

it('Testing null and empty', () => {
    expect(cmdAlias(null)).toBeNull();
    expect(cmdAlias()).toBeNull();
});


it('Testing items', () => {
    expect(cmdAlias('glob is I')).toEqual({ matched: true, output: null });
    expect(cmdAlias('prok is V')).toEqual({ matched: true, output: null });
    expect(cmdAlias('pish is X')).toEqual({ matched: true, output: null });
    expect(cmdAlias('tegj is L')).toEqual({ matched: true, output: null });
    expect(cmdAlias('sdfsdlkfjsdlkjflksdjflk is I')).toEqual({ matched: true, output: null });

    expect(cmdAlias('glob glob Silver is 34 Credits')).toEqual({ matched: false, output: null });
    expect(cmdAlias('how much is pish tegj glob glob ?')).toEqual({ matched: false, output: null });
    expect(cmdAlias('how many Credits is glob prok Gold ?')).toEqual({ matched: false, output: null });
    expect(cmdAlias('how much wood could a woodchuck chuck if a woodchuck could chuck wood ?')).toEqual({ matched: false, output: null });
});

it('No Roman Numbers', () => { // IVXLCDM
    expect(cmdAlias('glob is Z')).toEqual({ matched: false, output: null });
    expect(cmdAlias('asdf is i')).toEqual({ matched: false, output: null });
    expect(cmdAlias('fooo is v')).toEqual({ matched: false, output: null });
    expect(cmdAlias('glob is A')).toEqual({ matched: false, output: null });
});

it('Testing case of "is"', () => { // IVXLCDM
    expect(cmdAlias('glob iS X')).toEqual({ matched: true, output: null });
    expect(cmdAlias('glao Is L')).toEqual({ matched: true, output: null });
    expect(cmdAlias('dasd is V')).toEqual({ matched: true, output: null });
    expect(cmdAlias('asdf IS D')).toEqual({ matched: true, output: null });
});

it('Testinging multiple roman numbers', () => { // IVXLCDM
    expect(cmdAlias('glob is IVXLCDM')).toEqual({ matched: true, output: null });
    expect(cmdAlias('glao is ivxlcdm')).toEqual({ matched: false, output: null });
    expect(cmdAlias('dasd is IVALCDM')).toEqual({ matched: false, output: null });
    expect(cmdAlias('asdf is iaxlcdm')).toEqual({ matched: false, output: null });
    expect(cmdAlias('asdf is iaxlcdm')).toEqual({ matched: false, output: null });
    expect(cmdAlias('asdf is I V')).toEqual({ matched: false, output: null });
});