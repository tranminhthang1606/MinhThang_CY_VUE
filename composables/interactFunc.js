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


export const addToCart = async (item, config, token, cartItem) => {
    console.log(item, config, token, cartItem);

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
                useNuxtApp().$toast.error('Thêm giỏ hàng không thành công vì quá số lượng tồn');
                return
            }
        } else {
            cartItem.push({ ...productItem, sl: 1 });
        }
    } else {
        cartItem.push({ ...productItem, sl: 1 });
    }
    sessionStorage.setItem('cart', JSON.stringify(cartItem));
    useNuxtApp().$toast.success('Thêm giỏ hàng thành công');
}