const http = require("http");
const fs = require("fs").promises;

const parseCookies = (cookie = "") => {
    const separateCookies = cookie.split(";");
    const separateKeyValue = separateCookies.map((v) => v.split("="));

    return separateKeyValue.reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});
};
http.createServer(async (req, res) => {
    if (req.url === "/favicon.ico") {
        res.writeHead(204); // No Content 응답
        res.end();
        return;
    }

    const clientHeaders = req.headers;
    const cookies = parseCookies(clientHeaders.cookie);

    const url = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = url.searchParams;
    const guestName = searchParams.get("name");

    const { cKey } = cookies;
    console.log(cKey); // cKey를 decode하여 db와 대조하여 매핑

    try {
        const data = await fs.readFile("./server2.html");
        res.writeHead(200, {
            ...clientHeaders,
            "Set-Cookie": cKey !== null ? `cKey=${guestName}` : "cKey=",
        });
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
    }
}).listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중입니다!");
});
