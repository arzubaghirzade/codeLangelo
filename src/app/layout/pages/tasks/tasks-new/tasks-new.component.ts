import { Component, Output, Input, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-tasks-new',
  templateUrl: './tasks-new.component.html',
  styleUrls: ['./tasks-new.component.scss']
})
export class TasksNewComponent implements OnChanges {
  @Input() tasks: any;
  @Output() onClose = new EventEmitter();
  isVisible = false;
  arrayObj: any;
  param_id:any;
  isConfirmLoading = false;
  validateForm: FormGroup;
  loading = false;
  avatarUrl: any;
  panels = [
    {
      active: true,
      name: 'Azerbaycan dili',
      title: 'Başlıq',
      text:  'Mətn',
      select:  'Dil seçin',
      icon: 'az'
    },
    {
      active: false,
      name: 'English',
      title: 'Title',
      text:  'Text',
      select:  'Select Language',
      icon: 'en'
    }
  ];
 
  constructor(private fb: FormBuilder,
              private modalService: NzModalService,
              private appService: AppService,
              private msg: NzMessageService) {
                this.validateForm = this.fb.group({
                  id: [null],
                  content: this.fb.array([])
                });
  }
  ngOnChanges (changes: SimpleChanges) {
    this.arrayObj = changes.tasks.currentValue;
    if(this.arrayObj.id){
          this.param_id = localStorage.getItem('id');    
        this.validateForm.patchValue({
          id: this.arrayObj.id,
      });
      this.arrayObj.content.forEach((x) => {
        const obj = {
          fullName: x.fullName,
          profession: x.profession,
          about: x.about,
          language_iso: x.language_iso,
          active: false,
          name: x.language_iso,
          icon: x.language_iso
        }
        this.content.push(this.fb.group(obj))
  });
    this.avatarUrl = this.arrayObj.image.image_Url;
    } else {
      console.log('lalala');
      
      this.createForm();
    }
}
createItem(active, lang, icon,) {
  return this.fb.group({
    fullName: [''],
    profession: [''],
    about: [''],
    language_iso: icon,
    active: active,
    name: lang,
    icon: icon
  })
}
createForm() {
  this.validateForm = this.fb.group({
    id: [null],
    content: this.fb.array([this.createItem(true, '', 'az'), this.createItem(true, '', 'en')]),
    navigatorUrl: ['/layout/tasks/tasks-detaiils']
  });
  this.arrayObj.image = {image_key: '', image_Url: ''};
}

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
  get content(): FormArray {
    return this.validateForm.get('content') as FormArray;
  }

  get contentControl() {
    return this.validateForm.get('content')?.['controls'];
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let testData: FormData = new FormData();
      testData.append('file', file, file.name);
      this.appService.postForm('Photo', testData).subscribe(result => {
        this.arrayObj.image = result;
    });
    }
  }
  submitForm(value) {
    if(this.param_id){
      const formObj = { 
      id: this.param_id,
      image:  this.arrayObj.image,
      content: this.validateForm.value['content']
    }
    console.log(formObj);
    this.appService.updateForm('tasks',  this.param_id, formObj).subscribe(result => {
      this.onClose.emit();
    });
    } else {
      const formObj = { 
        Image_Key: this.arrayObj.image.image_key || null,
        Content: this.validateForm.value['content']
    } 
      this.appService.postForm('tasks', formObj).subscribe(result => {
        this.onClose.emit();
      });
    }
  }
}
