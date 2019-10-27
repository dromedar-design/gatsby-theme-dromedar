import React, { useState } from 'react'
import useForm from 'react-hook-form';
import axios from 'axios'

const Form = ({
    children,
    url,
    method = 'post'
}) => {
    const { register, handleSubmit, errors } = useForm()
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = data => {
        setLoading(true)

        axios[method](url, data)
            .then(res => {
                setLoading(false)
                setResponse(res.data)
            })
            .catch(e => {
                setLoading(false)
                console.log('catch', e.response.data)
            })
    }

    const state = {
        response,
        errors,
        loading,
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        {children(register, state)}
    </form>
}

export default Form