import React from 'react'

function getProduct(param) {
    return React.$axios.get('/product/getProduct', {
        params: param
    });
}

function getBusiProduct(param) {
    return React.$axios.get('/product/getBusiProduct', {
        params: param
    });
}


export default {
    getProduct, getBusiProduct
}