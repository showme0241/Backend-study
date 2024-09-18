const fs = require("fs");
const path = require("path");

// 특정 이벤트 발생시, 저장할 파일을 생성
// 해당 파일의 확장자를 고려
// 파일 내 insert할 내용을 고려
// 생성된 파일 db에 저장
const generateId = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }

    return id;
};

const updateUserInfo = (fileName, newUserInfo) => {
    const userInfo = loadUserInfo(fileName);

    if (userInfo) {
        const updateUserInfo = { ...userInfo, ...newUserInfo };
        if (JSON.stringify(userInfo) === JSON.stringify(updateUserInfo)) {
            console.log("정보가 변경되지 않았습니다.");
            return;
        }

        const newUserData = JSON.stringify(updateUserInfo, null, 2);

        fs.writeFileSync(fileName, newUserData);
    } else {
        console.error("에러 입니다.");
    }
};

const loadUserInfo = (fileName) => {
    const filePath = path.join(__dirname, fileName);
    console.log(filePath);

    try {
        const data = fs.readFileSync(filePath, "utf8");
        return data;
    } catch (error) {
        console.log(error);
    }
};

const saveUserInfo = (userInfo) => {
    const id = generateId();
    userInfo.id = id;
    const fileName = `user${id}.json`; // 파일명 지정
    const userData = JSON.stringify(userInfo, null, 2);

    fs.writeFileSync(fileName, userData);
};

const user = {
    name: "john",
    email: "john@gmail.com",
};

const fileName = "userjfYPGTzJ.json";
const updatedUserInfo = {
    gender: "female",
};

updateUserInfo(fileName, updatedUserInfo);
