import { POST } from "../graphql/posts.ts";
import {Link} from "react-router-dom";

const PostItem = ({
    description,
    id,
    title,
}: POST) => {
    return (
        <div className="post-item">
            <Link to={`/posts/${id}`}>
                <span className="post-item__title">{title}</span>
                <span className="post-item__description">{description}</span>
            </Link>
        </div>
    )
}

export default PostItem;