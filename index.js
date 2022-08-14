const express = require('express')
const exp = express()
const port = process.env.PORT || 4000


exp.use(express.json())
exp.use(express.urlencoded({extended: true }))

const DataBase={
  users:[]
}


exp.get('/', (req, res) => {
  console.log(req.query)
  res.send('Hello Nigeria!')
})

exp.get('/users', (req, res) => {

  res.status(200).json({
    status:'success',
    data: DataBase.users,
    message:'Users Retrived successfully'

  })
  
})

exp.post('/user', (req, res) => {
   console.log(req.body)
  const user={
    id: Math.random().toString(10), 
    name: req.body.name,
    number: req.body.number,
    email: req.body.email
  }
  DataBase.users.push(user)

    
    res.status(201).json({
      status:'success',
      message:'User created successfully',
      data:user

    })
    
  })

const updateUser=(req, res)=>{
  const user_id =req.params.user_id;
  const index=DataBase.users.findIndex(user=> user.id=== user_id);
  const user= DataBase.users[index];
  updatedData={...user, ...req.body}


   
  DataBase.users.splice(index, 1, updatedData);
  res.status(200).json({
    status:'success',
    message:'Update Successful',
    data: updatedData
  })
} 
exp.put('/user/:user_id', updateUser)



const deleteUser=(req, res)=>{
  const user_id= req.params.user_id
  const index= DataBase.users.findIndex(user=> user.id === user_id);

  DataBase.users.splice(index, 1);
  res.status(200).json({
    status:'success',
    message:'User Deleted',
  })
}
exp.delete('/user/:user_id', deleteUser)






exp.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  