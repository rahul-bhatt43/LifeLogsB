import Post from "../models/post.js";

export const createPost = async (req, res) => {
    try {
        const { title, imgLink, body, author, uid } = req.body;

        const blogData = new Post({
            title, imgLink, body, author, uid
        });

        const savedBlog = await blogData.save();

        res.status(201).json({
            created: true,
            data: savedBlog,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.body;
        // const { id } = req.params;
        // console.log(id);

        const response = await Post.findByIdAndDelete(id);

        if (!response) {
            res.status(400).json({
                success: false,
                message: "No such data found in directory"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "deleted successfully"
            })
        }

    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const getAllPosts = async (req, res) => {
    console.log("executed");
    try {
        const data = await Post.find();

        res.status(200).json({
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }

}

export const getPostbyId = async (req, res) => {
    try {
        // const { id } = req.body;
        const { id } = req.params;

        const data = await Post.findOne({ _id: id });

        if (!data) {
            res.status(400).json({
                message: "No such data found"
            });
        } else {
            res.status(200).json({
                data: data,
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id, title, imgLink, body, author, uid } = req.body;

        const data = await Post.findByIdAndUpdate({ _id: id }, { title, imgLink, body, author, uid });

        res.status(200).json({
            message: "Updated",
            data: data,
        })



    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
}


