const data = {
    stat: 'ok',
    data: null,
    msg: ''
}

const HttpRequest = async ({
    method='',
    resouce='',
    type= '',
    page= 1,
    comp=''
}) => {
    try {
        // TODO:
        // request
        return data;
    } catch (error) {
        // TODO:
        // handle error
        return data;
    }
}

export default HttpRequest;