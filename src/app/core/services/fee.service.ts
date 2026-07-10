import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fee {
  id?: number;
  studentId: number;
  studentName?: string;
  amount: number;
  paid: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FeeService {
  private apiUrl = 'http://localhost:8080/fees';

  constructor(private http: HttpClient) {}

  getFees(): Observable<Fee[]> {
    return this.http.get<Fee[]>(this.apiUrl);
  }

  getFeeById(id: number): Observable<Fee> {
    return this.http.get<Fee>(`${this.apiUrl}/${id}`);
  }

  addFee(fee: Fee): Observable<Fee> {
    return this.http.post<Fee>(this.apiUrl, fee);
  }

  updateFee(id: number, fee: Fee): Observable<Fee> {
    return this.http.put<Fee>(`${this.apiUrl}/${id}`, fee);
  }

  deleteFee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
