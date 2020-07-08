import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { OutfitsContext } from '../Context/Outfits';
import { CurrentUserContext } from '../Context/CurrentUser';
import UpdateOutfit from '../Components/UpdateOutfit';
import '../Styling/OutfitPage.css'
import DeleteForm from '../Components/DeleteForm';
import OutfitComments from '../Components/OutfitComments';
import CommentForm from '../Components/CommentForm';

const OutfitPage = props => {
    const id = parseInt(props.match.params.id,0)
    const outfitUrl = `http://localhost:3000/outfits/${id}`

    const [currentUser] = useContext(CurrentUserContext)
    const [outfits, setOutfits] = useContext(OutfitsContext)

    const [outfit, setOutfit] = useState('')
    const [user, setUser] = useState('')
    const [top, setTop] = useState('')
    const [bottom, setBottom] = useState('')
    const [shoe, setShoe] = useState('')
    
    const [edit, setEdit] = useState(false)
    const [update, setUpdate] = useState(false)
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    
    const buttonStyle = "btn btn-outline-secondary btn-sm"

    useEffect(() => {
        fetchOutfit();
        getComments();
        getLikes();
        // eslint-disable-next-line
    }, [currentUser])
    
    const fetchOutfit = () => {
        fetch(outfitUrl)
        .then(res => res.json())
        .then(res => setInfo(res))
    }

    const getComments = () => {
        fetch('http://localhost:3000/comments')
        .then(res => res.json())
        .then(res => filterComments(res))
    }

    const getLikes = () => {
        fetch('http://localhost:3000/likes')
        .then(res => res.json())
        .then(res => filterLikes(res))
    }

    const filterComments = res => {
        const list = res.filter(comment => comment.outfit_id === id)
        setComments(list)
    }

    const filterLikes = res => {
        const list = res.filter(like => like.outfit_id === id)
        setLikes(list)
    }

    const userLiked = () => {
        const list = [...likes]
        let liked = list.find(like => like.user_id === currentUser.id)
        return liked && liked.id
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
        fetch(outfitUrl, {
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
    
    const postComment = res => {
        setComments([...comments, res])
    }

    const removeComment = id => {
        const list = [...comments]
        const updated = list.filter(comment => comment.id !== id)
        setComments(updated)
    }

    const addLike = res => {
        setLikes([...likes, res])
    }

    const removeLike = id => {
        const list = [...likes]
        const updated = list.filter(like => like.id !== id)
        setLikes(updated)
    }

    const creatorAccess = () => (
        <div>
            {update === false && 
            <div className="outfit-name">
                <div className="edit-btn">
                    <button className={buttonStyle} onClick={() => setUpdate(true)}>Update Name</button>
                </div>
                <div className="edit-btn">
                    <DeleteForm handleDelete={handleDelete} />
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
                    <div className='outfit-side'>
                        <div className="center-card">
                            <div className="outfit-page-card">
                                {productDetail(top)}
                                {productDetail(bottom)}
                                {productDetail(shoe)}
                            </div>
                        </div>
                        <div className="outfit-details">
                            <div className="outfit-page-name"> 
                                {update ? <UpdateOutfit setInfo={setInfo} id={id} name={outfit.name}/> : <h3>{outfit.name} </h3> }
                                <div className="edit-btn">
                                    {user.id === currentUser.id  && editButton()}
                                </div>
                            </div>
                            <div>
                                Created By:
                                <img className="profile-img" src={user.img_url} height="45" width="45" alt={user.name}/>
                                <b>{user.name}</b>
                            </div>
                        </div>
                    </div>
                    <div className='cmt-side'>
                        <div className="cmt-width">
                            <CommentForm 
                                id={id}  
                                likes={likes} 
                                liked={userLiked()} 
                                postComment={postComment} 
                                addLike={addLike}
                                removeLike={removeLike}/>
                            <div className="render-cmts">
                                <OutfitComments comments={comments} removeComment={removeComment}/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default OutfitPage