
export default function Quote() {
    return (<>
    <div className="quote-container">
        <p className="quote">Quote goes here. If settings are set to ukrainian, display ukrainian literature.If set to eng, haruki murakami and such. If set to pt, only display Clarice Lispector.</p>
        <p className="author">Author goes here</p>
    </div>
    <div className="decor-container">
        <div className="quote-decor">bunny sits here</div>
        <div className="quote-decor">bunny 2 sits here</div> 
    </div>
    </>)
}