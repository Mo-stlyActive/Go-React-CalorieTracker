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
        var url = "http://localhost:8080/entry/delete" + entryId;
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
}

