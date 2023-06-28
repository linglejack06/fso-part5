const LoginForm = ({ username, password, handleChange, handleSubmit }) => {
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
    </form>
  )
}

export default LoginForm;