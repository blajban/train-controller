import { useState, useEffect } from 'react'

import styled from "styled-components";

const CodesList = styled.div`
  margin: 0 auto;
  max-width: 50%;
  background: lightgray;
`;

const CodeItem = styled.div`
  background: gray;
`;

function Code({ code, desc}) {
  return (
    <CodeItem>
      <p>{code}, { desc }</p>
    </CodeItem>
    
  );
}

function ExampleComponent() {
  const [codes, setCodes] = useState(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await fetch('http://localhost:1337/codes');
        const data = await response.json();
        setCodes(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCodes();
  }, []);

  if (!codes) return "Loading...";

  return (
    <CodesList>
      {codes.map((code, index) => (
        <Code code={code.Code} desc={code.Level1Description} />
      ))}
    </CodesList>
  );
}

export default ExampleComponent;
