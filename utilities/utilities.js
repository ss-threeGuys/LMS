var convert = require("xml-js");

const convertJSONtoXML = (json, childTagName, parentTagName) => {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  let xml = convert.json2xml(json, options).replace(/\d>/g, `${childTagName}>`);
  //adding parentTag to XML if needed
  if (parentTagName !== null) {
    xml = `<${parentTagName}> ${xml} </${parentTagName}> `;
  }
  if (parentTagName == null) {
    xml = `<${childTagName}> ${xml} </${childTagName}> `;
  }
  return xml;
};

module.exports = { convertJSONtoXML };
