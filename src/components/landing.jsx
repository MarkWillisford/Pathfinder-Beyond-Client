import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import NavBar from './navBar';

import './landing.css';

export default class Landing extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;

        return (
            <div className="playerHomePage">
                <NavBar isLoggedIn={isLoggedIn} />

                <h1>Welcome to Pathfinder Beyond</h1>
                <h2>Your tableside assistant</h2>

                <div>
                	<section>
			            <header>
			                <h3>Manage your characters</h3>
			            </header>
			            <p>[<em>placeholder for screenshot of player homepage</em>]</p>
			            <p>Pathfinder Beyond allows you to create, manage, edit and even play all your characters in one cloud based location. Never leave your character sheets at home again.</p>
			        </section>
			        <section>
			            <header>
			                <h3>Start Playing Now</h3>
			                <button type='button'>Demo</button>
			            </header>
			            <form className='signup-form'>
			                <div>
			                  <label htmlFor="first-name">Username</label>
			                  <input placeholder='Username' type="text" name='username' id='username' />
			                </div>
			                <div>
			                  <label htmlFor="username">Email</label>
			                  <input placeholder='Email' type="text" name='username' id='username' />
			                </div>
			                <div>
			                  <label htmlFor="password">Password</label>
			                  <input placeholder='Password' type="password" name='password' id='password' />
			                </div>
			                <div>
			                  <label htmlFor="repeat_password">Repeat Password</label>
			                  <input type="password" name='repeat_password' id='repeat_password' />
			                </div>
			                <button type='submit'>Sign Up</button>
			            </form>
			        </section>
                </div>

                <div>
	                <h2>Future Expansions!</h2>
					<section>
			            <header>
			                <h3>Manage your campaigns</h3>
			            </header>
			            <p>[<em>placeholder for screenshot of campaign details</em>]</p>
			            <p>Join with other players in campaigns, track and record stories and session journals, remember NPCs and chat with players on the message boards</p>
			        </section>

			        <section>
			            <header>
			                <h3>Become a GM and create your own campaigns</h3>
			            </header>
			            <p>[<em>placeholder for screenshot of GM homepage</em>]</p>
			            <p>After being approved as a GM, create your own campaigns and allow players to join your world. Create and organize NPCs, Monsters, locations, and storylines. Sharing them with your players when you are ready with just a click.</p>
			        </section>
			    </div>
            </div>
        );
    }
}