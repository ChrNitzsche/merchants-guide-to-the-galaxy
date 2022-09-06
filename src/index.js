const { parse } = require('roman-numerals-api');

const NO_COMMAND_MATCHED = 'I have no idea what you are talking about';
const initReturnObject = { isMatch: false, output: null };
let aliases = [];
let goodsValues = [];
let input = [
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



const readCmd = (cmd) => {
  console.log(' > '+ cmd);
  let res = analyseCmd(cmd);
  if(res.output)   console.log(res.output);
  if(!res.isMatch) console.log(NO_COMMAND_MATCHED);
}


const analyseCmd = (cmd) => { 
  // Output: { isMatch: bool, output: string } | true | false
  commands = [cmdAlias, cmdValues, cmdHowMuch, cmdHowMany];
  let res = null;

  commands.some((cmdFkt) => {
      res = cmdFkt(cmd);
      if (res.isMatch) {
          return res.output || true;  // if return true -> NO Error Msg, command was handled correctly
      }
  });
  return res;
}


const translateKauderwelsch = (kauderwelsch, aliases) => {
  if (!kauderwelsch) return null;

  // Input: 'glob prok tegj', aliases[] 
  // -> Roman number ("IV") 
  // -> Output: number | null (Converted Roman Number)
  try {
      let romNum = cleanStr(kauderwelsch)
          .split(' ')
          .map(word => {
              let res = aliases.find(({ name }) => name === word.trim());
              if (!res && word !== '') {
                throw new Error(`What is '${word}'? Please correct your command!`);
              }
              return res.roman || '';
          })
          .join('');
      return parse(romNum);

  } catch (err) {
      console.error('Error! ->', err.message);
      return null;
  }
}

const cleanStr = (str) => {
    if (!str) return str;
    return str.trim()
              .toLowerCase()
              .replace(/\s+/g, ' ');
}



const cmdAlias = (cmd) => {
  if (!cmd) return null;

  let result = {...initReturnObject};
  let regEx = cmd.match(/\s*([a-zA-Z]+)\s+(is|Is|IS|iS)\s+([IVXLCDM]+)\s*$/);
  if (regEx) {
      addAlias(regEx);
      result.isMatch = true;
  }
 
  return result;
}

const addAlias = (regExResult) => {
  // *Output (global var) -> [ { name: 'glob', roman: 'I' }, ... ]
  let newAlias = { 
    name: cleanStr(regExResult[1]), 
    roman: regExResult[3].trim().toUpperCase()
  }
  aliases = [...aliases, newAlias];
}



const cmdValues = (cmd) => {
  if (!cmd) return null;
  let result = {...initReturnObject};
    let regEx = cmd.match(/\s*(.*)\s+(\S+)\s+is\s+([0-9]+)\s+Credits\s*$/i);
    if (regEx) {
        addGoodsAmount(regEx)
        result.isMatch = true;
    }
    return result;
}

const addGoodsAmount = (regExResult) => {
  // *Output (global var) -> [ { count: 20, item: 'Iron', value: '3910' }, ... ]
  let kauderwelsch = regExResult[1];
  let decNum = translateKauderwelsch(kauderwelsch, aliases);
  if (decNum) {
      let newGood = {
          count: decNum,
          item: cleanStr(regExResult[2]),
          value: regExResult[3]
      }
      goodsValues = [...goodsValues, newGood];
  }
}



const cmdHowMuch = (cmd) => {
  // Input: how much is pish tegj glob glob ?   
  // -> translate: regEx[1] ('pish tegj glob glob') into decNum
  // -> Output: pish tegj glob glob is 42 Credits
  let result = {...initReturnObject};
  if (!cmd) return result;
    let regEx = cmd.match(/\s*how\s+much\s+is\s+(.*)\s*\?\s*$/i);
    if (!regEx) return result;
    
    result.output = calcHowMuch(regEx);
    result.isMatch = true;
    
    return result;
}

const calcHowMuch = (regExResult) => {
  let kauderwelsch = cleanStr(regExResult[1]);
  let decNum = translateKauderwelsch(kauderwelsch, aliases)
  return decNum
    ? `${kauderwelsch} is ${decNum} Credits`
    : null;
}



const cmdHowMany = (cmd) => {
  let result = {...initReturnObject};
  if (!cmd) return result;
  
  // Input: 'how many Credits is glob prok Silver ?'
  // -> Output: 'glob prok Silver is 68 Credits'
  let regEx = cmd.match(/\s*how\s+many\s+credits\s+is\s+(.*)\s+([a-z]+)\s*\?\s*$/i);
  if (!regEx || regEx[2].trim() === '') return result;  // regEx[2] = goods <- if goods from regEx is empty: ''
  
  result.isMatch = true;
  result.output = calcHowMany(regEx);
  return result;
}

const calcHowMany = (regExResult) => {
    if (!regExResult) return null;
    
    let kauderwelsch = cleanStr(regExResult[1]);
    let count = translateKauderwelsch(kauderwelsch, aliases); // 4 | null
    if (!count) return null;

    let goods = regExResult[2].trim(); // Silver, Gold, Iron
    let basisItem = goodsValues.find(({ item }) => item.toLowerCase() === goods.toLowerCase());
    
    return basisItem          // rule of three _ Dreisatz
      ? `${kauderwelsch} ${goods} is ${count * basisItem.value / basisItem.count} Credits`
      : null;
}



/* Task input */
input.forEach(item => {
  readCmd(item);
});

/***** Test-Exports *****/
exports.input = input;
exports.cmdAlias = cmdAlias;
exports.cmdValues = cmdValues;
exports.cmdHowMuch = cmdHowMuch;
exports.cmdHowMany = cmdHowMany;
exports.translateKauderwelsch = translateKauderwelsch;