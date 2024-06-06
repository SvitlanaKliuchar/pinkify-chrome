import { SignInButton, SignUpButton } from "@clerk/clerk-react"
export default function SignInPage() {
    return (<>
        <div className="sign-in-container">
            <SignUpButton className="sign-up-btn" />
            <SignInButton className="sign-in-btn" />
        </div>
    </>)
}