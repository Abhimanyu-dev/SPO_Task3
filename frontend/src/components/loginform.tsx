'use client'

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"  
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async() => {
        const body = {
            username: username,
            password: password
        }   
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const content = await response.json()
        const user = content['user']
        if(user){
            localStorage.setItem("username", user['username'])
            router.push(`/user/${user["_id"]}`)
        }else{
            toast(content['message'])
        }
    }

    return (
        <div className="container h-screen w-screen flex items-center justify-center">
            <div className="form-container max-h-[300px] h-[50%] w-[80%] border flex items-center justify-center rounded-xl">
                <div className="title w-full flex items-center justify-center">
                    <h1 className="text-3xl">Login</h1>
                </div>
                <div className="form w-full h-full px-5 flex flex-col items-center justify-evenly   ">
                    <Input placeholder="Username" className="rounded-xl" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <Input type="password" placeholder="Password" className="rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="container w-full flex items-center justify-around">
                        <a href="/signup" >New User?</a>
                        <Button variant={"outline"} className="w-20 rounded-xl" onClick={handleSubmit}>Log in</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm