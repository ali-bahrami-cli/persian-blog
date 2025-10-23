const yup = require("yup");

const schema = yup.object().shape({
  username: yup
    .string()
    .required("نام کاربری الزامی است")
    .min(5, "نام کاربری باید حداقل ۵ کاراکتر باشد")
    .max(100)
    .transform((value) => (value ? value.trim().replace(/\s+/g, " ") : value)),
  email: yup
    .string()
    .required("ایمیل الزامی است")
    .email("ایمیل نامعتبر است")
    .transform((value) => (value ? value.trim().replace(/\s+/g, "") : value)),
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(4, "رمز عبور باید حداقل ۴ کاراکتر باشد")
    .max(100)
    .transform((value) => (value ? value.trim().replace(/\s+/g, "") : value)),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "رمز عبور و تکرار آن باید یکسان باشد"),
});

module.exports = schema;