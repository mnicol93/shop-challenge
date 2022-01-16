// How to create a Like Button in react
// https://medium.com/@elle.westervelt/create-a-basic-like-button-in-react-5274a6991385
// How to shape a heart in CSS
// https://www.hongkiat.com/blog/css-heart-shape/

import { useState } from "react";

function LikeBtn(){
    const [likes, setLikes] = useState(0);

    return(
        <div className="LikeHeart">
            <button onClick={()=> setLikes(likes + 1)}></button>
            {likes}
        </div>
    );
}

export default LikeBtn;