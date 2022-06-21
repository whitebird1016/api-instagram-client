import React from "react";
import { Avatar } from "@mui/material";

const Navbar = ({ user }) => {
    return (
        <>
            <div className="navbar_wrapper">
                <div className="navbar_left_side">
                    <h3>API Project</h3>
                </div>

                <div className="navbar_right_side">
                    {user && (
                        <>
                            <Avatar src={user?.picture} />
                            <h4>{user?.name}</h4>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
