import React from 'react';
import Navbar from '../Components/Navbar';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Tops from './Tops';
import Top from './Top';
import Bottoms from './Bottoms';
import Bottom from './Bottom';
import Shoes from './Shoes';
import Shoe from './Shoe';
import Outfits from './Outfits';
import OutfitPage from './OutfitPage';
import CreateOutfit from './CreateOutfit';
import Footer from '../Components/Footer';


const AccessStyleMe = props => {
    return(
        <div>
            <div className="header">
                <Navbar {...props}/>
            </div>
            <div className="content style-me">
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/tops' component={Tops} />
                    <Route exact path='/bottoms' component={Bottoms} />
                    <Route exact path='/shoes' component={Shoes} />
                    <Route exact path='/outfits' component={Outfits} />
                    <Route path='/tops/:id' component={Top} />
                    <Route path='/bottoms/:id' component={Bottom} />
                    <Route path='/shoes/:id' component={Shoe} />
                    <Route path='/outfits/new' component={CreateOutfit} />
                    <Route path='/outfits/:id' component={OutfitPage} />
                </Switch>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

export default AccessStyleMe