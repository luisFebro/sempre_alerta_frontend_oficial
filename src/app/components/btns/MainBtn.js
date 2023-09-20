'use client'


export default function MainBtn({
    title = "Exemplo Teste",
    color = "blue",
    background = "#000000",
    onClick = () => null,
}) {
    return (
        <button
      type="button"
      style={{
        color,
        background
      }}
      onClick={onClick}
    >
      {title}
    </button>
    );
}