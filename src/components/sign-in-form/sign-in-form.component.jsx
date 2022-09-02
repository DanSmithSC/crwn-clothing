import { useState } from 'react'
import Button from '../button/button.component';
import FormInput from "../form-input/form-input.component";
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //If user is authenticated with email/password
      const { user } = await signInAuthUserWithEmailAndPassword( email, password )
      console.log(user)
      resetFormFields()

    } catch(error) {
      switch(error.code){
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break;
        
        case 'auth/user-not-found':
          alert('Incorrect Username/Password for provided credentials');
          break;
        
        default: 
          console.log(error)
      }

      if(error.code === 'auth/user-not-found' ) {
        alert('Incorrect Username/Password for provided credentials')
      } else {
        console.log(`User Auth encountered an Error`,error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value})
  }

  return (
    <div className='sign-up-container'>
      <h2>I already have an account</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={ handleSubmit }>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
        <div className='buttons-container'>
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">Google Sign in</Button> 
        </div> 
      </form>
    </div>
  )
}

export default SignInForm;