"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';
import { fetchNotes, createNote } from '@/lib/api';
import { FetchNotesResponse } from '@/lib/api'; 
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteModal from '@/components/NoteModal/NoteModal';
import css from './NotesClient.module.css';
import { FormValues } from '@/components/NoteForm/NoteForm';
import { useDebounce } from 'use-debounce';
import { FormikHelpers } from 'formik';
import Loading from '@/app/loading';

type NotesClientProps = {
  initialData: FetchNotesResponse;
}

const NotesClient = ({ initialData }: NotesClientProps) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data , isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
    initialData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setModalOpen(false);
      toast.success('Note created!');
    },
  });

  const handleCreate = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        setModalOpen(false);
        toast.success('Note created!');
      }
    });
  };

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data?.notes && data.notes.length > 0 && (
        <NoteList 
        notes={data.notes} 
        />
      )}
      {isLoading && (
          <Loading /> 
      )}
      {isModalOpen && (
        <NoteModal 
          onClose={() => setModalOpen(false)} 
          onSubmit={ handleCreate }
        />
      )}
    </div>
  );
}

export default NotesClient;