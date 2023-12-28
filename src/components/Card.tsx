import React from "react";

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  rotate?: number;
  hover?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

const hoverClasses =
  "hover:scale-105 transition duration-300 ease-in-out cursor-pointer";

function Card({ children, href, target, ...props }: iProps) {
  if (!href) {
    return <InnerCard {...props}>{children}</InnerCard>;
  }

  return (
    <a href={href} target={target}>
      <InnerCard {...props}>{children}</InnerCard>
    </a>
  );
}

function InnerCard({ children, hover, rotate, className, ...props }: iProps) {
  return (
    <div style={{ rotate: `${rotate}deg` }}>
      <div
        {...props}
        className={`${className} shadow-lg bg-white p-3 rounded-2xl transform ${
          hover ? hoverClasses : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
