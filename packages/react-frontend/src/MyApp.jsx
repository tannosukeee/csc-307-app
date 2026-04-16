import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([])


  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
            return res.json();
        }
      })
      .then((newPerson) => {
        setCharacters([...characters, newPerson]);
      })
      .catch((error) => { console.log(error); });
}

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
  fetchUsers()
    .then((res) => res.json())       // Bước 4a
    .then((json) => setCharacters(json["users_list"]))  // Bước 4b
    .catch((error) => { console.log(error); });         // Bước 4c
  }, []);

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",              // Báo đây là POST request
      headers: {
        "Content-Type": "application/json",  // Báo body là JSON
      },
      body: JSON.stringify(person),  // Chuyển object → string JSON
    });
    return promise;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE"
    })
    .then((res) => {
        if (res.status === 204) {
            setCharacters(characters.filter(c => c.id !== id));
        }
    })
    .catch((error) => { console.log(error); });
  }
}

export default MyApp;
