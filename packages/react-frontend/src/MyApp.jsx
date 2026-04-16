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
        } else {
            console.error("Failed to add user.");
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
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => { console.log(error); });
  }, []);

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
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

  function removeOneCharacter(index) {
    const id = characters[index].id;
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
    })
    .then((res) => {
      if (res.status === 204) {
        setCharacters(characters.filter((character, i) => {
          if (i == index) id = character.id;
          return i !== index;
        }));
      } else {
        console.error("User not found.");
      }
    })
    .catch((error) => console.log(error));
  }
}

export default MyApp;
