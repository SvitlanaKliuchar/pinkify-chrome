import axios from 'axios'
import { useEffect, useState } from 'react'
import bunniesInLove from '../../assets/quote/bunnies-in-love.webp'

export default function Quote() {
    const [fullQuote, setFullQuote] = useState({})
    const BASE_URL = 'http://localhost:3000'

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/quote`)
                const newQuote = res.data.text
                const newAuthor = res.data.author
                setFullQuote({quote: newQuote, author: newAuthor})

            } catch (error) {
                console.log("Error fetching quote", error)
            }
        }
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