import { POST } from "../graphql/posts.ts";
import {Link} from "react-router-dom";

const PostItem = ({
    imageUrl,
    description,
    id,
    title,
}: POST) => {
    return (
        <li className="post-item">
            <Link to={`/posts/${id}`}>
                <span className="post-item__title">{title}</span>
                <span className="post-item__description">{description}</span>
                <img className="post-item__image" src={imageUrl}/>
            </Link>
        </li>
    )
}

export default PostItem;