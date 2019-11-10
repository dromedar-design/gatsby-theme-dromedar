import React, { useState } from 'react'
import useForm from 'react-hook-form';
import axios from 'axios'

const Form = ({
    children,
    url,
    method = 'post',
    onSubmit = () => null,
    onError = () => null,
}) => {
    const { register, handleSubmit, errors } = useForm()
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const state = {
        response,
        errors,
        loading,
    }

    const submitHandler = data => {
        setLoading(true)

        axios[method](url, data)
            .then(res => {
                setLoading(false)
                setResponse(res.data)

                onSubmit(state)
            })
            .catch(e => {
                setLoading(false)
                console.log('catch', e.response.data)

                onError(state)
            })
    }

    return <form onSubmit={handleSubmit(submitHandler)}>
        {children(register, state)}
    </form>
}

export default Form