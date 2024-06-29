import axios from 'axios'
import { useEffect, useState } from 'react'
import bunniesInLove from '../../assets/homepage/bunnies-in-love.webp'

export default function Quote() {
    const [fullQuote, setFullQuote] = useState({})

    const fetchQuote = async () => {
        try {
            const res = await axios.get(`/api/quote`)
            const newQuote = res.data.text
            const newAuthor = res.data.author
            setFullQuote({quote: newQuote, author: newAuthor})

        } catch (error) {
            console.log("Error fetching quote", error)
        }
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    if (!fullQuote.quote || !fullQuote.author) {
        return <div>Loading...</div>;
    }
    return (<>
    <div>
        <div className="quote-container">
            <p className="quote">{fullQuote.quote}</p>
            <p className="author">{fullQuote.author}</p>
        </div>
        <div className="decor-container">
            <div className="quote-decor-right"><img  src={bunniesInLove} alt="bunnies in love" /></div> 
        </div>
    </div>
    </>)
}