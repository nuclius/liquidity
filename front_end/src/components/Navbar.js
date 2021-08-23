import React from 'react'
import Identicon from "identicon.js"

function Navbar(props) {
    const account = props.account
    return (
        <div>
           <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="./"
            target="_blank"
            rel="noopener noreferrer"
          >
            TDex 2
          </a>
          <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                  <small className="text-secondary">
                      <small id="account" style={{color: "white"}}>{account}</small>
                  </small>
                  {
                    account
                    ? <img className="ml-2" width="30" height="30" src={`data:image/png;base64,${new Identicon(account, 30).toString()}`} alt=""/>
                    : <span></span>
                  }
              </li>  
          </ul>
        </nav> 
        </div>
    )
}

export default Navbar
