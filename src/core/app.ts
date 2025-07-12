export interface StringArtOptions {
  wb?: boolean;
  rgb?: boolean;
  rect?: boolean;
  exportStrength?: number;
  sideLen?: number;
  pullAmount?: number;
  randomNails?: number;
  nailStep?: number;
  radius1Multiplier?: number;
  radius2Multiplier?: number;
}

interface Point {
  x: number;
  y: number;
}

interface LineResult {
  points: Point[];
  values: number[];
}

export class StringArt {
  private options: Required<StringArtOptions>;

  constructor(options: StringArtOptions) {
    this.options = {
      wb: options.wb ?? false,
      rgb: options.rgb ?? false,
      rect: options.rect ?? false,
      exportStrength: options.exportStrength ?? 0.1,
      sideLen: options.sideLen ?? 300,
      pullAmount: options.pullAmount ?? 2000,
      randomNails: options.randomNails ?? 50,
      nailStep: options.nailStep ?? 4,
      radius1Multiplier: options.radius1Multiplier ?? 1,
      radius2Multiplier: options.radius2Multiplier ?? 1,
    };
  }

  private rgb2gray(imageData: ImageData): Float32Array {
    const { data, width, height } = imageData;
    const gray = new Float32Array(width * height);
    
    for (let i = 0; i < data.length; i += 4) {
      const idx = i / 4;
      gray[idx] = (data[i] * 0.2989 + data[i + 1] * 0.5870 + data[i + 2] * 0.1140) / 255;
    }
    
    return gray;
  }

  private largestSquare(imageData: ImageData): ImageData {
    const { width, height } = imageData;
    const shortEdge = Math.min(width, height);
    const longEdge = Math.max(width, height);
    const isWidthShorter = width < height;
    
    const offset = Math.floor((longEdge - shortEdge) / 2);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = shortEdge;
    canvas.height = shortEdge;
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempCtx.putImageData(imageData, 0, 0);
    
    if (isWidthShorter) {
      ctx.drawImage(tempCanvas, 0, offset, width, shortEdge, 0, 0, shortEdge, shortEdge);
    } else {
      ctx.drawImage(tempCanvas, offset, 0, shortEdge, height, 0, 0, shortEdge, shortEdge);
    }
    
    return ctx.getImageData(0, 0, shortEdge, shortEdge);
  }

  private createRectangleNailPositions(width: number, height: number, nailStep: number): Point[] {
    const nails: Point[] = [];
    
    for (let i = 0; i < width; i += nailStep) {
      nails.push({ x: i, y: 0 });
      nails.push({ x: i, y: height - 1 });
    }
    
    for (let i = nailStep; i < height - 1; i += nailStep) {
      nails.push({ x: 0, y: i });
      nails.push({ x: width - 1, y: i });
    }
    
    return nails;
  }

  private createCircleNailPositions(
    width: number, 
    height: number, 
    nailStep: number, 
    r1Multip: number, 
    r2Multip: number
  ): Point[] {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 1;
    const r1 = radius * r1Multip;
    const r2 = radius * r2Multip;
    
    const nails: Point[] = [];
    const numPoints = Math.floor(360 / nailStep);
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints;
      const x = Math.round(centerX + r2 * Math.cos(angle));
      const y = Math.round(centerY + r1 * Math.sin(angle));
      
      if (x >= 0 && x < width && y >= 0 && y < height) {
        nails.push({ x, y });
      }
    }
    
    return nails;
  }

  private initCanvas(width: number, height: number, channels: number = 1, black: boolean = false): Float32Array {
    const size = width * height * channels;
    const canvas = new Float32Array(size);
    
    if (!black) {
      canvas.fill(1.0);
    }
    
    return canvas;
  }

  private getAALine(from: Point, to: Point): LineResult {
    const points: Point[] = [];
    const values: number[] = [];
    
    const dx = Math.abs(to.x - from.x);
    const dy = Math.abs(to.y - from.y);
    const sx = from.x < to.x ? 1 : -1;
    const sy = from.y < to.y ? 1 : -1;
    
    let err = dx - dy;
    let x = from.x;
    let y = from.y;
    
    while (true) {
      points.push({ x, y });
      values.push(1.0);
      
      if (x === to.x && y === to.y) break;
      
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
    
    return { points, values };
  }

  private getRandomIndices(max: number, count: number): number[] {
    const indices = new Set<number>();
    while (indices.size < Math.min(count, max)) {
      indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
  }

  private findBestNailPosition(
    currentPos: Point,
    nails: Point[],
    strPic: Float32Array,
    origPic: Float32Array,
    strStrength: number,
    width: number,
    height: number
  ): { idx: number; position: Point; improvement: number } {
    
    let bestImprovement = -99999;
    let bestNailIdx = 0;
    let bestPosition = nails[0];
    
    const nailIndices = this.options.randomNails 
      ? this.getRandomIndices(nails.length, this.options.randomNails)
      : Array.from({ length: nails.length }, (_, i) => i);
    
    for (const nailIdx of nailIndices) {
      const nailPos = nails[nailIdx];
      const line = this.getAALine(currentPos, nailPos);
      
      let improvement = 0;
      
      for (let i = 0; i < line.points.length; i++) {
        const point = line.points[i];
        const idx = height + point.y * width + point.x;
        
        if (idx >= 0 && idx < strPic.length) {
          const overlayedValue = Math.min(1, Math.max(0, strPic[idx] + strStrength * line.values[i]));
          const beforeDiff = Math.pow(strPic[idx] - origPic[idx], 2);
          const afterDiff = Math.pow(overlayedValue - origPic[idx], 2);
          improvement += beforeDiff - afterDiff;
        }
      }
      
      if (improvement >= bestImprovement) {
        bestImprovement = improvement;
        bestNailIdx = nailIdx;
        bestPosition = nailPos;
      }
    }
    
    return { idx: bestNailIdx, position: bestPosition, improvement: bestImprovement };
  }

  private createArt(
    nails: Point[],
    origPic: Float32Array,
    strPic: Float32Array,
    strStrength: number,
    width: number,
    height: number,
    onProgress?: (progress: number) => void
  ): number[] {
    
    const pullOrder: number[] = [0];
    let currentPos = nails[0];
    let iteration = 0;
    let consecutiveFails = 0;
    
    while (iteration < this.options.pullAmount && consecutiveFails < 3) {
      iteration++;
      
      if (iteration % 50 === 0 && onProgress) {
        onProgress((iteration / this.options.pullAmount) * 100);
      }
      
      const result = this.findBestNailPosition(
        currentPos, nails, strPic, origPic, strStrength, width, height
      );
      
      if (result.improvement <= 0) {
        consecutiveFails++;
        continue;
      }
      
      consecutiveFails = 0;
      pullOrder.push(result.idx);
      
      const line = this.getAALine(currentPos, result.position);
      for (let i = 0; i < line.points.length; i++) {
        const point = line.points[i];
        const idx = point.y * width + point.x;
        if (idx >= 0 && idx < strPic.length) {
          strPic[idx] = Math.min(1, Math.max(0, strPic[idx] + strStrength * line.values[i]));
        }
      }
      
      currentPos = result.position;
    }
    
    return pullOrder;
  }

  private pullOrderToArray(
    order: number[],
    canvas: Float32Array,
    nails: Point[],
    strength: number,
    width: number
  ): Float32Array {
    
    for (let i = 0; i < order.length - 1; i++) {
      const startNail = nails[order[i]];
      const endNail = nails[order[i + 1]];
      const line = this.getAALine(startNail, endNail);
      
      for (let j = 0; j < line.points.length; j++) {
        const point = line.points[j];
        const idx = point.y * width + point.x;
        
        if (idx >= 0 && idx < canvas.length) {
          canvas[idx] = Math.min(1, Math.max(0, canvas[idx] + line.values[j] * strength));
        }
      }
    }
    
    return canvas;
  }

  private scaleNails(nails: Point[], xRatio: number, yRatio: number): Point[] {
    return nails.map(nail => ({
      x: Math.round(nail.x * xRatio),
      y: Math.round(nail.y * yRatio)
    }));
  }

  private arrayToImageData(
    array: Float32Array, 
    width: number, 
    height: number
  ): ImageData {
    const imageData = new ImageData(width, height);
    const { data } = imageData;
    
    for (let i = 0; i < array.length; i++) {
      const pixelIdx = i * 4;
      const value = Math.round(array[i] * 255);
      data[pixelIdx] = value;
      data[pixelIdx + 1] = value;
      data[pixelIdx + 2] = value;
      data[pixelIdx + 3] = 255;
    }
    
    return imageData;
  }

  async processImage(imageData: ImageData, onProgress?: (progress: number) => void): Promise<ImageData> {
    const LONG_SIDE = this.options.sideLen;
    
    let processedImageData = imageData;
    
    if (this.options.radius1Multiplier === 1 && this.options.radius2Multiplier === 1) {
      processedImageData = this.largestSquare(imageData);
      
      const resizeCanvas = document.createElement('canvas');
      const resizeCtx = resizeCanvas.getContext('2d')!;
      resizeCanvas.width = LONG_SIDE;
      resizeCanvas.height = LONG_SIDE;
      
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCanvas.width = processedImageData.width;
      tempCanvas.height = processedImageData.height;
      tempCtx.putImageData(processedImageData, 0, 0);
      
      resizeCtx.drawImage(tempCanvas, 0, 0, LONG_SIDE, LONG_SIDE);
      processedImageData = resizeCtx.getImageData(0, 0, LONG_SIDE, LONG_SIDE);
    }
    
    const { width, height } = processedImageData;
    
    const nails = this.options.rect 
      ? this.createRectangleNailPositions(width, height, this.options.nailStep)
      : this.createCircleNailPositions(
          width, height, this.options.nailStep, 
          this.options.radius1Multiplier, this.options.radius2Multiplier
        );
    
    const grayData = this.rgb2gray(processedImageData);
    for (let i = 0; i < grayData.length; i++) {
      grayData[i] *= 0.9;
    }
    
    const strPic = this.initCanvas(width, height, 1, this.options.wb);
    const iterationStrength = this.options.wb ? 0.05 : -0.05;
    
    const pullOrder = this.createArt(
      nails, grayData, strPic, iterationStrength, width, height, onProgress
    );
    
    const outputDims = {
      width: Math.round(this.options.sideLen * this.options.radius1Multiplier),
      height: Math.round(this.options.sideLen * this.options.radius2Multiplier)
    };
    
    const scaledNails = this.scaleNails(
      nails, 
      outputDims.width / width, 
      outputDims.height / height
    );
    
    const canvas = this.initCanvas(outputDims.width, outputDims.height, 1, this.options.wb);
    
    this.pullOrderToArray(
      pullOrder, canvas, scaledNails,
      this.options.wb ? this.options.exportStrength : -this.options.exportStrength,
      outputDims.width
    );
    
    return this.arrayToImageData(canvas, outputDims.width, outputDims.height);
  }
}

