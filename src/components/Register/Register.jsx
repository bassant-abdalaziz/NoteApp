import style from "./Register.module.css";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Register() {
  const { sendDataToSignUp } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("username is required")
      .min(3, "username must be more than 2 characters")
      .max(7, "username must be less than 8 characters"),

    email: Yup.string()
      .required("email is required")
      .email("please enter a valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z]/, "password must start with uppercase letter"),
    age: Yup.number()
      .required("age is required")
      .min(18, "You must be at least 18 Years old")
      .max(60, "You can't be more than 60"),
    phone: Yup.string()
      .required("phone number is required")
      .matches(/^01[0125][0-9]{8}/, "please enter a valid egyptian number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },

    validationSchema,

    onSubmit: async function (values) {
      // console.log({ valuesFromOnSumbit: values });
      setIsLoading(true);
      const res = await sendDataToSignUp(values);
      // console.log(res);
      setIsLoading(false);
      if (res.msg === "done") {
        toast.success("Successfully registered!");
        navigate("/login");
      } else {
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className={`${style.container} row`}>
          <figure className="col-md-8 m-0 p-md-0">
            <div className="image-container">
              <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
            </div>
          </figure>

          <form
            className="col-md-4 d-flex flex-column justify-content-center px-5"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
            <p className="mb-3">Let's get started for free</p>
            <div className="form-group d-flex flex-column gap-3 justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="name"
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />

              {formik.errors.name && formik.touched.name ? (
                <p className="error">{formik.errors.name}</p>
              ) : (
                ""
              )}

              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              {formik.errors.email && formik.touched.email ? (
                <p className="error">{formik.errors.email}</p>
              ) : (
                ""
              )}

              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />

              {formik.errors.password && formik.touched.password ? (
                <p className="error">{formik.errors.password}</p>
              ) : (
                ""
              )}

              <input
                type="text"
                inputMode="numeric"
                className="form-control"
                placeholder="Age"
                name="age"
                id="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
              />

              {formik.errors.age && formik.touched.age ? (
                <p className="error">{formik.errors.age}</p>
              ) : (
                ""
              )}

              <input
                type="tel"
                inputMode="numeric"
                className="form-control"
                placeholder="phone"
                name="phone"
                id="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />

              {formik.errors.phone && formik.touched.phone ? (
                <p className="error">{formik.errors.phone}</p>
              ) : (
                ""
              )}

              <button type="submit" className="btn btn-main">
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Create Account"
                )}
              </button>
              <p>
                Already have account ?{" "}
                <Link to="/login" className="text-decoration-underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
