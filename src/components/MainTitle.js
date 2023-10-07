export default function MainTitle({
    title = "Main Title",
    desc = null,
    className,
    classNameTitle,
    classNameSubtitle,
}) {
    return (
        <section className={`py-7 text-center px-1 ${className}`}>
            <h1 className={`text-title ${classNameTitle}`}>{title}</h1>
            {desc && (
                <h2 className={`text-subtitle ${classNameSubtitle}`}>{desc}</h2>
            )}
        </section>
    );
}
