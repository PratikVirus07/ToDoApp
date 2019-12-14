const ObjectId = require('mongodb').ObjectId

module.exports = function(app, db) {

    app.post('/myapi/todos' , (req, res) => {
        const body = req.body
        if(body && body.caption){
            const mycollection = db.collection('myTodoCollection')
            mycollection.insertOne({
                caption:body.caption,
                isCompleted:false
            })
            .then(result => {
                res.send({
                    status : "success",
                    message:"1 record created"
                })
            })
            .catch(err => {
                res.status(400).send({
                    status:"error has occured",
                    error:err
                })
            })
        } else{
            res.status(400).send({
                message:"caption cant be empty"
            })
        }
    })

    app.get('/myapi/todos/:todoid?' , (req, res) => {
        const mycollection = db.collection('myTodoCollection')
        const todoid = req.params.todoid;
        if(todoid){ // to get specific id data
            const findObj = {'_id':new ObjectId(todoid)};
            // console.log(findObj);
            mycollection
            .find(findObj)
            .toArray()
            .then(data =>{
                //console.log(data)
                res.status(200).send({
                 message:'success',
                 data:data   
                })
            })
            .catch(err =>{
                res.status(400).send({
                    status:'error',
                    message:err
                })
            })
        }else{
            // return all the results
            mycollection.find({}).toArray().then(data =>{
                res.send({
                    message:'success',
                    data:data
                })
            })
        }
    })

    app.put("/myapi/todos/:todoid?" , (req, res) => {
        const todoid = req.params.todoid;
       const body = req.body;
       if (req.params.todoid && body && (body.isCompleted!==undefined || body.isCompleted!==null))
       {
            const mycollection = db.collection('myTodoCollection');
            mycollection.update(
                {_id : new ObjectId(todoid)},
                {isCompleted:body.isCompleted, caption : body.caption},  
            ).then(result => {
                res.status(200).send({
                    message : "successfully updated",
                    data : result
                })
            })
            .catch(error => {
                res.status(400).send({
                    message : "update failed",
                    error : error
                })
            })
       }
    })

    app.delete("/myapi/todos/:todoid?", (req, res) => {
        const todoid = req.params.todoid;
        const mycollection = db.collection('myTodoCollection');
        if (todoid)
        {
            const objectDel = {'_id': new ObjectId(todoid)}
            mycollection.deleteOne(objectDel)
            .then(
                res.status(200).send({
                    message: "Deleted sucessfully",
            })
            )
            .catch(error => {
                res.send({
                    error:error,
                    message:"Not able to delete"
                })
            })
        }
        else{
            mycollection.remove({})
            .then(
                res.status(200).send({
                    message:"Whole Document Deleted"
                })
            )
        }
    })
}