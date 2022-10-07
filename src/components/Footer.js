import React from "react";

const Footer = () => {
  return (
    <div
      className="shadow-md flex flex-col text-center
    gap-4 bg-slate-600/60 py-4 text-xl p-3 
    justify-center items-center text-slate-100"
    >
      <span>made by francisGolden</span>
      
      <div className="flex gap-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/francesco-gioele-doria-b23742123/"
        >
          <img
            alt="linkedin"
            style={{ width: "40px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/f/f8/LinkedIn_icon_circle.svg"
          />
        </a>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/francisGolden"
        >
          <img
            alt="GitHub"
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            style={{ width: "40px" }}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
