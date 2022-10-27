interface ErrorProperties{
    error: string
}
export function ErrorMessage({error}: ErrorProperties){
return(
    <p>{error
    }</p>
)

}
