import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlFetcher } from "../../queryClient.ts"
import { GET_POSTS, POSTS, POST, CREATE_POST, EDIT_POST } from '../../components/graphql/posts.ts'
import PostItem from "../../components/posts/item.tsx";
import { useState } from "react";


const PostList = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editMode, setEditMode] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ title: string; description: string; }>({
        title: '',
        description: ''
    })
    const queryClient = useQueryClient();

    const { data } = useQuery<POSTS>({
        queryKey: ['GET_POSTS'],
        queryFn: () => graphqlFetcher(GET_POSTS),
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        addPostMutation.mutate({ title, description });
        setTitle("");
        setDescription("");
    }

    const addPostMutation = useMutation({
        mutationFn: (newPost: { title: string, description: string }) => 
            graphqlFetcher(CREATE_POST, newPost),
        onSuccess: () => {
            queryClient.invalidateQueries(['GET_POSTS'])
        }
    })

    const editPostMutation = useMutation({
        mutationFn: (updatedPost: { id: string; title: string; description: string }) => 
            graphqlFetcher(EDIT_POST, updatedPost),
        onSuccess: () => {
            queryClient.invalidateQueries(['GET_POSTS']);
            setEditMode(null);
        }
    })

    const clickUpdated = (post: POST) => {
        setEditMode(post.id);
        setEditValues({ title: post.title, description: post.description });
    };

    const completeUpdated = () => {
        if (typeof editMode === "number") {
            editPostMutation.mutate({ id: editMode, ...editValues });
        }
    };

    return (
        <div>
            <h2>문의 목록</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">추가</button>
            </form>
            <ul className="posts">
                {
                    data?.posts?.map((post: POST) => (
                        <li key={post.id} className="post-item">
                            {
                                editMode === post.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editValues.title}
                                            onChange={(e) => setEditValues((prev) => ({...prev, title: e.target.value}))}
                                        />
                                        <input
                                            type="text"
                                            value={editValues.description}
                                            onChange={(e) => setEditValues((prev) => ({...prev, description: e.target.value}))}
                                        />
                                        <button onClick={completeUpdated}>저장</button>
                                        <button onClick={() => setEditMode(null)}>취소</button>
                                    </>
                                ) : (
                                    <>
                                        <PostItem {...post} key={post.id}/>
                                        <button onClick={() => clickUpdated(post)}>수정</button>
                                    </>
                                )}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default PostList;