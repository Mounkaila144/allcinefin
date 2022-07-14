import axios from "axios";
import React from "react";


export default function PaginatedItems({page}) {
    const [post, setPost] = React.useState(null);
    const baseURL = `https://127.0.0.1:8000/api/articles.jsonld?page=${page}`;
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data["hydra:member"]);
        });
    }, []);

    if (!post) return null;

    return post
}
