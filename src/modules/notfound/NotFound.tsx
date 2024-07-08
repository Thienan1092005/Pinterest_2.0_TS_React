import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import classNames from "classnames";
import { useNavigate } from "react-router";

export default function NotFound() {
  const [isMount, setIsMount] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMount(true);
    setTimeout(() => {
      navigate("./news");
    }, 3000);
    return () => {
      setIsMount(false);
    };
  }, [navigate]);

  return (
    <div className="w-screen h-screen ">
      <LoadingSpinner />
      <p className="mt-2 font-sf-bold text-center leading-7 max-w-[350px] mx-auto">
        Chúng tôi đang thêm các ý tưởng vào bảng tin nhà của bạn!
      </p>
      <div
        className={classNames(
          "left-1/2 rounded-lg transition-transform duration-500 transform -translate-x-1/2 px-5 py-1 bg-black/90 text-center absolute bottom-3 text-white",
          {
            "translate-y-0": isMount,
            "translate-y-[400%]": !isMount,
          }
        )}
      >
        <p>Chúng tôi không thể tìm thấy ý tưởng đó, thử tìm ý tưởng tương tự</p>
      </div>
    </div>
  );
}
