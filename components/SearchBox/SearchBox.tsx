import css from '../SearchBox/SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (search: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={e => onSearch(e.target.value)}
    />
  );
}