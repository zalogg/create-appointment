const { Router } = require('express');
const router = new Router();
const connection = require('../../modules/dbconect');
router.post('/', async (req, res) => {
    try {
        const { idclient, date, doctor, reason } = req.body;
        var quer = 'INSERT INTO appointments (idclient, date, doctor, reason) VALUES (?, ?, ?, ?)'
        connection.query(quer, [idclient, date, doctor, reason], (err, results) => {
            if (err) {
                console.log("ERROR " + err.message);
                return res.status(500).json({ err: err.message });
            }
            if (results.affectedRows > 0) {
                res.status(201).json('Appointment successfully created');
            } else {
                res.status(404).json('Appointment could not be created');
            }
        })
    } catch (error) {
        res.status(500).json("error: " + error);
    }
});

router.get('/:idclients', async (req, res) =>{
    try {
        const {idclients} = req.params;
        const db = await connectToDatabase();
        const getReserves = db.collection("reservations");
        const query = {
            idclient: idclients,
            state: "Pending"
        }
        const result = await getReserves.find(query)
        .toArray();
        if(result.length){  
            res.status(200).json(result);
        }else{
            res.status(404).json("You don't have reservations");
        }
    } catch (error) {
        
    }
})

module.exports = router;