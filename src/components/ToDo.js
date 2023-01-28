import React, { useEffect, useState } from "react";
import styled from "styled-components";

function ToDo() {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");
    const [completed, setCompleted] = useState([]);
    const [count, setCount] = useState([0]);

    const addItems = () => {
        if (input) {
            setItems([...items, { name: input, id: count + 1 }]);
        }
        setInput("");
        setCount((prevState) => prevState + 1);
    };

    const completeItems = (id) => {
        const element = items.find((key) => key.id === id);
        setCompleted([element, ...completed]);
        const filterArray = items.filter((item) => item.id !== id);
        setItems(filterArray);
    };

    const removeItemFirst = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const removeItemSecond = (id) => {
        setCompleted(completed.filter((item) => item.id !== id));
    };

    const restoreItems = (id) => {
        const element = completed.find((key) => key.id === id);
        setItems([element, ...items]);
        const filterArray = completed.filter((item) => item.id !== id);
        setCompleted(filterArray);
    };

    useEffect(() => {
        setCount(completed.length + items.length);
    }, [completed, items]);

    return (
        <>
            <MainContainer>
                <Heading>ToDo List</Heading>
                <ContentToAdd>
                    <SubHeadingOne>Things to be done</SubHeadingOne>
                    <Content>
                        {items.map((item) => (
                            <ItemsList key={item.id}>
                                <LeftDiv>
                                    <Items>
                                        <RadioButton
                                            type="radio"
                                            id=""
                                            onClick={() =>
                                                completeItems(item.id)
                                            }
                                        />
                                        <ItemLabel>
                                            {item.id}, {item.name}
                                        </ItemLabel>
                                    </Items>
                                </LeftDiv>
                                <RightDiv>
                                    <ImgContainer
                                        onClick={() => removeItemFirst(item.id)}
                                    >
                                        <DeleteIcon
                                            src={
                                                require("../assets/delete.svg")
                                                    .default
                                            }
                                        />
                                    </ImgContainer>
                                </RightDiv>
                            </ItemsList>
                        ))}
                    </Content>
                    <FormContainer>
                        <PlusIcon>
                            <IconImg
                                src={require("../assets/plus.svg").default}
                            />
                        </PlusIcon>
                        <NameInput
                            type="text"
                            placeholder="Type new task"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <SubmitButton onClick={addItems}>Add New</SubmitButton>
                    </FormContainer>
                </ContentToAdd>
                <ContentAdded>
                    <SubHeadingTwo>Completed</SubHeadingTwo>
                    <AddedList>
                        {completed.map((item) => (
                            <ItemsAdded key={item.id}>
                                <AddedLeftDiv>
                                    <TickContainer>
                                        <TickImg
                                            src={
                                                require("../assets/tick-green.svg")
                                                    .default
                                            }
                                        />
                                    </TickContainer>
                                    <AddedList>
                                        {item.id}, {item.name}
                                    </AddedList>
                                </AddedLeftDiv>
                                <AddedRightDiv>
                                    <RestoreContainer
                                        onClick={() => restoreItems(item.id)}
                                    >
                                        <RestoreImg
                                            src={
                                                require("../assets/revert.svg")
                                                    .default
                                            }
                                        />
                                    </RestoreContainer>
                                    <ImgContainer
                                        onClick={() =>
                                            removeItemSecond(item.id)
                                        }
                                    >
                                        <DeleteIcon
                                            src={
                                                require("../assets/delete.svg")
                                                    .default
                                            }
                                        />
                                    </ImgContainer>
                                </AddedRightDiv>
                            </ItemsAdded>
                        ))}
                    </AddedList>
                </ContentAdded>
            </MainContainer>
        </>
    );
}

export default ToDo;

const MainContainer = styled.section`
    width: 800px;
    height: 100vh;
    margin: 0 auto;
    border: 1px solid #e6e6e6;
    padding: 0 150px;
`;
const Heading = styled.h1`
    font-size: 45px;
    text-align: center;
`;
const ContentToAdd = styled.div``;
const SubHeadingOne = styled.h2`
    color: #0a0845;
    font-size: 28px;
`;
const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
`;
const ItemsList = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
`;
const LeftDiv = styled.div`
    display: flex;
`;
const Items = styled.div`
    display: flex;
`;
const RadioButton = styled.input`
    width: 20px;
    height: 20px;
`;
const ItemLabel = styled.label`
    font-size: 22px;
`;
const RightDiv = styled.div``;
const ImgContainer = styled.div`
    width: 16px;
    cursor: pointer;
`;
const DeleteIcon = styled.img`
    display: block;
    width: 100%;
`;

const FormContainer = styled.div`
    margin: 0 auto;
    text-align: center;
    position: relative;
`;
const PlusIcon = styled.div`
    width: 12px;
    position: absolute;
    left: 25px;
    top: 20px;
`;
const IconImg = styled.img`
    width: 100%;
    display: block;
`;
const NameInput = styled.input`
    padding: 12px;
    width: 340px;
    padding-left: 20px;
    font-size: 17px;
`;
const SubmitButton = styled.button`
    padding: 12px 25px;
    font-size: 17px;
    border-radius: 0 6px 6px 0;
    background-color: #040241;
    color: #fff;
`;
const ContentAdded = styled.div``;
const SubHeadingTwo = styled.h2`
    color: #0a0845;
    font-size: 28px;
`;
const AddedList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    font-size: 22px;
    color: #00bc81;
`;
const ItemsAdded = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
`;
const AddedLeftDiv = styled.div`
    display: flex;
    align-items: center;
`;
const TickContainer = styled.div`
    width: 20px;
    height: 20px;
    border: 1px solid #00bc81;
    border-radius: 50px;
    margin-right: 10px;
`;
const TickImg = styled.img`
    display: block;
    width: 100%;
`;
const AddedRightDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 15%;
`;
const RestoreContainer = styled.div`
    width: 20px;
`;
const RestoreImg = styled.img`
    width: 100%;
    display: block;
`;
