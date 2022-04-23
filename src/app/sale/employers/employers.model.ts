import { formatDate } from "@angular/common";
export class Appointments {
  id: number;
  img: string;
  name: string;
  email: string;
  dateTime: string;
  mobile: string;
  address: string;
  disease: string;

  constructor(Appointments) {
    {
      this.id = Appointments.id || this.getRandomID();
      this.img = Appointments.avatar || "assets/images/user/usrbig1.jpg";
      this.name = Appointments.name || "";
      this.email = Appointments.email || "";
      this.dateTime = formatDate(new Date(), "yyyy-MM-dd", "en") || "";
      this.address = Appointments.address || "";
      this.mobile = Appointments.mobile || "";
      this.disease = Appointments.disease || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
