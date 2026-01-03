export type PointCloudFormat = 'xyz' | 'las' | 'laz' | null;
export type DatasetType = 'raw' | 'labeled' | 'predicted' | 'manual';

export interface LoadedFile {
  name: string;
  path: string;
  format: PointCloudFormat;
  sourceType: DatasetType;
  size?: number;
}

export interface PointCloudStats {
  pointCount: number;
  bounds?: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
  };
}

export interface FileEntry {
  name: string;
  path: string;
  extension: string;
}
