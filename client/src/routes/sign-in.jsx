import { SignInButton, SignUpButton } from "@clerk/clerk-react"
export default function SignInPage() {
    return (<>
        <div className="page-container">
            <SignUpButton className="sign-up-btn" />
            <SignInButton className="sign-in-btn" />
        </div>
    </>)
}