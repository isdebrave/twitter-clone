import React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  large?: boolean;
  bold?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, large, bold }) => {
  return (
    <>
      <div
        className={`
          ${large ? "text-3xl" : "text-base"}
          ${bold ? "font-bold" : "font-medium"}
       `}
      >
        {title}
      </div>
      {subtitle && (
        <div className="mt-1 leading-5 text-gray-600">{subtitle}</div>
      )}
    </>
  );
};

export default Heading;
