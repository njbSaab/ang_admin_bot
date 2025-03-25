import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GetImagesService } from '../../../../shared/services/get-images.service';

@Component({
  selector: 'app-images-table',
  templateUrl: './images-table.component.html',
  styleUrls: ['./images-table.component.scss']
})
export class ImagesTableComponent implements OnInit, OnChanges {
  @Input() images: string[] = [];
  copiedStates: boolean[] = [];
  hiddenStates: boolean[] = [];
  
  constructor(private imageService: GetImagesService) {}

  ngOnInit(): void {
    this.fetchImages();
    this.imageService.onImageAdded().subscribe(() => {
      this.fetchImages();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && changes['images'].currentValue) {
      this.sortImages();
      this.copiedStates = new Array(this.images.length).fill(false);
      this.hiddenStates = new Array(this.images.length).fill(false); // Сбрасываем при обновлении
      console.log('Images updated and sorted:', this.images);
    }
  }

  fetchImages(): void {
    this.imageService.getImages().subscribe({
      next: (images) => {
        this.images = images;
        this.sortImages();
        this.copiedStates = new Array(this.images.length).fill(false);
        this.hiddenStates = new Array(this.images.length).fill(false); // Сбрасываем при новом запросе
        console.log('Полученные и отсортированные изображения:', this.images);
      },
      error: (err) => {
        console.error('Ошибка при получении изображений:', err);
      }
    });
  }

  sortImages(): void {
    this.images.sort((a, b) => {
      const timestampA = this.extractTimestamp(a);
      const timestampB = this.extractTimestamp(b);
      return timestampB - timestampA;
    });
  }

  extractTimestamp(imagePath: string): number {
    const fileName = imagePath.split('/').pop() || imagePath;
    const match = fileName.match(/image-(\d+)-\d+\.png/);
    return match ? parseInt(match[1], 10) : 0;
  }

  copyImageUrl(image: string, index: number): void {
    const url = `https://top4winners.top${image}`;
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL скопирован в буфер обмена:', url);
      this.copiedStates[index] = true;
      setTimeout(() => {
        this.copiedStates[index] = false;
      }, 3000);
    }).catch(err => {
      console.error('Ошибка при копировании URL:', err);
    });
  }

  hideImage(index: number): void {
    this.hiddenStates[index] = true; // Устанавливаем флаг скрытия
    console.log(`Скрыта строка с индексом ${index}: ${this.images[index]}`);
  }
}