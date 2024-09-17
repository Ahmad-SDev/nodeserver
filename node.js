const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to run Java code
app.post('/run-java', (req, res) => {
    const code = req.body.code;

    // Write the Java code to a file
    fs.writeFileSync('Main.java', code);

    // Compile and run the Java code
    exec('javac Main.java && java Main', (error, stdout, stderr) => {
        if (error) {
            return res.json({ output: `Error: ${error.message}` });
        }
        if (stderr) {
            return res.json({ output: `Stderr: ${stderr}` });
        }
        res.json({ output: stdout });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
