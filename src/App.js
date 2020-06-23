import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './Styling/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateOutfit from './Context/CreateOutfit';
import StyleMe from './Containers/StyleMe';
import CurrentUser from './Context/CurrentUser';
import Outfits from './Context/Outfits';
import Tops from './Context/Tops';
import Bottoms from './Context/Bottoms';
import Shoes from './Context/Shoes';
import FaveTops from './Context/FaveTops';
import FaveBottoms from './Context/FaveBottoms';
import FaveShoes from './Context/FaveShoes';
import Favorites from './Context/Favorites';

const App = () => {
  return (
    <>
      <Router>
        <CurrentUser>
          <CreateOutfit>
            <Outfits>
              <Tops>
                <Bottoms>
                  <Shoes>
                    <FaveTops>
                      <FaveBottoms>
                        <FaveShoes>
                          <Favorites>
                            <Route to='/' component={StyleMe} />
                          </Favorites>
                        </FaveShoes>
                      </FaveBottoms>
                    </FaveTops>
                  </Shoes>
                </Bottoms>
              </Tops>
            </Outfits>
          </CreateOutfit>
        </CurrentUser>
      </Router>
    </>
  )
}

export default App;
