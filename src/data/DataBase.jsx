import { useState } from "react/cjs/react.development";

export default function DataBase() {

  const [blogs, setBlogs] = useState(
  
      [
        { id: 1,
          title: "Bitcoin",
          body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excepturi reprehenderit, accusamus eos aliquam. Iste ratione suscipit debitis consequatur obcaecati, veritatis provident. Deleniti nobis, inventore facere doloribus sunt tempore ex eos ut vero iure blanditiis quae beatae nesciunt quod dolore earum accusantium ipsam vel rerum ea. Molestiae velit, quo, sint quam ab temporibus sunt obcaecati eveniet laudantium possimus commodi autem?  Corporis vitae eius facere, nobis iure modi quam beatae, dolore autem commodi vel ipsum, atque quisquam odit sint placeat quas eaque doloribus maiores libero voluptas! Aut natus ipsam ratione animi sequi ipsa dicta repellat debitis ducimus quam, dolorem qui vitae nisi itaque est. Quibusdam laudantium vel architecto quam aperiam sed aut tenetur, itaque error nostrum voluptatem consectetur id a quaerat laborum et cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
          author: "mario"
          
        },
        {
          id: 2,
          title: "Ethereum",
          body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excepturi reprehenderit, accusamus eos aliquam. Iste ratione suscipit debitis consequatur obcaecati, veritatis provident. Deleniti nobis, inventore facere doloribus sunt tempore ex eos ut vero iure blanditiis quae beatae nesciunt quod dolore earum accusantium ipsam vel rerum ea. Molestiae velit, quo, sint quam ab temporibus sunt obcaecati eveniet laudantium possimus commodi autem? Animi sequi ipsa dicta repellat debitis ducimus quam, dolorem qui vitae nisi itaque est. Quibusdam laudantium vel architecto quam aperiam sed aut tenetur, itaque error nostrum voluptatem consectetur id a quaerat laborum et cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
          author: "mario"
        },
        {
          id: 3,
          title: "Third Coin",
          body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excepturi reprehenderit, accusamus eos aliquam. Iste ratione suscipit debitis consequatur obcaecati, veritatis provident. Deleniti nobis, inventore facere doloribus sunt tempore ex eos ut vero iure blanditiis quae beatae nesciunt quod dolore earum accusantium ipsam vel rerum ea. Molestiae velit, quo, sint quam ab temporibus sunt obcaecati eveniet laudantium possimus commodi autem?",
          author: "mario"
        
        },
        {
          id: 4,
          title: "Fourth Coin",
          body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excepturi reprehenderit, accusamus eos aliquam. Iste ratione suscipit debitis consequatur obcaecati, veritatis provident. Deleniti nobis, inventore facere doloribus sunt tempore ex eos ut vero iure blanditiis quae beatae nesciunt quod dolore earum accusantium ipsam vel rerum ea. Molestiae velit, quo, sint quam ab temporibus sunt obcaecati eveniet laudantium possimus commodi autem?  Corporis vitae eius facere, nobis iure modi quam beatae, dolore autem commodi vel ipsum, atque quisquam odit sint placeat quas eaque doloribus maiores libero voluptas! Aut natus ipsam ratione animi sequi ipsa dicta repellat debitis ducimus quam, dolorem qui vitae nisi itaque est. Quibusdam laudantium vel architecto quam aperiam sed aut tenetur, itaque error nostrum voluptatem consectetur id a quaerat laborum et cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
          author: "mario"
        },
        {
          id: 5,
          title: "Fifth Coin",
          body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excepturi reprehenderit, inventore facere doloribus sunt tempore ex eos ut vero iure blanditiis quae beatae nesciunt quod dolore earum accusantium ipsam vel rerum ea. Molestiae velit, quo, sint quam ab temporibus sunt obcaecati eveniet laudantium possimus commodi autem?  Corporis vitae eius facere, nobis iure modi quam beatae, dolore autem commodi vel ipsum, atque quisquam odit sint placeat quas eaque doloribus maiores libero voluptas! Aut natus ipsam ratione animi sequi ipsa dicta repellat debitis ducimus quam, dolorem qui vitae nisi itaque est. Quibusdam laudantium vel architecto quam aperiam sed aut tenetur, itaque error nostrum voluptatem consectetur id a quaerat laborum et cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
          author: "mario"
        },
        {
          id: 6,
          title: "Sixth Coin",
          body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excepturi reprehenderit, accusamus eos aliquam. Iste ratione suscipit debitis consequatur obcaecati, veritatis provident. Molestiae velit, quo, sint quam ab temporibus sunt obcaecati eveniet laudantium possimus commodi autem?  Corporis vitae eius facere, nobis iure modi quam beatae, dolorem qui vitae nisi itaque est. Quibusdam laudantium vel architecto quam aperiam sed aut tenetur, itaque error nostrum voluptatem consectetur id a quaerat laborum et cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
          author: "mario"
        }
      ]
    
  )
  
  // div.blog-preview
  return (
    <div className="DataBase">
      {blogs.map((blog) => (
        <div className="blog-prevew" key={blog.id}>
          <h2>{ blog.title }</h2>
          <p>Written by{ blog.author }</p>
        </div>
        
      ))}
      
    </div>
  )
}


