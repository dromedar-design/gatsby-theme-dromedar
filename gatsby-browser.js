import axios from 'axios'

export const onInitialClientRender = (_, options) => {
    axios.defaults.baseURL = options.api;
}