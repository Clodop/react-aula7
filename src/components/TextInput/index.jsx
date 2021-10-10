import './styles.css'

export const TextInput = ({searchValue, handleChance}) =>{
    return(
        <input className="text-input"
        onChange={ handleChance }
        value={searchValue}
        type="search"
        placeholder="Digite para pesquisar..."
      />
    )    
}