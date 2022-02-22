import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GifHooks = () => {
    const [gifs, setGifs] = useState([])
    const [savedGifs, setSavedGifs] = useState([])
    const [gifInput, setGifInput] = useState('')


    useEffect(() => {
        const savedGifs = localStorage.getItem('savedGifs')

        if (savedGifs) setSavedGifs(JSON.parse(savedGifs))
    }, [])

    const handleInput = (event) => {
        setGifInput(event.target.value);
    }

    const handleRemoveGif = (index) => {
        const newArray = [...savedGifs];

        newArray.splice(index, 1);

        setSavedGifs(newArray)
        localStorage.setItem('savedGifs', JSON.stringify(newArray))

    }

    const handleSaveGif = (gif) => {
        const newArray = [...savedGifs, gif]

        setSavedGifs(newArray)
        localStorage.setItem('savedGifs', JSON.stringify(newArray))
    }

    const handleSearchGifs = async () => {
        if (!gifInput) return;

        let api_key = "zuRlN4vMoJRypCgwGse88JdxaaLSrYNr";

        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?&q=${gifInput}&api_key=${api_key}`)

        console.log(res.data.data)

        setGifs(res.data.data)
    }

    return (
        <div>


             <h3>powered by : <svg height="40" width="40" xmlns="http://www.w3.org/2000/svg" viewBox="4 2 16.32 20"><g fill="none" fill-rule="evenodd"><path d="M6.331 4.286H17.99v15.428H6.33z" fill="#000"/><g fill-rule="nonzero"><path d="M4 3.714h2.331v16.572H4z" fill="#04ff8e"/><path d="M17.989 8.286h2.331v12h-2.331z" fill="#8e2eff"/><path d="M4 19.714h16.32V22H4z" fill="#00c5ff"/><path d="M4 2h9.326v2.286H4z" fill="#fff152"/><path d="M17.989 6.571V4.286h-2.332V2h-2.331v6.857h6.994V6.571" fill="#ff5b5b"/><path d="M17.989 11.143V8.857h2.331" fill="#551c99"/></g><path d="M13.326 2v2.286h-2.332" fill="#999131"/></g></svg> Giphy</h3>

            <div className='fav-gifs'>

                {savedGifs.map((gif, index) => {
                    console.log(gif)
                    return (
                        <div key={index} className="single-fav-gif">
                            <img src={gif.images.fixed_width.url} alt=' ' />
                            <button className="save-remove-button" onClick={() => handleRemoveGif(index)} >Remove</button>
                        </div>
                    )
                })}
            </div>

            <section className='search-section'>
            <h1><span style={{ color: '#FFE62E' }}>Gif</span> App</h1>
                <input onChange={handleInput} value={gifInput} placeholder="Search Here" />
                <button className="search-button" onClick={handleSearchGifs}>SEARCH</button>
            </section>


            <div className='searched-gifs'>
                {gifs.map((gif, index) => {
                    return (
                        <div key={index} className="single-search-gif">
                            <img src={gif.images.fixed_width.url} alt=""/>
                            <button className="save-remove-button" onClick={() => handleSaveGif(gif)}>Save</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default GifHooks
