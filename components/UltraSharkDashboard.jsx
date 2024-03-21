import PostForm from "./PostForm"
import Posts from "./Posts"

const UltraSharkDashboard = ({posts}) => {
  return (
    <div>
        <h1>Ultrashark!</h1>
        <p>The manager will have the ability to view/edit/remove/approve members, approve volunteer dates for admins,  </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <div className="sm:w-1/2">
            <Posts posts={posts}/>
          </div>
          <div className="sm:w-1/2">
            <PostForm />
          </div>
        </div>
    </div>
  )
}

export default UltraSharkDashboard