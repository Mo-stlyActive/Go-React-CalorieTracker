import React, {useState, useEffect} from 'react';

import axios from 'axios';

import {Button, Form, Container, Modal} from 'react-bootstrap';

import Entry from './single-entry.components';

const EntriesList = () => {

    const [entries, setEntries] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [changeEntry, setChangeEntry] = useState({"change": false})
    const [changeIngredient, setChangeIngredient] = useState({"change": false})
    const [newIngredientName, setNewIngredientName] = useState("")
    const [addNewEntry, setAddNewEntry] = useState(false)
    const [newEntry, setNewEntry] = useState({"dish": "", "ingredients": "", "calories": 0, "fat": 0})

    useEffect(() => {
        getAllEntries();
    },[])

    if(refreshData) {
        setRefreshData(false);
        getAllEntries();
    }
    
    

    return (
        <div>
            <Container>
                <Button onClick={() => setAddNewEntry(true)}>
                    Track today's calories
                </Button> 
            </Container>
            <Container>
                {entries != null && entries.map((entry, index) => (
                    <Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeIngredient={setChangeIngredient} setChangeEntry={setChangeEntry} />
                ))}
            </Container>

            <Modal show={addNewEntry} onHide={() => setAddNewEntry(false)} centered>
                <Modal.Header closeButton>
                <Modal.Title>Add Calorie Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Dish Name:</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.dish = event.target.value}}/>
                        <Form.Label>ingredients:</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.ingredients = event.target.value}}/>
                        <Form.Label>calories:</Form.Label>
                        <Form.Control type="text" onChange={(event) => {newEntry.calories = event.target.value}}/>
                        <Form.Label>fat:</Form.Label>
                        <Form.Control type="number" onChange={(event) => {newEntry.fat = event.target.value}}/>
                    </Form.Group>
                    <Button onClick={() => addSingleEntry()}>Add</Button>
                    <Button onClick={() => setAddNewEntry(false)}>Cancel</Button>
                </Modal.Body>
                </Modal>

            <Modal show={changeIngredient.change} onHide={()=> setChangeIngredient({"change": false, "id":0})} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>New Ingredient Name:</Form.Label>
                        <Form.Control onChange={(event) => setNewIngredientName(event.target.value)}/>
                    </Form.Group>
                    <Button onClick={() => changeIngredientForEntry()}>Update</Button>
                    <Button onClick={() => setChangeIngredient({"change": false, "id":0})}>Cancel</Button>
                </Modal.Body>
            </Modal>

            <Modal show={changeEntry.change} onHide={()=> setChangeEntry({"change": false, "id":0})} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>New Dish Name:</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.dish = event.target.value}}/>
                        <Form.Label>New Ingredients:</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.ingredients = event.target.value}}/>
                        <Form.Label>New Calories:</Form.Label>
                        <Form.Control type="text" onChange={(event) => {newEntry.calories = event.target.value}}/>
                        <Form.Label>New Fat:</Form.Label>
                        <Form.Control type="number" onChange={(event) => {newEntry.fat = event.target.value}}/>
                    </Form.Group>
                    <Button onClick={() => changeSingleEntry()}>Update</Button>
                    <Button onClick={() => setChangeEntry({"change": false, "id":0})}>Cancel</Button>
                </Modal.Body>
            </Modal>
        </div>

    );

    function addSingleEntry() {
        setAddNewEntry(false)
        var url = "http://localhost:8080/entry/create";
        axios.post(url, {
            "ingredients": newEntry.ingredients,
            "dish": newEntry.dish,
            "calories": newEntry.calories,
            "fat": parseFloat(newEntry.fat),
        }).then(response => {
            if(response.status === 200) {
                setRefreshData(true)
            }
        })
    
    }
    
    function deleteSingleEntry(entryId) {
        var url = "http://localhost:8080/entry/delete/" + entryId;
        axios.delete(url, {
            
        }).then(response => {
            if(response.status === 200) {
                setRefreshData(true)
            }
        })
    
    }
    
    function getAllEntries() {
        var url = "http://localhost:8080/entries"
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200) {
                setEntries(response.data)
            }
        })
    }

    function changeIngredientForEntry() {
        changeIngredient.change = false
        var url = "http://localhost:8080/ingredient/update/" + changeIngredient.id;
        axios.put(url, {
            "ingredients": newIngredientName
        }).then(response => {
            if(response.status === 200) {
                setRefreshData(true)
            }
        })
    }
    function changeSingleEntry() {
        changeEntry.change = false
        var url = "http://localhost:8080/entry/update/" + changeEntry.id;
        axios.put(url, newEntry).then(response => {
            if(response.status === 200) {
                setRefreshData(true)
            }
        })
    }






}

export default EntriesList;