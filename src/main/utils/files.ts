import { readFile, writeFile } from 'fs/promises'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
// types
import { TReadJsonAsync, TReadJsonSync, TFileName } from '../../types/file'

export const readJsonAsync: TReadJsonAsync = async (fileName) => {
  const buffer = await readFile(join(__dirname, `../../configs/${fileName}.json`))
  const data = JSON.parse(buffer.toString())
  return data
}

export const writeJsonAsync = async (fileName: TFileName, file: any) => {
  await writeFile(join(__dirname, `../../configs/${fileName}.json`), JSON.stringify(file, null, 4))
}

export const readJsonSync: TReadJsonSync = (fileName) => {
  const buffer = readFileSync(join(__dirname, `../../configs/${fileName}.json`))
  const data = JSON.parse(buffer.toString())
  return data
}

export const writeJsonSync = (fileName: TFileName, file: any) => {
  writeFileSync(join(__dirname, `../../configs/${fileName}.json`), JSON.stringify(file, null, 4))
}
