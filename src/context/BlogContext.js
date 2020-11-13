import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer'

// const BlogContext = React.createContext();

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload // replaces existing state

        // case 'add_blogpost':
        //     return [...state, { 
        //         id: Math.floor(Math.random() * 99999 ),
        //         title: action.payload.title,
        //         content: action.payload.content
        //     }
        // ];

        case 'edit_blogpost':
            return state.map( (blogPost) => {
                return blogPost.id === action.payload.id 
                    ? action.payload
                    : blogPost;
                // if (blogPost.id === action.payload.id) {
                //     return action.payload;
                // } else {
                //     return blogPost;
                // }
            });

        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);

        default:
            return state;
    }
}

const getBlogPosts = (dispatch) => {
    return async() => {
        response = await jsonServer.get('/blogposts')
        // response.data === [{},{},{}]
        dispatch( {type: 'get_blogposts', payload: response.data} )
    };
}
const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        response = await jsonServer.post('/blogposts', { title, content });
        // dispatch({ type: 'add_blogpost', payload: {title: title, content: content} });
        if (callback) {
            callback();
        }
    }
}

const deleteBlogPost = (dispatch) => {
    return async (id) =>{
        response = await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id });
    }
    
}

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        response = await(jsonServer.put(`blogposts/${id}`, { title, content }));
        dispatch({
            type: 'edit_blogpost', 
            // payload: { id: id, title: title, content: content }
            payload: { id, title, content }
        });
        if (callback) {
            callback();
        }
    }
}   

export const { Context, Provider } = 
    createDataContext(
        blogReducer,
        { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost },[]
     )