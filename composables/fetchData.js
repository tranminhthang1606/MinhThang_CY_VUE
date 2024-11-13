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


export const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date)) {
        console.error("Invalid date string:", dateString);
        return null;
    }

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    };

    return new Intl.DateTimeFormat('vi-VN', options).format(date);
}

export const formatCurrency = (amount) => {
    const amountInThousands = amount * 1000;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amountInThousands);
}


export const addToCart = async (item,config,token,cartItem) => {
    console.log(item,config,token,cartItem);
    
    let res = await checkStocks(config, token, item.id)
    if (res.message == 'Out of stock') {
        useNuxtApp().$toast('Sản phẩm đã hết hàng');
        return;
    }
    let itemData = await fetchDetailProduct(config, token, item.id);
    let productItem = itemData;
    if (cartItem.length > 0) {
        let existItem = cartItem.find((e) => e.id == item.id)
        if (existItem) {
            if (productItem.stock - 1 >= existItem.sl) {
                existItem.sl++;
                existItem = { ...productItem, sl: existItem.sl }
            } else {
                useNuxtApp().$toast('Thêm giỏ hàng không thành công vì quá số lượng tồn');
                return
            }
        } else {
            cartItem.push({ ...productItem, sl: 1 });
        }
    } else {
        cartItem.push({ ...productItem, sl: 1 });
    }
    sessionStorage.setItem('cart', JSON.stringify(cartItem));
    useNuxtApp().$toast('Thêm giỏ hàng thành công');
}