import React, { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <h1>Layout</h1>
      {children}
    </div>
  );
}

export default Layout;
