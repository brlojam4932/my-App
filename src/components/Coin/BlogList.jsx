import React from 'react';

const BlogList = ( {blogs} ) => {
  return ( 
    <div className="blog-list">
    {blogs.map((blog) => (
      <div className="blog-preview" key={blog.id}>
      </div>
    ))}
  </div>
   );
}
 
export default BlogList;