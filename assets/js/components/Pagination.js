import axios from "axios";
import React from "react";


export default function PaginatedItems({page}) {
    const [post, setPost] = React.useState(null);
    const baseURL = `https://allcine227.com/api/articles.jsonld?page=${page}`;
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data["hydra:member"]);
        });
    }, []);

    if (!post) return null;

    return post
}
