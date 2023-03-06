import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('window:scroll') onScroll(e: Event): void {
    console.log('scrolled');
    console.log(this.getYPosition(e))
 }
  title = 'OniFood';

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop
  }
}
