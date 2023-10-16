import React, { useState, useEffect } from 'react';
import LiveMobile from '~/views/Live/LiveMobile';
import Personal from "~/views/Personal"

const App: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    // 添加窗口大小改变事件监听器
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // 清除事件监听器以避免内存泄漏
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {windowWidth < 700 ? <LiveMobile /> : <Personal />}
    </div>
  );
};

export default App;