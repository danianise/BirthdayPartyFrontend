import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function DeclineForm() {

    const initialState = {
        name: "",
        decline_message: ""
    }
    const [formState, setFormState] = useState(initialState)
    const navigate = useNavigate()

    const handleChange = event => {
        setFormState({ ...formState, [event.target.id]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        //do something with the data in the component state
        console.log(formState)

        const url = 'http://localhost:8000/declines/'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
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
            navigate('/declined')
            setFormState(initialState)
    }

  return (
    <div className='declineForm'>
        <h1>Boo... I can't make it!</h1>
        <form onSubmit={handleSubmit}>
            <input
                placeholder='Your Name'
                id='name'
                type='text'
                onChange={handleChange}
                value={formState.name}
            />
            <br /><br />
            <textarea
              id='decline_message'
              placeholder='Leave a Message for the Hoeys (Optional)'
              onChange={handleChange}
              type='text'
              value={formState.decline_message}  
            />
            <br />
            <br />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default DeclineForm