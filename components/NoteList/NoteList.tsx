import { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import css from '../NoteList/NoteList.module.css';
import Link from 'next/link';

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return (deleteNote(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }, 
  });

  const { isPending } = deleteMutation;

  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.details}>View Details</Link>
            <button
              className={css.button}
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={isPending}
              >  
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}