import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Channels } from 'src/app/channels';
import { Invite } from 'src/app/invites';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  @Output() onCreateInvite: EventEmitter<Invite> = new EventEmitter();
  @Input() inviteId!: string;
  @Input() inviteDetails!: Invite;
  channels: Channels[] = [];

  Data: Array<any> = [
    { name: 'Create', value: 'create' },
    { name: 'Edit', value: 'edit' },
    { name: 'Delete', value: 'delete' }
  ]
  form!: FormGroup;
  permissionsValues: Array<any> = [];
  channelValues: Array<any> = [];

  constructor(private dashboardService: DashboardService, private fb: FormBuilder) {

    this.form = this.fb.group({
      fullName: this.fb.control('', [Validators.required]),
      userEmail: this.fb.control('', [Validators.required]),
      channelsArray: this.fb.array([], [Validators.required]),
      checkArray: this.fb.array([], [Validators.required])
    })
  }

  ngOnInit(): void {

    console.log('Inside Edit')

    this.dashboardService.getChannels()
      .subscribe(response => {
        this.channels = response
      }, error => {
        console.log(error)
      })

    console.log('Invite Details', typeof this.inviteDetails)
    if (Object.keys(this.inviteDetails).length !== 0) {
      const { name, email, channels, permissions } = this.inviteDetails

      // console.log('Channels IDs', this.inviteDetails.channels)

      this.form = this.fb.group({
        fullName: this.fb.control(name, [Validators.required]),
        userEmail: this.fb.control(email, [Validators.required]),
        channelsArray: this.fb.array(channels.map(val => val._id), [Validators.required]),
        checkArray: this.fb.array(permissions, [Validators.required])
      })

      this.channelValues = this.form.value.channelsArray
      this.permissionsValues = this.form.value.checkArray

      // const dynamicValues = {
      //   fullName: name,
      //   userEmail: email,
      //   channelsArray: channels.map(val => val._id),
      //   checkArray: permissions
      // }

      // this.form.patchValue(dynamicValues)
      // this.permissionsValues = dynamicValues.checkArray
      // this.channelValues = dynamicValues.channelsArray
      // console.log('Updated Values',this.form.get('channelsArray') as FormArray)
    }
  }

  onCheckboxChange(e: any, formName: string) {
    if (formName === 'channels') {
      const channelsArray: FormArray = this.form.get('channelsArray') as FormArray;
      if (e.target.checked) {
        channelsArray.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        channelsArray.controls.forEach((item: any) => {
          if (item.value == e.target.value) {
            channelsArray.removeAt(i);
            return;
          }
          i++;
        });
      }
    } else {
      const checkArray: FormArray = this.form.get('checkArray') as FormArray;
      if(this.permissionsValues.length !== 0) {
        checkArray.push(new FormControl(this.permissionsValues))
      }
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: any) => {
          if (item.value == e.target.value) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      }

      console.log('Perissions Checked', checkArray)
    }
  }

  submitForm() {
    // console.log(this.form.value);

    const invite = {
      name: this.form.value.fullName,
      email: this.form.value.userEmail,
      channels: this.form.value.channelsArray,
      permissions: this.form.value.checkArray
    }

    this.onCreateInvite.emit(invite)

    this.form.reset()
  }
}
