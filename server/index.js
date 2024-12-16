import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url'

const app = express();

// 伺服器加上跨域
app.use(cors());

// 提供靜態文件 => 後端才可以去public拿文件
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const publicPath = path.join(__dirname, '../dist')

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

// 啟動伺服器 express預設域名 localhost:PORT
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// 跨域(X) ==> 任何人都可以去你的資料庫拿取