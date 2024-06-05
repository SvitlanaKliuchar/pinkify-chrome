import whiteBunny from '../../assets/quote/white-bunny.webp'
import bunniesInLove from '../../assets/quote/bunnies-in-love.webp'

export default function Quote() {
    return (<>
    <div>
        <div className="quote-container">
            <p className="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitatio.</p>
            <p className="author">Author goes here</p>
        </div>
        <div className="decor-container">
            <div className="quote-decor-right"><img  src={bunniesInLove} alt="bunnies in love" /></div> 
        </div>
    </div>
    </>)
}