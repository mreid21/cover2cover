import Link from "next/link"
import { Button } from "~/app/_components/ui/button"
import { api } from "~/trpc/server"

export default async function Club({params}: {params: {slug: string}}) {
    const currentlyReading = await api.clubs.currentReading({clubId: parseInt(params.slug)})

    return (
        <div>
            {currentlyReading ? <p>{currentlyReading.name}</p> : <Link href="/search-books"><Button>Set Book</Button></Link>}
        </div>
    )
}