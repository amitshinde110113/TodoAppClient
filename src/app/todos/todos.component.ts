import { IUser } from '../models/user';
import { NoteService } from '../shared/note.service';
import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  selectedNote: any;
  isNextDisabled = true;
  isProcessing = false;
  noteForm: FormGroup;
  isEdit = false;
  currentUser: IUser;
  deleteModalRef: BsModalRef;
  modalRef: BsModalRef;
  page = 0;
  notes: any[];
  totalCount: any;
  constructor(
    private noteService: NoteService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currenUser'));
    this.getNotes();
  }
  getNotes() {
    this.noteService.getAll(this.page).subscribe((notes: any) => {
      this.notes = notes.notes;
      this.totalCount = notes.totalCount;
      this.isNextDisabled = (this.page + 1) * 10 >= this.totalCount ? true : false;
    }, error => {
      this.redirectIfTokenVarificationFailed(error);
      this.toastr.error(error.error.message || 'Error while getting notes.');
    });
  }
  buildNoteForm() {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  patchValueToNoteForm() {
    this.noteForm.patchValue({
      title: this.selectedNote.title,
      description: this.selectedNote.description,
    });
  }
  openAddNoteModel(addNote: TemplateRef<any>) {
    this.isEdit = false;
    this.selectedNote = {};
    this.buildNoteForm();
    this.modalRef = this.modalService.show(addNote);
  }
  openEditNoteModel(editNote: TemplateRef<any>, note) {
    this.isEdit = true;
    this.selectedNote = note;
    this.buildNoteForm();
    this.patchValueToNoteForm();
    this.modalRef = this.modalService.show(editNote);
  }
  deleteNote() {
    this.isProcessing = true;
    this.page=0
    this.noteService.delete(this.selectedNote._id).subscribe((note: any) => {
      this.deleteModalRef.hide();
      this.getNotes();
      this.isProcessing = false;
    }, error => {
      this.redirectIfTokenVarificationFailed(error);
      this.isProcessing = false;
    });
  }
  openDeleteConfirm(deleteConfirm: TemplateRef<any>, note) {
    this.selectedNote = note;
    this.deleteModalRef = this.modalService.show(deleteConfirm);
  }
  addNote() {
    const data = this.noteForm.value;
    data.user = this.currentUser._id;
    this.isProcessing = true;
    this.noteService.create(this.noteForm.value).subscribe((note: any) => {
      this.modalRef.hide();
      this.isProcessing = false;
      this.getNotes();
    }, error => {
      this.redirectIfTokenVarificationFailed(error);
      this.isProcessing = false;
    });
  }
  updateNote() {
    this.isProcessing = true;
    this.noteService.update(this.noteForm.value, this.selectedNote._id).subscribe((note: any) => {
      this.modalRef.hide();
      this.getNotes();
      this.isProcessing = false;
    }, error => {
      this.redirectIfTokenVarificationFailed(error);
      this.isProcessing = false;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  redirectIfTokenVarificationFailed(error) {
    if (error.status === 498) {
      this.logout();
    }

  }
}
