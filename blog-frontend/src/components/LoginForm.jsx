const LoginForm = ({ username, password, handleChange, handleSubmit, errorMessage }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='input-container'>
        <label htmlFor='username'>Username: </label>
        <input type='text' id='username' name='username' value={username} onChange={handleChange} />
      </div>
      <div className='input-container'>
        <label htmlFor='password'>Password: </label>
        <input type='password' id='password' name='password' value={password} onChange={handleChange} />
      </div>
      <button type='submit'>Login</button>
      {( errorMessage === null ) ? null : (
        <p className='error'>{errorMessage}</p>
      )}
    </form>
  )
}

export default LoginForm;