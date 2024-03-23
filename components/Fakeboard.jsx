import Posts from "@/components/Posts"
import { getAllPosts } from "@/app/actions"
import PostForm from "@/components/PostForm"

const fakeboard = ({posts}) => {

//   const posts = await getAllPosts()

    return (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full p-5">
            <div className="sm:w-1/2">
                <Posts posts={posts}/>
            </div>
            <div className="sm:w-1/2">
                <PostForm />
            </div>
        </div>
      )
}

export default fakeboard