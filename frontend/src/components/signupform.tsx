'use client'

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"  

const SignUpForm = () => {
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async() => {
        const body = {
            username: username,
            password: password,
        }   
        const response = await fetch("/api/user/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const content = await response.json()
        console.log(response.status)
        if(response.status != 200){
            toast(content['message']['errorResponse']['errmsg'])
        }else{
            toast(content['message'])
        }
    }

    return (
        <div className="container h-screen w-screen flex items-center justify-center">
            <div className="form-container max-h-[300px] h-[50%] w-[80%] border flex items-center justify-center rounded-xl">
                <div className="title w-full flex items-center justify-center">
                    <h1 className="text-3xl">Sign Up</h1>
                </div>
                <div className="form w-full h-full px-5 flex flex-col items-center justify-evenly   ">
                    <Input placeholder="Username" className="rounded-xl" value={username} onChange={(e) => setusername(e.target.value)}/>
                    <Input type="password" placeholder="Password" className="rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="container flex items-center justify-around">
                        <a href="/login">Login</a>
                        <Button variant={"outline"} className="w-20 rounded-xl" onClick={handleSubmit}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm