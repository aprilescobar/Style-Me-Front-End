import React, { useContext, useState } from 'react'
// import { OutfitsContext, CurrentUserContext, NewTopContext, NewBottomContext, NewShoeContext } from '../Containers/Store'
import { OutfitsContext, NewTopContext, NewBottomContext, NewShoeContext } from '../Containers/Store'
import { CurrentUserContext } from '../Context/CurrentUser';

const CreateOutfitForm = props => {
    const abortController = new AbortController()
    const [currentUser] = useContext(CurrentUserContext)
    const [outfits, setOutfits] = useContext(OutfitsContext)
    const [newName, setNewName] = useState('')
    const [newTop, setNewTop] = useContext(NewTopContext)
    const [newBottom, setNewBottom] = useContext(NewBottomContext)
    const [newShoe, setNewShoe] = useContext(NewShoeContext)

    const [outfitName, setOutfitName] = useState(true)
    const [outfitTop, setOutfitTop] = useState(true)
    const [outfitBottom, setOutfitBottom] = useState(true)
    const [outfitShoe, setOutfitShoe] = useState(true)
    
    const user_id = currentUser.id
    const name = newName
    const top_id = parseInt(newTop[1], 0)
    const bottom_id = parseInt(newBottom[1], 0)
    const shoe_id = parseInt(newShoe[1], 0)
    const likes = 0

    const handleCreateOutfit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/outfits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ user_id, name, top_id, bottom_id, shoe_id, likes})
        })
        .then(res => res.json())
        .then(newOutfit => {
            if (newOutfit.errors){
                checkValidation()
            } else {
                setOutfits([...outfits, newOutfit]);
                setNewName('');
                setNewTop('');
                setNewBottom('');
                setNewShoe('');
                props.history.push(`/outfits/${newOutfit.id}`);
            }
        })
    }

    const cleanUp = () => {
        abortController.abort()
    }

    const checkValidation = () => {
        if (name === ''){
            setOutfitName(false)
        }
        if (newTop === ''){
            setOutfitTop(false)
        }
        if (newBottom === ''){
            setOutfitBottom(false)
        }
        if (newShoe === ''){
            setOutfitShoe(false)
        }
    }

    const selectMessage = category => (
        <small className="error form-text">*Please select a {category}.</small>
    )

    return (
        <div>
            <form onSubmit={handleCreateOutfit}>
                <img src={newTop[0]} alt="top"/>
                {outfitTop === false && selectMessage('top')}
                <img src={newBottom[0]} alt="bottom"/>
                {outfitBottom === false && selectMessage('bottom')}
                <img src={newShoe[0]} alt="shoe"/>
                {outfitShoe === false && selectMessage('shoe')}
                <input className="form-control form-control-sm" type="text" placeholder="Outfit Name" onChange={e => setNewName(e.target.value)} value={newName}/>
                {outfitName === false && <small className="error form-text">*Please name your outfit.</small>}
                <button className="btn btn-outline-secondary btn-sm" type="submit">Create Outfit</button>
            </form>
            {cleanUp()}
        </div>
    )
}

export default CreateOutfitForm