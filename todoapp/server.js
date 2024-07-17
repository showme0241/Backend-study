const express = require("express");
const app = express();

// 서버 실행
app.listen(8080, () => {
    console.log("listening on 8080");
});

// get 요청에 대한 값 반환
app.get("/write", (req, res) => {
    console.log(req);
    res.sendFile(__dirname + "/write.html");
});

app.get("/", (req, res) => {
    console.log(req);
    res.sendFile(__dirname + "/index.html");
});
