export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-[80px] ">
      {/* <div className=" w-full mb-4 font-sf-regular py-1 text-center bg-danger-500 text-white">
        <p>
          Do đang trong quá trình hoàn thiện nên web có một số lỗi vặt mong đc
          mọi người thông cảm ạ :3 feeback cho bé Yuki để bé fix nhoa , cảm ơn
          mọi người nhiều
        </p>
        <a
          className="  font-sf-bold"
          target="_blank"
          href="https://www.facebook.com/yukicute1009"
        >
          Liên hệ Yuki{" "}
        </a>
      </div> */}
      {children}
    </div>
  );
}
