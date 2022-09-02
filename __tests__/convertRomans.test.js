const { parse } = require('roman-numerals-api');


it("Test#1", () => {
    expect(parse('I')).toEqual(1);
    expect(parse('II')).toEqual(2);
    expect(parse('III')).toEqual(3);
    expect(parse('IV')).toEqual(4);
    expect(parse('V')).toEqual(5);
    expect(parse('VI')).toEqual(6);
    expect(parse('VII')).toEqual(7);
    expect(parse('VIII')).toEqual(8);
    expect(parse('IX')).toEqual(9);
    expect(parse('X')).toEqual(10);
    expect(parse('L')).toEqual(50);
    expect(parse('C')).toEqual(100);
    expect(parse('D')).toEqual(500);
    expect(parse('M')).toEqual(1000);
    expect(parse('XXXI')).toEqual(31);
    expect(parse('CXLVIII')).toEqual(148);
    expect(parse('CCXCIV')).toEqual(294);
    expect(parse('CCCXII')).toEqual(312);
    expect(parse('CDXXI')).toEqual(421);
    expect(parse('DXXVIII')).toEqual(528);
    expect(parse('DCXXI')).toEqual(621);
    expect(parse('DCCLXXXII')).toEqual(782);
    expect(parse('DCCCLXX')).toEqual(870);
    expect(parse('CMXLI')).toEqual(941);
    expect(parse('MXLIII')).toEqual(1043);
    expect(parse('MCX')).toEqual(1110);
    expect(parse('MCCXXVI')).toEqual(1226);
    expect(parse('MCCCI')).toEqual(1301);
    expect(parse('MCDLXXXV')).toEqual(1485);
    expect(parse('MDIX')).toEqual(1509);
    expect(parse('MDCVII')).toEqual(1607);
    expect(parse('MDCCLIV')).toEqual(1754);
    expect(parse('MDCCCXXXII')).toEqual(1832);
    expect(parse('MCMXCIII')).toEqual(1993);
    expect(parse('MMLXXIV')).toEqual(2074);
    expect(parse('MMCLII')).toEqual(2152);
    expect(parse('MMCCXII')).toEqual(2212);
    expect(parse('MMCCCXLIII')).toEqual(2343);
    expect(parse('MMCDXCIX')).toEqual(2499);
    expect(parse('MMDLXXIV')).toEqual(2574);
    expect(parse('MMDCXLVI')).toEqual(2646);
    expect(parse('MMDCCXXIII')).toEqual(2723);
    expect(parse('MMDCCCXCII')).toEqual(2892);
    expect(parse('MMCMLXXV')).toEqual(2975);
    expect(parse('MMMLI')).toEqual(3051);
    expect(parse('MMMCLXXXV')).toEqual(3185);
    expect(parse('MMMCCL')).toEqual(3250);
    expect(parse('MMMCCCXIII')).toEqual(3313);
    expect(parse('MMMCDVIII')).toEqual(3408);
    expect(parse('MMMDI')).toEqual(3501);
    expect(parse('MMMDCX')).toEqual(3610);
    expect(parse('MMMDCCXLIII')).toEqual(3743);
    expect(parse('MMMDCCCXLIV')).toEqual(3844);
    expect(parse('MMMDCCCLXXXVIII')).toEqual(3888);
    expect(parse('MMMCMXL')).toEqual(3940);
    expect(parse('MMMCMXCIX')).toEqual(3999);
    expect(() => parse('MMMM')).toThrow();
    expect(() => parse('MMMMD')).toThrow();
});


/* 
Die Symbole „I“, „X“, „C“ und „M“ können dreimal hintereinander wiederholt werden, aber nicht mehr. (Sie können viermal vorkommen, wenn die dritte und die vierte durch einen kleineren Wert getrennt sind, z. B. XXXIX.) 
„D“, „L“ und „V“ können niemals wiederholt werden.
„I“ kann nur von „V“ und „X“ subtrahiert werden.
„X“ kann nur von „L“ und „C“ subtrahiert werden. 
C“ kann nur von „D“ und „M“ subtrahiert werden.
"V", "L" und "D" können niemals subtrahiert werden.
Von jedem Symbol mit großem Wert darf nur ein Symbol mit kleinem Wert subtrahiert werden.*/