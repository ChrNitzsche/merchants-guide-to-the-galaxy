const { parse } = require('roman-numerals-api');

/****** Type-definitions ******/
interface aliases {
  name: string; 
  roman: string;
}
interface sessionObj {
  isMatch: Boolean;
  output: string | null;
}
interface goods {
  count: number;
  item: string;
  value: number;
}

type cmdFkt = string | Boolean | void;
type session = sessionObj | null;
type regEx = string[] | null;
/*******************************/



const NO_COMMAND_MATCHED: string = 'I have no idea what you are talking about';
const initReturnObject: sessionObj = { isMatch: false, output: null };
let aliases: aliases[] = [];
let goodsValues: goods[] = [];
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




const readCmd = (cmd: string): void => {
  console.log(' > '+ cmd);
  let res: session = analyseCmd(cmd);
  if(res.output)   console.log(res.output);
  if(!res.isMatch) console.log(NO_COMMAND_MATCHED);
}


const analyseCmd = (cmd: string): session | null => { 
  // Output: { isMatch: bool, output: string } | true | false
  let commands = [cmdAlias, cmdValues, cmdHowMuch, cmdHowMany];
  let res = null;

  commands.some((cmdFkt): cmdFkt => {
      let res: session = cmdFkt(cmd);
      if (res.isMatch) {
          return res.output || true;  // if return true -> NO Error Msg, command was handled correctly
      }
  });
  return res;
}


const translateKauderwelsch = (kauderwelsch: string, aliases: aliases[]): number | null => {
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

  } catch (err: unknown) {
      if (err instanceof Error) console.error('Error! ->', err.message);
      return null;
  }
}

const cleanStr = (str: string) => {
    if (!str) return str;
    return str.trim()
              .toLowerCase()
              .replace(/\s+/g, ' ');
}



const cmdAlias = (cmd: string): session => {
  if (!cmd) return null;

  let result: session = {...initReturnObject};
  let regEx: regEx = cmd.match(/\s*([a-zA-Z]+)\s+(is|Is|IS|iS)\s+([IVXLCDM]+)\s*$/);
  if (regEx) {
      addAlias(regEx);
      result.isMatch = true;
  }
 
  return result;
}

const addAlias = (regEx: regEx): void => {
  // *Output (global var) -> [ { name: 'glob', roman: 'I' }, ... ]
  let newAlias: aliases = { 
    name: cleanStr(regEx[1]), 
    roman: regEx[3].trim().toUpperCase()
  }
  aliases = [...aliases, newAlias];
}



const cmdValues = (cmd: string): session => {
  if (!cmd) return null;
  let result: session = {...initReturnObject};
    let regEx: regEx = cmd.match(/\s*(.*)\s+(\S+)\s+is\s+([0-9]+)\s+Credits\s*$/i);
    if (regEx) {
        addGoodsAmount(regEx)
        result.isMatch = true;
    }
    return result;
}

const addGoodsAmount = (regEx: regEx): void => {
  // *Output (global var) -> [ { count: 20, item: 'Iron', value: '3910' }, ... ]
  let kauderwelsch: string = regEx[1];
  let decNum: number = translateKauderwelsch(kauderwelsch, aliases);
  if (decNum) {
      let newGood: goods = {
          count: decNum,
          item: cleanStr(regEx[2]),
          value: parseInt(regEx[3])
      }
      goodsValues = [...goodsValues, newGood];
  }
}



const cmdHowMuch = (cmd: string): session => {
  // Input: how much is pish tegj glob glob ?   
  // -> translate: regEx[1] ('pish tegj glob glob') into decNum
  // -> Output: pish tegj glob glob is 42 Credits
  let result: session = {...initReturnObject};
  if (!cmd) return result;
    let regEx: regEx = cmd.match(/\s*how\s+much\s+is\s+(.*)\s*\?\s*$/i);
    if (!regEx) return result;
    
    result.output = calcHowMuch(regEx);
    result.isMatch = true;
    
    return result;
}

const calcHowMuch = (regEx: regEx): string => {
  let kauderwelsch: string | null = cleanStr(regEx[1]);
  let decNum: number = translateKauderwelsch(kauderwelsch, aliases)
  return decNum
    ? `${kauderwelsch} is ${decNum} Credits`
    : null;
}



const cmdHowMany = (cmd: string): session => {
  let result: session = {...initReturnObject};
  if (!cmd) return result;
  
  // Input: 'how many Credits is glob prok Silver ?'
  // -> Output: 'glob prok Silver is 68 Credits'
  let regEx: string[] | null = cmd.match(/\s*how\s+many\s+credits\s+is\s+(.*)\s+([a-z]+)\s*\?\s*$/i);
  if (!regEx || regEx[2].trim() === '') return result;  // regEx[2] = goods <- if goods from regEx is empty: ''
  
  result.isMatch = true;
  result.output = calcHowMany(regEx);
  return result;
}

const calcHowMany = (regEx: string []): string|null => {
    if (!regEx) return null;
    
    let kauderwelsch: string | null = cleanStr(regEx[1]);
    let count: number = translateKauderwelsch(kauderwelsch, aliases); // 4 | null
    if (!count) return null;

    let goods: string = regEx[2].trim(); // Silver, Gold, Iron
    let basisItem: goods | undefined = goodsValues.find(({ item }) => item.toLowerCase() === goods.toLowerCase());
    
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