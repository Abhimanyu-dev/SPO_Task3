import LoginForm from "@/components/loginform"
import { Toaster } from "sonner"

const LoginPage = () => {
    return (
        <div className="">
            <LoginForm />
            <Toaster />
        </div>
    )
}

export default LoginPage