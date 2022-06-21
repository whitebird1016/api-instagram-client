import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { Avatar } from "@mui/material";

const Home = ({ user, setUser }) => {
    const [instaUsername, setInstaUsername] = useState({ username: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState();

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setInstaUsername({ ...instaUsername, [name]: value });
    };

    const findUser = async () => {
        if (instaUsername.username !== "") {
            setIsLoading(true);
            try {
                const result = await axios.get(
                    `http://localhost:4000/getInstaUser/${instaUsername.username}`
                );

                const response = await result.data;

                setProfile({
                    username: response.data.username,
                    posts: response.data.total_post,
                    followers: response.data.follower,
                    following: response.data.following,
                    name: response.data.full_name,
                    bio: response.data.biography,
                    img: response.data.profile_pic_base64_image,
                });

                console.log(response);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                Swal.fire({
                    title: "Warning",
                    text: "Something went wrong please try again",
                    icon: "warning",
                });
            }
        } else {
            Swal.fire({
                title: "Warning!",
                text: "Please enter username first",
                icon: "warning",
            });
        }
    };

    const responseFacebook = (response) => {
        setUser({ name: response.name, picture: response.picture.data.url });
        Cookies.set("accessToken", response.accessToken);
        Cookies.set("name", response.name);
        Cookies.set("picture", response.picture.data.url);
    };

    return (
        <>
            <Navbar user={user} />
            <div className="home_wrapper">
                {!user && (
                    <FacebookLogin
                        appId="802590767390191"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook}
                    />
                )}

                {user && (
                    <div className="search_user_div">
                        <input
                            className="primary_input"
                            name="username"
                            type="text"
                            placeholder="Enter Instagram any username"
                            onChange={handleInputs}
                        />
                        <button className="primary_btn" onClick={findUser}>
                            Find
                        </button>
                    </div>
                )}

                {profile && (
                    <>
                        <div className="profile_div_wrapper">
                            <div className="profile_dive_left_side">
                                <Avatar
                                    style={{ height: "180px", width: "180px" }}
                                    src={profile?.img}
                                    crossOrigin="anonymous"
                                />
                            </div>

                            <div className="profile_dive_right_side">
                                <h2 style={{ marginBottom: "10px" }}>
                                    {profile?.username}
                                </h2>
                                <div className="profile_count_div">
                                    <h4>{profile?.posts} posts</h4>
                                    <h4>{profile?.followers} followers</h4>
                                    <h4>{profile?.following} following</h4>
                                </div>
                                <h4>{profile?.name}</h4>
                                <p>{profile?.bio}</p>
                            </div>
                        </div>
                    </>
                )}

                {isLoading && <Spinner />}
            </div>
        </>
    );
};

export default Home;
