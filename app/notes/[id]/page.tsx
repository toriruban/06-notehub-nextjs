import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
    params: Promise<{ id: string }>
  }
  
  const NoteDetails = async ({ params }: Props) => {
    const response = await params
    const noteId = Number(response.id);
    const queryClient = new QueryClient()
  
    queryClient.prefetchQuery({
      queryKey: ['note', noteId],
      queryFn: () => fetchNoteById(noteId),
    })
  
    return (
      <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NoteDetailsClient />
        </HydrationBoundary>
      </div>
    )
  }
  
  export default NoteDetails