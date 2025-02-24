import { POST } from '../graphql/posts.ts';

const PostDetail = ({
    item: {
        title,
        imageUrl,
        description,
        createdAt,
        updatedAt,
    }
}: {
    item: POST
}) => {
    return (
        <div className="product-detail">
            <h2 className="product-detail__title">{title}</h2>
            <p className="product-detail__description">{description}</p>
            <img className="product-detail__image" src={imageUrl}/>
            <span className="product-detail__price">생성일 : {createdAt}</span>
            <span className="product-detail__price">{ !!updatedAt && `수정일 :` + updatedAt }</span>
        </div>
    )
}

export default PostDetail;