import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetImagesService {
  private imageAddedSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getImages(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.auth.baseUrl}images`);
  }

  notifyImageAdded(): void {
    this.imageAddedSubject.next();
  }

  onImageAdded(): Observable<void> {
    return this.imageAddedSubject.asObservable();
  }
}