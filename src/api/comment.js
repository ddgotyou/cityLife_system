import React from 'react'

function getBusiComment(param) {
    return React.$axios.get('/comment/getBusiComment', {
        params: param
    });
}


export default {
    getBusiComment
}