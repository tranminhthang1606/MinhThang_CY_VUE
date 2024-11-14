export const callLogin = async (config, payload) => {
    const response = await useFetch(`${config.public.VITE_BASE_API_URL}/login`, {
        method: 'POST',
        params: payload
    })
    return response
}

export const fetchProduct = async (config, payload, optional = {}) => {
    const response = await $fetch(`${config.public.VITE_BASE_API_URL}/products`, {
        method: 'GET',
        params: optional,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload}`,
        }
    })
    return response;
}

export const callSignup = async (config, payload) => {
    const response = await useFetch(`${config.public.VITE_BASE_API_URL}/signup`, {
        method: 'POST',
        params: payload
    })
    return response;
}

export const sendOrder = async (config, payload, optional = {}) => {
    const response = await $fetch(`${config.public.VITE_BASE_API_URL}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload}`,
        },
        body: optional
    })
    return response;
}

export const fetchOrder = async (config, payload) => {
    const response = await $fetch(`${config.public.VITE_BASE_API_URL}/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload}`,
        }
    })
    return response;
}

export const fetchCategories = async (config, payload) => {
    const response = await $fetch(`${config.public.VITE_BASE_API_URL}/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload}`,
        }
    })
    return response;
}

export const checkStocks = async (config, payload, id) => {
    const response = await $fetch(`${config.public.VITE_BASE_API_URL}/products/${id}/check-stock`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload}`,
        },
    })
    return response;
}


export const fetchDetailProduct = async (config, payload, id) => {
    const response = await $fetch(`${config.public.VITE_BASE_API_URL}/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload}`,
        },
    })
    return response;
}

export const callLogout = async (config, payload) => {
    const response = await $fetch(`${config.public.VITE_BASE_API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payload}`,
        },
    })
    return response;
}


