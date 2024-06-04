
export default function SendNote() {
    return (<>
    <div className="send-note-container">
        <form /* onSubmit={handleSubmit} */>
            <label>Write a note to your friend</label>
            <input type="text" id="email" name="email" placeholder="email:" required />
            <textarea name="note" id="note" rows={8} cols={20} required />
            <button type="submit">Send</button>
        </form>
    </div>
    </>)
}