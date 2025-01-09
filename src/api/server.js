import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// 加入跨域設定
app.use(cors());

// 提供靜態文件
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../dist");

app.use(express.static(publicPath));

// 捕捉所有路由並返回靜態文件的 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// 導出作為 Vercel 的 Serverless Function
export default app;

