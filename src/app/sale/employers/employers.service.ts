import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Appointments } from "./employers.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Injectable()
export class AppointmentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "assets/data/doc-Appointments.json";
  isTblLoading = true;
  dataChange: BehaviorSubject<Appointments[]> = new BehaviorSubject<
    Appointments[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Appointments[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAppointmentss(): void {
    this.subs.sink = this.httpClient
      .get<Appointments[]>(this.API_URL)
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
  }
  addAppointments(Appointments: Appointments): void {
    this.dialogData = Appointments;

    /*  this.httpClient.post(this.API_URL, Appointments).subscribe(data => {
      this.dialogData = Appointments;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateAppointments(Appointments: Appointments): void {
    this.dialogData = Appointments;

    /* this.httpClient.put(this.API_URL + Appointments.id, Appointments).subscribe(data => {
      this.dialogData = Appointments;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteAppointments(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
