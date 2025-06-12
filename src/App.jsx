import { useUserStore } from "@/store/user";
import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  const { darkMode } = useUserStore();
  const { darkAlgorithm, defaultAlgorithm } = theme;

  return <ConfigProvider theme={{
    algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
  }}>
    <RouterProvider router={router}></RouterProvider>
  </ConfigProvider>
};

export default App;