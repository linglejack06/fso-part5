const Login = ({ username, password, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='input-container'>
        <label htmlFor='username'>Username: </label>
        <input type='text' value={username} placeholder='username' onChange={handleChange} id='username' name='username' />
      </div>
      <div className='input-container'>
        <label htmlFor='password'>Password: </label>
        <input type='password' value={password} placeholder='password' onChange={handleChange} id='password' name='password' />
      </div>
      <button type='submit'>Login to Notes</button>
    </form>
  )
}

export default Login