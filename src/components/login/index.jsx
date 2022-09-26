import React, { useCallback, useEffect, useState } from "react";
import Input from '../shared/form/input'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from '../../services/authenticate.service';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';

const schema = yup.object({
    email: yup.string().required('Email is required').email('Please enter a valid email'),
    password: yup.string().required('Please enter a password'),
  });

export default function Login(){

    const { register, handleSubmit, formState:{ errors, isValid } } = useForm({
        resolver: yupResolver(schema)
      });
    const [cookies, setCookie] = useCookies(['token']);
    let navigate = useNavigate();

    const onSubmitValid = useCallback((data)=>{
        if(isValid){
            localStorage.setItem('user', JSON.stringify(data));
            login(data)
            .then(({ data, error })=>{
                if(data){
                    setCookie("token", data.token, { sameSite: true, path: '/' })
                    toast.success("Logged in successfully")
                    navigate("/", { replace: true });
                }else{
                    toast.error(error)
                }
            })
            // navigate("/", { replace: true });
        }
        console.log('isValid', isValid, data);
    },[isValid])

    const onSubmitError = (err)=>{
        console.log(err)
    }
    const ErrorMessage = ({fieldName})=>{
        let msg = null;
        if(errors && errors[fieldName] && errors[fieldName]['message']){
            msg = <span className="text-danger"> {errors[fieldName]['message']} </span>;
        }else{
            msg = <span></span>;
        }
        return msg 
    }

    return <div className="login-form">
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitError)}>
            <div className="row">
                <div className="col">
                    <Input {...register("email", { required: true })} id="email" labelClass='form-label' className="form-control" label="Enter your email" />
                    <ErrorMessage fieldName="email"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Input {...register("password", { required: true })} id="password" labelClass='form-label' className="form-control" label="Enter Password" />
                    <ErrorMessage fieldName="password"/>
                </div>
            </div>
            <div className="row text-center pt-4">
                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-primary" data-disabled={!isValid ? 'on': 'off'}>Submit</button>
                </div>
            </div>
        </form>
    </div>
}