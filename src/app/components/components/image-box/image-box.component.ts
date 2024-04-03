import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-image-box',
  templateUrl: './image-box.component.html',
  styleUrls: ['./image-box.component.scss']
})
export class ImageBoxComponent {
  @Input() rectangle: Rectangle = { x: 0, y: 0, width: 50, height: 50 }; // Increased default size
  @Output() removeRectangle = new EventEmitter<void>();

  onRemoveClick() {
    this.removeRectangle.emit();
  }

  ngOnInit() {
    console.log(this.rectangle); // Check the default rectangle values
  }

}
