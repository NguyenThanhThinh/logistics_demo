import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { AppointmentsService } from "../employers.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Appointments } from "../employers.model";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.sass"],
})
export class FormComponent {
  action: string;
  dialogTitle: string;
  isDetails = false;
  AppointmentsForm: FormGroup;
  Appointments: Appointments;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public AppointmentsService: AppointmentsService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "details") {
      this.Appointments = data.Appointments;
      this.isDetails = true;
    } else {
      this.isDetails = false;
      this.dialogTitle = "New Appointments";
      this.Appointments = new Appointments({});
      this.AppointmentsForm = this.createContactForm();
    }
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.Appointments.id],
      img: [this.Appointments.img],
      name: [this.Appointments.name],
      email: [
        this.Appointments.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dateTime: [
        formatDate(this.Appointments.dateTime, "yyyy-MM-dd, HH:mm", "en"),
        [Validators.required],
      ],
      address: [this.Appointments.address],
      mobile: [this.Appointments.mobile],
      disease: [this.Appointments.disease],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.AppointmentsService.addAppointments(
      this.AppointmentsForm.getRawValue()
    );
  }
}
