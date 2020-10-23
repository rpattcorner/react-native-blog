import React from 'react';

const BlogContext = React.createContext();

export const BlogProvider = ( {children}  ) => {
    const BlogPosts = () => {
        { title: 'Blog Post #1' }
        { title: 'Blog Post #2a '}
    }
    return <BlogContext.Provider value = {BlogPosts}>
        {children}
    </BlogContext.Provider>;
}

export default BlogContext;