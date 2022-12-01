import styled from "@emotion/styled";
import React, { ReactNode } from "react";

export default function Test({ children }: { children: ReactNode }) {
  return <TestComponent>{children}</TestComponent>;
}

const TestComponent = styled.div`
  color: red;
`;
