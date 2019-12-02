import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';

declare var M: any;

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers: [NoteService]
})
export class NoteComponent implements OnInit {

  constructor(public noteService: NoteService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshNoteList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.noteService.selectedNote = {
      _id: '',
      title: '',
      content: ''
    };
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.noteService.postNote(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshNoteList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.noteService.putNote(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshNoteList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshNoteList() {
    this.noteService.getNoteList().subscribe((res) => {
      this.noteService.notes = res as Note[];
    });
  }

  onEdit(newnote: Note) {
    this.noteService.selectedNote = newnote;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.noteService.deleteNote(_id).subscribe((res) => {
        this.refreshNoteList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
