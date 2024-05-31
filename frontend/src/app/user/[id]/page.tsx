'use client'

const UserPage = () => {
    const username = localStorage.getItem("username")
    return(
        <div className="w-screen h-screen flex items-center justify-center flex-col">
            <div className="con text-3xl m-5">Hi {username}</div>
            <a href="/" onClick={() => localStorage.removeItem("username")}>Logout</a>
        </div>
    )
}

export default UserPage