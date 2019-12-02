import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Note } from './note.model';

@Injectable()
export class NoteService {
  selectedNote: Note;
  notes: Note[];
  readonly baseURL = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) { }

  postNote(newnote: Note) {
    return this.http.post(this.baseURL, newnote);
  }

  getNoteList() {
    return this.http.get(this.baseURL);
  }

  putNote(newnote: Note) {
    return this.http.put(this.baseURL + `/${newnote._id}`, newnote);
  }

  deleteNote(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
