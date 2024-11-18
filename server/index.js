import express from "express";
import cors from "cors";

const app = express();

// 伺服器加上跨域
app.use(cors());

// 提供靜態文件 => 後端才可以去public拿文件
app.use(express.static("public"));

// 啟動伺服器 express預設域名 localhost:PORT
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// 跨域(X) ==> 任何人都可以去你的資料庫拿取