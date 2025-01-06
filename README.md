# Bookstore

## 🚀 專案簡介

**Bookstore** 是一個結合電子書購物與閱讀的全端專案，提供使用者從購買到閱讀的一站式服務。專案旨在展示 React 與後端整合、狀態管理、以及跨域請求的實踐。

主要特色：
- 電子書瀏覽、購物與閱讀功能整合。
- 使用 ePub.js 提供高效能電子書渲染與閱讀體驗。
- 簡易國際化切換 (i18n)，支援中英文語系。
- 支援主題切換 (明亮與暗黑模式)。

---

## 🎯 專案功能

1. 電子書購物與閱讀：
   - 使用 ePub.js 實現電子書翻頁、進度條顯示。
   - 電子書購物車流程。

2. 使用者登入與驗證：
   - 使用 JWT (JSON Web Token) 實現 Token-based 登入驗證。
   - 測試帳號：emilys，密碼：emilyspass。

3. 國際化支援：
   - 使用 i18n 實現中英文切換。

4. 視覺與使用者體驗：
   - 主題切換功能 (明亮模式與暗黑模式)。

5.書籍搜尋：
   - 站內書籍搜尋功能。

---

## 🛠 技術棧

### 前端
- **框架**：React、React Router、Zustand
- **樣式管理**：Ant Design、Tailwind CSS
- **打包工具**：Vite

### 後端
- **框架**：Express.js
- **跨域支援**：CORS 中介軟體

### 其他工具
- **電子書渲染**：ePub.js
- **API 請求管理**：Axios
- **國際化工具**：i18next
- **同步啟動工具**：Concurrently

---

## 🔧 安裝與執行

### 1. 取得專案
```bash
git clone https://github.com/Wuzi51/bookstore.git
cd bookstore
```

### 2. 安裝套件
```bash
npm install
```

### 3. 啟動伺服器
使用 Concurrently 同時啟動前後端：
```bash
npm run dev
```
伺服器運行於：
- **前端**：`http://localhost:5173`
- **後端**：`http://localhost:3000`

---

## 📌 未來計劃

- 增加更多國際化語言支援。
- 增強購物車與結帳功能，例如整合支付模擬。
- 支援書籍搜尋與分類。


