

export const responseHandler = (req, res, next) => {
    res.success = (body, message = 'OK', statusCode = 200) => {
        res.json({status:true, message:message, data:body}, statusCode);
    }
    res.error = (body, message = 'ERROR', statusCode = 500) => {
        res.json({status:false, message:message, data:body}, statusCode);
    }
    next();
};