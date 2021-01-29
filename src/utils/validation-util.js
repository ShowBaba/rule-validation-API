const niv = require("node-input-validator");

exports.validateBody = async (input) => {
  // custom validation
  niv.extend("not_numeric", ({ value }) => {
    if (typeof value !== "number") {
      return true;
    }
    return false;
  });
  // validation
  const val = new niv.Validator(input, {
    rule: "required|object",
    data: "not_numeric|required",
    "rule.field": "required",
    "rule.condition": "required",
    "rule.condition_value": "required",
  });

  // add custom messages
  niv.addCustomMessages({
    "rule.object": "rule should be an object.",
    "data.not_numeric": "data should be a JSON object, an array or a string.",
    "rule.required": "rule is required.",
    "data.required": "data is required.",
    "rule.field.required": "field is required",
    "rule.condition.required": "condition is required",
    "rule.condition_value.required": "condition_value is required",
  });
  const matched = await val.check();
  if (!matched) {
    return val.errors;
  }
  return matched;
};

exports.fieldInData = (field, data) => {
  if (data.hasOwnProperty(field)) {
    return true;
  }
  return false;
};

exports.conditionCheck = (condition, condition_value, data_field) => {
  switch (condition) {
    case "eq":
      return data_field === condition_value;
    case "neq":
      return data_field != condition_value;
    case "gt":
      return data_field > condition_value;
    case "gte":
      return data_field >= condition_value;
    case "contains":
      return data_field === condition_value;
    default:
      return "invalid condition";
  }
};

exports.formatValidationError = (raw) => {
  const rawResult = raw[Object.keys(raw)[0]];
  const cooked = {
    message: rawResult[Object.keys(rawResult)[0]],
    status: "error",
    data: null,
  };
  return cooked;
};
