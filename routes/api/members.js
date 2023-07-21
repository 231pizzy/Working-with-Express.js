const express = require('express');
const router = express.Router();
const uuid = require('uuid')
const members = require('../../Members')

// GET ALL MEMBERS
router.get('/', (req, res)=>{
    res.json(members);
});

// GET SINGLE MEMBERS
router.get('/:id', (req,res) => {

    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: 'incorrect detail'})
    }
});

// CREATE MEMBERS
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'Active'
    }

    if(!newMember.name || !newMember.email){
       return res.status(400).json({msg: 'Kindly include a name and email'})
    }
    
    members.push(newMember);
    res.json(members);
});

// UPDATE MEMBERS
router.put('/:id', (req,res) => {

    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const updMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({msg: 'Member Updated', member})
            }
        })
        
        
    }else{
        res.status(400).json({msg: 'incorrect detail'})
    }
});

// DELETE MEMBER
router.delete('/:id', (req,res) => {

    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        
        res.json( {msg:'Member Deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    }else{
        res.status(400).json({msg: 'incorrect detail'})
    }
});


module.exports = router;