const validatorUtil = require("../../utils/validation-util");

// TODO: validate input to be JSON before passing to validator utility
module.exports = {
  validateRule: async (req, res, next) => {
    const input = req.body;
    const isJson = input instanceof Object ? true : false;
    try {
        const result = await validatorUtil.validateBody(input);
        if (result !== true) {
          const error = validatorUtil.formatValidationError(result);
          return res.status(400).send(error);
        } else {
          if (!validatorUtil.fieldInData(req.body.rule.field, req.body.data)) {
            res.status(400).json({
              message: `field ${req.body.rule.field} is missing from data.`,
              status: "error",
              data: null,
            });
          } else {
            const meetCondition = validatorUtil.conditionCheck(
              req.body.rule.condition,
              req.body.rule.condition_value,
              req.body["data"][req.body.rule.field]
            );
            if (!meetCondition) {
              res.status(400).json({
                message: `field ${req.body.rule.field} failed validation.`,
                status: "error",
                data: {
                  validation: {
                    error: true,
                    field: req.body.rule.field,
                    field_value: req.body["data"][req.body.rule.field],
                    condition: req.body.rule.condition,
                    condition_value: req.body.rule.condition_value,
                  },
                },
              });
            } else {
              res.status(200).json({
                message: `field ${req.body.rule.field} successfully validated.`,
                status: "success",
                data: {
                  validation: {
                    error: false,
                    field: req.body.rule.field,
                    field_value: req.body["data"][req.body.rule.field],
                    condition: req.body.rule.condition,
                    condition_value: req.body.rule.condition_value,
                  },         
                },
              });
            }
          }
        }
    } catch (error) {
      next()
    }
  },
};
