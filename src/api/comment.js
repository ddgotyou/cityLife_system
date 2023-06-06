import React from 'react'

function getBusiComment(param) {
    return React.$axios.get('/comment/getBusiComment', {
        params: param
    });
}

function submitComment(param) {
    return React.$axios.post('/comment/submitComment', param)
}


export default {
    getBusiComment, submitComment
}