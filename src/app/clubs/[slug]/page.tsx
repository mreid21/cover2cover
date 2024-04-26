export default async function Club({params}: {params: {slug: string}}) {
    return (
        <div>Hello from club {params.slug}</div>
    )
}