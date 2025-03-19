import React, {useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.css';


import {Button, Card, Row, Col} from 'react-bootstrap';

const Entry =({entryData, setChangeIngredient, deleteSingleEntry, setChangeEntireEntry}) => {
    return (
        <Card>
            <Row>
                <Col>Dish:{entryData !== undefined && entryData.dish}</Col>
                <Col>Ingredients:{entryData !== undefined && entryData.ingredients}</Col>
                <Col>Calories:{entryData !== undefined && entryData.calories}</Col>
                <Col>Fat:{entryData !== undefined && entryData.fat}</Col>

                <Col><Button onClick={()=> deleteSingleEntry(entryData._id)}></Button>delete entry</Col>
                <Col><Button onClick={()=> changeIngredient()}></Button>change ingredients</Col>
                <Col><Button onClick={()=> changeEntireEntry()}></Button>change entry</Col>
            </Row>
        </Card>
    )

    function changeIngredient() {
        setChangeIngredient({
            "change": true,
            "id": entryData._id


        }
        )
    }

    function changeEntireEntry(){
        setChangeEntireEntry({
            "change": true,
            "id": entryData._id
        })
}


}

export default Entry;