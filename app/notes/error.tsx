"use client";
import css from "@/app/notes/NotesClient.module.css";

type Props = {
  error: Error
  reset: () => void
}

export default function NotesError({ error, reset }: Props) {
  return (
     <div className={ css.errorWrapper }>
     <p className={ css.message }>
      Could not fetch the list of notes.<br/>{error.message}
    </p>
     <button onClick={reset} className={ css.reset }>Try again</button>
   </div>
  )
}

