import React, { useState } from 'react'
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import FormControl from '../Formik/FormControl/FormControl'
import axios from "../../axiosInstance/axios";
import { setLoading, setOverlay } from '../../app/features/mainReducer'
import { useAppDispatch } from '../../app/hooks';
import draw from '../../images/draw.webp';

export interface User {
  name: string;
  email: string;
  mobile: string;
}

const CreateUser = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>();
  const [success, setSuccess] = useState(false);
  
  const initialValues: User = {
    name: "",
    email: "",
    mobile: "",
  };
  
  const onSubmit = (data: User, actions: any) => {
    dispatch(setLoading(true))
    axios.post("user/save/", data)
      .then(res => {
        const data = JSON.parse(JSON.stringify(res.data));
        setMessage(data.message);
        setSuccess(data.status);
        actions.resetForm();
        console.log(actions)
      }).catch(err => {
        const data = JSON.parse(JSON.stringify(err.data));
        setMessage(data.message)
        setSuccess(data.status)
        console.log(err);
      }).finally(() => {
        dispatch(setOverlay(false));
      })
  }
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Enter your name!"),
    email: Yup.string().email("Enter a valid email").required("Enter your email address!"),
    mobile: Yup.string().required("Enter your mobile!")
  })
  
  return (
    <div className='px-6 h-full text-gray-800'>
      <div className="FormWrapper">
        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
          <img
            src={draw}
            className="w-full"
            alt=''
          />
        </div>
        <Formik
          initialValues={ initialValues }
          validationSchema={ validationSchema }
          onSubmit={onSubmit}
        >
          {formik => {
            return (
            <Form className='Form'>
              <h1 className='font-bold text-4xl text-blue-600 mb-2'>Create User</h1>
              <FormControl
                control='input' type='text'
                name='name' label='user name:' placeholder="user name"
              />
              <FormControl
                control='input' type='email'
                name='email' label='user email:' placeholder="Email address"
              />
              <FormControl
                control='input' type='text'
                name='mobile' label='mobile phone:' placeholder="Mobile phone"
              />
              <button
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                // className="my-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                className="Btn BtnPrimary"
              >Save</button>
              {message && <div className={["Alert", success ? "AlertSuccess" : "AlertDanger"].join(" ")}>
                {message}
              </div>}
            </Form>
          )}}
        </Formik>
      </div>
    </div>
  )
}

export default CreateUser