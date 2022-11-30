import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/stores/storeAuth";

let notesRef;
let orderedNotesQuery;
let getNotesSnapshot = null;

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();

      notesRef = collection(db, "users", storeAuth.user.id, "notes");
      orderedNotesQuery = query(notesRef, orderBy("date", "desc"));
      this.getNotes();
    },
    async getNotes() {
      getNotesSnapshot = onSnapshot(
        orderedNotesQuery,
        (querySnapshot) => {
          this.notesLoaded = false;
          const notes = [];
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date,
            };
            notes.push(note);
          });
          this.notes = notes;
          this.notesLoaded = true;
        },
        (error) => {
          throw new Error(error);
        }
      );
    },
    clearNotes() {
      this.notes = [];
      // unsubscribes from getNotesSnapshot listener
      if (getNotesSnapshot) getNotesSnapshot();
    },
    async addNote(newNoteContent) {
      let date = new Date().getTime();
      const newNote = await addDoc(notesRef, {
        date,
        content: newNoteContent,
      });
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesRef, idToDelete));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesRef, id), {
        content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        console.log(id);
        return state.notes.find((note) => note.id === id).content;
      };
    },
    getNotesCount: (state) => {
      return state.notes.length;
    },
    getCharactersCount: (state) => {
      let count = 0;

      for (const note of state.notes) {
        count += note.content.length;
      }
      return count;
    },
  },
});
