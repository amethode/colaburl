import React, { useState, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Helmet } from 'react-helmet';



const Home = () => {
    const navigate = useNavigate();
    const roomRef = useRef(null);

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
        // Focus on the Room ID TextField after creating a new room
        roomRef.current.focus();
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        }

        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    return (
        <div className="homePageWrapper">
            <Helmet>
                <title>Colaburl</title>
            </Helmet>
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/Logo.png"
                    alt="Logo"
                />
                <h4 className="mainLabel">Welcome to Colaburl</h4>
                <div className="inputGroup">
                    <TextField
                        id="standard-basic"
                        label="Room ID"
                        variant="standard"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        inputRef={roomRef}
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                        className='Input'
                        inputProps={{ className: 'Input_label' }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Username"
                        variant="standard"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                        className='Input'
                        inputProps={{ className: 'Input_label' }}
                    />
                    <button className="btn joinBtn" onClick={joinRoom}>
                        Join
                    </button>
                    <span className="createInfo">
                        Don't have an invite link? &nbsp;
                        <button onClick={createNewRoom} href="" className="createNewBtn">
                            Create one
                        </button>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    Built with ❤️ by Torneighdo
                </h4>
            </footer>
        </div>
    );
};

export default Home;
