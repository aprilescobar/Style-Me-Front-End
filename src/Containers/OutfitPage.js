import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { OutfitsContext } from '../Context/Store';
import { CurrentUserContext } from '../Context/CurrentUser';
import UpdateOutfit from '../Components/UpdateOutfit';
import '../Styling/OutfitPage.css'

const OutfitPage = props => {
    const id = parseInt(props.match.params.id,0)
    const url = `http://localhost:3000/outfits/${id}`

    const [currentUser] = useContext(CurrentUserContext)
    const [outfits, setOutfits] = useContext(OutfitsContext)

    const [outfit, setOutfit] = useState('')
    const [user, setUser] = useState('')
    const [top, setTop] = useState('')
    const [bottom, setBottom] = useState('')
    const [shoe, setShoe] = useState('')
    
    const [edit, setEdit] = useState(false)
    const [update, setUpdate] = useState(false)
    
    const buttonStyle = "btn btn-outline-secondary btn-sm"
    const buttonWarning = "btn btn-outline-danger btn-sm "

    useEffect(() => {
        fetchOutfit()
        // eslint-disable-next-line
    }, [])
    
    const fetchOutfit = () => {
        fetch(url)
        .then(res => res.json())
        .then(res => setInfo(res))
    }

    const setInfo = res => {
        setOutfit(res);
        setUser(res.user);
        setTop(res.top);
        setBottom(res.bottom);
        setShoe(res.shoe)
        setUpdate(false);
        setEdit(false);
    }

    const handleDelete = () => {
        fetch(url, {
            method: 'DELETE'
        })
        removeOutfit(id);
        props.history.push('/')
    }

    const removeOutfit = id => {
        const list = [...outfits]
        const updated = list.filter(outfit => outfit.id !== id)
        setOutfits(updated)
    }

    const creatorAccess = () => (
        <div>
            {update === false && 
            <div className="outfit-name">
                <div className="edit-btn">
                    <button className={buttonStyle} onClick={() => setUpdate(true)}>Update Name</button>
                </div>
                <div className="edit-btn">
                    <button type="button" className={buttonWarning} data-toggle="modal" data-target="#deleteWarning">
                        Delete Outfit
                    </button>
                    <div className="modal fade" id="deleteWarning" tabIndex="-1" role="dialog" aria-labelledby="deleteWarningTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Are you sure?</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    You can't undo this
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className={buttonStyle} data-dismiss="modal">Nevermind</button>
                                    <button type="button" className={buttonWarning} data-dismiss="modal" onClick={handleDelete}>Yes, delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="edit-btn">
                    <span className={buttonStyle} onClick={() => setEdit(false)}>✖︎</span>
                </div>
            </div>}
        </div>
    )

    const editButton = () => (
        edit ? creatorAccess() : <div><button className={buttonStyle} onClick={() => setEdit(true)}>Edit</button></div>
    )

    const outfitPrice = () => (
        top.price + bottom.price + shoe.price
    )

    const productDetail = product => {
        return (
            <div>
                <Link to={`/${product.category}/${product.id}`}>
                    <img className="outfit-index-img" src={product.img_url} alt={product}/>
                </Link>
                <p>{product.name}</p>
            </div>
        )
    }

    return(
        <div className="outfit-page">
                <div className='row'>
                    <div className='col-sm-8'>
                        <div className="center-card">
                            <div className="outfit-page-card">
                                {productDetail(top)}
                                {productDetail(bottom)}
                                {productDetail(shoe)}
                            </div>
                        </div>
                        <div className="outfit-details">
                            <div className="outfit-name"> 
                                {update ? <UpdateOutfit setInfo={setInfo} id={id} name={outfit.name}/> : <h4>{outfit.name} </h4> }
                                <div className="edit-btn">
                                    {user.id === currentUser.id  && editButton()}
                                </div>
                            </div>
                            <em>Created by: {user.name}</em><br/>
                            Price: ${outfitPrice()} 
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        Comments section
                    </div>
                </div>
        </div>
    )
}

export default OutfitPage