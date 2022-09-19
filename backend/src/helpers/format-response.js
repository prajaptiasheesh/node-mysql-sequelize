const formatResponse = (controller)=>(req, res, next)=>{

    try {
        let query = req.query;
        let body = req.body;
        let params = req.params;
        controller(body, params, query)
        .then(result=>{
            return res.status(200).json(result)
        }).catch(err=>{
            res.status(500).json({ error: err.message })
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }

}

module.exports = formatResponse;