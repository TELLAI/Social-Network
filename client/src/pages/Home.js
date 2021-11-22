import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import LeftNav from "../components/LeftNav"
import Log from '../components/Log';
import Navbar from '../components/Navbar';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from "../components/Thread";

const Home = () => {
    
    const uid = useContext(UidContext);

    return (
        <div className="home">
            <Navbar />
            <LeftNav />
            <div className="main">
                <div className="home-header">
                    {uid ? <NewPostForm /> : <Log signin={true} />}
                </div>
                <Thread />
            </div>
        </div>
    );
};

export default Home;