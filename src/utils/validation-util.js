const niv = require("node-input-validator");

/**
 * Validate input data using node-input-validator library
 *
 * @param {Object} input  object value to validate
 * @return {Boolean}      true if input is valid, else otherwise
 */
const validateBody = async (input) => {
  // custom validation
  niv.extend("not_numeric", ({ value }) => {
    if (typeof value !== "number") {
      return true;
    }
    return false;
  });
  // create validation object
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

/**
 * Check if input field string is in data object
 *
 * @param {String} field  value to search in data
 * @param {Object} data   data to search
 * @return {Boolean}      true if field in data, else false
 */
const fieldInData = (field, data) => {
  if (data.hasOwnProperty(field)) {
    return true;
  }
  return false;
};

/**
 * Check if args[1] & args[2] conform to condition in args[0]
 *
 * @param {String} condition        condition defination
 * @param {String} condition_value
 * @param {String} data_field
 * @return {Boolean}                true if condition pass, else false
 */
const conditionCheck = (condition, condition_value, data_field) => {
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

/**
 * Extract error message from raw input
 *
 * @param {Object} raw  raw object value
 * @return {Object}     the formated object
 */
const formatValidationError = (raw) => {
  const rawResult = raw[Object.keys(raw)[0]];
  const cooked = {
    message: rawResult[Object.keys(rawResult)[0]],
    status: "error",
    data: null,
  };
  return cooked;
};

module.exports = {
  fieldInData,
  validateBody,
  formatValidationError,
  conditionCheck,
};
