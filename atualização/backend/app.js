const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, '../')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

const PORT = process.en.PORT || 2512;
app.listen(PORT, () => {
    console.log(`Servidor Rodando Em: localhost${PORT}`)
});