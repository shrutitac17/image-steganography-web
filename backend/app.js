const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/encode', upload.single('image'), (req, res) => {
  const input = req.file.path;
  const msg = req.body.message;
  const command = `python ../steganography.py encode ${input} "${msg}"`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send('Encoding failed');
    }
    res.download(path.join(__dirname, '../encoded.png'), () => {
      fs.unlinkSync(input);
      fs.unlinkSync(path.join(__dirname, '../encoded.png'));
    });
  });
});

app.post('/decode', upload.single('image'), (req, res) => {
  const input = req.file.path;
  const command = `python ../steganography.py decode ${input}`;

  exec(command, (err, stdout, stderr) => {
    fs.unlinkSync(input);
    if (err) {
      console.error(stderr);
      return res.status(500).send('Decoding failed');
    }
    res.json({ message: stdout.trim() });
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
