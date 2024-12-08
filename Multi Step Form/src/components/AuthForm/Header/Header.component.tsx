const Header = ({title, description}: { title: string, description: string }) => {
    return (
        <header>
            <h1>{title}</h1>
            <p>{description}</p>
        </header>
    )
}

export default Header