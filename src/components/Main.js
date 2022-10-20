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
        <h1>Wyszukaj rezydenta naszego biura turystycznego</h1>
        <div className='select'>
            <label className='question'>
                Gdzie na wakacje? 
                <select
                      className='choice'
                      value={searchQuery} 
                      multiple={false}
                      onChange={handleSearchChange}
                      >
                          <option value="-"> - </option>
                          <option value="AU"> Australia </option>
                          <option value="BR"> Brazylia </option>
                          <option value="CA"> Kanada </option>
                          <option value="CH"> Szwajcaria </option>
                          <option value="DE"> Niemcy </option>
                          <option value="DK"> Dania </option>
                          <option value="ES"> Hiszpania </option>
                          <option value="FI"> Finlandia </option>
                          <option value="FR"> Francja </option>
                          <option value="GB"> Wielka Brytania </option>
                          <option value="IE"> Irlandia </option>
                          <option value="IN"> Indie </option>
                          <option value="IR"> Iran </option>
                          <option value="MX"> Meksyk </option>
                          <option value="NL"> Niderlandy </option>
                          <option value="NO"> Norwegia </option>
                          <option value="NZ"> Nowa Zelandia </option>
                          <option value="RS"> Serbia </option>
                          <option value="TR"> Turcja </option>
                          <option value="UA"> Ukraina </option>
                          <option value="US"> Stany Zjednoczone </option>
                </select>
            </label>
            <button className='search' onClick={handleSearch}>Szukaj</button>
                </div>
                <div className='filtr'>
                  <label className='filtr'>
                    Filtruj:
                    <select
                        className='filtr'
                        value={result} 
                        onChange={handleResults}
                        >
                            <option value="5"> 5 elementów na stronie </option>
                            <option value="10"> 10 elementów na stronie </option>
                            <option value="20"> 20 elemenów na stronie </option>
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
                <h4>tel: {user.phone}</h4>
                <h4>email: {user.email}</h4>
                </li> )
              } 
          </ul>
        {
          (check === true) ?
          (<div className='pages'>
          <button disabled={disabledPrev} onClick={handlePrevPage}>Wstecz</button>
          {pages}  
          <button disabled={disabledNext} onClick={handleNextPage}>Następna</button>
          </div>) : null}
      </div>
    );
  };
  
  export default Main;
