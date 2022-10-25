import React, { useState,  useRef } from 'react';
import '../styles/Main.css';

const Main = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState([])
    const [result, setResult] = useState("5")
    const [disabledPrev, setDisabledPrev] = useState(false)
    const [disabledNext, setDisabledNext] = useState(false)
    const [check, setCheck] = useState(false)

    const actualPage = useRef(0)

    const fetchItemData = async (page) => {
      try {
        if ( page === undefined ) {
          page = 1 
        }   
        const response = await fetch(
          `https://randomuser.me/api/?page=${page}&results=${result}&nat=${searchQuery}`
        ); 
  
        actualPage.current = page
        
    const users = await response.json();
        setUsers(users.results);
        setCheck(true)
      } catch (error) {
        console.log('Błąd!!', error);
      }
    };

    const handleSearch = (e) => {
      fetchItemData();
    };

    const handleSearchChange = (e) => {
      e.preventDefault();
        setSearchQuery(e.target.value);
      }

    const handleResults = (e) => {
        setResult(e.target.value);
      }
  
    const handleButtonOnClick = (e) => {
      fetchItemData(e.target.innerText)
    }

    const handlePrevPage = () => {
       if (actualPage.current <= 1 ) {
          setDisabledPrev(!disabledPrev)
        } else{
          fetchItemData(--actualPage.current);
        }
    }

    const handleNextPage = () => {
      if ( actualPage.current >= 10 ) {
        setDisabledNext(!disabledNext)
      }else{
        fetchItemData(++actualPage.current);
      }
    }
    
    const pages = [];

    for (let i = 1; i <= 10 ; i++) {
      pages.push((
      <button className={`${actualPage.current}` == i ? 'activePage' : null} 
        key={i} 
        onClick={handleButtonOnClick}>{i}
      </button>))
    }
  
    return (
      <div className='main'>
        <h1>Search for a resident of our tourist office</h1>
        <div className='select'>
            <label className='question'>
            Where to go on vacation? 
                <select
                      className='choice'
                      value={searchQuery} 
                      multiple={false}
                      onChange={handleSearchChange}
                      >
                          <option value="-"> - </option>
                          <option value="AU"> Australia </option>
                          <option value="BR"> Brazil </option>
                          <option value="CA"> Canada </option>
                          <option value="CH"> Switzerland </option>
                          <option value="DE"> Germany </option>
                          <option value="DK"> Denmark </option>
                          <option value="ES"> Spain </option>
                          <option value="FI"> Finland </option>
                          <option value="FR"> France </option>
                          <option value="GB"> Great Britain </option>
                          <option value="IE"> Ireland </option>
                          <option value="IN"> India </option>
                          <option value="IR"> Iran </option>
                          <option value="MX"> Mexico </option>
                          <option value="NL"> Netherlands </option>
                          <option value="NO"> Norway </option>
                          <option value="NZ"> New Zealand </option>
                          <option value="RS"> Serbia </option>
                          <option value="TR"> Turkey </option>
                          <option value="UA"> Ukraine </option>
                          <option value="US"> United States </option>
                </select>
            </label>
                </div>
                <button className='search' onClick={handleSearch}>Search</button>
                <div className='filtr'>
                  <label className='filtr'>
                    Filter:
                    <select
                        className='filtr'
                        value={result} 
                        onChange={handleResults}
                        >
                            <option value="5"> 5 elements per page </option>
                            <option value="10"> 10 elements per page </option>
                            <option value="20"> 20 elements per page </option>
                    </select>
                  </label>
                </div>
              
          <ul className='start'>
              {   
                users.map(user =>       
                <li className='start' key={user.login.uuid}>
                <h2>{user.name.first} {user.name.last}</h2>
                <h3>{user.location.country}</h3>
                <img src={user.picture.large} alt='/'/>
                <h4>{user.phone}</h4>
                <h4>{user.email}</h4>
                </li> )
              } 
          </ul>
        {
          (check === true) ?
          (<div className='pages'>
          <button disabled={disabledPrev} onClick={handlePrevPage}>Back</button>
          {pages}  
          <button disabled={disabledNext} onClick={handleNextPage}>Next</button>
          </div>) : null}
      </div>
    );
  };
  
  export default Main;
