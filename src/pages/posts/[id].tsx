import PostDetail from "../../components/posts/detail.tsx";
import { useQuery } from "@tanstack/react-query"
import { graphqlFetcher } from "../../queryClient"
import { useParams } from "react-router-dom"
import { GET_POST, POST } from '../../components/graphql/posts.ts';

const PostDetailPage = () => {
    const { id } = useParams();

    const { data } = useQuery<POST>({
        queryKey: ['GET_POSTS', id],
        queryFn: () => graphqlFetcher(GET_POST, { id }),
        enabled: !!id
    })

    if (!data) return null;
    return (
        <div>
            <h2>문의상세</h2>
            <PostDetail item={data.post}/>
        </div>
    )
}

export default PostDetailPage