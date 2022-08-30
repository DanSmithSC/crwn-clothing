import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = ()=> {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Confirm the passwords match 
    if(password !== confirmPassword) {
      alert("Passwords do not match!")
      return;
    }

    try {
      //If user is authenticated with email/password
      const { user } = await createAuthUserWithEmailAndPassword( email, password )
      
      await createUserDocumentFromAuth(user, { displayName } )

      resetFormFields()

    } catch(error) {
      if(error.code === 'auth/email-already-in-use' ) {
        alert('Cannot Create User, email already in use')
      } else {
        console.log(`User Creation encountered an Error`,error)
      }
    }
  }
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value})
  }

  return (
    <div className="sign-up-container">
      <h2> Don't have an Account? </h2>
      <span>Sign up with Email and Password</span>
      <form onSubmit={ handleSubmit }>
       
        <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
        
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        
        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
        
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm