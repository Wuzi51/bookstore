import { useRef, useState, useEffect } from "react";
import ePub from "epubjs";
import { Spin } from 'antd'; 
import { LoadingOutlined } from "@ant-design/icons";
import { useUserStore } from "@/store/user";

const EBookReader = () => {
  const ePubRef = useRef(null);
  const bookURL = `/WCAG.epub`;
  const [rendition, setRendition] = useState();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState();
  const darkMode = useUserStore((state) => state.darkMode);

  const init = async() => {
    setLoading(true)
    try {
      const response = await fetch(bookURL);
      // 將檔案轉換成可以處理的二進制格式
      const ePubData = await response.arrayBuffer();

      //產生電子書
      const book = ePub(ePubData);

      //電子書渲染到DOM元素上
      const renditionInstance = book.renderTo(ePubRef.current, {
        width : "100%",
        height : "100%",
      });
      setRendition(renditionInstance);

      renditionInstance.themes.register("light", {
        body: {
          background: "#fff",
        }
      });

      renditionInstance.themes.register("dark", {
        body: {
          background: "#333",
          color: "#fff"
        }
      });

      renditionInstance.themes.select(darkMode ? "dark" : "light");

    // 電子書加載完畢
      await book.ready;
      await book.locations.generate(1000);
       //監聽翻頁事件
      renditionInstance.on("relocated", (location) => {
        const currentPercentage = book.locations.percentageFromCfi(location.start.cfi);
        setProgress(currentPercentage * 100);
      });
      // 顯示電子書
      await renditionInstance.display();
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (rendition) {
      rendition.prev();   
    };
  };

  const handleNext = () => {
    if (rendition) {
      rendition.next();
    };
  };

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    setProgress(event.target.value);
    if (rendition) {
      // 找到當前在哪一頁 就可跳轉到哪一頁
      const targetLocation = rendition.book.locations.cfiFromPercentage(
        newProgress / 100
      );
      // 跳轉到當前進度頁
      rendition.display(targetLocation);
    }
  };

  useEffect(() => {
    init()
  },[]);

  useEffect(() => {
    if (rendition) {
      rendition.themes.select(darkMode ? "dark" : "light");
    }
  }, [darkMode, rendition]);

  return (
    <>
      <div 
        ref={ePubRef} 
        className="relative w-full h-[26rem] border border-gray-300"
      >
        {loading && (
        <Spin
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          spinning={loading}
          indicator={<LoadingOutlined />}
          size="large"
            />
        )}
      </div>
      <div className="mt-3 text-center">
        <input 
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-4/5"
        />
        <div className="mt-3 text-center">
          {loading ? "讀取中" : `進度${Math.max(Math.floor(progress), 1)}%`}
        </div>
        <div className="mt-6">
          <button className="rounded-md border border-transparent bg-blue-500 px-3 py-2 mx-2 text-sm font-medium text-white shadow-sm hover:bg-blue-400"
          onClick={handlePrevious}>
            上一頁
          </button>
          <button className="rounded-md border border-transparent bg-blue-500 px-3 py-2 mx-2 text-sm font-medium text-white shadow-sm hover:bg-blue-400" 
          onClick={handleNext}>
            下一頁
          </button>
          </div>
      </div>
    </>
  );
};

export default EBookReader;