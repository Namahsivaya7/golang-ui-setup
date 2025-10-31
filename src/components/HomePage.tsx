import { useQuery } from "@tanstack/react-query"


export default function HomePage(){

    // const queryClient = useQuery()
const {isPending, error, data} = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch("https://api.github.com/repos/Tanstack/query").then((res) => res.json())
})
if(isPending) return <div className="flex justify-center">Loading...</div>

if(error) return "An error occured: " + error.message 

    return (
        <>
        <h5>Home page</h5>
        <div>
            <h4>Name: {data.name}</h4>
            <p>Desc: {data.description}</p>
            <strong> {`Subs count ${data.subscribers_count}`}</strong>
            <strong>{`stargazers ${data.stargazers_count}`}</strong>
            <strong>{`Forks count ${data.forks_count}`}</strong>
        </div>
        </>
    )
}