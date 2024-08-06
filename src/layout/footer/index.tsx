export const Footer = () => {
  return (
    <div className="w-full fixed z-50 bottom-0 footer">
      <div className="container h-[50px] justify-between text-neutral-500 text-sm flex items-center">
        <div>
          <span>©</span>
          <span>{new Date().getFullYear()}</span>{" "}
          <span className="">DVoice, Inc</span>
        </div>
        <div>Terms & policies</div>
      </div>
    </div>
  );
};
