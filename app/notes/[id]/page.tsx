import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
    params: Promise<{ id: number }>
  }
  
  const NoteDetails = async ({ params }: Props) => {
    const response = await params
  
    const queryClient = new QueryClient()
  
    queryClient.prefetchQuery({
      queryKey: ['note', response.id],
      queryFn: () => fetchNoteById(response.id),
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