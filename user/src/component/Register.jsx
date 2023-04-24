import { useState } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = "https://tasktracker-mqm9.onrender.com/auth/register";

      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
      toast.success("Registration successful!");
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        const errorData = error.response.data;
        if (errorData.message === "Username already taken") {
          setError("Username already taken");
        } else if (errorData.message === "Email already taken") {
          setError("Email already taken");
        } else {
          setError("This username or email already exist");
        }
      } else {
        setError("Something went wrong");
      }
      toast.error("User already exist");
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button
              type="submit"
              className={styles.green_btn}
              disabled={isLoading}
            >
              {isLoading ? (
                <PulseLoader color={"#ffffff"} size={10} margin={2} />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
