const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);

dotenv.config();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: "session-cookie",
    })
);

app.use((req, res, next) => {
    console.log("모든 요청에 다 실행됩니다.");
    next(); // 다음 미들웨어 혹은 라우터 호출
});

app.get("/", (req, res) => {
    if (req.url === "/favicon.ico") {
        res.writeHead(204); // No Content 응답
        res.end();
        return;
    }

    const reqCookie = req.cookies[process.env.COOKIE_SECRET];
    const { idx } = req.query;
    console.log(idx);

    if (reqCookie) {
        console.log("쿠키 있어", reqCookie);
        return res.sendFile(path.join(__dirname, "/login.html"));
    }

    if (!reqCookie) {
        return res.sendFile(path.join(__dirname, "/server2.html"));
    }
});

app.post("/login", (req, res) => {
    const { name } = req.body;

    res.cookie(process.env.COOKIE_SECRET, name, {
        httpOnly: true,
        secure: false, // production에서는 true로 설정하는 것이 좋습니다
    });
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중");
});
