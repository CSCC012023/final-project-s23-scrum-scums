import React from "react";
import '@styles/globals.css'
// import Layout from "/app/(site)/Layout";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { data } = await axios.post('/api/signup', { username, password, email })
        setUsername("")
        setPassword("")
        setEmail("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <label className="text-3xl font-bold text-left px-2">Username</label>
                <input 
                    className="border-2 border-black rounded-lg" 
                    type="text" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label className="text-3xl font-bold text-left px-2">E-mail</label>
                <input 
                    className="border-2 border-black rounded-lg"
                    type="text" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="text-3xl font-bold text-left px-2">Password</label>
                <input 
                    className="border-2 border-black rounded-lg"
                    type="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="border-2 border-black rounded-lg" >Submit</button>
            </form>   
        </div>
    )                  
}

export default Signup