import { useSession } from "next-auth/react"
import { confirmWaiver } from "@/app/actions";

const Waiver = ({member}) => {
  const { data: session, status: loading, update } = useSession();

    const submitWaiver = async () => {
        const updatedMember = await confirmWaiver(member.id);
        update({ ...session, user: { ...session.user, waiver: true } });
        return updatedMember;
    }

//   const submitWaiver = async () => {
//     try {
//       const response = await fetch(`/api/profile/${member?.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ waiver: true })
//       });

//       if (response.ok) {
//         const updatedMember = await response.json();

//         // Update the session
//         update({ ...session, user: { ...session.user, waiver: true } });

//         return updatedMember;
//       } else {
//         throw new Error('Failed to update waiver');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <div>
        <h1>To continue, please read and agree to the liability waiver and code of conduct:</h1>
        <div>
            <h2>Code of Conduct</h2>
            <p>
                Sandsharks is organized to be fun, safe, and welcoming to all LGBTQ+ people. We will not tolerate discrimination, 
                hate speech, verbal or physical harrassment of any kind. Our goal is to have fun in a friendly competitive setting. 
            </p>
            <br />
            <p>
                To be a Sandshark, read this oath and keep it in mind while playing with us:
            </p>
            <ul>
                <li>I will treat all members of the group with respect and kindness</li>
                <li>I will be welcoming to new players of all skill levels and help them in any way that I can to be part of the group</li>
                <li>I will be careful with my language and comments to avoid making others feel uncomfortable or unwelcome</li>
                <li>I will play to have fun and do my best to keep my cool during games</li>
            </ul>
            <p>
                If you feel that someone is making you uncomfortable with their words or actions, you don't need to put up with it, 
                please let Cip know either in person, email, or a private message. 
            </p>
        </div>
        <div>
            <p>
                By clicking agree, I hereby release and forever discharge Toronto SandSharks, its players, organizers, and
                agents, from all liabilities, actions, cause of actions, claims, demands for damages, loss or personal injuries,
                however so arising and including, but not limited to injuries arising from the negligence of Toronto
                SandSharks, its players, organizers, and agents which hereto may have been or may hereafter be
                sustained by me in consequence of my participation.
            </p>
            <br />
            <p>
                I acknowledge that no warranties or conditions are made, expressed or implied, that activities have been,
                are, or will be conducted so as to prevent or minimize the risk of personal injury. I acknowledge that I am
                solely responsible for inspecting and clearing my own court and surrounding area of potential
                hazards, securing my own belongings, and preventing injury to myself and to others. I acknowledge
                that Toronto SandSharks makes no representation whatsoever as to the competence or ability of its players
                to participate in the league activities in a safe manner. 
            </p>
            <br />
            <p>
                I further acknowledge that I voluntarily assume all
                risk of personal injury from participation, and that I have
                taken appropriate measures to make myself aware of all risks involved in the performance of such activities
                prior to signing this Waiver. I fully understand, having read the above, that the nature and effect of this
                document is to release Toronto SandSharks, its players, organizers, and agents, from all liability.
            </p>
            <button className="btn mt-4" onClick={(submitWaiver)}>I agree</button>
        </div>
    </div>
  )
}

export default Waiver