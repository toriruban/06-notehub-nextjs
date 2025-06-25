import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  try {
    const notes = await fetchNotes('', 1)
    return <NotesClient initialData={notes} />
  } catch {
    throw new Error('Oopsie!');
  }
}

