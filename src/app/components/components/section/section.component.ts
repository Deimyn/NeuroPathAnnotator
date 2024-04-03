import { Component, HostListener } from '@angular/core';

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  rectangles: Rectangle[] = [];
  currentRectangle: Rectangle | null = null;
  resizeStart: { x: number, y: number, width: number, height: number } | null = null;
  moveStart: { x: number, y: number, left: number, top: number } | null = null;
  isResizing = false;
  isMoving = false;
  imageWidth = 0;
  imageHeight = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing && !this.isMoving) {
      return;
    }
    if (this.isMoving && this.currentRectangle && this.moveStart) {
      const newLeft = this.moveStart.left + (event.clientX - this.moveStart.x);
      const newTop = this.moveStart.top + (event.clientY - this.moveStart.y);
      const maxRight = this.imageWidth - this.currentRectangle.width;
      const maxBottom = this.imageHeight - this.currentRectangle.height;
      this.currentRectangle.x = Math.min(Math.max(newLeft, 0), maxRight);
      this.currentRectangle.y = Math.min(Math.max(newTop, 0), maxBottom);
      this.logRectangleCoordinates(this.currentRectangle, this.rectangles.indexOf(this.currentRectangle));
    }
    if (this.isResizing && this.currentRectangle && this.resizeStart) {
      const minSize = 15;
      const newWidth = this.resizeStart.width + (event.clientX - this.resizeStart.x);
      const newHeight = this.resizeStart.height + (event.clientY - this.resizeStart.y);
      const maxWidth = this.imageWidth - this.currentRectangle.x;
      const maxHeight = this.imageHeight - this.currentRectangle.y;
      this.currentRectangle.width = Math.min(Math.max(newWidth, minSize), maxWidth);
      this.currentRectangle.height = Math.min(Math.max(newHeight, minSize), maxHeight);
      this.logRectangleCoordinates(this.currentRectangle, this.rectangles.indexOf(this.currentRectangle));
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.isResizing = false;
    this.isMoving = false;
  }

  onMouseDown(event: MouseEvent) {
    const image = event.target as HTMLImageElement;
    const rect = image.getBoundingClientRect();
    this.imageWidth = rect.width;
    this.imageHeight = rect.height;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = 50;
    const height = 50;
    const offsetX = width / 2;
    const offsetY = height / 2;
    const maxRight = this.imageWidth - width;
    const maxBottom = this.imageHeight - height;
    this.currentRectangle = {
      x: Math.min(Math.max(x - offsetX, 0), maxRight),
      y: Math.min(Math.max(y - offsetY, 0), maxBottom),
      width,
      height
    };
    this.rectangles.push(this.currentRectangle);
    this.logRectangleCoordinates(this.currentRectangle, this.rectangles.length - 1);
  }

  onResizeStart(event: MouseEvent, rect: Rectangle) {
    const resizeHandle = event.target as HTMLElement;
    if (resizeHandle.classList.contains('resize-handle')) {
      this.isResizing = true;
      this.resizeStart = {
        x: event.clientX,
        y: event.clientY,
        width: rect.width,
        height: rect.height
      };
      this.currentRectangle = rect;
      this.logRectangleCoordinates(this.currentRectangle, this.rectangles.indexOf(this.currentRectangle));
    }
  }

  onMoveStart(event: MouseEvent, rect: Rectangle) {
    const moveHandle = event.target as HTMLElement;
    if (moveHandle.classList.contains('move-handle')) {
      this.isMoving = true;
      this.moveStart = {
        x: event.clientX,
        y: event.clientY,
        left: rect.x,
        top: rect.y
      };
      this.currentRectangle = rect;
      this.logRectangleCoordinates(this.currentRectangle, this.rectangles.indexOf(this.currentRectangle));
    }
  }

  removeRectangle(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.rectangles.splice(index, 1);
  }

  logRectangleCoordinates(rectangle: Rectangle, index: number) {
    const topLeft = `top-left(${rectangle.x}, ${rectangle.y})`;
    const bottomRight = `bottom-right(${rectangle.x + rectangle.width}, ${rectangle.y + rectangle.height})`;
    console.log(`Coordinates of Rectangle ${index + 1}: ${topLeft}, ${bottomRight}`);
  }
}
