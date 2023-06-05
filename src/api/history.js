import React from 'react'
function search(param) {
    return React.$axios.post('/history/addHistory', param);
}

export default {
    search
}