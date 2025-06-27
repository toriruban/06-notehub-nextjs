import { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import { toast } from 'react-hot-toast';
import css from '../NoteList/NoteList.module.css';
import Link from 'next/link';
export interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const handleDelete = (id: number) => deleteMutation.mutate(id);
  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted! 🗑️')
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
              onClick={() => handleDelete(note.id)}
              disabled={isPending}
              >  Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}