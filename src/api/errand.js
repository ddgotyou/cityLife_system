import React from 'react'
function submitOrder(param) {
    return React.$axios.post('/errand/addNewSubscribe', param);
}

export default {
    submitOrder
}