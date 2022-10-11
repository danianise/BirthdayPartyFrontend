import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function RSVPForm() {

    const initialState = {
        name: "",
        guest_count: "",
        message: ""
    }
    const [formState, setFormState] = useState(initialState)
    const navigate = useNavigate()

    const handleChange = event => {
        setFormState({ ...formState, [event.target.id]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        
        console.log(formState)

        // const url = 'http://localhost:8000/responses/'
        const url = 'https://still-crag-67130.herokuapp.com/responses/'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        }

        fetch(url, options)
            .then(res => {
                if(!res.ok){
                throw Error(res.status)
                }
                res.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            navigate('/accepted')
            setFormState(initialState)
    }

  return (
    <div className='RSVPform'>
        <h1>Join us if you DARE</h1>
        <form onSubmit={handleSubmit}>
            <input
                placeholder='Your Name'
                id='name'
                type='text'
                onChange={handleChange}
                value={formState.name}
            />
            <br />

            <input
                placeholder="How many people will be coming?"
                id='guest_count'
                type='text'
                onChange={handleChange}
                value={formState.guest_count}
            />
            <br />

            <textarea
              id='message'
              placeholder='Leave a Message for the Hoeys (Optional)'
              onChange={handleChange}
              type='text'
              value={formState.message}  
            />
            <br />

            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default RSVPForm