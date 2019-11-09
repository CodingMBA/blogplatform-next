import { useState } from 'react'

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: 'Andrew Smith',
    email: 'andrew.smith@webmatters.io',
    password: 'testtest',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  })

  const { name, email, password, error, loading, message, showForm } = values

  const handleSubmit = e => {
    e.preventDefault()
    console.table({ name, email, password, error, loading, message, showForm })
  }

  const handleChange = name => e => {
    e.preventDefault()
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit} action="">
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={handleChange('name')}
            className="form-control"
            placeholder="Enter full name"
          />
          <input
            type="email"
            value={email}
            onChange={handleChange('email')}
            className="form-control"
          />
          <input
            type="password"
            value={password}
            onChange={handleChange('password')}
            className="form-control"
          />
          <div>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </form>
    )
  }

  return <>{signupForm()}</>
}

export default SignupComponent
