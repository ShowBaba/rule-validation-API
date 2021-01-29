var validjsontext =
  '{"firstnam":"James","surname":"Bond","mobile":["007-700-007","001-007-007-0007"]}';
var invalidjsontext =
  '{"firstnam""James","surname":"Bond","mobile":["007-700-007","001-007-007-0007"]}';
console.log("With Valid JSON Text: " + IsValidJSONString(validjsontext));
console.log("With inValid JSON Text: " + IsValidJSONString(invalidjsontext));
function IsValidJSONString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
