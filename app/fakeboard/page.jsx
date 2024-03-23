
import Posts from "@/components/Posts"
import { getAllPosts } from "../actions"
import PostForm from "@/components/PostForm"
import Fakeboard from "@/components/Fakeboard"

const fakeboard = async () => {

//   const posts = await getAllPosts()



    return (
        //   <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full p-5">
        //     <div className="sm:w-1/2">
        //         <Posts posts={posts}/>
        //     </div>
        //     <div className="sm:w-1/2">
        //         <PostForm />
        //     </div>
        // </div>
        <>
        <h1>check actions for which page is being revalidated</h1>
            <Fakeboard />
        </>
      )
}

export default fakeboard