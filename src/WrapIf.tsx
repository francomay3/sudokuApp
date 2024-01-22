import React, { ReactNode, ComponentType } from "react";

interface WrapIfProps {
  condition: boolean;
  Wrapper: ComponentType<{ children: ReactNode }> | keyof JSX.IntrinsicElements;
  children: ReactNode;
}

function WrapIf({ condition, Wrapper, children }: WrapIfProps) {
  if (!condition) {
    return <>{children}</>;
  }
  if (typeof Wrapper === "string") {
    return React.createElement(Wrapper, {}, children);
  }
  return <Wrapper>{children}</Wrapper>;
}

export default WrapIf;
