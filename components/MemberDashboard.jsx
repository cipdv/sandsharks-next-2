
const MemberDashboard = ({member}) => {



    return (
            <div>
                <h1>Welcome {member?.preferredName}!</h1>
                <p>
                    -option to make a profile
                </p>
                <p>
                    -component to view weekly updates, update if they can attend
                </p>
                <p>
                    -view calendar of dates/who is running it that day/volunteer to run it
                </p>
                <p>
                    -navbar with links to: volunteer, update account, view members, read about the league
                </p>
            </div>
        )
}  


export default MemberDashboard