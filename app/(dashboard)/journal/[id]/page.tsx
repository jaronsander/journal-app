import Editor from "@/components/Editor"
import { getUserByClerkID } from "@/util/auth"
import { prisma } from "@/util/db"
const getEntry = async (id) => {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id
            }
        },
        include: {
            analysis: true
        }
    })
    console.log(entry)
    return entry
}
const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id)
    
    return <div className="w-full h-full">
        <div>
        <Editor entry={entry}/>
        </div>
    </div>
}

export default EntryPage