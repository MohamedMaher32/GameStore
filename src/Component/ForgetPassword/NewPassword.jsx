import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Logo from '../../Assets/logo.png'
import mainBg from '../../Assets/main-bg.jpg'
export default function NewPassword() {
  // main Api link
  let baseUrl = "https://route-ecommerce.onrender.com"
  // error element to display erroe message)
  let [errMsg, setErrMsg] = useState("")
  // btn loading
  let [loading, setLoading] = useState(false)
  // programming routing
  let navigate = useNavigate()
  //******************************************************* form new password ************************************************************************** */
  // validation form
  let validationSchema = Yup.object({
    email: Yup.string().required().email("Enter your valid email"),
    newPassword: Yup.string().required().matches(/^[A-Za-z0-9!@#$%&*_-]{3,16}$/, "Enter valid password"),
  })
  // dateiles form
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    onSubmit: (value) => {
      ResetPassword(value)
    },
    validationSchema,
  })
  // api function
  async function ResetPassword(info) {
    setLoading(true)
    let { data } = await Axios.put(`${baseUrl}/api/v1/auth/resetPassword`, info).catch((error) => {
      setErrMsg(error.response.data.message);
      setLoading(false)
    })
    console.log(data);
    if (data.token) {
      navigate("/login")
    }
  }
  return (
      <div className="container py-5">
        <div className='row move gray mx-0'>
          <div className="col-lg-6 col-sm-12 p-0">
            <img src={mainBg} alt="play games" className='w-100 h-100' />
          </div>
          <div className='col-lg-6 col-sm-12 p-5  '>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img src={Logo} alt="logo" className='w-25' />
              <h2 className='h4 text-center py-2'>Reset Password</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className='my-3'>
                <input onChange={formik.handleChange} type="email" className='form-control bg-dark border-0 text-muted' id='email' name='email' placeholder='Email' />
                <p className='text-danger'>{formik.errors.email}</p>
              </div>
              <div className='my-3'>
                <input onChange={formik.handleChange} type="password" className='form-control bg-dark border-0 text-muted' id='newPassword' name='newPassword' placeholder='New Password' />
                <p className='text-danger'>{formik.errors.password}</p>
              </div>
              {errMsg != "" ? <div className='alert alert-danger'>{errMsg}</div> : ""}
              {loading ? <button type='button' className='btn btn-bg w-100 mb-2'><i className='fa-solid fa-spinner fa-spin'></i></button>
                :
                <button disabled={!formik.isValid} type="submit" className='btn btn-bg w-100 mb-2'>Update Password</button>}
            </form>
          </div>
        </div>
      </div>
  )
}