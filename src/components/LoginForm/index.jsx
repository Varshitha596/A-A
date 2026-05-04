import {useState} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import { useNavigate ,Navigate} from 'react-router-dom'

const LoginForm = () => {
  const navigate=useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError,setshowSubmitError]=useState(false)
  const [errorMsg,setErrormsg]=useState('')


  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }
  const onsubmitSuccess=(jwttoken)=>{
Cookies.set('jwt_token',jwttoken,{expires:30})
    navigate('/',{replace:true})
  }
  const onSubmitFailure = (errorMsg)=>{
   setshowSubmitError(true)
   setErrormsg(errorMsg)
  }
const submitForm = async event=>{
  event.preventDefault()
  const userDetails ={username,password};
  const url='https://apis.ccbp.in/login'
  const option={
    method:'POST',
    body:JSON.stringify(userDetails),
  }
  const response = await  fetch(url,option)
  const data=await response.json();
  console.log(data)
  if(response.ok===true){
    onsubmitSuccess(data.jwt_token)
  }
    else
      {
      onSubmitFailure(data.error_msg)
    }
}
  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={onChangePassword}
        placeholder="Password"
      />
    </>
  )

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        onChange={onChangeUsername}
        placeholder="Username"
      />
    </>
  )
  const jwtToken = Cookies.get('jwt_token');
  if(jwtToken !== undefined){
    return <Navigate to="/"/>
    }
  return (
    <div className="login-form-container">
      <img
        src="https://s3.ap-south-1.amazonaws.com/new-assets.ccbp.in/frontend/loading-data/niat_react_js/niat_coding_questions/nxt-trendz-logo.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://s3.ap-south-1.amazonaws.com/new-assets.ccbp.in/frontend/loading-data/niat_react_js/niat_coding_questions/nxt-trendz-logo.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className='error-message'>*{errorMsg}*</p>}
      </form>
    </div>
  )
}

export default LoginForm
