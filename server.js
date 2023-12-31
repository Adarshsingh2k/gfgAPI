const express = require("express")
const app = express()
const cors = require('cors');
const port = 3000
const { getUserData } = require("./logic")
app.use(cors());

app.get('/:userID', async (req, res) => {
   

    const user = req.params.userID



    try {

        const combinedScores = await getUserData(user); // Retrieve only the combinedScores array
        console.log('Combined Scores:', combinedScores);
        res.json( combinedScores );


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    //     //   });
});

// app.get('/', getUserData)
app.listen(port, () => {
    console.log('Server is listening on port 3000');
});