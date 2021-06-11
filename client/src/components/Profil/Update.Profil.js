import { useSelector } from "react-redux";
import LeftNav from "../LeftNav"

const UpdateProfil = () => {
    const userData = useSelector((state => state.userReducer))
    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className="update_container">
                <h3>Photo de profil</h3>
                <img src={userData.picture} alt="user-pic" />
                UPLOAD PIC
            </div>
        </div>
    );
};

export default UpdateProfil;