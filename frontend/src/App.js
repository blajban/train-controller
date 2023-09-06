
import styled from "styled-components";

import ExampleComponent from './components/ExampleComponent';

const Header = styled.nav`
  background: red;
  height: 50px;
  margin: 0;
  margin-bottom: 40px;
`;


function App() {
  return (
    <div className="App">
      <Header>Header</Header>
      <ExampleComponent />
    </div>
  );
}

export default App;
