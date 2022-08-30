import './button.styles.scss'
/* 
  standard button = black with white on hover
  inverted button = white with black on hover
  google sign-in button = blue
*/

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',

}

const Button = ({ children, buttonType, ...otherProps }) => {
  return(
    <button 
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button;