import { useState, useEffect } from "react";
import "./App.css";
import qq from "./image/qq.jpeg"
import Chart from "./Chart";
import { useHistory } from "react-router-dom";


function Form() {
    
  const initialValues = { username: "", email: "", password: "", confirmpass: "", mobnum: "" , checkbox : false};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [handle , setHandle] = useState(true)
  let history = useHistory()
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.mobnum) {
      errors.mobnum = "Phone number is required!"
    } else if (values.mobnum.length !== 10 && values.mobnum > 9999999999 && values.mobnum < 5999999999) {
      errors.mobnum = "Please provide valide Phone Number"
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmpass) {
      errors.confirmpass = 'Confirm Password is required!'
    } else if (values.confirmpass !== values.password) {
      errors.confirmpass = "Both passwords should match"
    }
    if(!values.checkbox){
      errors.checkbox = "Please Agree for the terms and conditions"
   
    }

    if(values.username && values.email && values.password && values.confirmpass && values.mobnum && values.checkbox){
        if(handle === true){
            history.push("/chart")
        }
       
    }
    
  
    return errors;
  };
  

  return (
    <div className="main">  
      <img src={qq} alt="img" />

      <div className="container">
        {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )} */}

        <form onSubmit={handleSubmit}>
          <h1>Create an account</h1>
          <div className="ui divider"></div>
          <div className="ui form">

            <div className="field">
              <label>Your email address</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <label>Your password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>

            <div className="field">
              <label>Confirm Your Password</label>
              <input
                type="password"
                name="confirmpass"
                placeholder="Confirm Your Password"
                value={formValues.confirmpass}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.confirmpass}</p>
            <div className="field">
              <label>Your full name</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>

            <div className="field">
              <label>Your Phone Number</label>
              <input
                type="number"
                name="mobnum"
                placeholder="phone number"
                value={formValues.mobnum}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.mobnum}</p>
            
            <div>
            
            <input
            type="checkbox"
            name = "checkbox"
            value={true}
            onChange={handleChange}/>
            &nbsp;
            <label><strong>I read and agree terms and conditions</strong></label>
            </div>
            <p>{formErrors.checkbox}</p>
             <button onClick={()=>{setHandle(!handle)}}  className="fluid ui button blue">Create Account</button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
