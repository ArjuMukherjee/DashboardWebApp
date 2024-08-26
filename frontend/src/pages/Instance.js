import React from 'react';
import CreateInstance from '../components/CreateInstance';
import ListInstance from '../components/ListInstance';

function refreshPage() {
    window.location.reload(false);
}

const Home = () => {
    return (
        <div>
            <CreateInstance />
            <ListInstance />
        </div>
    );
};

export default Home;