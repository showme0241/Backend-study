import express from "express";
const app = express();

const onMessage = () => {
    console.log("listening on 8080");
};

app.listen(8080, onMessage());
app.get("/paid", (req, res) => {
    console.log(req);
    res.send("결제 페이지");
});
