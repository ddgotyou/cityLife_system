import React from 'react'
function login(param) {
    return React.$axios.post('/login/submit', param);
}

function register(param) {
    return React.$axios.post('/login/setUser', param);
}

function showFeature() {
    return React.$axios.get('/login/feature', {
        params: {
            token: localStorage.getItem('userToken')
        }
    });
}

export default {
    login, register, showFeature
}