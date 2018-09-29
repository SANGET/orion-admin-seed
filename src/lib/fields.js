/**
 * 公用的 fields
 * 定义所有的报表的字段的属性
 * 提供给 ActionsReport 类的字段配置，有共同的配置可以写在这里
 * 引用了作用域的概念
 * 可以根据不同的作用域下相同的字段名字做对应的表现
 */

let namesMapper = [
  'TransferType',
];
let moneyMapper = [
  'RealCost',
];
let abvMoneyMapper = [
  'Bet',
];
let datetimeMapper = [
  'OrderTime',
  'loginTime',
  'createTime',
];
let dateMapper = [
  // 'CalcEndDate',
  // 'CalcStartDate',
];
let normalFields = [
  'Account',
];

/**
 * 为了避免：不同的功能的同样的字段的冲突的问题
 * 如果 commonFields 定义了有对应的字段，则会自动赋予对应的属性
 */
let scopeFields = {};

function initFields() {
  if(scopeFields.common) return;
  let commonFields = (function() {
    let resultObj = {};
    function setResultObj(key, val) {
      if(resultObj.hasOwnProperty(key)) console.log('重复配置了 ' + key + ' 请检查');
      resultObj[key] = val;
    }
    namesMapper.map(item => setResultObj(item, {namesMapper: $MN.getKeyMap('all')}));
    moneyMapper.map(item => setResultObj(item, {money: true}));
    abvMoneyMapper.map(item => setResultObj(item, {abvMoney: true}));
    dateMapper.map(item => setResultObj(item, {date: true}));
    datetimeMapper.map(item => setResultObj(item, {datetime: true}));
    normalFields.map(item => setResultObj(item, ''));

    return resultObj;
  })();
  scopeFields = {
    common: commonFields
  };
}

const defaultScope = 'common';

function setFields(fields, scope = defaultScope) {
  if(!scopeFields[scope]) scopeFields[scope] = {};
  Object.assign(scopeFields[scope], fields);
}
function getFields(options = {}) {
  /**
   * TODO 写下参数说明
   */
  let {names, scope = defaultScope, extend} = options;
  let _configNames = Array.isArray(names) ? names : [names];
  let result = [];
  let currScopeFieldGroup = scopeFields[scope];

  _configNames.forEach(nameConfig => {
    if(!nameConfig) return;
    let isString = typeof nameConfig == 'string';
    let currConfig = isString ? currScopeFieldGroup[nameConfig] : nameConfig;
    let name = isString ? nameConfig : currConfig.key;
    let currCommonField = scopeFields.common[name];
    result.push(Object.assign({}, {
      key: name,
    }, currConfig, currCommonField));
  });
  if(extend) result.push(extend);
  return result;
}
// setTimeout(() => {
//   setFields({
//     username: {
//       ref: 'username',
//       filter: () => {
//         return 'qwe'
//       }
//     }
//   })
//   console.log(getFieldsConfig())
// }, 100)

function getFieldsConfig(scope) {
  return scope ? Object.assign({}, scopeFields[scope]) : scopeFields;
}

export {
  getFieldsConfig, getFields, setFields, initFields
};
