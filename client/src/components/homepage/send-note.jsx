
export default function SendNote() {
    return (<>
    <div className="send-note-container">
        <form /* onSubmit={handleSubmit} */>
            <label className="label">Send a note to a friend</label>
            <input type="text" id="email" name="email" placeholder="email:" required />
            <textarea name="note" id="note" rows={5} cols={25} required />
            <button type="submit" className="btn send-btn">send</button>
        </form>
    </div>
    </>)
}