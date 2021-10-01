import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import Table from './Table.js'
import Form from './Form.js'
import axios from 'axios'

// const characters = [
//       {
//         name: 'Charlie',
//         job: 'Janitor',
//       },
//       {
//         name: 'Mac',
//         job: 'Bouncer',
//       },
//       {
//         name: 'Dee',
//         job: 'Aspring actress',
//       },
//       {
//         name: 'Dennis',
//         job: 'Bartender',
//       },
// ];

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      fetchAll().then(result => {
        if (result) {
          setCharacters(result);
        }
      })
    }, []);

    // fetch data from back end
    async function fetchAll() {
      try {
        const response = await axios.get('http://localhost:5000/users');
        return response.data.users_list;
      }
      catch (error) {
        console.log(error);
        return false;
      }
    }

    function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        return i !== index
      });
      setCharacters(updated);
    }

    function updateList(person) {
      setCharacters([...characters, person]);
    }

    return (
      <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter}/>
            <Form handleSubmit={updateList} />
      </div>
    );
}

export default MyApp;