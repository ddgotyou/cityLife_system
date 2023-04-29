import React from 'react'
function login(param) {
    return React.$axios.post('/login/submit', param);
}

function register(param) {
    return React.$axios.post('/login/setUser', param);
}

export default {
    login, register
}