const { parse } = require('roman-numerals-api');

const regExRomans = /(^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$)/;

input = [
    'glob is I',
    'prok is V',
    'pish is X',
    'tegj is L',
    'glob glob Silver is 34 Credits',
    'glob prok Gold is 57800 Credits',
    'pish pish Iron is 3910 Credits',
    'how much is pish tegj glob glob ?',
    'how many Credits is glob prok Silver ?',
    'how many Credits is glob prok Gold ?',
    'how many Credits is glob prok Iron ?',
    'how much wood could a woodchuck chuck if a woodchuck could chuck wood ?'
];

let output = [];
let aliases = [];
let goodsValues = [];


/***************************
 ****  Handle Commands  ****
 ***************************/
const addAlias = (regEx) => {
    aliases = [...aliases, { name: regEx[1], roman: regEx[2] }];
    // console.log('addAlias -> ', aliases);

    // *Output
    // [ { name: 'glob', roman: 'I' },
    //   { name: 'prok', roman: 'V' },
    //   { name: 'pish', roman: 'X' },
    //   { name: 'tegj', roman: 'L' } ]
}

const addGoodsAmount = (regEx) => {
    goodsValues = [...goodsValues, { roman: regEx[1], item: regEx[2], value: regEx[3] }];

    // console.log(goodsValues);
    // *Output
    // [ { roman: 'glob glob', item: 'Silver', value: '34' },
    //   { roman: 'glob prok', item: 'Gold', value: '57800' },
    //   { roman: 'pish pish', item: 'Iron', value: '3910' } ]
}

const calcHowMuch = (regEx) => {
    return 'test';
}


/**************************
 ****  Check Commands  ****
 **************************/
const cmdAlias = (cmd) => {
    if (!cmd) return null;

    let result = { matched: false, output: null }
    let regEx = cmd.match(/\s*([a-zA-Z]+)\s+(is|Is|IS|iS)\s+([IVXLCDM]+)\s*$/);
    if (regEx) {
        // console.log('cmdAlias ->', regEx);
        addAlias(regEx);
        result.matched = true;
    }
    return result;
}

const cmdValues = (cmd) => {
    let result = { matched: false, output: null }
    let regEx = cmd.match(/\s*(.*)\s+(\S+)\s+is\s+([0-9]+)\s+Credits\s*$/i);
    if (regEx) {
        addGoodsAmount(regEx)
        result.matched = true;
    }
    return result;
}

const cmdHowMuch = (cmd) => {
    let result = { matched: false, output: null }
    let regEx = cmd.match(/\s*how\s+much\s+is\s+(.*)\s*\?\s*$/i);
    // console.log('cmdHowMuch(regEx):', regEx);
    if (regEx) {
        result.output = calcHowMuch(regEx);
        result.matched = true;
    }
    // how much is pish tegj glob glob ?   -> (regEx[1]) 'pish tegj glob glob',
    return result;
}

const cmdHowMany = (cmd) => {
    let result = { matched: false, output: null }
        // console.log('cmdHowMany:', cmd);

    return result;
}

const analyseCmd = (cmd) => {
    commands = [cmdAlias, cmdValues, cmdHowMuch, cmdHowMany];
    let res;
    commands.forEach(element => {
        res = element(cmd);
        if (res.matched && res.output)
            output = [...output, res.output];
    });
}

/****************
 ****  init  ****
 ****************/
const readCommands = (commandsArray) => {
    commandsArray.map(cmd => {
        let analysedCmd = analyseCmd(cmd);
        console.log('->', cmd);
        if (analysedCmd !== false) {
            output.push(analysedCmd);
        }
    });
    console.log('####### OUTPUT #######');
    console.log(output);
}

readCommands(input);




/***** Test-Exports *****/
exports.input = input;
exports.cmdAlias = cmdAlias;
exports.cmdValues = cmdValues;