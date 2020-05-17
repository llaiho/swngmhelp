import { Hex } from "../interfaces/Sector";


export interface CubeCoordinates {
    x: number,
    y: number,
    z: number
}

export interface AxialCoordinates {
    q: number,
    r: number
}

export function hexToCube(hex: Hex): CubeCoordinates {
    return {
        x: hex.x,
        y: hex.y,
        z: hex.z
    };
}

export function cubeToHex(hex: Hex, cube: CubeCoordinates): Hex {
    hex.x = cube.x;
    hex.y = cube.y;
    hex.z = cube.z;
    return hex;
}

export function cubeToAxial(cube: CubeCoordinates): AxialCoordinates {
    return { q: cube.x, r: cube.z };
}

export function axialToCube(axial: AxialCoordinates): CubeCoordinates {
    return {
        x: axial.q,
        z: axial.r,
        y: -axial.q - axial.r
    };
}


export function hexToPixelFlatTop(hex: Hex, size: number): [number, number] {

    const axialCoords = cubeToAxial(hexToCube(hex));
    const x = size * (3. / 2 * axialCoords.q);
    const y = size * (Math.sqrt(3) / 2 * axialCoords.q + Math.sqrt(3) * axialCoords.r);

    return [x, y];
}

export function hexToPixelPointyTop(hex: Hex, size: number): [number, number] {

    const axialCoords = cubeToAxial(hexToCube(hex));
    const x = size * (Math.sqrt(3) * axialCoords.q + Math.sqrt(3) / 2 * axialCoords.r);
    const y = size * (3. / 2 * axialCoords.r);

    return [x, y];
}