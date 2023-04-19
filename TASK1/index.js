const express = require('express');
const app = express();

app.get('/task-1', (req, res) => {
    const { number } = req.query;

    if (!number || isNaN(number)) {
        return res.status(400).send('Invalid number');
    }

    const result = [];
    for (let i = 1; i <= number; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push('FizBuz');
        } else if (i % 3 === 0) {
            result.push('Fiz');
        } else if (i % 5 === 0) {
            result.push('Buz');
        } else {
            result.push(i.toString());
        }
    }

    res.send(result.join(' '));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
