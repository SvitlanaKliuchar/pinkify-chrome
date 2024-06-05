import { SignInButton, SignUpButton } from "@clerk/clerk-react"
export default function SignInPage() {
    return (<>
        <div className="sign-in-container">
            <SignUpButton />
            <SignInButton />
        </div>
    </>)
}