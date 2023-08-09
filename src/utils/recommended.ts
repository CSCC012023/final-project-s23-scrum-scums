import axios from "axios";

const getRecommended = async function (user_id: string) {
    const likes = (await axios.get("api/postlike")).data
    const num_posts = (await axios.get("api/post/postCount")).data
    const num_users = (await axios.get("api/postlike/userLikeCount")).data

    let userlikes = Array.from(Array(num_users), _ => Array(num_posts).fill(0));
    let users: string[] = [];
    for (const like of likes) {
        if (!users.includes(like.userId)) {
            users.push(like.userId);
        }
        userlikes[users.indexOf(like.userId)][like.postId - 1] = 1;
    }

    // User has not liked a post
    if (users.indexOf(user_id) === -1) {
        userlikes.push(Array(num_posts).fill(0));
        users.push(user_id);
    }
    
    // If user does not have any likes
    if (Math.max(...userlikes[users.indexOf(user_id)]) === 0)
    {
        const result = await axios.get("api/post");
        return result.data;
    }
    let arr: string[] = [];
    for (let user of userlikes) {
        arr.push(user.toString());
    }

    const userId = users.indexOf(user_id)
    const params = {
        recommended: arr,
        user_id: userId,
    }
    const result = await axios.get("/api/recommended", { params: params });
    return result.data;
}

export default getRecommended;