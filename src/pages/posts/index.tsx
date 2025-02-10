import { useQuery } from "@tanstack/react-query"
import { graphqlFetcher } from "../../queryClient.ts"
import { GET_POSTS, POSTS, POST } from '../../components/graphql/posts.ts'
import PostItem from "../../components/posts/item.tsx";


const PostList = () => {
    const { data } = useQuery<POSTS>({
        queryKey: ['GET_POSTS'],
        queryFn: () => graphqlFetcher(GET_POSTS),
    })

    return (
        <div>
            <h2>문의 목록</h2>
            <ul className="posts">
                {
                    data?.posts?.map((post: POST) => (
                        <PostItem {...post} key={post.id}/>
                    ))
                }
            </ul>
        </div>
    )
}

export default PostList;