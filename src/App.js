import React from "react";
import {
  Container,
  Col
} from "reactstrap";
import {
  TodoList
} from "./task-context";

export default function App() {
  return (
    <>
      <div>
        <Container>
          <Col
            md={{
              offset: 1,
              size: 9,
            }}
            sm="12"
          >
            <TodoList />
          </Col>
        </Container>
      </div>
    </>
  );
}
