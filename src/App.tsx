import styled from "styled-components";

const InputBox = styled.input`
  padding: 5px 10px;
  background-color: #ececec;
  border-radius: 5px;
  border: none;
  color: #363636;
`;

function App() {
  return (
    <>
      This is a test
      <InputBox value={"hej"} />
    </>
  );
}

export default App;
