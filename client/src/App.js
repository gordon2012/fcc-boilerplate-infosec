import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BASE_URL } from './index';

import Layout from './components/Layout';
import Code from './components/Code';
import Input from './components/Input';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono|Ubuntu:400,700&display=swap');

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        background: #fae8f5;
        font-family: "Ubuntu", "Helvetica", sans-serif;
    }
`;

const Title = styled.h1`
    text-align: center;
`;

const Card = styled.section`
    background: #300a24;
    color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    h3 {
        margin-top: 0;
    }
`;

const List = styled.ul``;

const App = () => {
    const [input, setInput] = React.useState('');
    const [responses, setResponses] = React.useState([]);
    const [result, setResult] = React.useState(null);

    async function getTest() {
        const response = await fetch(`${BASE_URL}/api/test`);
        const data = await response.json();
        setResponses(prevState => [data, ...prevState]);
        setResult(data);
    }

    return (
        <>
            <GlobalStyle />
            <Layout>
                <Title>
                    Information Security and Quality Assurance Boilerplate
                </Title>

                <Card>
                    <h3>User Stories</h3>
                    <List as="ol">
                        <li>I will have user stories.</li>
                    </List>
                </Card>

                <Card>
                    <h3>Example Usage</h3>
                    <Code>/api/test</Code>
                </Card>

                <Card>
                    <h3>Example Return</h3>
                    <Code box>
                        {{
                            hello: 'world',
                        }}
                    </Code>
                </Card>

                <Title as="h2">Front-End</Title>

                <Card>
                    <h3>Input</h3>
                    <Input
                        value={input}
                        onClick={getTest}
                        onChange={e => setInput(e.target.value)}
                    >
                        Test
                    </Input>

                    {result && (
                        <>
                            <h3>Result</h3>
                            <Code box>
                                {result.string ? result.string : result}
                            </Code>
                        </>
                    )}

                    {responses.length > 0 && (
                        <>
                            <h3>Responses</h3>
                            {responses.map((e, i) => (
                                <Code box key={i}>
                                    {e}
                                </Code>
                            ))}
                        </>
                    )}
                </Card>
            </Layout>
        </>
    );
};

export default App;
