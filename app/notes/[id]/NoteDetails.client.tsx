'use client'

import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';

const NoteDetailsClient = () => {
  const { id } = useParams();
  const noteId = Number(id);

  const { data: note,  isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if(isLoading) return(<p className={css.message}>Loading, please wait...</p>)
  if(error || !note) return (<p className={css.errorMessage}>Something went wrong.</p>)

  return (
    <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	    <button className={css.editBtn}>Edit note</button>
	  </div>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>{new Date(note.createdAt).toLocaleString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })} </p>
	</div>
</div>

  )
}

export default NoteDetailsClient;