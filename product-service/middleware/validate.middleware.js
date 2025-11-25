module.exports = (schema) => (req, res, next) => {
  console.log("validate middleware")
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((d) => d.message),
    });
  }
  next();
};
