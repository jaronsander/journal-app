import HistoryChart from "@/components/HistoryChart"
import { getUserByClerkID } from "@/util/auth"
import { prisma } from "@/util/db"
const getData = async () => {
    const user = await getUserByClerkID()
    const analysis = await prisma.analysis.findMany({
        where: {
            userId: user?.id,
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
    const sum = analysis.reduce((all, current) => all + current.sentimentScore, 0)
    const avg = Math.round( sum / analysis.length)
    return {analysis, avg}
}

const History = async () => {    
    const { avg, analysis } = await getData()
    console.log(analysis)
    return (
        <div className="w-full h-full">
            <div>
                {`Avg. Sentiment ${avg}`}
            </div>
            <div className="w-full h-full">
            <HistoryChart data={analysis} />
            </div>
            
        </div>
    )
}

export default History