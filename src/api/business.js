import React from 'react'



function getBusiness(param) {
    return React.$axios.get('/business/getBusiness', {
        params: param
    }
    );
}

function getBusinessPerCate(param) {

    return React.$axios.get('/business/getBusinessPerCate', {
        params: param
    });
}

function getBusiDetail(param) {

    return React.$axios.get('/business/getBusiDetail', {
        params: param
    });
}

export default {
    getBusiness, getBusinessPerCate, getBusiDetail
}