// Controlled search input. The parent owns the value: the header
// navigates to /search?q=… on submit, the search page filters live
// on change. The query stays in the URL so a search can be shared.
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  label = "Search tools websites",
  placeholder = "Search sites — try “PDF”, “image” ya “calculator”…",
  id = "site-search",
  autoFocus = false
}) {
  return (
    <form
      className="search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(value);
      }}
    >
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id}
        type="search"
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit" className="button search-button">Search</button>
    </form>
  );
}
