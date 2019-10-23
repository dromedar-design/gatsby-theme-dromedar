import React, { useState } from 'react'
import useForm from 'react-hook-form';
import axios from 'axios'

const Form = ({
    children,
    url,
    method = 'post'
}) => {
    const { register, handleSubmit } = useForm()
    const [response, setResponse] = useState('');

    const onSubmit = data => {
        axios[method](url, data)
            .then(res => setResponse(res.data))
            .catch(e => console.log('catch', e.response.data))
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        {children(register, response, [])}
    </form>
}

export default Form